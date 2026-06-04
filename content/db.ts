import "server-only";
import { getSupabaseService } from "@/lib/supabase";
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

/** DB-backed `getListing`. Uses the service-role client so drafts resolve
 *  for preview at `/e/<draft-slug>` — matches the TS-file path's behavior.
 *  RLS still hides drafts from the anon path, which is what the homepage
 *  and search use. */
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

  const translations = data.listing_translations as TranslationRow[];
  const tr =
    translations.find((t) => t.locale === locale) ??
    translations.find((t) => t.locale === "en");

  if (!tr) {
    throw new Error(`Listing ${slug}: no EN translation row (data invariant violated)`);
  }

  return rowToListing(data as unknown as ListingRow, tr);
}
