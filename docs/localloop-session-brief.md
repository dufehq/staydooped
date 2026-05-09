# LocalLoop — Full Session Brief

## Continue from here in a new Claude session

---

## WHO I AM

I own 2 Airbnb houses in **Thapae Soi 4, Chiang Mai, Thailand** (Old City — prime tourist location).

**House No.51** (smaller)

- 1 master bedroom + 1 secondary bedroom (bunk bed)
- 1 bathroom, max 3 guests normally, 4th person +500 THB
- Rate: 1,800 THB/night standard | 1,500 THB low season

**House No.55** (larger)

- 1 master bedroom + 1 secondary bedroom
- 1 bathroom, max 4 guests normally, 5th person +500 THB (sofa bed setup)
- Rate: 2,200 THB/night standard | 1,800 THB low season

**Operations:** I manage with my brother (guest comms), a part-time cleaner, and my father handles minor repairs.

**Occupancy:** Near 100% — almost always fully booked.

**Current upsells:** None active. Had an old GoPro rental poster — never worked.

**My situation:** I have a full-time job (concerned about AI impact on it). I want passive income. Willing to invest 2–3 months building something if it pays off long term. Lean towards low operational load.

---

## MARKET CONTEXT

- Location: Steps from Thapae Gate, Sunday Night Market, Night Bazaar, temples, elephant sanctuaries, cooking schools, massage shops
- Comparable Old City 2BR Airbnbs list at $95–209/night (~฿3,300–7,300 THB) — my current rates are **below market**
- 92% of Chiang Mai Airbnb guests are international tourists
- Peak season: Nov–Feb | Low season: April–June, Sept–Oct
- Average visiting group (3–4 people, 3 nights) spends ฿15,000–30,000+ on experiences
- I currently earn ฿0 of that experience spend

---

## THE PROJECT: LOCALLOOP

We decided to build **LocalLoop** — a community-curated local guide and booking platform for Chiang Mai visitors.

**Brand decisions made:**

- Name: **LocalLoop** (not Thapae Local — too location-specific to scale)
- Tagline: _"Recommended by people who actually live here."_
- Voice: Community-curated, not single-host. Each listing has a **"Looped by"** credit — named local contributors (hosts, expats, guides, food bloggers)
- Not personal advice I haven't tried — contributors vouch for their own picks
- Covers whole city: Old City, Nimman, and beyond — not just Thapae
- Thai + English
- Mobile-first

**Key product innovation — Experience Bundles:**
Pre-packaged combinations that solve a real guest problem in one tap. Examples:

- 🧘 **The Unwind Afternoon** — Thai massage + Grab ride both ways (removes transport friction for places a bit far)
- 🛕 **The Golden Hour** — Temple walk at sunset + street food tastings + tuk-tuk home
- 🐘 **The Big Day Out** — Elephant sanctuary + breakfast box at door + return transport
- 🍜 **The Local Lunch Run** — Lunch at best khao soi spot + songthaew both ways + reserved table

Bundles show original vs bundle price, who created them, and full inclusions.

---

## APPROVED 3-LAYER STRATEGY

### Layer 1 — This Week (Zero tech, zero cost)

**Raise prices immediately:**

- House 51: ฿2,500 peak (Nov–Feb) / ฿2,000 off-peak
- House 55: ฿3,000 peak (Nov–Feb) / ฿2,400 off-peak

**Add 3 paid add-ons to Airbnb listing:**

- Early check-in (before 2pm) → ฿300
- Late checkout (after 11am) → ฿300
- Welcome basket (fruit, snacks, water) → ฿350 (costs ~฿150)

**Remove GoPro poster.** Replace with a handwritten "Local Picks" card.

**Est. impact: +฿15,000–25,000/month**

---

### Layer 2 — 2–3 Weeks (Simple webpage, no backend)

**"LocalLoop Guide"** — a single-page mobile-first website with curated experiences, affiliate booking links, and QR codes placed in both houses + Airbnb welcome message.

Revenue model:

- Viator/Klook affiliate programs: 3–8% per booking (free to join)
- Direct local business deals via WhatsApp: 10–15% commission

Tools: Carrd.co or Webflow (free tier). QR code generator (free).

**Est. impact: +฿5,000–15,000/month (passive after setup)**

A fully designed HTML mockup has already been built. See: `localloop-guide.html`

---

### Layer 3 — 6–8 Weeks Dev (The full platform)

**LocalLoop** — a mobile-first web app where tourists discover and book local experiences. Businesses self-list. Hosts promote via QR code. Platform earns 15% commission automatically via Stripe Connect.

**Tech stack decided:**

- Frontend: **Next.js** (React)
- Backend/DB: **Supabase** (Postgres + Auth + Storage)
- Payments: **Stripe Connect** (15% auto-split, supports Thai Baht + PromptPay)
- Email: **Resend.com** (free tier)
- Hosting: **Vercel** (owner already has Vercel subscription)
- Dev time: 5–7 weeks (1 dev) | 3–4 weeks (2 devs)

**P0 Features (must-have for launch):**

1. Home page — searchable listings by category (Food, Culture, Nature, Adventure, Wellness, Markets)
2. Business listing page (photo, description, price, availability, book button)
3. Booking + Stripe Connect payment (15% commission auto-split at checkout)
4. Business self-onboarding form (name, category, photos, price, bank account)
5. Admin dashboard (approve listings, view bookings, revenue summary)
6. QR code per host → unique branded landing page
7. Email confirmations for guest + business (via Resend.com)

**P1 Features (after launch):**

- Guest reviews (1–5 stars + comment)
- Multi-host referral tracking (which host drove which booking)
- Business subscription tier (฿800/month flat = no commission taken)
- Thai language UI for business self-management

**Commission model:**

- 15% platform commission taken automatically at Stripe checkout
- Business receives 85% via Stripe Connect payout
- Optional: ฿800/month flat subscription for high-volume businesses

**Revenue projections (conservative):**

- Month 3: +฿20,000–50,000/month (10+ businesses, your 2 houses + a few partner hosts)
- Month 6: +฿40,000–90,000/month (all 3 layers running)

---

## GO-TO-MARKET (First 30 Days Post-Launch)

1. Personally approach 10–15 businesses within 500m of Thapae Soi 4. Offer first 2 months free. Target: massage shops, cooking schools, tuk-tuk operators, elephant sanctuaries.
2. Print QR cards for both houses. Add to welcome pack + Airbnb automated check-in message.
3. Contact 5–8 other Airbnb hosts in Old City. Offer them a "host partner" deal — they promote it to guests, earn small referral bonus per booking.
4. Collect reviews. Use them to attract better businesses. Raise commission to 20% as value is proven.

---

## YOUR AI AGENT TEAM

Throughout this project we worked with 3 AI personas. Keep these in future sessions:

**🔍 Researcher**
Specialises in Chiang Mai market data, tourist behaviour in Thapae/Old City, nearby businesses, affiliate programs (Viator/Klook/GetYourGuide), local partner approaches, CM pricing, seasonal patterns. Grounded and specific to CM.

**⚖️ Business Consultant**
Philosophy: "Less is more." Filters ideas ruthlessly by ROI and effort. Protects against scope creep. Direct and honest. Reminds that Layer 1 is highest ROI per hour. Thinks about sustainability and moats.

**📋 PM / Business Analyst**
Produces dev-ready output: DB schemas, user stories, sprint plans, Stripe Connect integration steps for Thailand, Supabase config, API specs. Everything should be copy-pasteable for a developer. Technical and specific.

---

## PENDING TASKS (pick up here)

1. **Generate Claude Code handoff document** — full project setup instructions for dev team (Next.js + Supabase + Stripe Connect + Vercel)
2. **Database schema** — full Supabase table structure for the platform
3. **User stories** — all P0 features written as dev-ready user stories
4. **6-week sprint plan** — week-by-week task breakdown for the dev team
5. **Stripe Connect setup guide** — how commission splits work for Thailand/Thai Baht
6. **Business pitch script** — what to say to local businesses to onboard them
7. **Affiliate setup guide** — how to join Viator and Klook affiliate programs for Layer 2
8. **Airbnb welcome message** — exact copy to promote LocalLoop to guests
9. **Layer 1 pricing** — exact steps to update rates and add-ons in Airbnb today

---

## HOW TO CONTINUE

Paste this entire document at the start of a new Claude session. Then say:

_"Continue as my LocalLoop strategy team. Pick up from the pending tasks list."_

Or ask for any specific task directly — the agent team will know the full context.

---

_Session summary generated by Claude · LocalLoop project · Chiang Mai, Thailand_
