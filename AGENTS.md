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
- UI shell strings (section titles, hero, footer) live in `messages/{en,th,zh}.json` and are accessed via `useTranslations`. **Per-listing content is currently English-only**; translation lands in Phase 3.
- Prices are stored as **THB integers** on `price` / `priceOriginal`. Format at render with `.toLocaleString()`; display copy lives on `priceLabel`.
- `BookingMethod` is a discriminated union (`klook` / `viator` / `gyg` / `whatsapp`). Every listing must pick one. `<BookCTA>` branches on the discriminator.

## Routing and layout

- All routes live under `app/[locale]/...`. Locales: `en`, `th`, `zh`. Default `en`. Prefix `always`. Locale comes from `await params` (Next.js 16 async params).
- Bundle and experience detail pages share **one route**: `app/[locale]/e/[slug]/page.tsx`, backed by `getListing(slug)`. Pre-render with `generateStaticParams`.
- Edge logic lives in `proxy.ts` (Next.js 16 renamed `middleware.ts`).

## Components and design

- **Server Components by default.** Opt into `"use client"` only for genuine interactivity (e.g., `CategoryTabs`).
- Design tokens are defined once in `app/globals.css` inside the `@theme` block. **Use the named utility classes** (`bg-paper`, `text-loop`, `font-display`, `shadow-card`) — don't paste raw hex or duplicate tokens.
- Mobile-first responsive. Breakpoints: `md:` 768px (tablet), `lg:` 1024px (desktop). Container max-width grows `430px` → `760px` → `1280px`.

## Tooling

- `npm run dev` uses **Webpack** (`next dev --webpack`), not Turbopack. Turbopack spawns one PostCSS subprocess per CSS file under `@tailwindcss/postcss` — heavy on this laptop. Revisit when Tailwind ships a Turbopack-native plugin or CSS surface area is small enough that the overhead doesn't matter.
- Affiliate clicks route through `/api/go/[id]?p={vendor}` for click tracking and sub-ID injection. **Endpoint lands in Phase 4**; the `PLACEHOLDER_*` strings in `booking.productId` are intentional until then. WhatsApp links already work.
