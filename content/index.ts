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

export function getAllListingSlugs(): string[] {
  return [...bundles.map((b) => b.slug), ...experiences.map((e) => e.slug)];
}
