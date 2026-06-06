import { bundles, getBundle } from "./bundles";
import { experiences, getExperience } from "./experiences";
import type { Listing } from "./types";

export * from "./types";
export { bundles, getBundle, getAllBundles } from "./bundles";
export {
  experiences,
  getExperience,
  getFeaturedExperience,
  getNonFeaturedExperiences,
} from "./experiences";
export { contributors, getContributor } from "./contributors";

export async function getListing(
  slug: string,
  locale = "en",
): Promise<Listing | undefined> {
  if (process.env.USE_SUPABASE === "true") {
    const { getListingFromDB } = await import("./db");
    return getListingFromDB(slug, locale);
  }
  return getBundle(slug, locale) ?? getExperience(slug, locale);
}

/** Slugs for which Next.js should pre-render a static page. Drafts are
 *  excluded so they don't ship in the static export, but `getListing`
 *  still resolves them for direct preview in dev. */
export async function getAllListingSlugs(): Promise<string[]> {
  if (process.env.USE_SUPABASE === "true") {
    const { getAllListingSlugsFromDB } = await import("./db");
    return getAllListingSlugsFromDB();
  }
  const published = (l: { status?: "draft" | "published" | "archived" }) =>
    l.status === undefined || l.status === "published";
  return [
    ...bundles.filter(published).map((b) => b.slug),
    ...experiences.filter(published).map((e) => e.slug),
  ];
}
