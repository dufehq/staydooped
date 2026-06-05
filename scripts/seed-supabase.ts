/**
 * One-shot seed: pushes content/*.ts + content/i18n/*.ts into the linked
 * Supabase project. Idempotent — safe to re-run after content edits.
 *
 * Usage:
 *   npm run seed:supabase
 *
 * Reads NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY from .env.local
 * (loaded via Node's --env-file flag in the npm script). The service_role key
 * bypasses RLS so we can write to listings + listing_translations.
 */
import { createClient } from "@supabase/supabase-js";
import { experiences } from "../content/experiences";
import { bundles } from "../content/bundles";
import { translateListing } from "../content/i18n";
import type { Listing } from "../content/types";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. " +
      "Ensure .env.local is populated and `npm run seed:supabase` is used " +
      "(it passes --env-file=.env.local).",
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, {
  auth: { persistSession: false },
});

const LOCALES = ["en", "th", "zh"] as const;
type Locale = (typeof LOCALES)[number];

function toListingRow(l: Listing) {
  const booking_type: "klook" | "viator" | "gyg" | "whatsapp" = l.booking.type;
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

function toTranslationRows(l: Listing, listingId: string) {
  return LOCALES.map((locale) => {
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
      return {
        ...base,
        badge: t.badge,
        save_badge: t.saveBadge ?? null,
      };
    }
    return { ...base, badge: null, save_badge: null };
  });
}

async function seed() {
  const allListings: Listing[] = [...experiences, ...bundles];
  console.log(
    `[seed] ${allListings.length} listings × ${LOCALES.length} locales`,
  );

  let okCount = 0;

  for (const l of allListings) {
    const { data: listingRow, error: listingErr } = await supabase
      .from("listings")
      .upsert(toListingRow(l), { onConflict: "slug" })
      .select("id")
      .single();

    if (listingErr || !listingRow) {
      console.error(`[FAIL] ${l.slug} (listing):`, listingErr?.message);
      process.exit(1);
    }

    const { error: translationsErr } = await supabase
      .from("listing_translations")
      .upsert(toTranslationRows(l, listingRow.id), {
        onConflict: "listing_id,locale",
      });

    if (translationsErr) {
      console.error(
        `[FAIL] ${l.slug} (translations):`,
        translationsErr.message,
      );
      process.exit(1);
    }

    okCount++;
    const draftTag = l.status === "draft" ? " [draft]" : "";
    console.log(`[ OK ] ${l.slug} (${l.kind})${draftTag}`);
  }

  console.log(
    `\n[seed] done — ${okCount}/${allListings.length} listings synced`,
  );
}

seed().catch((e) => {
  console.error("[seed] crashed:", e);
  process.exit(1);
});
