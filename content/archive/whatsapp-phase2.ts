/**
 * Phase 2 restore: WhatsApp-booked listings.
 *
 * These 2 experiences and 4 bundles use `booking.type === "whatsapp"` for
 * direct-message booking with operators. Pulled out of the live catalog for
 * Phase 1 (MVP launch) because we don't yet have ops capacity to handle the
 * inbound WhatsApp threads. Restore by re-importing into `experiences.ts` /
 * `bundles.ts` once Phase 2 ops booking is live.
 *
 * Chinese translations for these slugs live alongside this file in
 * `./whatsapp-phase2.zh.ts` — restore both together.
 *
 * Not imported anywhere by design.
 */
import type { Bundle, Experience } from "../types";

export const whatsappExperiences: Experience[] = [
  {
    kind: "experience",
    slug: "massage",
    emoji: "🧘",
    category: "wellness",
    title: "Lila Thai Massage — Thapae Branch",
    hook: "Founded to employ ex-prisoners — and it shows in the discipline.",
    price: 350,
    priceLabel: "฿350 / hour",
    duration: "60 minutes",
    distance: "3 min walk",
    rating: "⭐ 4.9 · 428 loops",
    contributorSlug: "noi",
    contributorQuote:
      "Eight years here and Lila is still where I send guests on day one — proper pressure, proper story.",
    description:
      "Founded by the former director of Chiang Mai Women's Prison to give released inmates work, Lila trains every therapist through a 180-hour Public Health-endorsed program. The Thapae branch is the closest of their Old City locations — clean, quiet, and the most consistently reviewed traditional Thai massage in walking distance of the gate.",
    inclusions: [
      "60-minute traditional Thai massage with certified therapist",
      "Loose massage clothing provided",
      "Welcome herbal tea",
      "Air-conditioned private/shared rooms",
      "Longer 90 / 120 min packages also available",
    ],
    booking: {
      type: "whatsapp",
      messageTemplate:
        "Hi! I'd like to book a Thai massage at Lila Thapae branch via StayLooped — referred by my host.",
    },
    background: "from-[#2a1a4a] to-[#5a3a8a]",
  },
  {
    kind: "experience",
    slug: "sunday-market",
    emoji: "🛍️",
    category: "culture",
    title: "Sunday Walking Street Food & Culture Tour",
    hook: "Eight bites on Ratchadamnoen most tourists scroll right past.",
    price: 1200,
    priceLabel: "฿1,200 / person",
    duration: "3 hours",
    distance: "Starts at Thapae Gate",
    rating: "⭐ 4.9 · 203 loops",
    contributorSlug: "pom",
    contributorQuote:
      "I run guests here every Sunday and we still find a new stall — that's the magic of it.",
    description:
      "A licensed local guide walks you down Ratchadamnoen on a Sunday evening — the 1.1 km Walking Street — stopping at the stalls and back-alley vendors a foreigner would scroll past. You'll get 8–10 tastings: sai oua sausage, khanom jeen, mango sticky rice, the Burmese-influenced stuff most tourists miss.",
    inclusions: [
      "Licensed English-speaking guide",
      "8–10 food and drink tastings",
      "Hotel pickup/drop-off within the city",
      "Small group — bottled water provided",
      "Sundays only",
    ],
    booking: {
      type: "whatsapp",
      messageTemplate:
        "Hi! I'd like to join the Sunday Walking Street food tour via StayLooped — referred by my host.",
    },
    background: "from-[#3a2000] to-loop",
  },
];

export const whatsappBundles: Bundle[] = [
  {
    kind: "bundle",
    slug: "unwind",
    emoji: "🧘",
    emojis: ["🧘", "🛺"],
    badge: "2 hrs · any afternoon",
    saveBadge: "Save ฿150",
    category: "wellness",
    title: "The Unwind Afternoon",
    hook: "Your relaxed afternoon, door to door",
    price: 750,
    priceOriginal: 900,
    priceLabel: "฿750 / person",
    duration: "2 hours",
    distance: "Grab included",
    contributorSlug: "noi",
    contributorQuote:
      "I created this because guests kept asking me how to get to the massage place without the hassle. Now it's sorted in one tap.",
    description:
      "Everything for a perfect relaxed afternoon — without having to figure out transport, find the right place, or worry about getting home. Pre-booked time slot, Grab rides both ways, and the best massage therapist in Old City. Arrive. Relax. Be collected.",
    inclusions: [
      "90-min traditional Thai massage at Khun Noi's recommended parlour",
      "Grab ride to the massage place",
      "Grab ride back to your door",
      "Pre-booked time slot (no waiting)",
      "Ginger tea on arrival",
    ],
    booking: {
      type: "whatsapp",
      messageTemplate:
        "Hi! I'd like to book the Unwind Afternoon bundle via StayLooped.",
    },
    background: "from-[#1a1a3a] to-[#2a2a5a]",
  },
  {
    kind: "bundle",
    slug: "golden-hour",
    emoji: "🛕",
    emojis: ["🛕", "🍢", "🛺"],
    badge: "Evening · 3 hrs",
    saveBadge: "Save ฿200",
    category: "culture",
    title: "The Golden Hour",
    hook: "The CM evening everyone remembers",
    price: 1100,
    priceOriginal: 1300,
    priceLabel: "฿1,100 / person",
    duration: "3 hours",
    distance: "Starts at your door",
    contributorSlug: "jake",
    contributorQuote:
      "This is the evening I give every friend who visits me. Temple at sunset, street food, tuk-tuk home. It's the real Chiang Mai.",
    description:
      "The Chiang Mai evening that everyone remembers. Walk the ancient temples as golden hour light hits the stupas. Then your guide takes you through the best street food stalls — 4 tastings included. End the night in a private tuk-tuk back to your door.",
    inclusions: [
      "Old City temple walk at sunset (1.5 hrs)",
      "Local guide throughout",
      "4 street food tastings along the route",
      "Private tuk-tuk ride home to your door",
      "No extra transport costs",
    ],
    booking: {
      type: "whatsapp",
      messageTemplate:
        "Hi! I'd like to book the Golden Hour bundle via StayLooped.",
    },
    background: "from-[#1a1000] to-[#3a2800]",
  },
  {
    kind: "bundle",
    slug: "big-day-out",
    emoji: "🐘",
    emojis: ["🐘", "🥣"],
    badge: "Full day · departs 7am",
    saveBadge: "Save ฿350",
    category: "nature",
    title: "The Big Day Out",
    hook: "Everything sorted before you wake up",
    price: 3100,
    priceOriginal: 3450,
    priceLabel: "฿3,100 / person",
    duration: "Full day",
    distance: "Pickup from your door",
    contributorSlug: "pom",
    contributorQuote:
      "I built this for guests who want a big day without having to think about anything. Just wake up and it's all there.",
    description:
      "Wake up, grab your breakfast box left at the door, and get picked up for the most iconic Chiang Mai experience. The elephant sanctuary, full transport, and lunch all sorted before you even checked your phone. The ultimate low-effort, high-memory day.",
    inclusions: [
      "Breakfast box delivered to your door at 6:45am",
      "Pickup from No.51 or No.55 at 7am",
      "Half-day ethical elephant sanctuary experience",
      "Vegetarian lunch at the sanctuary",
      "Return transport to your door",
    ],
    booking: {
      type: "whatsapp",
      messageTemplate:
        "Hi! I'd like to book the Big Day Out bundle via StayLooped.",
    },
    background: "from-[#0a2a10] to-[#1a4a20]",
  },
  {
    kind: "bundle",
    slug: "lunch-run",
    emoji: "🍜",
    emojis: ["🍜", "🛺"],
    badge: "Lunch · 2 hrs",
    saveBadge: "Save ฿100",
    category: "food",
    title: "The Local Lunch Run",
    hook: "Eat where locals eat. Zero navigation stress.",
    price: 480,
    priceOriginal: 580,
    priceLabel: "฿480 / person",
    duration: "2 hours",
    distance: "Songthaew from door",
    contributorSlug: "malee",
    contributorQuote:
      "Khao Soi Khun Yai is the best khao soi in Chiang Mai. They sell out by 1pm. I've reserved a table for StayLooped guests.",
    description:
      "Eat the best khao soi in Chiang Mai without any of the navigation stress. Your songthaew picks you up, takes you to Khun Yai's before it sells out, and brings you back. Table is pre-reserved. All you do is show up hungry.",
    inclusions: [
      "Songthaew ride both ways from your door",
      "Pre-reserved table at Khao Soi Khun Yai",
      "Guide to order like a local",
      "Khao soi + side dish included in price",
    ],
    booking: {
      type: "whatsapp",
      messageTemplate:
        "Hi! I'd like to book the Local Lunch Run bundle via StayLooped.",
    },
    background: "from-[#3a1500] to-[#7a3a0a]",
  },
];
