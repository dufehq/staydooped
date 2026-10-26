/** Public URL for a listing image, served statically from
 *  `public/images/listings/<slug>.webp`.
 *
 *  Images were briefly hosted in Supabase Storage (`listings` bucket);
 *  reverted to static files while the Supabase project is paused. The
 *  helper is kept so the source can be switched back in one place.
 *
 *  Safe to call from both server and client components. */
export function getListingImageUrl(slug: string): string {
  return `/images/listings/${slug}.webp`;
}
