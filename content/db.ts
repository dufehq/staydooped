import "server-only";
import { getSupabaseAnon, getSupabaseService } from "@/lib/supabase";
import type {
  BookingMethod,
  Bundle,
  Experience,
  Listing,
} from "./types";

type ListingRow = {
  slug: string;
  kind: "experience" | "bundle";
  category: Experience["category"];
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
  status: "draft" | "published";
};

type TranslationRow = {
  locale: "en" | "th" | "zh";
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
};

function rebuildBooking(row: ListingRow): BookingMethod {
  if (row.booking_type === "whatsapp") {
    if (!row.booking_message_template) {
      throw new Error(`Listing ${row.slug}: whatsapp booking missing messageTemplate`);
    }
    return { type: "whatsapp", messageTemplate: row.booking_message_template };
  }
  if (!row.booking_product_id) {
    throw new Error(`Listing ${row.slug}: ${row.booking_type} booking missing productId`);
  }
  return { type: row.booking_type, productId: row.booking_product_id };
}

function rowToListing(row: ListingRow, tr: TranslationRow): Listing {
  const common = {
    slug: row.slug,
    emoji: row.emoji,
    category: row.category,
    title: tr.title,
    hook: tr.hook,
    description: tr.description,
    inclusions: tr.inclusions,
    priceLabel: tr.price_label,
    duration: tr.duration,
    distance: tr.distance,
    rating: tr.rating ?? undefined,
    contributorSlug: row.contributor_slug ?? undefined,
    contributorQuote: tr.contributor_quote ?? undefined,
    price: row.price,
    priceMax: row.price_max ?? undefined,
    booking: rebuildBooking(row),
    background: row.background,
    status: row.status,
  } as const;

  if (row.kind === "experience") {
    const experience: Experience = {
      ...common,
      kind: "experience",
      isFeatured: row.is_featured,
      loops: row.loops ?? undefined,
    };
    return experience;
  }

  if (!tr.badge) {
    throw new Error(`Bundle ${row.slug}: missing badge translation for ${tr.locale}`);
  }
  const bundle: Bundle = {
    ...common,
    kind: "bundle",
    emojis: row.emojis ?? [],
    badge: tr.badge,
    saveBadge: tr.save_badge ?? undefined,
    priceOriginal: row.price_original ?? undefined,
  };
  return bundle;
}

function pickTranslation(rows: TranslationRow[], locale: string): TranslationRow {
  const tr =
    rows.find((t) => t.locale === locale) ??
    rows.find((t) => t.locale === "en");
  if (!tr) {
    throw new Error("No EN translation row available (data invariant violated)");
  }
  return tr;
}

/** DB-backed `getListing`. Uses the service-role client so drafts resolve
 *  for preview at `/e/<draft-slug>` — matches the TS-file path's behavior.
 *  RLS hides drafts from the anon-key path, which is what the homepage
 *  and the other published-only getters below use. */
export async function getListingFromDB(
  slug: string,
  locale: string,
): Promise<Listing | undefined> {
  const sb = getSupabaseService();
  const { data, error } = await sb
    .from("listings")
    .select("*, listing_translations(*)")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  if (!data) return undefined;

  const tr = pickTranslation(
    data.listing_translations as unknown as TranslationRow[],
    locale,
  );

  return rowToListing(data as unknown as ListingRow, tr);
}

// Stable insertion order across reruns: `created_at` is set at first INSERT
// and upserts don't touch it, so ordering by it preserves the order the seed
// pushed rows in (which mirrors the TS-file source order). `slug` is a
// deterministic tiebreaker if two rows share a timestamp.

export async function getFeaturedExperienceFromDB(
  locale: string,
): Promise<Experience> {
  const sb = getSupabaseAnon();
  const { data, error } = await sb
    .from("listings")
    .select("*, listing_translations(*)")
    .eq("kind", "experience")
    .eq("is_featured", true)
    .eq("status", "published")
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error("No featured experience set");

  const tr = pickTranslation(
    data.listing_translations as unknown as TranslationRow[],
    locale,
  );
  const listing = rowToListing(data as unknown as ListingRow, tr);
  if (listing.kind !== "experience") {
    throw new Error(`Featured listing ${listing.slug} is not an experience`);
  }
  return listing;
}

export async function getNonFeaturedExperiencesFromDB(
  locale: string,
): Promise<Experience[]> {
  const sb = getSupabaseAnon();
  const { data, error } = await sb
    .from("listings")
    .select("*, listing_translations(*)")
    .eq("kind", "experience")
    .eq("is_featured", false)
    .eq("status", "published")
    .order("created_at", { ascending: true })
    .order("slug", { ascending: true });

  if (error) throw error;
  if (!data) return [];

  return data.map((row) => {
    const tr = pickTranslation(
      row.listing_translations as unknown as TranslationRow[],
      locale,
    );
    const listing = rowToListing(row as unknown as ListingRow, tr);
    if (listing.kind !== "experience") {
      throw new Error(`Non-featured query returned non-experience ${listing.slug}`);
    }
    return listing;
  });
}

export async function getAllBundlesFromDB(locale: string): Promise<Bundle[]> {
  const sb = getSupabaseAnon();
  const { data, error } = await sb
    .from("listings")
    .select("*, listing_translations(*)")
    .eq("kind", "bundle")
    .eq("status", "published")
    .order("created_at", { ascending: true })
    .order("slug", { ascending: true });

  if (error) throw error;
  if (!data) return [];

  return data.map((row) => {
    const tr = pickTranslation(
      row.listing_translations as unknown as TranslationRow[],
      locale,
    );
    const listing = rowToListing(row as unknown as ListingRow, tr);
    if (listing.kind !== "bundle") {
      throw new Error(`Bundle query returned non-bundle ${listing.slug}`);
    }
    return listing;
  });
}

export async function getAllListingSlugsFromDB(): Promise<string[]> {
  const sb = getSupabaseAnon();
  const { data, error } = await sb
    .from("listings")
    .select("slug")
    .eq("status", "published")
    .order("created_at", { ascending: true })
    .order("slug", { ascending: true });

  if (error) throw error;
  if (!data) return [];

  return data.map((row) => row.slug);
}
