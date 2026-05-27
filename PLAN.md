# StayLooped — MVP Plan

## Context
Two houses in Thapae Soi 4, Chiang Mai. Print QR codes, place them in the houses, guests scan and discover local experiences with affiliate links generating revenue.

**Primary users:** Guests on their phones — mix of EN and ZH speakers (ZH guests are majority; many speak little English, so losing them at the first English screen is a real conversion risk).

**Status as of 2026-05-27:** site is fully trilingual (EN/ZH/TH) with TopNav on all inner pages. Day-2 blockers (deploy, QR, smoke test) are done. Remaining: replace 2 draft listings, CarCallout i18n, SEO improvements.

---

## Status

### Done ✅ — Foundation
- Next.js 16 app, `en`/`th`/`zh` locales, locale auto-detect + path-preserving switch
- 10 experiences + 4 bundles in `content/{experiences,bundles}.ts` — as of 2026-05-26, 2 drafted out (doi-suthep / big-day-out — Klook says `Currently unavailable`), so **12 listings live** in production (9 experiences + 3 bundles)
- Detail page at `/e/[slug]` with shared route for experiences + bundles
- `/api/go/[id]` affiliate redirect — resolves vendor + productId from content, builds vendor URL with `aid` + `aff_adid=${locale}-${slug}` sub-ID, 302s; WhatsApp listings rejected (Phase 2 archive)
- 14 listing images at 1920×1072 WebP in `public/images/listings/`

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
- `CarCallout` strip on home page between featured card and bundles — promotes private car hire via Klook + Grab (PR #6); Klook button links to search "chiang mai private car" with AID (PR #8)
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

### Done ✅ — Analytics & attribution
- Vercel Analytics + Speed Insights mounted in [layout.tsx](app/[locale]/layout.tsx)
- Non-blocking `void track('affiliate_click', { slug, vendor, productId, locale })` on `/api/go` — fires server-side without blocking the 302
- `KLOOK_AFF_ID=121431` in `.env.local`, verified: `/api/go/elephant` → `klook.com/.../?aid=121431&aff_adid=en-elephant`

### Done ✅ — Editorial / Phase 3 prep (early)
- `status?: 'draft' | 'published'` on `ListingBase` (`content/types.ts`)
- Getters filter drafts: home page hides them, static export excludes them, `/e/<slug>` still resolves for preview
- **`experience-pipeline` skill** at [.claude/skills/experience-pipeline/SKILL.md](.claude/skills/experience-pipeline/SKILL.md) — 5 modes (`add`, `check`, `top`, `replace`, `image`), enforces voice + content + image rules, runs affiliate URL smoke test
- Image workflow codified: Gemini prompt template + sharp PNG→WebP @ 1920×1072

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
- [ ] **`listings` table** (language-neutral): `id`, `slug`, `vendor`, `product_id`, `category`, `price`, `duration`, `distance`, `booking_method`, `status` (draft|published), `is_featured`, `background`, `image_url`
- [ ] **`listing_translations` table** keyed by `(listing_id, locale)`: `title`, `hook`, `description`, `inclusions[]`, `price_label`
- [ ] Mirrors the current `content/i18n/{locale}.ts` overlay shape — same `translateListing` logic moves to a DB query
- [ ] Migrate the runtime: replace `content/*.ts` reads with Supabase reads in `getListing`, `getFeaturedExperience`, `getNonFeaturedExperiences`, `getAllBundles`, `getAllListingSlugs`
- [ ] **Once migrated**: the `experience-pipeline` skill swaps its writer from "edit TS file" to "insert/update Supabase row" — single change

---

## Phase 3 — Content automation pipeline

Most of the **read** + **rewrite** + **image** pipeline shipped early as the [experience-pipeline skill](.claude/skills/experience-pipeline/SKILL.md). Outstanding:

- [ ] **Re-sync cron** — Vercel Cron or GitHub Action that runs `experience-pipeline check` weekly. For each listing it (a) flags dead productIds (`Currently unavailable` / 404), (b) walks every Klook tier (click each `.desktop-attr-btn`, scope to `.js-activity-package-options`) and re-derives `price` (min) + `priceMax` (max), and (c) compares to stored values — flags drift > 15% on either bound. Convert observed USD → THB at ~33.5, floor min and ceil max to ฿50 for stable rendering. Doesn't auto-update; opens a draft PR or Slack ping for review.
- [ ] **Catalog hygiene cron — what 2026-05-26 revealed** — a single pass surfaced two delistings (doi-suthep / Klook 18012, big-day-out / Klook 77519 — both `Currently unavailable`) and 8 of 12 remaining listings drifting >15% on the bounds. Operator-side tier restructuring (e.g. Klook 77514 lunch-run jumping from ฿1,200 → ฿2,650 single-tier; Klook 88017 zipline now spans ฿200 coaster-only → ฿6,400 diamond combo) means manual once-a-quarter sweeps aren't enough. Until the cron lands, run `experience-pipeline check` after each Klook newsletter announces operator changes.
- [ ] **`/admin` route or Supabase Studio** — surface drafts written by the pipeline for editorial review. Status flip lives there instead of in source files.
- [ ] **Klook Partner API integration** — Klook offers an affiliate API. Could replace the browser-based product-page scraping the skill currently does, removing bot-blocking friction. Lower priority — Playwright works.
- [ ] **Vendor image licensing audit** — currently we generate originals via Gemini per AGENTS.md image-conversion-workflow. If Klook's affiliate TOS allows their product images under attribution, we could save Gemini cost. Verify per-vendor before changing.
- [ ] **Contributor attribution restoration** — when Phase 2 lands real contributors, the pipeline writes drafts with `contributor_slug` set. AGENTS.md "Looped by [Person]" idiom remains load-bearing.

Depends on Phase 2 Supabase migration for full closed-loop automation. Until then, the skill writes to file-based content.

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
| Listing images (14 WebPs) | [public/images/listings/](public/images/listings/) |
| Phase 3 ops skill | [.claude/skills/experience-pipeline/SKILL.md](.claude/skills/experience-pipeline/SKILL.md) |
