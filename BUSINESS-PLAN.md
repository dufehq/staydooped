# StayLooped — Business Plan

_Companion to [PLAN.md](PLAN.md) (the build roadmap). This is the "why it makes money" doc. Last updated 2026-11-22._

---

## 1. What this is

A **trilingual (EN/ZH/TH) affiliate concierge** for short-stay guests in Chiang Mai. A guest scans a QR placed in their accommodation → lands on a curated, locally-voiced shortlist of experiences → taps through to Klook / GetYourGuide → we earn affiliate commission. No inventory, no fulfilment, no payment handling.

The product is **trust + curation + language access**, not the activities themselves. It started in two houses on Thapae Soi 4, but **the asset is the model, not those houses** — the QR-to-guide funnel is property-agnostic and the marginal cost of an extra placement is ~zero. The aim now is to put QR codes well beyond the original two houses (more properties, then partner hosts/guesthouses), so the site is a replicable in-room concierge layer, not a microsite for two addresses.

> **Current technical reality (2026-10):** Supabase was paused for inactivity, so the live site runs on **static content** (`content/*.ts` + `public/images/listings/`). Everything below is unaffected — the affiliate model never depended on Supabase.

## 2. Unit economics (the honest math)

Conservative per-placement numbers:

| Variable | Conservative | Notes |
|---|---|---|
| Avg booking value (group) | ฿2,500 | ~2 people; catalog spans ฿250–฿6,400 |
| Klook affiliate rate | ~5% | Klook Partners typically 2–7% on activities |
| Commission per converting group | **~฿125** | low — this is the core constraint |
| Guest groups / placement / year | ~80 | ~4-night avg stay, ~85% occupancy |
| Scan rate (QR → site) | 40% | in-room placement |
| Click-through to vendor | 25% | matches the 15–25% target in PLAN.md |
| Booking conversion (vendor side) | 8% | **out of our control** |

**Two original houses ≈ 1–2 bookings/yr ≈ ~฿160/yr.** That number is the whole point: a 2-property funnel is pocket money. The only lever that produces real revenue is **more placements**.

## 3. The three levers (priority order)

**Lever 1 — More placements (volume). The only path to real money.** One locale-aware landing page serves N locations at ~zero marginal cost. Roll QR codes out across more properties and pitch partner hosts/guesthouses: *"Free in-room concierge for your guests — you keep them happy, I handle the tech."* Each placement gets a `?h=<placement>` QR so revenue is attributable per location.
**Target:** 25–50 placements in 12 months → ฿4k–8k/yr from commission alone. Still modest, which is why Levers 2–3 and the SaaS line matter.

**Lever 2 — Higher-value, higher-conversion inventory.** Day-trip commissions are thin. Add arrival-intent products where the decision is already made:
- **eSIM / data** — near-100% attach for arriving guests, instant conversion. Best single affiliate add for an arrival funnel. *(This is what the ArrivalPopup surfaces.)*
- **Airport transfers / private car** — high intent, books immediately on arrival. *(Popup + existing CarCallout.)*
- **Multi-day & Pai/Chiang Rai trips** — ฿4,000+ baskets.
- **Lazada / Shopee everyday needs** — high-frequency, low-friction (already in `/guide`).

**Lever 3 — Conversion of the funnel we DO control (scan → click).** Codebase home turf: fast trilingual load, no English-first dead-ends, prominent locale switch, a clean dismissible arrival popup, clear cards. The current UI redesign (warm, minimal, Chiang Mai dusk) is part of this lever.

## 4. Revenue model — diversify beyond pure affiliate

1. **Affiliate commission** (current) — Klook primary (AID 121431); apply to GetYourGuide (1 listing earns ฿0 today); add eSIM / transfer / Grab programs.
2. **Host SaaS / white-label** (the scalable one) — once 10+ placements, charge partner hosts a small flat monthly fee (~฿200–500/mo) for the branded in-room concierge + QR + analytics. Recurring, decoupled from the lossy booking funnel.
3. **Featured placement** — local operators pay to be a host's pick. Only at traffic scale; preserve editorial integrity (the "Looped by" credit is load-bearing per AGENTS.md).

## 5. Engineering roadmap → revenue map

| Priority | Item | Why it earns | Status |
|---|---|---|---|
| **P0** | Finish Day-2: domain, `KLOOK_AFF_ID` in Vercel prod, QR, smoke test | **No commission is tracked until prod env vars are set** | open |
| **P1** | Arrival popup: eSIM + airport transfer | Highest-conversion arrival-intent products | **shipped (Option A)** |
| **P1** | Per-placement QR sub-IDs (`?h=`) into `aff_adid` | Attribute revenue per location → proves model to new hosts | planned |
| **P1** | Apply to GetYourGuide program | 1 listing earns ฿0 today | open |
| **P1** | Fix `doi-inthanon` (flagged delisted on Klook, still published) | A dead affiliate link earns nothing and erodes trust | open |
| **P2** | UI redesign (warm/minimal Chiang Mai) | Lifts scan → click conversion | prototype |

> **Arrival popup (live).** A dismissible first-visit popup promoting a Klook eSIM +
> a Chiang Mai airport transfer, with a "don't show again" toggle (localStorage) so it
> never nags repeat scanners. Ships with Klook search links (`thailand esim` /
> `chiang mai airport transfer`, `aid=121431`, same pattern as `CarCallout`); upgrade
> to specific products later for cleaner landing + per-product attribution.

## 6. Costs

Near-zero (Vercel, domain ~฿400/yr, occasional image gen). Profitable at any positive revenue. Keep it lean until host-SaaS justifies spend. Supabase can stay paused until the catalog-automation workload returns.

## 7. 90-day plan

- **Weeks 1–2:** Close Day-2 blockers so commission is actually tracked. Ship the arrival popup. Fix the dead `doi-inthanon` link.
- **Weeks 3–6:** Per-placement attribution. Run a full guest cycle. Produce one real dashboard: "X scans → Y clicks → Z bookings → ฿N." **That artifact is the sales pitch to other hosts.**
- **Weeks 7–12:** Pitch 5 neighbouring guesthouses with the dashboard, onboard 2–3.

## 8. Honest risks

- **Vendor-side conversion is out of our control** — a perfect click can still earn ฿0 if the operator's checkout loses the guest. Mitigate with arrival-intent products (eSIM/transfer) where the decision is already made.
- **Affiliate dependency** — Klook can change rates or close the program. Diversify vendors and stand up the host-SaaS line so revenue isn't 100% commission.
- **Volume is the business.** Two houses is a pilot, not a company. The plan only works if it scales across many placements.

---

**Bottom line:** the build is solid and scale is ~free — that's the moat. But the current funnel caps at pocket money and one step (vendor checkout) is outside our control. The working plan: (1) finish prod/tracking so we earn at all, (2) add arrival-intent high-conversion products (eSIM, transfers), (3) prove per-placement ROI with a real dashboard, then (4) replicate across many hosts and layer in a small recurring SaaS fee.
