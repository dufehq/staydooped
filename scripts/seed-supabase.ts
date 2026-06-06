/**
 * One-shot seed: pushes content/*.ts + content/i18n/*.ts into the linked
 * Supabase project. Idempotent — safe to re-run after content edits.
 *
 * Usage:
 *   npm run seed:supabase            # dev (uses .env.local)
 *   npm run seed:supabase:prod       # prod (uses .env.prod.local)
 *
 * The actual upsert logic lives in lib/listings-write.ts so the seed, the
 * listing CLI, the cron API route, and the experience-pipeline skill all
 * write the same way.
 */
import { experiences } from "../content/experiences";
import { bundles } from "../content/bundles";
import type { Listing } from "../content/types";
import {
  createListingsClient,
  upsertListing,
} from "../lib/listings-write";

async function seed() {
  const sb = createListingsClient();
  const all: Listing[] = [...experiences, ...bundles];
  console.log(
    `[seed] ${all.length} listings × 3 locales → ${new URL(process.env.NEXT_PUBLIC_SUPABASE_URL!).hostname}`,
  );

  let okCount = 0;
  for (const l of all) {
    try {
      await upsertListing(sb, l);
    } catch (e) {
      console.error(`[FAIL] ${l.slug}: ${(e as Error).message}`);
      process.exit(1);
    }
    okCount++;
    const draftTag = l.status === "draft" ? " [draft]" : "";
    console.log(`[ OK ] ${l.slug} (${l.kind})${draftTag}`);
  }

  console.log(`\n[seed] done — ${okCount}/${all.length} listings synced`);
}

seed().catch((e) => {
  console.error("[seed] crashed:", e);
  process.exit(1);
});
