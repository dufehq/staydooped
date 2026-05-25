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

export function getListing(slug: string, locale = "en"): Listing | undefined {
  return getBundle(slug, locale) ?? getExperience(slug, locale);
}

/** Slugs for which Next.js should pre-render a static page. Drafts are
 *  excluded so they don't ship in the static export, but `getListing`
 *  still resolves them for direct preview in dev. */
export function getAllListingSlugs(): string[] {
  const published = (l: { status?: "draft" | "published" }) =>
    l.status !== "draft";
  return [
    ...bundles.filter(published).map((b) => b.slug),
    ...experiences.filter(published).map((e) => e.slug),
  ];
}
