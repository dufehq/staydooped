<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# StayLooped — project conventions

## Brand and product

- User-facing brand is **StayLooped** (domain: staylooped.co). The npm package name and folder are still `localloop` from the project's earlier name — leave them alone; the rename is wordmark/copy only.
- The **"Looped by [Person]"** credit pattern is load-bearing brand idiom. Every listing carries a `contributorSlug` and shows the credit through `<LoopedBy>`. Don't drop it for layout reasons.
- Tagline: *"Recommended by people who actually live here."* Secondary: *"Stay looped to the locals."*
- Contributor names in `content/contributors.ts` are **placeholder personas** until real partners sign — don't treat them as real consenting people.

## Content

- Listings (bundles + experiences) live as typed TypeScript in `content/*.ts`. Single source of truth — no CMS. Layer 3 (Supabase) will migrate this shape over.
- UI shell strings (section titles, hero, footer) live in `messages/{en,th,zh}.json` and are accessed via `useTranslations` (server or client). Per-listing content is in `content/*.ts` (English base) with translation overlays in `content/i18n/{locale}.ts`. Getters take a `locale` argument (e.g. `getListing(slug, locale)`) and apply the overlay via `translateListing`. ZH ships; TH listing content lands in Phase 2.
- Prices are stored as **THB integers** on `price` / `priceOriginal`. Format at render with `.toLocaleString()`; display copy lives on `priceLabel`.
- `BookingMethod` is a discriminated union (`klook` / `viator` / `gyg` / `whatsapp`). Every listing must pick one. `<BookCTA>` branches on the discriminator.

## Routing and layout

- All routes live under `app/[locale]/...`. Locales: `en`, `th`, `zh`. Default `en`. Prefix `as-needed` — default `en` has no URL prefix (`/`), other locales do (`/th/...`, `/zh/...`). Locale comes from `await params` (Next.js 16 async params).
- Bundle and experience detail pages share **one route**: `app/[locale]/e/[slug]/page.tsx`, backed by `getListing(slug)`. Pre-render with `generateStaticParams`.
- Edge logic lives in `proxy.ts` (Next.js 16 renamed `middleware.ts`).

## Multi-language checklist — every new page

**ZH users are the majority audience. A page that renders English when they switch locale is a broken page.**

When building any new `app/[locale]/<route>/page.tsx`:

1. **Add a translation namespace** for the page in `messages/en.json` and `messages/zh.json` (e.g. `"Guide": { ... }`). If Thai content is ready, add to `messages/th.json` too — otherwise leave TH as a copy of EN for now.
2. **Use `getTranslations`** (async server components) or `useTranslations` (client components) — never hardcode English strings in JSX.
3. **Use `t.rich()`** for any string that contains embedded links or HTML elements (e.g. `<strong>`, `<a>`). See `app/[locale]/guide/page.tsx` and `components/Manifesto.tsx` for the pattern.
4. **Include `<TopNav />`** (or equivalent locale switcher) on every page so users can actually switch.
5. **Test the switcher** — navigate to the page as EN, click 中文, confirm the content changes. If it looks the same, a string is still hardcoded.

**Reference implementation:** `app/[locale]/guide/page.tsx` — fully bilingual, uses `t()` for simple strings and `t.rich()` for paragraphs with affiliate links.

**Adding a new locale later:** add the locale to `i18n/routing.ts` locales array, create `messages/<locale>.json`, and add the `LocaleSwitcher` option in `components/LocaleSwitcher.tsx`. Every page that already uses `getTranslations` will automatically pick up the new locale.

## Components and design

- **Server Components by default.** Opt into `"use client"` only for genuine interactivity (e.g., `CategoryTabs`).
- Design tokens are defined once in `app/globals.css` inside the `@theme` block. **Use the named utility classes** (`bg-paper`, `text-loop`, `font-display`, `shadow-card`) — don't paste raw hex or duplicate tokens.
- Mobile-first responsive. Breakpoints: `md:` 768px (tablet), `lg:` 1024px (desktop). Container max-width grows `430px` → `760px` → `1280px`.

## Git workflow

- **Always `git fetch origin main` and branch from the latest `main` before starting any work.** Never branch from a stale local copy — this causes merge conflicts for the partner.
- **Always update `PLAN.md` before opening a PR.** Log completed work under the relevant `Done ✅` section, referencing the PR number. This is a ritual — no PR goes out without the plan reflecting it.
- Branch naming: `revise/<short-description>` for copy/UI changes, `feat/<short-description>` for new features, `fix/<short-description>` for bugs.
- Always get owner approval before pushing a branch.
- After pushing, ask the owner if they want a PR created. Include a clear description with what changed, why, and a test checklist.
- **Always request `dhanuwat` as a reviewer on every PR** using the GitHub MCP `request_copilot_review` or reviewer request tool after creating the PR.

## Tooling

- `npm run dev` uses **Webpack** (`next dev --webpack`), not Turbopack. Turbopack spawns one PostCSS subprocess per CSS file under `@tailwindcss/postcss` — heavy on this laptop. Revisit when Tailwind ships a Turbopack-native plugin or CSS surface area is small enough that the overhead doesn't matter.
- Affiliate clicks route through `app/api/go/[id]/route.ts` where `id` is the listing **slug** (e.g. `/api/go/elephant?locale=zh`). The handler looks up `booking.type` + `booking.productId` from content, builds the vendor's affiliate URL with sub-ID = `${locale}-${slug}`, and 302-redirects. WhatsApp listings bypass this route — `BookCTA` constructs `wa.me` URLs directly. Affiliate IDs read from env (`KLOOK_AFF_ID`, `VIATOR_AFF_ID`, `GYG_AFF_ID`, `TRAVELPAYOUTS_MARKER`); when unset, redirects still resolve to the operator's product page but no commission is tracked. Click logging to DB is Phase 2.
- Playwright MCP (`.mcp.json`) is the browser for UI testing. When you finish a UI-testing pass:
  1. **Call `browser_close`** — leaving the session open holds a browser process and bleeds state (cookies like `NEXT_LOCALE`) into the next test run.
  2. **Delete the `.playwright-mcp/` artifacts you produced** (page snapshots, console logs, screenshots). They're per-session debug output, not deliverables — remove them so they don't pile up or end up committed.
