# StayLooped — MVP Plan

## Context
Two houses in Thapae Soi 4, Chiang Mai. Lots of bookings. Goal: print QR codes and place them in the houses so guests (groups of friends or families) scan and discover local experiences — with affiliate links generating revenue.

**Primary users:** Guests on their phones, mix of English speakers and Chinese speakers (Chinese guests are majority; many speak little English — losing them at the first English screen is a real conversion risk).

**Target launch:** 1–2 days from 2026-05-15.

---

## MVP Definition

Bare minimum to put QR in the houses and start earning:

- Mobile-first landing page, Chiang Mai content
- **Language selector front-and-center** — EN and ZH at the very start (Thai can come later)
- Chinese translations for all listing content (not just UI shell)
- Engaging hook copy per listing — a one-liner story that makes you want to click
- Affiliate links live (Travelpayouts IDs wired in)
- `/api/go/[id]` tracking route implemented
- Vercel deploy on custom domain

---

## Status

### Done ✅
- [x] Next.js 16 app scaffold with `en`, `th`, `zh` locales
- [x] 8 experiences + 4 bundles in `content/`
- [x] Home page layout (Hero, CategoryTabs, BundleScroll, FeaturedCard, ListingGrid)
- [x] Detail page at `/e/[slug]`
- [x] BookCTA component (branches on booking method)
- [x] WhatsApp booking works
- [x] `messages/zh.json` exists (UI shell strings only)
- [x] Noto Sans SC font loaded for Chinese
- [x] Locale auto-detection from `Accept-Language` (zh → /zh, en → /) and `NEXT_LOCALE` cookie persistence — works out of the box via next-intl middleware in `proxy.ts`. Verified with curl.

### Day 1 — Core MVP

- [ ] **Language selector** — prominent EN / 中文 toggle at top of hero (not buried in footer)
  - Auto-detect browser language as hint, but always show the toggle visibly
  - Clicking switches locale prefix (`/en/` ↔ `/zh/`)
- [ ] **Chinese listing content** — translate titles, descriptions, contributor quotes, inclusions for all 8 experiences + 4 bundles into `messages/zh.json` or a `content/zh/` layer
- [ ] **Hook copy** — add a `hook` field to listing type: one punchy sentence in EN + ZH that teases the story (shown on cards before the full description)
- [ ] **Travelpayouts integration** — swap `PLACEHOLDER_*` product IDs once user provides them; update `BookingMethod` if needed to support Travelpayouts link format
- [ ] **`/api/go/[id]` route** — redirect to affiliate URL with sub-ID tracking (locale + slug)
- [ ] **Replace mock experience data with real Chiang Mai listings** — current `content/experiences.ts` is placeholder copy. Research 8 real, currently-operating Chiang Mai experiences (Old City / Thapae / Nimman / day-trip range) from recent sources (Klook, Viator, GetYourGuide, local press from the last ~12 months). For each, replace: `title`, `price` + `priceLabel` (THB), `duration`, `distance`, `description`, `contributorQuote`, `inclusions`, and `booking.productId` (real vendor ID, once affiliate IDs land). Keep the 8 slugs / categories / contributor personas — only the content swaps. Mirror into ZH alongside the Chinese listing content task above.
- [ ] **Content audit** — ensure all 8 experiences are Chiang Mai Old City / Thapae area relevant

### Day 2 — Deploy & QR

- [ ] **Custom domain** — point staylooped.co (or chosen domain) to Vercel
- [ ] **QR code** — generate QR pointing to `https://yourdomain.com` (auto-redirects to `/en/` or `/zh/` via browser language)
- [ ] **Mobile smoke test** — scan QR on actual phone, click through a booking, verify affiliate link fires

### Phase 2 (post-MVP, after first revenue)
- [ ] Analytics (Plausible or Vercel Analytics) — see which listings convert
- [ ] Thai language for listings
- [ ] Supabase migration for dynamic content
- [ ] `/api/go` click logging to DB

---

## Affiliate Setup (user action needed)

- [ ] Sign up Travelpayouts at travelpayouts.com
- [ ] Get Klook affiliate sub-ID format (usually `?aff_adid=YOUR_ID`)
- [ ] Get Viator affiliate link format
- [ ] Add IDs to `.env.local`:
  ```
  KLOOK_AFF_ID=xxx
  VIATOR_AFF_ID=xxx
  TRAVELPAYOUTS_MARKER=xxx
  ```

---

## Key Files

| What | Where |
|------|-------|
| Listing content | `content/experiences.ts`, `content/bundles.ts` |
| UI translations | `messages/en.json`, `messages/zh.json` |
| Booking logic | `components/BookCTA.tsx` |
| Affiliate route | `app/api/go/[id]/route.ts` ← needs creating |
| Locale middleware | `proxy.ts` |
| Home page | `app/[locale]/page.tsx` |
| Detail page | `app/[locale]/e/[slug]/page.tsx` |
| Language switcher | `components/LocaleSwitcher.tsx` ← needs creating |
