/**
 * CLI for one-off listing-row + storage maintenance.
 *
 * Usage (loads env via `npm run listing -- <command>` — defaults to .env.local;
 * use `npm run listing:prod` to point at prod):
 *
 *   npm run listing -- list                           # all listings, newest first
 *   npm run listing -- list --status archived         # filter by status
 *   npm run listing -- get    --slug <slug>           # full listing + translations as JSON
 *   npm run listing -- archive --slug <slug>          # soft-archive
 *   npm run listing -- publish --slug <slug>          # unarchive / un-draft
 *   npm run listing -- draft   --slug <slug>          # back to draft
 *   npm run listing -- delete  --slug <slug> --confirm    # hard delete row only
 *   npm run listing -- delete-image --slug <slug>     # remove <slug>.webp from bucket
 *   npm run listing -- purge [--older-than-days 90] [--dry-run]
 *   npm run listing -- upsert  --slug <slug>          # re-upsert from content/*.ts (transitional)
 *   npm run listing -- upsert  --file <path>          # upsert from a ListingWriteInput JSON
 *
 * The skill's `add` / `replace` / `image` modes drive content writes via
 * `upsert --file`. The TS-driven `upsert --slug` is kept for quick fixes /
 * restores from `content/*.ts`.
 */
import { readFileSync } from "node:fs";
import { experiences } from "../content/experiences";
import { bundles } from "../content/bundles";
import type { Listing } from "../content/types";
import {
  archiveListing,
  createListingsClient,
  deleteListing,
  deleteListingImage,
  draftListing,
  getListingFull,
  getListingMeta,
  listListings,
  publishListing,
  purgeArchivedListings,
  upsertListing,
  upsertListingWithTranslations,
  type ListingStatus,
} from "./lib/listings-write";

const argv = process.argv.slice(2);
const command = argv[0];
const flags = argv.slice(1);

function getFlag(name: string): string | undefined {
  const i = flags.indexOf(`--${name}`);
  return i >= 0 && i + 1 < flags.length ? flags[i + 1] : undefined;
}
function hasFlag(name: string): boolean {
  return flags.includes(`--${name}`);
}

function findListing(slug: string): Listing | undefined {
  return (
    experiences.find((e) => e.slug === slug) ??
    bundles.find((b) => b.slug === slug)
  );
}

function isStatus(s: string | undefined): s is ListingStatus {
  return s === "draft" || s === "published" || s === "archived";
}

function usage(): never {
  console.error(
    [
      "Usage:",
      "  npm run listing -- list [--status draft|published|archived]",
      "  npm run listing -- get     --slug <slug>",
      "  npm run listing -- archive --slug <slug>",
      "  npm run listing -- publish --slug <slug>",
      "  npm run listing -- draft   --slug <slug>",
      "  npm run listing -- delete  --slug <slug> --confirm",
      "  npm run listing -- delete-image --slug <slug>",
      "  npm run listing -- purge [--older-than-days 90] [--dry-run]",
      "  npm run listing -- upsert  --slug <slug>          # from content/*.ts",
      "  npm run listing -- upsert  --file <path-to-json>  # from ListingWriteInput JSON",
    ].join("\n"),
  );
  process.exit(1);
}

async function main() {
  if (!command) usage();

  const sb = createListingsClient();
  const projectHost = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL!).hostname;

  switch (command) {
    case "list": {
      const statusFlag = getFlag("status");
      if (statusFlag !== undefined && !isStatus(statusFlag)) {
        console.error(`Invalid --status: ${statusFlag}`);
        process.exit(1);
      }
      const rows = await listListings(sb, { status: statusFlag });
      console.log(`[listing] ${rows.length} row(s) on ${projectHost}\n`);
      for (const r of rows) {
        console.log(
          `  ${r.status.padEnd(10)} ${r.kind.padEnd(11)} ${r.slug.padEnd(24)} ${r.updated_at}`,
        );
      }
      break;
    }

    case "archive":
    case "publish":
    case "draft": {
      const slug = getFlag("slug");
      if (!slug) {
        console.error(`${command}: --slug is required`);
        process.exit(1);
      }
      const op =
        command === "archive"
          ? archiveListing
          : command === "publish"
            ? publishListing
            : draftListing;
      await op(sb, slug);
      const meta = await getListingMeta(sb, slug);
      console.log(
        `[listing] ${command} ok — ${slug} is now status='${meta?.status}'`,
      );
      break;
    }

    case "delete": {
      const slug = getFlag("slug");
      if (!slug) {
        console.error("delete: --slug is required");
        process.exit(1);
      }
      if (!hasFlag("confirm")) {
        console.error(
          `delete is destructive — add --confirm. This will hard-delete the listing row\n` +
            `(translations cascade) but NOT remove the storage image. Use delete-image\n` +
            `separately if you want the WebP gone too.`,
        );
        process.exit(1);
      }
      await deleteListing(sb, slug);
      console.log(`[listing] deleted row for ${slug}`);
      break;
    }

    case "delete-image": {
      const slug = getFlag("slug");
      if (!slug) {
        console.error("delete-image: --slug is required");
        process.exit(1);
      }
      await deleteListingImage(sb, slug);
      console.log(`[listing] removed ${slug}.webp from bucket`);
      break;
    }

    case "purge": {
      const daysStr = getFlag("older-than-days") ?? "90";
      const days = Number(daysStr);
      if (!Number.isFinite(days) || days < 0) {
        console.error(`Invalid --older-than-days: ${daysStr}`);
        process.exit(1);
      }
      const dryRun = hasFlag("dry-run");
      const { slugs } = await purgeArchivedListings(sb, days, { dryRun });
      const verb = dryRun ? "would purge" : "purged";
      console.log(
        `[listing] ${verb} ${slugs.length} archived listing(s) older than ${days}d on ${projectHost}`,
      );
      for (const s of slugs) console.log(`  - ${s}`);
      break;
    }

    case "get": {
      const slug = getFlag("slug");
      if (!slug) {
        console.error("get: --slug is required");
        process.exit(1);
      }
      const full = await getListingFull(sb, slug);
      if (!full) {
        console.error(`get: no listing with slug "${slug}"`);
        process.exit(2);
      }
      // Print to stdout as JSON — pipeable to a file or jq.
      process.stdout.write(JSON.stringify(full, null, 2) + "\n");
      break;
    }

    case "upsert": {
      const file = getFlag("file");
      const slug = getFlag("slug");

      if (file) {
        const raw = readFileSync(file, "utf8");
        let parsed: unknown;
        try {
          parsed = JSON.parse(raw);
        } catch (e) {
          console.error(
            `upsert: ${file} is not valid JSON: ${(e as Error).message}`,
          );
          process.exit(1);
        }
        const id = await upsertListingWithTranslations(
          sb,
          parsed as Parameters<typeof upsertListingWithTranslations>[1],
        );
        const after = await getListingMeta(sb, (parsed as { slug: string }).slug);
        console.log(
          `[listing] upserted from ${file} (id=${id}, status='${after?.status}')`,
        );
        break;
      }

      if (!slug) {
        console.error("upsert: --slug <slug> or --file <path> is required");
        process.exit(1);
      }
      const listing = findListing(slug);
      if (!listing) {
        console.error(
          `upsert: slug "${slug}" not found in content/experiences.ts or content/bundles.ts`,
        );
        process.exit(1);
      }
      const id = await upsertListing(sb, listing);
      console.log(`[listing] upserted ${slug} (id=${id}, status='${listing.status ?? "published"}')`);
      break;
    }

    default:
      console.error(`Unknown command: ${command}`);
      usage();
  }
}

main().catch((e) => {
  console.error(`[listing] ${(e as Error).message}`);
  process.exit(1);
});
