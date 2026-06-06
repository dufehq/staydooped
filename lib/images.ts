/** Public URL for a listing image stored in Supabase Storage.
 *
 *  Bucket: `listings` (public-read, image/webp only).
 *  Filename convention: `<slug>.webp` — keyed by `listings.slug`, set by
 *  the `experience-pipeline` skill on upload.
 *
 *  Safe to call from both server and client components — reads only the
 *  public env var `NEXT_PUBLIC_SUPABASE_URL`. */
export function getListingImageUrl(slug: string): string {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) {
    throw new Error(
      "getListingImageUrl: NEXT_PUBLIC_SUPABASE_URL is not set",
    );
  }
  return `${base}/storage/v1/object/public/listings/${slug}.webp`;
}
