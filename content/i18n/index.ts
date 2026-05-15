import { zh } from "./zh";
import type { LocaleTranslations } from "./types";

const TRANSLATIONS: Record<string, LocaleTranslations | undefined> = { zh };

export function translateListing<T extends { slug: string }>(
  listing: T,
  locale: string,
): T {
  if (locale === "en") return listing;
  const tr = TRANSLATIONS[locale]?.[listing.slug];
  if (!tr) return listing;
  return { ...listing, ...tr };
}
