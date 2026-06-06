# StayLooped — MVP Plan

## Context
Two houses in Thapae Soi 4, Chiang Mai. Print QR codes, place them in the houses, guests scan and discover local experiences with affiliate links generating revenue.

**Primary users:** Guests on their phones — mix of EN and ZH speakers (ZH guests are majority; many speak little English, so losing them at the first English screen is a real conversion risk).

**Status as of 2026-06-06:** site is fully trilingual (EN/ZH/TH) on https://staylooped.co. **Phase 2 Supabase data layer is live in production** — all 5 content getters read from Supabase (`USE_SUPABASE=true` set in Vercel Production). Editorial content now flows: edit `content/*.ts` → `npm run seed:supabase:prod` → live on prod (no deploy needed). **Listing images now also live in Supabase Storage** (`listings` bucket, both dev + prod) and `public/images/listings/` has been removed — sync can land images without a deploy.

**Next focus (planned 2026-06-06):** continue automating the experience pipeline via the existing `experience-pipeline` skill (not n8n). Image generation via Gemini is wired in (PR #18); the `experience-sync` mode is being delivered as four small PRs. **PRs 1.1 (foundation), 1.2 (writer flip), and 1.3 (sync mode orchestration) all shipped on 2026-06-07** — see Done sections below. Remaining: PR 1.4 (purge cron). Also still on deck: replace 2 draft listings (`doi-suthep`, `big-day-out`) via the new sync mode, restore real social proof, sitemap/SEO.

---

## Status

### Done ✅ — Foundation
- Next.js 16 app, `en`/`th`/`zh` locales, locale auto-detect + path-preserving switch
- 10 experiences + 4 bundles in `content/{experiences,bundles}.ts` — as of 2026-05-26, 2 drafted out (doi-suthep / big-day-out — Klook says `Currently unavailable`), so **12 listings live** in production (9 experiences + 3 bundles)
- Detail page at `/e/[slug]` with shared route for experiences + bundles
- `/api/go/[id]` affiliate redirect — resolves vendor + productId from content, builds vendor URL with `aid` + `aff_adid=${locale}-${slug}` sub-ID, 302s; WhatsApp listings rejected (Phase 2 archive)
- 14 listing images at 1920×1072 WebP — originally in `public/images/listings/`; as of 2026-06-06 moved to the Supabase Storage `listings` bucket (see "Done — Listings images on Supabase Storage" below)

### Done ✅ — Price-range display + delisting sweep (2026-05-26)
- All cards and detail page now render `priceLabel` directly. Range form (`฿X – ฿Y / person`) for multi-tier listings; `from ฿X / person` for single-tier. `ListingBase.priceMax?: number` added; bundle `saveBadge` / `priceOriginal` made optional and dropped where range applies. EN + ZH overlays both updated.
- Full Playwright tier-walk of all 14 listings: 8 listings updated with new ranges/floors derived from live Klook/GYG tiers (USD captured then converted at ~33.5 THB/USD, floor/ceil to ฿50).
- Two listings flipped to `status: 'draft'` (so they hide from production but stay sourced for replacement):
  - `doi-suthep` (Klook 18012) — `Currently unavailable` on the product page
  - `big-day-out` (Klook 77519) — same; elephant-camp + sticky-waterfall combo bundle
- Action items downstream: run `experience-pipeline replace` against both delistings to swap in new Klook productIds.

### Done ✅ — Catalog hygiene (live-vendor verified 2026-05-25)
- Every productId hit live: Klook ×10, Viator ×0 (dropped), GYG ×1 (coffee-farm)
- Dropped `temple` (Viator productId 163642P94 → 404)
- Renamed `nimman-coffee` → `coffee-farm`, rewrote to match actual GYG product
- Renamed `sunday-market` → `street-eats` (tour is daily, not Sunday)
- Restored "Michelin" wording on `lunch-run` (Klook's own product title uses it)
- Added 3 new experiences (all 4.6+ ⭐, 20K+ booked): **doi-inthanon** (Klook 384), **night-safari** (Klook 1112), **khantoke** (Klook 1180)
- Replaced `big-day-out` image (was generic Lanna pavilion; now elephant + Bua Tong waterfall)

### Done ✅ — Legal & content review
- Stripped all unverifiable third-party claims: founder stories, multi-generational family claims, welfare assertions ("ethical", "rescued"), Michelin claims we couldn't substantiate, "licensed guide" → "English-speaking guide"
- All listings now follow voice rules in [AGENTS.md](AGENTS.md): no exclamation marks, no superlatives, qualified inclusions ("per operator's pickup zone")
- Affiliate disclosure: Manifesto + Footer (covers vendor TOS); removed from hero per business decision
- Hero replaced with brand framing + CTA button → featured listing detail page

### Done ✅ — UI / conversion (marketing P1 wins shipped)
- Prominent centered locale switcher at top of hero (`EN · 中文`, large pill)
- Featured card moved above bundles (highest attention slot)
- Sticky mobile Book bar on detail pages (`StickyBookBar`)
- CategoryTabs removed (visual-only, didn't filter → trust killer); revisit when inventory >20
- OG default image (1200×630 branded) + per-listing OG/Twitter metadata + hreflang alternates
- Mobile-first responsive (430px → 760px → 1280px containers)
- Hero neighborhood pills replaced with affiliate app quick links: 🎫 Klook (AID 121431), 🛒 Lazada, 🚗 Grab — label translated EN/ZH (PR #5)
- Manifesto + meta description copy de-branded: operator names (Klook/Viator/GYG) removed so copy stays flexible as affiliate mix changes (PR #5)
- `/guide` page: host-to-guest article covering Klook, Lazada (Mall/reviews/shipping tips), Grab, Google Translate, LINE — all app names linked, affiliate IDs attached where applicable (PR #6)
- `CarCallout` strip on home page — promotes private car hire via Klook + Grab (PR #6); Klook button links to search "chiang mai private car" with AID (PR #8); moved above Featured card (PR #11)
- Lazada hero pill updated to affiliate shortlink; "why these?" link added next to pills → `/guide` (PR #6)

### Done ✅ — TopNav + full trilingual support (PR #10, 2026-05-27)
- `components/TopNav.tsx` — sticky header with STAYLOOPED logo + locale switcher on all inner pages (`/guide`, `/e/[slug]`); home page intentionally excluded (has its own Hero switcher)
- Detail page hero cleaned up: overlaid back button and locale switcher removed — replaced by TopNav
- `/guide` page fully translated into ZH and TH — was previously hardcoded English (language switch looked broken)
- `messages/th.json` completed: all 9 namespaces now translated (was 83% missing — Sections, Categories, Manifesto, Footer, Detail, BookCTA, Guide all added)
- `content/i18n/th.ts` (new): all 14 listings translated into Thai — cards now show Thai titles, hooks, descriptions, inclusions, price labels
- Thai UI copy rewritten for natural tone: Hero taglines, Manifesto titleLine1/2 and body revised by owner
- LocaleSwitcher now shows **EN · 中文 · ไทย** on every page
- `AGENTS.md` updated with multi-language checklist — enforced rule for every new page going forward
- `SITE-REVIEW.md` added at repo root — full audit of all pages, components, translations, SEO; grouped by priority with action order

### Done ✅ — Bundle "All" button 404 fix (PR #12, 2026-05-27)
- `BundleScroll` was passing `more={{ href: `/${locale}/bundles`, text: t("viewAll") }}` to `SectionHeader` — a route that doesn't exist
- Removed the `more` prop so the "All" / "查看全部" button no longer renders; no broken link

### Done ✅ — Analytics & attribution
- Vercel Analytics + Speed Insights mounted in [layout.tsx](app/[locale]/layout.tsx)
- Non-blocking `void track('affiliate_click', { slug, vendor, productId, locale })` on `/api/go` — fires server-side without blocking the 302
- `KLOOK_AFF_ID=121431` in `.env.local`, verified: `/api/go/elephant` → `klook.com/.../?aid=121431&aff_adid=en-elephant`

### Done ✅ — Editorial / Phase 3 prep (early)
- `status?: 'draft' | 'published'` on `ListingBase` (`content/types.ts`)
- Getters filter drafts: home page hides them, static export excludes them, `/e/<slug>` still resolves for preview
- **`experience-pipeline` skill** at [.claude/skills/experience-pipeline/SKILL.md](.claude/skills/experience-pipeline/SKILL.md) — 5 modes (`add`, `check`, `top`, `replace`, `image`), enforces voice + content + image rules, runs affiliate URL smoke test
- Image workflow codified: Gemini prompt template + sharp PNG→WebP @ 1920×1072

### Done ✅ — Phase 2 Supabase shipped to production (2026-06-05, merged via PR #14)
- **`USE_SUPABASE=true` set in Vercel Production** — all 5 content getters now read from prod Supabase (`smavaoullkcwebksspta`).
- Production verified: https://staylooped.co renders home, locale switcher, featured experience, bundles, and listing links via Supabase. WebFetch confirmed all 5 core elements after the flag flip.
- Vercel env vars set: Production → prod Supabase; Preview → dev Supabase; `USE_SUPABASE=true` Production only (Preview still on TS-file fallback pending Vercel Preview team access).
- Branch `feat/supabase-integration` merged via squash; remote branch deleted. 4 commits squashed into one on main.

**Operational consequence:** content edits in `content/*.ts` no longer reach production through `git push`. Flow is now: edit TS → `npm run seed:supabase:prod` → live. Or edit directly in Supabase Studio. This is fine short-term; the long-term fix is flipping the `experience-pipeline` skill writer to Supabase (top item under Phase 3 below).

### Done ✅ — `experience-sync` mode orchestration (2026-06-07, branch `feat/experience-sync-mode`)

The headline mode is wired up. One run: archives delisted Klook productIds + drafts new candidates up to the 20-published cap. Two input paths: auto (scrape Klook top-rated, filter by rating ≥ 4.5 AND booked ≥ 5K) and manual `--url <klook-url>` (bypasses the popularity gate).

- **Enumeration helper** `listAllBookings(sb)` added to [scripts/lib/listings-write.ts](scripts/lib/listings-write.ts) — returns `[{slug, status, bookingType, productId}, ...]` for every row regardless of status. Lets the skill build a `knownProductIds` set in one round-trip and dedup candidates against existing drafts + archived rows (so the sync doesn't resurrect listings that were just archived).
- **CLI subcommand** `npm run listing -- list-bookings` outputs the same data as JSON. Updated [scripts/listing.ts](scripts/listing.ts) usage banner.
- **Skill mode** at [.claude/skills/experience-pipeline/SKILL.md](.claude/skills/experience-pipeline/SKILL.md) §"Sync mode — full sequence". Documents the six-step algorithm:
  1. Enumerate current state via `list-bookings` (one round trip; cached as `current` + `knownProductIds`).
  2. Stale sweep: for each `published` Klook listing, navigate the product page and archive if title is `404`/`Not Found` or body says "Currently unavailable".
  3. Recompute cap (`slots = max(0, 20 - publishedCount)`).
  4. Source candidates — manual URLs first (no popularity gate, but cap rule still applies — refuses overflow), then auto-fill from Klook top-rated (rating ≥ 4.5 AND booked ≥ 5K, deduped against `knownProductIds`).
  5. Draft each candidate via Add mode's per-listing flow (`upsert --file` + `gen:image` + image vision re-check + smoke test). Continues on per-candidate content failures; halts only on infra errors.
  6. Markdown summary report (archived / drafted / skipped / failures / next steps).
- **`--dry-run` flag** documented: does every Playwright scrape and decision but skips every write (no archive, no upsert, no Gemini call). Lets the user preview a run before paying ~$0.04/image API spend.
- **Failure recovery** is built in: re-running `sync` re-enumerates state, dedups against in-flight drafts, no duplicates.
- **Operator etiquette** captured: `browser_close` + `.playwright-mcp` cleanup at end of run; don't run more than once a day in auto mode.

**Operational consequence:** catalog rotation is now a skill-driven one-shot. Replacing the two long-standing draft listings (`doi-suthep`, `big-day-out`) is now a `/experience-pipeline sync` away — the stale sweep flips them from draft to archived if Klook still says "Currently unavailable", and the auto-source picks two fresh top-rated to fill the cap. The actual run will happen in a future session (not in this PR — no API spend during the implementation).

### Done ✅ — Skill writer flip to Supabase (2026-06-07, branch `feat/skill-supabase-writer`)

- **JSON write path**: added `ListingWriteInput` + `TranslationInput` types and `upsertListingWithTranslations(sb, input)` to [scripts/lib/listings-write.ts](scripts/lib/listings-write.ts). EN translation is required; ZH / TH fall back to EN for missing locales (same semantics as the existing TS overlay path).
- **Light runtime validator** `validateListingInput()` surfaces helpful errors before the DB round-trip (slug / kind / category / booking shape / required translation fields). DB CHECK constraints catch the structural invariants.
- **Round-trip read**: `getListingFull(sb, slug)` joins `listings` + `listing_translations` and returns a `ListingWriteInput`-shaped object — drop-in editable, pipeable back through `upsertListingWithTranslations` without losing fields.
- **CLI subcommands**: `npm run listing -- get --slug X` (pretty-prints `ListingWriteInput` JSON to stdout — `> /tmp/<slug>.json` for editing) and `npm run listing -- upsert --file <path>` (validates + upserts). The legacy `upsert --slug X` (from `content/*.ts`) is still supported for quick restores.
- **Skill modes rewritten** at [.claude/skills/experience-pipeline/SKILL.md](.claude/skills/experience-pipeline/SKILL.md):
  - **Add**: composes a `ListingWriteInput` JSON in `/tmp/<slug>.json`, upserts via CLI, generates the image via `gen:image`, then verifies. TS overlay file edits removed.
  - **Replace**: `get --slug X > /tmp/<slug>.json` → edit → `upsert --file`. Status stays.
  - **Image**: `get --slug X` for context, then `gen:image`.
  - **Check**: enumerates `productId`s via `listing list` + `listing get`, not `content/*.ts`.
  - **Editorial gate** section rewritten to reference `listing publish/archive/draft` CLI.
  - **Slug collision** check moved to `listing list` against live data (so the skill catches collisions with drafts and archives, not just published TS rows).
  - **Reference reading** updated: TS overlay files (`content/i18n/{zh,th}.ts`) called out as legacy seed-only.
- **Backward compatibility**: `scripts/seed-supabase.ts` still works via the original `upsertListing(sb, l: Listing)` helper (TS overlay → DB). Seed re-runs cleanly on dev (14/14 × 3 locales).
- **Smoke test on dev** (all green):
  - `get --slug elephant > /tmp/elephant.json` → 69 lines of valid JSON; round-trip `upsert --file` lands with the same id and unchanged status.
  - Validation rejects an incomplete JSON with a specific field-level error.
  - Fresh `_test-new-listing` slug created via `upsert --file` lands as a draft; `get --slug _test-new-listing` shows EN content propagated to TH+ZH (fallback works); cleanup via `delete --slug X --confirm` is clean.

**Operational consequence:** content edits no longer touch `content/i18n/{zh,th}.ts`. The TS overlay files remain as legacy seed data but are not the write target. Any new content lands in Supabase directly; the live site reads from Supabase (USE_SUPABASE=true). Unblocks PR 1.3 (the sync mode reuses the same JSON upsert path for every drafted candidate).

### Done ✅ — Experience-sync foundation: archived status + listing CLI (2026-06-07, branch `feat/experience-sync-foundation`)

- **Schema**: `archived` value added to the `listing_status` enum via [supabase/migrations/20260607000000_add_archived_status.sql](supabase/migrations/20260607000000_add_archived_status.sql). Applied to **dev** + **prod**. Purely additive — existing queries filter on `status = 'published'`, so archived rows stop rendering automatically but stay restorable for a configurable window.
- **Type widening**: [content/types.ts](content/types.ts) `ListingBase.status` and [content/db.ts](content/db.ts) `ListingRow.status` widened to `"draft" | "published" | "archived"`. `types/supabase.ts` regenerated from the live schema. `content/index.ts:34` filter callback adjusted accordingly.
- **Shared write helpers** at [scripts/lib/listings-write.ts](scripts/lib/listings-write.ts): `createListingsClient`, `toListingRow`, `toTranslationRows`, `upsertListing`, `setListingStatus` (+ `archiveListing` / `publishListing` / `draftListing` shortcuts), `deleteListing`, `deleteListingImage`, `purgeArchivedListings(days, {dryRun})`, `listListings({status?})`, `getListingMeta`. Service-role only; throws on missing env. Used by the seed, the CLI, and (next) the skill.
- **Listing CLI** at [scripts/listing.ts](scripts/listing.ts) — `npm run listing -- <subcommand>`. Subcommands: `list [--status X]`, `archive/publish/draft --slug X`, `delete --slug X --confirm`, `delete-image --slug X`, `purge [--older-than-days 90] [--dry-run]`, `upsert --slug X` (re-push from `content/*.ts`). Both `listing` (dev) and `listing:prod` npm scripts shipped.
- **Seed refactored** — `scripts/seed-supabase.ts` now delegates to `upsertListing()` from the shared helper. Same external behavior; one write path going forward.
- **Smoke test on dev** (all green):
  - Re-ran `npm run seed:supabase` → 14/14 listings × 3 locales upserted via the new helper.
  - `listing list` shows 14 rows; `--status draft` returns 2 (doi-suthep, big-day-out).
  - `archive --slug doi-suthep` → status flips to `archived`; `list --status archived` shows 1.
  - `purge --dry-run --older-than-days 0` correctly flags the just-archived row; `--older-than-days 365` correctly returns 0 (no false positives).
  - `delete --slug doi-suthep --confirm` → row gone (13 total), image **still in bucket** (delete is row-only by design); `upsert --slug doi-suthep` recovers from `content/experiences.ts` cleanly with a fresh UUID.
  - Dev ended in the original known-good state (14 rows, 2 drafts).

**Operational consequence:** any maintenance op (archive a delisted Klook product, purge old archives, hard-delete a botched row) is now a one-liner. The skill's `add` / `replace` / `image` modes (next: PR 1.2) will route their writes through the same helpers — the TS overlay files become legacy.

### Done ✅ — Gemini image-gen automation (2026-06-07, branch `feat/gemini-image-generation`)

- **`scripts/gen-image.ts`** — takes `--slug` and `--prompt`, calls Gemini `gemini-2.5-flash-image` (v1beta endpoint), decodes base64 PNG, sharp-converts to 1920×1072 WebP @ q82 in-memory, uploads to the Supabase Storage `listings` bucket via service-role client. No temp files; idempotent (upsert).
- **npm script** `gen:image` (loads `.env.local` via `--env-file`). New env requirements: `GEMINI_API_KEY` (paid-tier Google account — free tier image-gen quota is 0).
- **Skill updated** at [.claude/skills/experience-pipeline/SKILL.md](.claude/skills/experience-pipeline/SKILL.md): "Image rules" section now describes a single `npm run gen:image` invocation; the paste-PNG human step is removed. The multimodal verify-and-retry-up-to-2× loop is preserved (Claude downloads the uploaded WebP to `/tmp` and `Read`s it). Pre-flight adds `GEMINI_API_KEY` + Supabase env-var checks. Slug rules updated to reference the bucket instead of `public/images/listings/`. Old in-skill sharp conversion snippet removed.
- **Gemini API quirks captured in the skill**: must use `/v1beta` (not `/v1`); `responseFormat.image.{aspectRatio,imageSize}` enums are rejected on this model — the prompt itself biases toward landscape and sharp does the authoritative resize+crop. Auth via `x-goog-api-key` header.
- **Tested end-to-end** on a throwaway `_test-gen-image` slug: 10s round-trip, 1.78 MB PNG → 130 KB WebP, public URL fetches at HTTP 200, vision check passes (subject correct, no text/artifacts, 1920×1072). Test object cleaned up from bucket after verification.
- **Cost reality check**: ~$0.04 per call. Refreshing a 20-listing catalog with one retry per call = ~$1.60. Catalog-wide manual regens are pocket change; runaway retry loops are still cheap.

**Operational consequence:** the `experience-pipeline` skill (`add` / `replace` / `image` modes) can now generate + upload an image without a human paste step. Unblocks "Next Up 1" (`experience-sync` mode) — that mode reuses `gen:image` for every newly-drafted listing.

### Done ✅ — Listings images on Supabase Storage (2026-06-06, branch `feat/supabase-image-storage`)

- **Bucket** `listings` created in **dev** (`wtjvrbycuiooiuthokjk`) and **prod** (`smavaoullkcwebksspta`) via migration [supabase/migrations/20260606100000_listings_storage_bucket.sql](supabase/migrations/20260606100000_listings_storage_bucket.sql). Public-read, 5 MB file_size_limit, `image/webp` MIME allowlist. Writes go through service_role (bypasses RLS) — no INSERT/UPDATE/DELETE policy needed on storage.objects.
- **Backfill script** at [scripts/backfill-listing-images.ts](scripts/backfill-listing-images.ts) uploads every WebP under `public/images/listings/` into the bucket (idempotent upsert, `cache-control: 31536000`). Run via `npm run backfill:images` (dev) or `npm run backfill:images:prod` (prod). All 14 images uploaded to both projects.
- **Helper** at [lib/images.ts](lib/images.ts): `getListingImageUrl(slug)` → `${NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/listings/${slug}.webp`. Safe in server + client components (reads only the public env var).
- **Refactored 6 call sites** to use the helper: [components/ListingList.tsx](components/ListingList.tsx), [components/BundleCard.tsx](components/BundleCard.tsx), [components/ListingGrid.tsx](components/ListingGrid.tsx), [components/FeaturedCard.tsx](components/FeaturedCard.tsx), and [app/[locale]/e/[slug]/page.tsx](app/[locale]/e/[slug]/page.tsx) (both `generateMetadata` OG/Twitter and the hero `<Image>`).
- **`next.config.ts`** — `images.remotePatterns` added for `https://*.supabase.co/storage/v1/object/public/listings/**`. Covers both dev + prod refs in one rule.
- **`public/images/listings/` deleted** — 14 WebPs (3.2 MB) removed from the repo. Source of truth is now the Supabase Storage bucket. Recovery path: re-download from prod bucket or `git checkout` an earlier commit if ever needed.
- **Smoke test (dev)**: home `/` and `/zh` both render all 12 published listings with Supabase URLs; detail page `/e/elephant` (EN) + `/th/e/khantoke` (TH) hero image + OG `og:image` + `twitter:image` all use Supabase URLs; Next/Image optimizer `/_next/image?url=…` returns 200; zero stale `/images/listings/` references remain anywhere in the rendered HTML.
- **Prod verified**: `https://smavaoullkcwebksspta.supabase.co/storage/v1/object/public/listings/elephant.webp` → HTTP 200, `image/webp`. Live `staylooped.co` still serves the old `/images/listings/` paths until this PR merges (no deploy yet).

**Operational consequence:** image regeneration via the `experience-pipeline` skill will now upload directly to the Supabase Storage bucket — no `git commit` / `git push` / Vercel deploy needed to ship an image. Unblocks "Next Up 1" (Gemini auto-gen) and "Next Up 2" (`experience-sync` mode).

### Done ✅ — Supabase Phase 2 foundation (2026-05-29, branch `feat/supabase-integration`)
- Two cloud projects provisioned, both `ap-southeast-1`: **dev** (`wtjvrbycuiooiuthokjk`, active for local work) and **prod** (`smavaoullkcwebksspta`, Vercel-only later). See [supabase/README.md](supabase/README.md).
- `@supabase/supabase-js` + `supabase` CLI installed as deps; CLI logged in and linked to dev.
- **Initial schema** applied to dev ([supabase/migrations/20260528100000_initial_schema.sql](supabase/migrations/20260528100000_initial_schema.sql)): `listings` (language-neutral) + `listing_translations` (locale overlay), 5 enums (kind/status/category/booking_type/locale), 5 CHECK constraints enforcing the TS discriminated-union invariants (booking payload matches type, bundle/experience field segregation, price-range sanity), RLS enabled with public-read-on-published policies, `updated_at` trigger.
- **Seed script** at [scripts/seed-supabase.ts](scripts/seed-supabase.ts) — imports `experiences` / `bundles` / `translateListing`, upserts on `slug` and `(listing_id, locale)`. Idempotent. Run via `npm run seed:supabase`. Dev now has 14 listings × 3 locales (42 translation rows).
- **Generated types** at [types/supabase.ts](types/supabase.ts) — `Database` type from the live schema. Regenerate after every migration with `npx supabase gen types typescript --linked > types/supabase.ts`.
- **Runtime read-path** — [lib/supabase.ts](lib/supabase.ts) (anon + service factories, `server-only`-gated) + [content/db.ts](content/db.ts) holds all 5 DB-backed getters (`getListingFromDB`, `getFeaturedExperienceFromDB`, `getNonFeaturedExperiencesFromDB`, `getAllBundlesFromDB`, `getAllListingSlugsFromDB`), single-query joins, locale fallback to EN, reshape to `Listing` TS shape. Anon + RLS for published-only queries; service_role only for `getListing` so drafts still resolve at `/e/<draft-slug>`. List queries order by `created_at ASC, slug ASC` — preserves seed insertion order across upsert reruns.
- **Async getters** — all 5 content getters in `content/{experiences,bundles,index}.ts` are now `async` and branch on `USE_SUPABASE=true`. Callers (`app/[locale]/page.tsx`, `app/[locale]/e/[slug]/page.tsx`, `app/api/go/[id]/route.ts`, `components/BundleScroll.tsx`) updated to `await`. `BundleScroll` switched from `useTranslations` to `getTranslations` since it's now an async server component.
- **Smoke test (`USE_SUPABASE=true`)**: `/` (home) renders all 12 published listings — 9 experiences + 3 bundles, drafts hidden — with correct ordering; `/zh` shows Chinese section headings; `/e/elephant` EN/ZH/TH all 200 with correct locale titles; `/e/doi-suthep` + `/e/big-day-out` draft preview still resolves; `/api/go/elephant` redirects to `klook.com/.../?aid=121431&aff_adid=en-elephant`; 0 console errors.

---

## Next Up — recommended next session order

Pick highest-impact-per-effort first. Each item is self-contained and unblocks downstream work.

**Theme: close the content-automation loop via the `experience-pipeline` skill (no n8n).** Image storage (1a, 2026-06-06), Gemini auto-gen (1b, 2026-06-07), foundation (1.1, 2026-06-07), writer flip (1.2, 2026-06-07), and sync mode (1.3, 2026-06-07) all shipped — see Done sections above. Only remaining `experience-sync` PR:

1. **Periodic purge**: scheduled cron (Vercel Cron or GitHub Action) that runs `npm run listing:prod -- purge --older-than-days 90` weekly. The CLI already supports this — PR scope is the scheduling story + a `purge` summary report.

2. **Replace the 2 draft listings** (`doi-suthep`, `big-day-out`) — Klook delisted them in late May; both sit as `status='draft'` in Supabase. Once step 1 lands, the sync run will surface fresh top-rated replacements automatically. Until then, can also run `experience-pipeline replace` for a manual swap (image generation now fully automated via `gen:image`).
3. **Sitemap.ts + robots.ts** — small, high-SEO-value. Pulls slugs from `getAllListingSlugs()` which already works via Supabase. ~1 hour of work.
4. **Click logging table** — adds `affiliate_click` writes to Supabase from `app/api/go/[id]/route.ts`. Vercel Analytics only retains ~30 days; we want long-tail revenue attribution. New table + migration + non-blocking insert from the existing route. Low risk.
5. **Real social proof on cards** — vendor rating + booked count, sourced manually or via vendor API. Trust-building win. (Becomes basically free once `experience-sync` is scraping ratings anyway — pipe them into the `listings` row.)
6. **Vercel Preview unblock** — either (a) get the user on the Vercel team ($20/mo) or (b) toggle off Git Author Verification in Project Settings. Until done, Preview deploys fail the author check; this PR shipped without Preview verification (worked out fine, but risky long-term).

### Operational consequence to remember

Because `USE_SUPABASE=true` is set in Vercel Production, **editing `content/*.ts` and merging to main doesn't change what users see**. The edit reaches prod only after `npm run seed:supabase:prod` runs. Options to fix this:
- **Short-term:** run the seed manually after content edits. Document this in any PR that touches `content/*.ts`.
- **Long-term:** flip the `experience-pipeline` writer (item #1 above), then edits go to Supabase directly without touching TS files at all.

---

## Day 2 — Deploy & QR (remaining blockers)

- [ ] **Custom domain** — point `staylooped.co` (or chosen) at Vercel
- [ ] **Vercel env vars** — set `KLOOK_AFF_ID=121431` for Production + Preview + Development (`.env.local` doesn't deploy; without this, prod redirects strip the `aid=` and no commission is attributed)
- [ ] **Optional Vercel env**: `NEXT_PUBLIC_SITE_URL=https://staylooped.co` for OG absolute URLs
- [ ] **QR code** — generate pointing at site root (locale auto-detect handles EN/ZH routing)
- [ ] **Real-device mobile smoke test** — scan QR on actual phone, complete a Klook booking, verify the click shows up in Vercel Analytics + Klook Partners dashboard

---

## Affiliate programs

| Vendor | Status | env var | Listings covered |
|---|---|---|---|
| Klook Partners | ✅ Approved, AID 121431 in `.env.local` | `KLOOK_AFF_ID` | 12 of 14 (10 experiences + 3 of 4 bundles incl. all featured) |
| GetYourGuide | ⏳ Not applied | `GYG_AFF_ID` | 1 (`coffee-farm`) — works without affiliate attribution until applied |
| Viator | ⏳ Not applied | `VIATOR_AFF_ID` | 0 (temple was the only Viator; dropped) — apply only if we add a Viator listing |
| TravelPayouts | ❌ Skipped | `TRAVELPAYOUTS_MARKER` | Going direct with each vendor is higher-margin |

---

## Phase 2 (post-MVP, after first revenue)

### Tracking & analytics
- [ ] Inspect Vercel Analytics dashboards weekly: pageviews by locale, top listings by click-out, detail-page → affiliate_click conversion rate (target 15-25% per legal/marketing review)
- [ ] `/api/go` click logging to DB (Supabase) — Vercel events have ~30-day retention; we want longer for revenue attribution
- [ ] Sitemap.ts + robots.ts for share-preview reliability

### Content depth
- [ ] **Thai listing translations** — `messages/th.json` already has Hero + Common; add Sections/Categories/Manifesto/Footer/BookCTA + listing overlays in `content/i18n/th.ts`
- [ ] Restore real social proof on cards — vendor rating + booked count, sourced manually or via vendor API (legal review nuked the fabricated ones)
- [ ] Restore "Looped by" community signals when we have real partners (parked in [components/LoopedBy.tsx](components/LoopedBy.tsx) and [components/CommunityStrip.tsx](components/CommunityStrip.tsx) — unused but undeleted for restoration)

### Supabase migration (the data-layer rewrite)
- [x] **`listings` table** (language-neutral) — see [supabase/migrations/20260528100000_initial_schema.sql](supabase/migrations/20260528100000_initial_schema.sql). The schema flattens `BookingMethod` to `(booking_type, booking_product_id, booking_message_template)` with CHECK constraints; `vendor` is implied by `booking_type` (no separate column).
- [x] **`listing_translations` table** keyed by `(listing_id, locale)`: `title`, `hook`, `description`, `inclusions[]`, `price_label`, `duration`, `distance`, `rating`, `contributor_quote`, `badge`, `save_badge`.
- [x] Mirrors the current `content/i18n/{locale}.ts` overlay shape — the seed reuses `translateListing` so each locale row is built exactly the way the runtime renders today.
- [x] Migrate the runtime — all 5 content getters (`getListing`, `getFeaturedExperience`, `getNonFeaturedExperiences`, `getAllBundles`, `getAllListingSlugs`) are now async and branch on `USE_SUPABASE=true`. Anon client + RLS for the published-only getters; service_role only for `getListing` (so `/e/<draft-slug>` preview keeps working).
- [x] **Vercel env vars** — Production points at prod Supabase (`smavaoullkcwebksspta`); Preview points at dev (`wtjvrbycuiooiuthokjk`); `USE_SUPABASE=true` set in Production env only.
- [x] **Seed prod** — `npm run seed:supabase:prod` ran clean, 14 listings × 3 locales in prod Supabase.
- [ ] **Optional: enable `USE_SUPABASE=true` in Vercel Preview** once we trust the Supabase path. Currently Preview is blocked by Vercel's git-author check anyway, so this only matters after we get a teammate/owner on the Vercel team or disable that check.
- [x] **Image storage decision — DONE 2026-06-06: moved to Supabase Storage.** Bucket created in dev + prod, 14 images backfilled, 6 components refactored, `public/images/listings/` deleted. See "Done — Listings images on Supabase Storage" section above.
- [ ] **`experience-pipeline` skill writer flip** — currently the skill edits `content/*.ts` files. Now that runtime reads from Supabase, edits don't reach prod without `npm run seed:supabase:prod`. Folded into Next Up 2 (`experience-sync` mode shares the same write helpers).

---

## Phase 3 — Content automation pipeline

Most of the **read** + **rewrite** + **image** pipeline shipped early as the [experience-pipeline skill](.claude/skills/experience-pipeline/SKILL.md). The next round of automation (image storage migration, Gemini API auto-gen, `experience-sync` mode with 20-cap + soft-archive) is sequenced under Next Up 1a–1c. Outstanding beyond that:

- [ ] **Re-sync cron** — Vercel Cron or GitHub Action that runs `experience-pipeline check` (and eventually `experience-sync`) weekly. For each listing it (a) flags dead productIds (`Currently unavailable` / 404), (b) walks every Klook tier (click each `.desktop-attr-btn`, scope to `.js-activity-package-options`) and re-derives `price` (min) + `priceMax` (max), and (c) compares to stored values — flags drift > 15% on either bound. Convert observed USD → THB at ~33.5, floor min and ceil max to ฿50 for stable rendering. Doesn't auto-publish; new candidates land as `status='draft'` for editorial review (see `/admin` item below).
- [ ] **Catalog hygiene cron — what 2026-05-26 revealed** — a single pass surfaced two delistings (doi-suthep / Klook 18012, big-day-out / Klook 77519 — both `Currently unavailable`) and 8 of 12 remaining listings drifting >15% on the bounds. Operator-side tier restructuring (e.g. Klook 77514 lunch-run jumping from ฿1,200 → ฿2,650 single-tier; Klook 88017 zipline now spans ฿200 coaster-only → ฿6,400 diamond combo) means manual once-a-quarter sweeps aren't enough. Until the cron lands, run `experience-pipeline check` after each Klook newsletter announces operator changes.
- [ ] **Archived-row purge** — runs alongside the re-sync cron. Hard-deletes `status='archived'` rows older than 90 days plus their storage objects. Keeps the bucket and table from bloating as the 20-cap rotates listings in/out. Restorability window: 90 days.
- [ ] **`/admin` route or Supabase Studio** — surface drafts written by the pipeline for editorial review. Status flip (`draft` → `published`, or `published` → `archived`) lives there instead of in source files. Becomes more important once `experience-sync` is producing drafts automatically.
- [ ] **Klook Partner API integration** — Klook offers an affiliate API. Could replace the browser-based product-page scraping the skill currently does, removing bot-blocking friction. Lower priority — Playwright works.
- [ ] **Vendor image licensing audit** — currently we generate originals via Gemini per AGENTS.md image-conversion-workflow. If Klook's affiliate TOS allows their product images under attribution, we could save Gemini cost. Verify per-vendor before changing.
- [ ] **Contributor attribution restoration** — when Phase 2 lands real contributors, the pipeline writes drafts with `contributor_slug` set. AGENTS.md "Looped by [Person]" idiom remains load-bearing.

---

## Key Files

| What | Where |
|---|---|
| Experience content | [content/experiences.ts](content/experiences.ts) (10 entries; 1 drafted: `doi-suthep`) |
| Bundle content | [content/bundles.ts](content/bundles.ts) (4 entries; 1 drafted: `big-day-out`) |
| Type definitions (+ `status` for draft gate) | [content/types.ts](content/types.ts) |
| ZH listing translations | [content/i18n/zh.ts](content/i18n/zh.ts) |
| Phase 2 archive (WhatsApp originals) | [content/archive/whatsapp-phase2.ts](content/archive/whatsapp-phase2.ts) |
| UI shell strings | [messages/en.json](messages/en.json), [messages/zh.json](messages/zh.json), [messages/th.json](messages/th.json) |
| Hero (locale switcher + CTA) | [components/Hero.tsx](components/Hero.tsx) |
| Booking UI | [components/BookCTA.tsx](components/BookCTA.tsx), [components/StickyBookBar.tsx](components/StickyBookBar.tsx) |
| Brand sections | [components/Manifesto.tsx](components/Manifesto.tsx), [components/Footer.tsx](components/Footer.tsx) |
| Home page | [app/[locale]/page.tsx](app/[locale]/page.tsx) |
| Detail page (+ generateMetadata) | [app/[locale]/e/[slug]/page.tsx](app/[locale]/e/[slug]/page.tsx) |
| Layout (OG, Analytics, metadataBase) | [app/[locale]/layout.tsx](app/[locale]/layout.tsx) |
| Affiliate route (+ non-blocking track) | [app/api/go/[id]/route.ts](app/api/go/[id]/route.ts) |
| Locale middleware | [proxy.ts](proxy.ts) |
| OG default image | [public/og-default.jpg](public/og-default.jpg) |
| Listing images (14 WebPs) | Supabase Storage `listings` bucket (public-read). URL helper: [lib/images.ts](lib/images.ts). Upload script: [scripts/backfill-listing-images.ts](scripts/backfill-listing-images.ts). |
| Phase 3 ops skill | [.claude/skills/experience-pipeline/SKILL.md](.claude/skills/experience-pipeline/SKILL.md) |
| Supabase data layer | [supabase/](supabase/) (migrations + README), [lib/supabase.ts](lib/supabase.ts), [content/db.ts](content/db.ts), [scripts/seed-supabase.ts](scripts/seed-supabase.ts), [types/supabase.ts](types/supabase.ts) |
| Gemini image generator | [scripts/gen-image.ts](scripts/gen-image.ts) (`npm run gen:image -- --slug X --prompt "..."`) |
| Listing write helpers + CLI | [scripts/lib/listings-write.ts](scripts/lib/listings-write.ts) (shared upsert/archive/delete/purge helpers), [scripts/listing.ts](scripts/listing.ts) (`npm run listing -- <subcommand>` / `npm run listing:prod -- <subcommand>`) |
