# StayLooped — Site Review

_Full audit of pages, components, content, translations, and SEO. Produced 2026-05-27._

---

## 🔴 Critical — Fix before next marketing push

### 1. CarCallout is English-only
`components/CarCallout.tsx` has every string hardcoded in English — "Need a private car for the day?", the description, and both button labels. Chinese guests (majority audience) see English copy here. Needs either a translations namespace added to `en.json` / `zh.json` and `getTranslations`, or an inline locale-check.

### 2. ~~Thai locale is in routing but 83% untranslated~~ ✅ Fixed
All 9 namespaces now complete in `messages/th.json`. Thai option added to `LocaleSwitcher`.

---

## 🟡 High priority — Soon

### 3. Two listings stuck on draft
Both have complete images and data but are hidden from production:

| Slug | Vendor | ProductId | Reason |
|---|---|---|---|
| `doi-suthep` | Klook | 18012 | "Currently unavailable" |
| `big-day-out` | Klook | 77519 | "Currently unavailable" |

Run `/experience-pipeline replace` on each to swap in a live Klook productId, or formally archive them. Until replaced, the live catalogue is 12 of 14.

### 4. ~~`appsPillLabel` and `appsGuideLink` missing from `th.json`~~ ✅ Fixed
Both keys added to th.json Hero block.

### 5. Hero Thai subtitle shows on all locales
`คู่มือท้องถิ่น — เชียงใหม่` is the `thaiSubtitle` key — it renders for English and Chinese users too. This appears to be intentional branding (a decorative Thai script line under the English tagline), but worth confirming with the owner. If it should only show on the Thai locale, add a locale gate in `Hero.tsx`.

---

## 🟠 Medium priority — Phase 2

### 6. No global hreflang alternates
`layout.tsx` has no `alternates.languages` block. Only `/e/[slug]` detail pages declare EN/ZH alternates in `<head>`. The home page (`/`) and guide page (`/guide`) don't tell search engines about their locale variants. Fix: add `alternates` to `generateMetadata` in `app/[locale]/layout.tsx` or the individual page files.

### 7. No sitemap or robots
No `app/sitemap.ts` or `app/robots.ts`. Google will still crawl the site but canonical URL discovery is slower without a sitemap. Add both — Next.js 16 makes these trivial (`export default function sitemap()` returning the URL list).

### 8. No structured data (JSON-LD)
Detail pages have no schema.org markup. Adding `TouristAttraction` or `Product` JSON-LD to `/e/[slug]` could unlock Google rich results for searches like "Chiang Mai elephant sanctuary booking". Low effort, high SEO value.

---

## 🟢 Low / Nice-to-have

### 9. StickyBookBar label ternary is a no-op
`components/StickyBookBar.tsx` line 22 checks `booking.type === 'whatsapp'` but returns `t("bookShort")` in both branches. No functional impact (no WhatsApp listings exist right now) but the dead branch is confusing to read. Clean it up when WhatsApp listings re-enter Phase 2.

### 10. `whatsappNumber` prop defined but unused
Both `BookCTA.tsx` and `StickyBookBar.tsx` accept a `whatsappNumber` prop that is never passed to the URL builder. Phase 2 relic — safe to remove or document as a future hook.

### 11. Image file size spread is wide
WebP files range from 108 KB (`massage`) to 479 KB (`golden-hour`). No compression target is documented. Aim for ≤250 KB per image at 1920×1072 — most listing images are already there; `big-day-out` (478 KB) and `golden-hour` (479 KB) could be re-exported at higher compression.

### 12. Guide page arrow bullets aren't semantic HTML
The three Lazada tips use a `→` character instead of `<ul>/<li>`. Works visually, but screen readers won't announce these as list items. Minor a11y note — consider converting to a real `<ul>` in a future pass.

---

## ✅ What's working well

- **All 14 listing images exist** and every slug has a matching WebP — zero broken image paths
- **EN and ZH translations complete** — all 9 namespaces covered, professional quality
- **Affiliate redirect working** — Klook AID, locale sub-IDs, Vercel Analytics tracking all confirmed
- **Mobile-first layout solid** — 430 → 760 → 1280 px breakpoints consistent across all pages
- **TopNav on all inner pages** — logo links home, locale switcher accessible, sticky + blurred
- **Booking buttons use `target="_blank"`** — guests leave to book but StayLooped stays open (confirmed in BookCTA + StickyBookBar)
- **Draft gate working** — `doi-suthep` and `big-day-out` correctly hidden from home page and static export
- **Vercel Analytics + SpeedInsights mounted** in layout — pageview and click data flowing

---

## Recommended next actions (in order)

1. Fix `CarCallout` translations — quick, high-impact for ZH guests
2. Decide on Thai locale — either add `th.json` content or remove `th` from `routing.ts` for now
3. Run `experience-pipeline replace` on `doi-suthep` and `big-day-out` to get back to 14 live listings
4. Add `appsPillLabel` + `appsGuideLink` to `th.json`
5. Add `sitemap.ts` + `robots.ts` — 30-minute job, SEO win
6. Add JSON-LD structured data to detail pages — SEO win for Google Activities
