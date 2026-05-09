import { bundles, getBundle } from "./bundles";
import { experiences, getExperience } from "./experiences";
import type { Listing } from "./types";

export * from "./types";
export { bundles, getBundle } from "./bundles";
export {
  experiences,
  getExperience,
  getFeaturedExperience,
  getNonFeaturedExperiences,
} from "./experiences";
export { contributors, getContributor } from "./contributors";

export function getListing(slug: string): Listing | undefined {
  return getBundle(slug) ?? getExperience(slug);
}

export function getAllListingSlugs(): string[] {
  return [...bundles.map((b) => b.slug), ...experiences.map((e) => e.slug)];
}
