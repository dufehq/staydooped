-- ============================================================================
-- StayLooped — listings image bucket
-- Public-read bucket for listing card/hero images (1920×1072 WebP).
-- See PLAN.md "Next Up 1a" for context.
--
-- Reads: bucket is `public = true`, so anonymous fetches via
--   https://<project>.supabase.co/storage/v1/object/public/listings/<slug>.webp
-- work without auth or RLS policies on storage.objects.
--
-- Writes: go through service_role (backfill script + future experience-pipeline
-- skill writer), which bypasses RLS. No INSERT/UPDATE/DELETE policy needed
-- for anon/authenticated.
-- ============================================================================

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'listings',
  'listings',
  true,
  5242880,                    -- 5 MB cap; target file is 150–500 KB
  array['image/webp']         -- final format only; PNG is intermediate and never uploaded
)
on conflict (id) do update set
  public             = excluded.public,
  file_size_limit    = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;
