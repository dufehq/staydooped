---
name: experience-pipeline
description: Add, replace, or audit StayLooped listings sourced from Klook / Viator / GetYourGuide. Handles vendor fetching, content rewrite, EN+ZH+TH translation, Gemini image-prompt generation, WebP conversion, and editorial draft gating. Use when adding new listings, replacing de-listed products, or sweeping the catalog for dead productIds. Skip for bundle creation, copy-only edits, or any task that doesn't involve a vendor product page.
---

# experience-pipeline

Operational skill for the Phase 3 content pipeline described in `PLAN.md`.

## Modes

```
/experience-pipeline add <vendor-url-or-id>      # Add one listing (always draft)
/experience-pipeline check                       # Sweep all live productIds for delisting + price drift
/experience-pipeline top <category> <n>          # Find top-N rated products in a vendor catalog
/experience-pipeline replace <slug> <new-url>    # Swap a listing's productId (e.g. when one delists)
/experience-pipeline image <slug>                # Regenerate just the image for an existing slug
```

If invoked without a mode, ask the user which mode they want.

## Pre-flight (always, before any mode)

1. Read [CLAUDE.md](../../../CLAUDE.md), [AGENTS.md](../../../AGENTS.md), [PLAN.md](../../../PLAN.md) — project conventions change.
2. Confirm a dev server is up on `http://localhost:3000`. If not, start one with `npm run dev` in the background.
3. Confirm `.env.local` has `KLOOK_AFF_ID` set (and `VIATOR_AFF_ID` / `GYG_AFF_ID` for those vendors).
4. Remind the user that the same vars must be set in Vercel for production — affiliate attribution silently fails if they aren't.

## Vendor fetching

**Klook, Viator, and GetYourGuide all bot-block `curl` and `WebFetch` with 403.** Always use Playwright MCP for vendor pages.

Workflow:
1. `browser_navigate(url)` — Klook redirects `/activity/<id>/` to `/activity/<id>-<slug>/`. The resolved Page Title is the product title.
2. `browser_take_screenshot` — to read rating + booked-count badges that aren't in the accessibility snapshot.
3. To find candidate productIds from a search page, parse the YAML snapshot: `grep -oE "/activity/[0-9]+-[a-z0-9-]+" .playwright-mcp/page-*.yml | sort -u`.
4. **Always** `browser_close` at end of session AND `rm -rf .playwright-mcp <screenshots>.png` (per [AGENTS.md](../../../AGENTS.md)). Leaving the browser open leaks cookies into the next run.

URL templates (productId verification):
- Klook: `https://www.klook.com/activity/<id>/`
- Viator: `https://www.viator.com/tours/Chiang-Mai/d5267-<id>` (`<id>` format: digits-P-digits, e.g. `163642P94`)
- GetYourGuide: `https://www.getyourguide.com/chiang-mai-l271/-t<id>`

## Voice & content rules (enforce on every write)

Voice (from `AGENTS.md`):
- No exclamation marks. No marketing-speak.
- Banned superlatives: `best`, `ultimate`, `amazing`, `most`, `only`, `must`, `world-class`, `unforgettable`.
- No founder stories. No multi-generational family claims. No welfare assertions (`ethical`, `rescued`, `sanctuary`) about third-party operators. No named-competitor comparisons.
- Award / Michelin / certification claims OK **only if the vendor's own product title uses them** — quote it as the operator's claim, not ours.

Length caps:
- Title ≤ 55 chars.
- Hook ≤ 80 chars (line-clamp-2 on cards).
- Description: 2–4 sentences. ~80 words max.
- Inclusions: ≤ 5 items, each ≤ 60 chars.

Field rules:
- `price`: integer THB. No decimals, no commas in the number itself.
- `priceLabel`: `"from ฿X,XXX / person"` (use `.toLocaleString()`-friendly format manually).
- Pickup-zone inclusions qualified with `(per operator's pickup zone)`.
- `distance`: framed relative to Thapae Soi 4 where it adds value.
- `status: "draft"` — always for new listings.
- `isFeatured: false` — always for new listings (refuse to add a second featured).
- `contributorSlug`, `contributorQuote`: omit. The contributor pattern is hidden in Phase 1 (per the live UI; see `components/FeaturedCard.tsx` and friends).

## Image rules

- **Never** scrape or embed the vendor's own product photos. License risk.
- Source: Gemini (you generate the prompt; user pastes the PNG into `public/images/listings/<slug>.png`).
- Final format: WebP, 1920×1072, quality 82, effort 5. Target size 150–500 KB.
- Path: `public/images/listings/<slug>.webp`.
- Conversion: use sharp via Node (see Image conversion below).
- After conversion: delete the source PNG. Verify-before-delete: only `rm` the PNG after confirming the WebP exists with non-zero size and correct dimensions.

Image re-check loop (after conversion):
1. `Read` the new WebP back (multimodal vision).
2. Verify:
   - Subject matches the listing's content (the elephant is in the elephant picture)
   - No embedded text, logos, watermarks, or signature glyphs (Gemini sometimes adds a sparkle in the corner — flag it)
   - No AI artifacts: extra fingers, impossible anatomy, melted faces, hallucinated signage
   - Aspect ratio 1920×1072, ~16:9
   - Natural colour grading — not over-saturated, not HDR-fake-looking
3. If any check fails: **regenerate up to 2 more times** with a clarified prompt that addresses the specific failure ("no text in the corners", "no people in centre frame", "less saturated"). After the second retry, stop and ask the user.

## Gemini image prompt template

```
A wide cinematic 16:9 travel photograph for a Chiang Mai <category> card.
Hero subject: <one-sentence concrete subject grounded in the listing>.
Setting: <location detail — outdoor, mountain, river, market, candlelit hall, etc.>.
Mood: <warm | golden hour | dusk | morning mist | candlelight>.
Style: photorealistic, <focal length, e.g. 35mm>mm lens,
<shallow|gentle|deep> depth of field, natural colours, no
over-saturation. No text, no logos, no watermarks, no people
centered prominently unless required by the subject.
Output 1920x1072, landscape orientation.
```

Tune the bracketed slots based on the listing. Reference the four images we generated together (elephant, doi-inthanon, night-safari, khantoke) for tone calibration.

## Slug rules

- kebab-case, ≤ 24 chars, ASCII only.
- Must not collide with any existing slug in `content/experiences.ts` or `content/bundles.ts`.
- Image file `public/images/listings/<slug>.webp` must equal the slug. If renaming, `git mv` the image.

## Background gradient

Pick from the palettes already in use in `content/experiences.ts`. Don't invent new colours. Common patterns:
- `from-[#1a3a1a] to-jade` — green / nature
- `from-[#7a3a0a] to-loop` — orange / warm food
- `from-[#0a1a3a] to-sky` — blue / mountains
- `from-[#2a1a4a] to-[#5a3a8a]` — purple / wellness
- `from-[#3a2000] to-loop` — brown / culture / food
- `from-[#0a2a15] to-jade` — deep green / adventure

Match the gradient to the image's dominant tones.

## Booking method validation

- Only `klook | viator | gyg` allowed. WhatsApp listings are out of program (no affiliate ID — they're parked in `content/archive/whatsapp-phase2.ts`).
- Reject anything else with a clear explanation.

## Add mode — full sequence

1. **Parse input** — accept `https://www.klook.com/activity/<id>/...`, bare numeric ID with assumed Klook, or vendor-prefixed (`klook:15060`, `viator:163642P94`, `gyg:524069`).
2. **Validate productId format** for the vendor (see URL templates).
3. **Open vendor page via Playwright** (see Vendor fetching). Capture title, rating, booked count, primary description.
4. **Gate by quality** — refuse to add if rating < 4.3 OR booked count < 1K. Tell the user and ask for override.
5. **Pick category** from `food | culture | nature | wellness | adventure | nimman`. If ambiguous, ask.
6. **Propose slug** (kebab-case derived from product name). Validate uniqueness against current `content/experiences.ts` + `content/bundles.ts`. If a collision exists, propose an alternative and confirm with user.
7. **Pick background gradient** (see Background gradient).
8. **Write EN content** following Voice & content rules. Fields: `slug`, `emoji`, `category`, `title`, `hook`, `price`, `priceLabel`, `duration`, `distance`, `description`, `inclusions`, `booking`, `background`, `status: 'draft'`.
9. **Append to `content/experiences.ts`** before the closing `];`. Type-check immediately.
10. **Write ZH translation** to `content/i18n/zh.ts` under the slug key. Mirror EN structure (title, hook, description, inclusions, priceLabel, duration, distance).
11. **Write TH translation** to `content/i18n/th.ts` (create the file if missing — mirror the ZH structure). Per PLAN.md, TH content isn't shipping until Phase 2 but write it now since the user opted in.
12. **Generate Gemini image prompt** using the template above. Output as a fenced markdown code block for the user to copy.
13. **Wait** for the user to paste `<slug>.png` to `public/images/listings/`.
14. **Convert to WebP** via the inline node script (see Image conversion).
15. **Re-check image** (see Image rules → re-check loop).
16. **Type-check + build**: `npx tsc --noEmit && npm run build`. Fix anything that breaks. Don't proceed if either fails.
17. **Affiliate URL smoke test**:
    ```bash
    curl -s -o /dev/null -w "%{redirect_url}\n" "http://localhost:3000/api/go/<slug>?locale=en"
    ```
    Expected: `<vendor-domain>/.../?aid=121431&aff_adid=en-<slug>` (or vendor's equivalent affiliate params). If `aid=` is missing → `KLOOK_AFF_ID` not set in `.env.local`.
18. **Report** to user: listing summary, image confirmation, smoke-test result, and **a clear next step**: "Flip `status: 'draft'` → `'published'` in `content/experiences.ts` when you're ready to ship."

## Check mode — full sequence

1. Enumerate `productId`s from `content/experiences.ts` + `content/bundles.ts`.
2. For each: navigate via Playwright (with ~2s delay between requests — be polite). Capture Page Title.
3. Flag as dead if Page Title is `404 Not Found`, contains `not found`, or is the bare vendor domain (e.g. `klook.com`) with no resolved product slug.
4. From the screenshot, OCR-read the rating + booked count (best-effort). Compare to any baseline you have in commit history if useful.
5. Best-effort scrape of current price from the snapshot. Compare to hardcoded `price` field. Flag drift > 15%.
6. Output: markdown table — `slug | vendor | productId | status (live/dead) | rating | booked | price drift | action`.
7. **Don't modify content.** Output is advisory; user decides which to replace / drop.

## Top mode — full sequence

1. Navigate Klook search: `https://www.klook.com/en-US/search/result/?query=<keyword>+chiang+mai`.
2. Take fullPage screenshot.
3. Parse the YAML snapshot for activity links: `grep -oE "/activity/[0-9]+-[a-z0-9-]+" .playwright-mcp/page-*.yml | sort -u`.
4. For each candidate (up to N): navigate the activity page and capture rating + booked count.
5. Filter by rating ≥ 4.5 and booked ≥ 5K.
6. Output: markdown table — `productId | title | rating | booked | category fit`.
7. **Don't add anything.** User picks which to feed into `add` mode.

## Replace mode — full sequence

1. Read the existing listing from `content/experiences.ts`.
2. Verify the new vendor URL via Playwright (rating, booked, title).
3. If new title is materially different (e.g. operator changed) → trigger a rewrite of `title`, `hook`, `description`, `inclusions`. Otherwise just swap the `booking.productId`.
4. Mirror changes to `content/i18n/zh.ts` (and `th.ts`) under the same slug key.
5. Keep `status` unchanged (replace doesn't re-draft an already-published listing).
6. Smoke test + report.

## Image mode — full sequence

1. Read existing listing for content context.
2. Generate fresh Gemini prompt.
3. Wait for user to paste new PNG.
4. Convert + verify (image rules) + replace existing WebP.
5. Don't touch content files.

## Image conversion

```js
// .convert.mjs (gitignored; delete after run)
import sharp from "sharp";
const slug = "<slug>";
await sharp(`public/images/listings/${slug}.png`)
  .resize(1920, 1072, { fit: "cover", position: "centre" })
  .webp({ quality: 82, effort: 5 })
  .toFile(`public/images/listings/${slug}.webp`);
```

Run with `node .convert.mjs`. After confirming the WebP is on disk at correct dimensions, delete both `.convert.mjs` and the source PNG.

## Editorial draft gate (already wired)

- `content/types.ts` ListingBase has `status?: "draft" | "published"`.
- `getFeaturedExperience` and `getNonFeaturedExperiences` filter out drafts.
- `getAllListingSlugs` excludes drafts → no static page generated → 404 in production export.
- `getListing(slug)` still resolves drafts → direct preview works in dev at `/e/<slug>`.
- To publish: manually flip `status: 'draft'` → `'published'` (or delete the field — missing = published).

## Affiliate env-var checklist (surface this when adding the first listing of a new vendor)

| Vendor | env var | needed for |
|---|---|---|
| Klook | `KLOOK_AFF_ID` | every Klook redirect |
| Viator | `VIATOR_AFF_ID` | every Viator redirect |
| GetYourGuide | `GYG_AFF_ID` | every GYG redirect |
| TravelPayouts | `TRAVELPAYOUTS_MARKER` | (unused currently) |

If the user is adding a listing for a vendor whose env var isn't in `.env.local`, **stop and tell them**. The listing will deploy but with no attribution → zero commission.

Also remind them: these env vars must be set in Vercel's environment-variables UI for production deploys. `.env.local` is gitignored and never deploys.

## Tone audit (run before committing content)

Auto-flag in EN content:
- Exclamation marks: `!`
- Superlatives: `\b(best|ultimate|amazing|most|only|must|world-class|unforgettable|magical|stunning|breathtaking)\b`
- Award claims not present in the vendor's title: any of `Michelin|TripAdvisor|Lonely Planet|UNESCO|Bib Gourmand|Plate-listed` should match the vendor's product title verbatim.
- Welfare claims: `ethical|rescued|sanctuary|certified` — flag for human review.

If any flag triggers, surface to the user before writing the file.

## Out of scope

- Bundle creation (`content/bundles.ts`) — bundles are editorial constructs by humans.
- Auto-publishing — always draft.
- Featuring a listing (`isFeatured: true`).
- Scraping vendor images.
- WhatsApp listings (no affiliate program).
- Hooks / blog content / SEO posts.
- Re-sync cron / scheduled tasks — that's `vercel cron` or GitHub Actions, not this skill.

## Reference reading

- [AGENTS.md](../../../AGENTS.md) — voice, conventions, Playwright cleanup rules
- [PLAN.md](../../../PLAN.md) — Phase 3 motivation
- [content/types.ts](../../../content/types.ts) — `Experience`, `Bundle`, `BookingMethod`
- [content/experiences.ts](../../../content/experiences.ts) — example shape and voice
- [content/i18n/zh.ts](../../../content/i18n/zh.ts) — ZH overlay shape
- [app/api/go/[id]/route.ts](../../../app/api/go/[id]/route.ts) — affiliate URL builder
