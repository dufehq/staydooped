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
- [x] 8 experiences + 4 bundles in `content/` — real Chiang Mai operators (Kerchor, Lila, Pongyang, etc.) with real Klook/Viator/GYG product IDs
- [x] Home page layout (Hero, CategoryTabs, BundleScroll, FeaturedCard, ListingGrid)
- [x] Detail page at `/e/[slug]`
- [x] BookCTA component (branches on booking method)
- [x] WhatsApp booking works
- [x] Noto Sans SC font loaded for Chinese
- [x] Locale auto-detection from `Accept-Language` (zh → /zh, en → /) and `NEXT_LOCALE` cookie persistence — works out of the box via next-intl middleware in `proxy.ts`. Verified with curl.
- [x] **Language selector** — prominent EN / 中文 toggle at top of hero, visible on home + detail pages, path-preserving locale switch via next-intl `Link`.
- [x] **Chinese listing content** — full ZH translations for all 12 listings (title, hook, description, contributorQuote, inclusions, priceLabel, duration, distance, rating, badge, saveBadge) layered via `content/i18n/zh.ts` and applied through `translateListing` getters. UI shell strings (sections, manifesto, footer, BookCTA, categories, etc.) also translated in `messages/zh.json`.
- [x] **Hook copy** — `hook: string` on `ListingBase`, populated for all 12 listings (EN + ZH), rendered on FeaturedCard, ListingGrid, BundleCard.
- [x] **`/api/go/[id]` route** — `id` is the listing slug; handler resolves vendor + productId from content, builds affiliate URL with sub-ID = `${locale}-${slug}`, 302 redirects. Reads env vars for affiliate keys (`KLOOK_AFF_ID`, `VIATOR_AFF_ID`, `GYG_AFF_ID`, `TRAVELPAYOUTS_MARKER`); WhatsApp listings rejected with 400, unknown slug → 404.
- [x] **Listing images** — 12 WebP images at `public/images/listings/{slug}.webp` (1920×1072, ~150 KB each), rendered via `next/image` on FeaturedCard, ListingGrid, BundleCard, ListingList, and detail-page hero. Emoji dropped from hero areas; gradient stays as loading fallback.

### Day 1 — Core MVP

- [ ] **Travelpayouts integration** — sign up + add `KLOOK_AFF_ID`, `VIATOR_AFF_ID`, `GYG_AFF_ID`, `TRAVELPAYOUTS_MARKER` to `.env.local`. Route handler already reads these; no code change needed once env is set.

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
