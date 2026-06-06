/**
 * Shared write-side helpers for the `listings` + `listing_translations`
 * tables and the `listings` storage bucket. Service-role only — bypasses
 * RLS. Used by:
 *   - scripts/seed-supabase.ts (full reseed from content/*.ts)
 *   - scripts/listing.ts CLI (archive / publish / delete / purge / upsert)
 *   - the experience-pipeline skill (after the writer flip; PR 1.2)
 *
 * Env (loaded via --env-file by the calling npm script):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { translateListing } from "../../content/i18n";
import type { Listing } from "../../content/types";
import type { Database } from "../../types/supabase";

type SB = SupabaseClient<Database>;

export type ListingStatus = "draft" | "published" | "archived";

const LOCALES = ["en", "th", "zh"] as const;
type Locale = (typeof LOCALES)[number];

export function createListingsClient(): SB {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "createListingsClient: missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. " +
        "Use an npm script with --env-file=.env.local (or .env.prod.local).",
    );
  }
  return createClient<Database>(url, key, { auth: { persistSession: false } });
}

/** TS Listing → DB row. Pure; doesn't touch the DB. */
export function toListingRow(l: Listing) {
  const booking_type = l.booking.type;
  const booking_product_id =
    l.booking.type === "whatsapp" ? null : l.booking.productId;
  const booking_message_template =
    l.booking.type === "whatsapp" ? l.booking.messageTemplate : null;

  return {
    slug: l.slug,
    kind: l.kind,
    category: l.category,
    emoji: l.emoji,
    emojis: l.kind === "bundle" ? l.emojis : null,
    price: l.price,
    price_max: l.priceMax ?? null,
    price_original: l.kind === "bundle" ? (l.priceOriginal ?? null) : null,
    background: l.background,
    booking_type,
    booking_product_id,
    booking_message_template,
    is_featured: l.kind === "experience" ? (l.isFeatured ?? false) : false,
    loops: l.kind === "experience" ? (l.loops ?? null) : null,
    contributor_slug: l.contributorSlug ?? null,
    status: l.status ?? "published",
  };
}

/** TS Listing × locales → 3 DB translation rows. Pulls overlays from
 *  `content/i18n/{zh,th}.ts` via translateListing(); EN uses the listing
 *  itself. Pure; doesn't touch the DB. */
export function toTranslationRows(l: Listing, listingId: string) {
  return LOCALES.map((locale: Locale) => {
    const t = translateListing(l, locale);
    const base = {
      listing_id: listingId,
      locale,
      title: t.title,
      hook: t.hook,
      description: t.description,
      price_label: t.priceLabel,
      inclusions: t.inclusions,
      duration: t.duration,
      distance: t.distance,
      rating: t.rating ?? null,
      contributor_quote: t.contributorQuote ?? null,
    };
    if (t.kind === "bundle") {
      return { ...base, badge: t.badge, save_badge: t.saveBadge ?? null };
    }
    return { ...base, badge: null, save_badge: null };
  });
}

/** Upsert one listing + all 3 translation rows. Idempotent on slug. */
export async function upsertListing(sb: SB, l: Listing): Promise<string> {
  const { data: row, error: listingErr } = await sb
    .from("listings")
    .upsert(toListingRow(l), { onConflict: "slug" })
    .select("id")
    .single();
  if (listingErr || !row) {
    throw new Error(
      `upsertListing(${l.slug}): ${listingErr?.message ?? "no row returned"}`,
    );
  }
  const { error: trErr } = await sb
    .from("listing_translations")
    .upsert(toTranslationRows(l, row.id), {
      onConflict: "listing_id,locale",
    });
  if (trErr) {
    throw new Error(`upsertListing(${l.slug}) translations: ${trErr.message}`);
  }
  return row.id;
}

export async function setListingStatus(
  sb: SB,
  slug: string,
  status: ListingStatus,
): Promise<void> {
  const { error, count } = await sb
    .from("listings")
    .update({ status }, { count: "exact" })
    .eq("slug", slug);
  if (error) {
    throw new Error(`setListingStatus(${slug}, ${status}): ${error.message}`);
  }
  if (count === 0) {
    throw new Error(`setListingStatus(${slug}, ${status}): no row matched slug`);
  }
}

export const archiveListing = (sb: SB, slug: string) =>
  setListingStatus(sb, slug, "archived");
export const publishListing = (sb: SB, slug: string) =>
  setListingStatus(sb, slug, "published");
export const draftListing = (sb: SB, slug: string) =>
  setListingStatus(sb, slug, "draft");

/** Hard delete. Translations cascade via FK (on delete cascade). Storage
 *  object is left in place — call deleteListingImage separately if you also
 *  want the WebP gone. */
export async function deleteListing(sb: SB, slug: string): Promise<void> {
  const { error, count } = await sb
    .from("listings")
    .delete({ count: "exact" })
    .eq("slug", slug);
  if (error) throw new Error(`deleteListing(${slug}): ${error.message}`);
  if (count === 0) throw new Error(`deleteListing(${slug}): no row matched slug`);
}

/** Remove `<slug>.webp` from the listings storage bucket. Non-existent
 *  objects are not an error in Supabase Storage. */
export async function deleteListingImage(sb: SB, slug: string): Promise<void> {
  const { error } = await sb.storage.from("listings").remove([`${slug}.webp`]);
  if (error) throw new Error(`deleteListingImage(${slug}): ${error.message}`);
}

/** Hard-delete archived rows whose `updated_at` is older than `olderThanDays`,
 *  plus their storage objects. Returns the slugs that were (or would be)
 *  purged. `updated_at` is the right column here: any edit (including the
 *  archive itself) refreshes it, so this is "no activity for N days". */
export async function purgeArchivedListings(
  sb: SB,
  olderThanDays: number,
  opts: { dryRun?: boolean } = {},
): Promise<{ slugs: string[] }> {
  const cutoffIso = new Date(
    Date.now() - olderThanDays * 86_400_000,
  ).toISOString();

  const { data, error } = await sb
    .from("listings")
    .select("slug")
    .eq("status", "archived")
    .lt("updated_at", cutoffIso);
  if (error) throw new Error(`purgeArchivedListings select: ${error.message}`);

  const slugs = (data ?? []).map((r) => r.slug);
  if (opts.dryRun || slugs.length === 0) return { slugs };

  // Storage first; the row delete cascades to translations.
  for (const slug of slugs) {
    try {
      await deleteListingImage(sb, slug);
    } catch (e) {
      // Don't block the row purge on a flaky storage call; log and continue.
      console.warn(`[purge] image delete failed for ${slug}: ${(e as Error).message}`);
    }
  }
  const { error: delErr } = await sb
    .from("listings")
    .delete()
    .in("slug", slugs);
  if (delErr) throw new Error(`purgeArchivedListings delete: ${delErr.message}`);
  return { slugs };
}

/** List listings for CLI inspection. Newest-edited first. */
export async function listListings(
  sb: SB,
  opts: { status?: ListingStatus } = {},
): Promise<
  Array<{
    slug: string;
    kind: "experience" | "bundle";
    status: ListingStatus;
    updated_at: string;
  }>
> {
  let q = sb
    .from("listings")
    .select("slug, kind, status, updated_at")
    .order("updated_at", { ascending: false });
  if (opts.status) q = q.eq("status", opts.status);
  const { data, error } = await q;
  if (error) throw new Error(`listListings: ${error.message}`);
  return (data ?? []) as Array<{
    slug: string;
    kind: "experience" | "bundle";
    status: ListingStatus;
    updated_at: string;
  }>;
}

/** Read back a single listing's metadata (no translations). For CLI feedback. */
export async function getListingMeta(
  sb: SB,
  slug: string,
): Promise<
  | { slug: string; kind: "experience" | "bundle"; status: ListingStatus; updated_at: string }
  | null
> {
  const { data, error } = await sb
    .from("listings")
    .select("slug, kind, status, updated_at")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw new Error(`getListingMeta(${slug}): ${error.message}`);
  return (data ?? null) as
    | { slug: string; kind: "experience" | "bundle"; status: ListingStatus; updated_at: string }
    | null;
}
