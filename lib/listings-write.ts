/**
 * Shared write-side helpers for the `listings` + `listing_translations`
 * tables and the `listings` storage bucket. Service-role only — bypasses
 * RLS. Used by:
 *   - scripts/seed-supabase.ts (full reseed from content/*.ts)
 *   - scripts/listing.ts CLI (archive / publish / delete / purge / upsert)
 *   - app/api/cron/purge-archived/route.ts (weekly purge cron)
 *   - the experience-pipeline skill (via the CLI)
 *
 * Lives in lib/ (not scripts/) because the cron API route imports it; Next.js
 * doesn't bundle scripts/ files cleanly into the app.
 *
 * Env:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { translateListing } from "../content/i18n";
import type { Listing } from "../content/types";
import type { Database } from "../types/supabase";

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

export type BookingSummary = {
  slug: string;
  status: ListingStatus;
  bookingType: "klook" | "viator" | "gyg" | "whatsapp";
  productId: string | null; // null for whatsapp listings
};

/** Returns one row per listing with the booking metadata flattened. Used by
 *  `experience-sync` to dedup candidates against rows already in the table
 *  (including drafts + archived). */
export async function listAllBookings(sb: SB): Promise<BookingSummary[]> {
  const { data, error } = await sb
    .from("listings")
    .select("slug, status, booking_type, booking_product_id")
    .order("status", { ascending: true })
    .order("slug", { ascending: true });
  if (error) throw new Error(`listAllBookings: ${error.message}`);
  return (data ?? []).map((r) => ({
    slug: r.slug,
    status: r.status as ListingStatus,
    bookingType: r.booking_type as BookingSummary["bookingType"],
    productId: r.booking_product_id,
  }));
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

// ─────────────────────────────────────────────────────────────────────────────
// JSON-driven write path (used by the experience-pipeline skill from PR 1.2 on)
//
// `ListingWriteInput` decouples language-neutral metadata from the per-locale
// translations so the skill can write a single JSON payload that lands directly
// in Supabase, without going through `content/i18n/{zh,th}.ts` overlays.
// ─────────────────────────────────────────────────────────────────────────────

export type Category =
  | "food"
  | "culture"
  | "nature"
  | "wellness"
  | "adventure"
  | "nimman";

export type BookingMethodInput =
  | { type: "klook" | "viator" | "gyg"; productId: string }
  | { type: "whatsapp"; messageTemplate: string };

export type TranslationInput = {
  title: string;
  hook: string;
  description: string;
  inclusions: string[];
  priceLabel: string;
  duration: string;
  distance: string;
  rating?: string | null;
  contributorQuote?: string | null;
  // Bundle-only
  badge?: string | null;
  saveBadge?: string | null;
};

export type ListingWriteInput = {
  slug: string;
  kind: "experience" | "bundle";
  category: Category;
  emoji: string;
  emojis?: string[];           // bundle only
  price: number;
  priceMax?: number;
  priceOriginal?: number;      // bundle only
  background: string;
  booking: BookingMethodInput;
  isFeatured?: boolean;        // experience only
  loops?: number;              // experience only
  contributorSlug?: string;
  status?: ListingStatus;
  /** EN must be present (it's the locale fallback). ZH and TH are optional;
   *  if a locale is missing, the EN translation row is reused for that locale. */
  translations: { en: TranslationInput } & Partial<
    Record<"th" | "zh", TranslationInput>
  >;
};

const VALID_CATEGORIES: ReadonlySet<string> = new Set([
  "food",
  "culture",
  "nature",
  "wellness",
  "adventure",
  "nimman",
]);

/** Light runtime validation — surfaces helpful errors before the round-trip.
 *  DB CHECK constraints catch the structural invariants (booking payload
 *  matches type, bundle/experience field segregation, price-range sanity),
 *  so this only validates what's needed to construct a row at all. */
export function validateListingInput(
  input: unknown,
): asserts input is ListingWriteInput {
  if (typeof input !== "object" || input === null) {
    throw new Error("Listing input must be an object");
  }
  const o = input as Record<string, unknown>;

  if (typeof o.slug !== "string" || !o.slug.length) {
    throw new Error("slug is required (kebab-case string)");
  }
  if (o.kind !== "experience" && o.kind !== "bundle") {
    throw new Error(`kind must be 'experience' or 'bundle' (got ${o.kind})`);
  }
  if (typeof o.category !== "string" || !VALID_CATEGORIES.has(o.category)) {
    throw new Error(
      `category must be one of food/culture/nature/wellness/adventure/nimman (got ${o.category})`,
    );
  }
  if (typeof o.emoji !== "string" || !o.emoji.length) {
    throw new Error("emoji is required");
  }
  if (typeof o.price !== "number" || o.price < 0) {
    throw new Error("price must be a non-negative number");
  }
  if (typeof o.background !== "string" || !o.background.length) {
    throw new Error("background is required");
  }
  if (typeof o.booking !== "object" || o.booking === null) {
    throw new Error("booking is required");
  }
  const b = o.booking as Record<string, unknown>;
  if (b.type === "whatsapp") {
    if (typeof b.messageTemplate !== "string" || !b.messageTemplate.length) {
      throw new Error("booking.messageTemplate is required for whatsapp");
    }
  } else if (b.type === "klook" || b.type === "viator" || b.type === "gyg") {
    if (typeof b.productId !== "string" || !b.productId.length) {
      throw new Error(`booking.productId is required for ${b.type}`);
    }
  } else {
    throw new Error(
      `booking.type must be klook/viator/gyg/whatsapp (got ${b.type})`,
    );
  }
  if (
    o.kind === "bundle" &&
    (!Array.isArray(o.emojis) || (o.emojis as unknown[]).length === 0)
  ) {
    throw new Error("bundle requires a non-empty emojis array");
  }
  if (typeof o.translations !== "object" || o.translations === null) {
    throw new Error("translations is required");
  }
  const t = o.translations as Record<string, unknown>;
  if (typeof t.en !== "object" || t.en === null) {
    throw new Error("translations.en is required (locale fallback)");
  }
  for (const [loc, tr] of Object.entries(t)) {
    if (loc !== "en" && loc !== "th" && loc !== "zh") {
      throw new Error(`translations.${loc}: unknown locale`);
    }
    const tro = tr as Record<string, unknown>;
    for (const field of [
      "title",
      "hook",
      "description",
      "priceLabel",
      "duration",
      "distance",
    ]) {
      if (typeof tro[field] !== "string" || !(tro[field] as string).length) {
        throw new Error(`translations.${loc}.${field}: required non-empty string`);
      }
    }
    if (!Array.isArray(tro.inclusions)) {
      throw new Error(`translations.${loc}.inclusions: required array`);
    }
    if (o.kind === "bundle" && (typeof tro.badge !== "string" || !(tro.badge as string).length)) {
      throw new Error(`translations.${loc}.badge: required for bundles`);
    }
  }
}

function toListingRowFromInput(input: ListingWriteInput) {
  const booking_product_id =
    input.booking.type === "whatsapp" ? null : input.booking.productId;
  const booking_message_template =
    input.booking.type === "whatsapp" ? input.booking.messageTemplate : null;
  return {
    slug: input.slug,
    kind: input.kind,
    category: input.category,
    emoji: input.emoji,
    emojis: input.kind === "bundle" ? (input.emojis ?? null) : null,
    price: input.price,
    price_max: input.priceMax ?? null,
    price_original:
      input.kind === "bundle" ? (input.priceOriginal ?? null) : null,
    background: input.background,
    booking_type: input.booking.type,
    booking_product_id,
    booking_message_template,
    is_featured:
      input.kind === "experience" ? (input.isFeatured ?? false) : false,
    loops: input.kind === "experience" ? (input.loops ?? null) : null,
    contributor_slug: input.contributorSlug ?? null,
    status: input.status ?? "draft",
  };
}

function translationToRow(
  tr: TranslationInput,
  listingId: string,
  locale: Locale,
  kind: "experience" | "bundle",
) {
  const base = {
    listing_id: listingId,
    locale,
    title: tr.title,
    hook: tr.hook,
    description: tr.description,
    price_label: tr.priceLabel,
    inclusions: tr.inclusions,
    duration: tr.duration,
    distance: tr.distance,
    rating: tr.rating ?? null,
    contributor_quote: tr.contributorQuote ?? null,
  };
  if (kind === "bundle") {
    return { ...base, badge: tr.badge ?? null, save_badge: tr.saveBadge ?? null };
  }
  return { ...base, badge: null, save_badge: null };
}

/** JSON-driven upsert. Each locale row uses input.translations[locale] when
 *  present, falling back to translations.en for missing locales. EN is required. */
export async function upsertListingWithTranslations(
  sb: SB,
  input: ListingWriteInput,
): Promise<string> {
  validateListingInput(input);

  const { data: row, error: listingErr } = await sb
    .from("listings")
    .upsert(toListingRowFromInput(input), { onConflict: "slug" })
    .select("id")
    .single();
  if (listingErr || !row) {
    throw new Error(
      `upsertListingWithTranslations(${input.slug}): ${listingErr?.message ?? "no row returned"}`,
    );
  }

  const translationRows = LOCALES.map((locale) => {
    const tr = input.translations[locale] ?? input.translations.en;
    return translationToRow(tr, row.id, locale, input.kind);
  });

  const { error: trErr } = await sb
    .from("listing_translations")
    .upsert(translationRows, { onConflict: "listing_id,locale" });
  if (trErr) {
    throw new Error(
      `upsertListingWithTranslations(${input.slug}) translations: ${trErr.message}`,
    );
  }
  return row.id;
}

/** Read a listing's full state (all fields + all locale translations) shaped
 *  as `ListingWriteInput`. Useful for the skill's `replace` mode: get → edit
 *  → upsert. Returns null when the slug doesn't exist. */
export async function getListingFull(
  sb: SB,
  slug: string,
): Promise<ListingWriteInput | null> {
  const { data, error } = await sb
    .from("listings")
    .select("*, listing_translations(*)")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw new Error(`getListingFull(${slug}): ${error.message}`);
  if (!data) return null;

  const row = data as unknown as {
    slug: string;
    kind: "experience" | "bundle";
    category: Category;
    emoji: string;
    emojis: string[] | null;
    price: number;
    price_max: number | null;
    price_original: number | null;
    background: string;
    booking_type: "klook" | "viator" | "gyg" | "whatsapp";
    booking_product_id: string | null;
    booking_message_template: string | null;
    is_featured: boolean;
    loops: number | null;
    contributor_slug: string | null;
    status: ListingStatus;
    listing_translations: Array<{
      locale: Locale;
      title: string;
      hook: string;
      description: string;
      price_label: string;
      inclusions: string[];
      duration: string;
      distance: string;
      rating: string | null;
      contributor_quote: string | null;
      badge: string | null;
      save_badge: string | null;
    }>;
  };

  const booking: BookingMethodInput =
    row.booking_type === "whatsapp"
      ? { type: "whatsapp", messageTemplate: row.booking_message_template! }
      : { type: row.booking_type, productId: row.booking_product_id! };

  const translations = {} as ListingWriteInput["translations"];
  for (const t of row.listing_translations) {
    const tr: TranslationInput = {
      title: t.title,
      hook: t.hook,
      description: t.description,
      inclusions: t.inclusions,
      priceLabel: t.price_label,
      duration: t.duration,
      distance: t.distance,
      rating: t.rating ?? null,
      contributorQuote: t.contributor_quote ?? null,
    };
    if (row.kind === "bundle") {
      tr.badge = t.badge ?? null;
      tr.saveBadge = t.save_badge ?? null;
    }
    translations[t.locale] = tr;
  }
  if (!translations.en) {
    throw new Error(
      `getListingFull(${slug}): no EN translation row (data invariant violated)`,
    );
  }

  const result: ListingWriteInput = {
    slug: row.slug,
    kind: row.kind,
    category: row.category,
    emoji: row.emoji,
    price: row.price,
    background: row.background,
    booking,
    status: row.status,
    translations: translations as { en: TranslationInput } & Partial<
      Record<"th" | "zh", TranslationInput>
    >,
  };

  if (row.kind === "bundle") {
    result.emojis = row.emojis ?? [];
    if (row.price_original !== null) result.priceOriginal = row.price_original;
  } else {
    result.isFeatured = row.is_featured;
    if (row.loops !== null) result.loops = row.loops;
  }
  if (row.price_max !== null) result.priceMax = row.price_max;
  if (row.contributor_slug) result.contributorSlug = row.contributor_slug;

  return result;
}
