# StayLooped redesign — approved design reference

Static HTML prototypes of the warm, minimal **Chiang Mai** homepage redesign, approved as the
visual direction. These are **standalone mockups** (inline CSS/JS, Google Fonts) and are **not yet
wired into the Next.js app** — they're the spec to port from.

## Files

- **`homepage.html`** — the redesigned landing page:
  - Split hero with a custom inline-SVG dusk scene: **Thapae Gate**, **Doi Suthep** with the golden
    chedi of Wat Phra That, a friendly **elephant** lifting a lantern, and drifting **Yi Peng** sky
    lanterns.
  - **"Tip for this month"** strip — auto-detects the current month, arrows to browse other months,
    links to the full guide. 12 months of seasonal tips in EN / 中文 / ไทย (positive-first; smoke-season
    months carry a gentle "check the air quality on hazier days" nudge).
  - Local-pick cards using real catalog listings, **"How booking works"**, and a trust footer.
  - Faint **Lanna-lantern** line pattern behind the Experiences section (crown + chevron tails).
  - Working **EN · 中文 · ไทย** switcher (swaps headline, intro, labels, section titles, and month tips).

- **`guide-november.html`** — the long-form monthly guide page the homepage tip links out to
  (what `/guide/[month]` would render): at-a-glance weather stats, month navigation, long-form
  sections (Yi Peng & Loy Krathong, mountains, warm-weather activities, eat & drink, before-you-go),
  and related experiences. English for now; would be localized in the real build.

## Decisions baked in

- Warm StayLooped palette (terracotta / jade / gold / paper), **not** the reference's corporate blue.
- No fabricated star ratings — social proof is the **"Looped by [a local]"** credit instead.
- "Help" / contact email omitted (no inbox yet); "Curated by locals" hero badge hidden until there
  are real host avatars.

## Porting plan (next)

1. Hero + SVG scene → `components/Hero.tsx`, wired to the existing `next-intl` strings.
2. Month-guide strip → a new component, with the 12 tips in a `content/` file (editable, EN/ZH/TH).
3. Cards + "How booking works" + footer → warm styling over the real listing data.
4. Per-month guide pages → `app/[locale]/guide/[month]/page.tsx`, tips sourced from `content/`.

Live prototype links are in the conversation that produced these; update them here if they move.
