-- ============================================================================
-- StayLooped — add `archived` to the listing_status enum
--
-- Enables soft-archive of stale/expired listings (e.g. when a Klook
-- productId is delisted). The `experience-sync` skill mode flips
-- stale rows to `archived` instead of hard-deleting them; a periodic
-- purge hard-deletes archived rows older than 90 days.
--
-- Reads paths are unaffected — existing queries filter on
-- `status = 'published'` so archived rows stop rendering automatically
-- but stay restorable. Service-role admin queries can still see them.
--
-- See PLAN.md "Next Up 1" (experience-sync mode).
-- ============================================================================

alter type listing_status add value if not exists 'archived';
