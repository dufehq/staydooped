import type { Bundle } from "./types";
import { translateListing } from "./i18n";

export const bundles: Bundle[] = [
  {
    kind: "bundle",
    slug: "unwind",
    emoji: "🧖",
    emojis: ["🧖", "🌿"],
    badge: "2 hrs · daily",
    saveBadge: "Save ฿300",
    category: "wellness",
    title: "Let's Relax — Lanna Bliss Package",
    hook: "Two hours of spa, one ticket, none of the picking.",
    price: 1200,
    priceOriginal: 1500,
    priceLabel: "from ฿1,200 / person",
    duration: "2 hours",
    distance: "Old City branch · walk-in",
    contributorSlug: "noi",
    contributorQuote:
      "When guests want spa-not-Thai-massage, Let's Relax is what I send them to — the Bliss combo is the one to book.",
    description:
      "The Lanna Bliss package at Let's Relax bundles a foot massage, a traditional Thai massage, and a herbal compress finish in one ticket. Pre-book on Klook to lock a time slot — walk-ins on a weekend usually involve a wait. Inclusions, duration breakdown, and discount are set by the operator on the booking page.",
    inclusions: [
      "30-min foot massage",
      "60-min traditional Thai massage",
      "30-min herbal compress treatment",
      "Welcome ginger tea and post-treatment snack",
      "Air-conditioned private rooms",
    ],
    booking: { type: "klook", productId: "2142" },
    background: "from-[#1a1a3a] to-[#2a2a5a]",
  },
  {
    kind: "bundle",
    slug: "golden-hour",
    emoji: "🛕",
    emojis: ["🛕", "🌇"],
    badge: "Evening · 3 hrs",
    saveBadge: "Save ฿200",
    category: "culture",
    title: "Old City Twilight Walking Tour",
    hook: "Three hours, four temples, all of golden hour.",
    price: 1100,
    priceOriginal: 1300,
    priceLabel: "from ฿1,100 / person",
    duration: "3 hours",
    distance: "Starts at Thapae Gate",
    contributorSlug: "jake",
    contributorQuote:
      "Best three hours in the Old City — light hits the stupas at Chedi Luang and you forget you're on a tour.",
    description:
      "A guided 3-hour twilight loop through the Old City's headline temples — Wat Chedi Luang, Wat Phan Tao, Wat Phra Singh, and the Three Kings Monument — timed so golden hour lands on the stupas. An unhurried twilight pace with time at each temple. Ends near the Sunday/Saturday walking street if you want to keep going.",
    inclusions: [
      "English-speaking guide",
      "Entry to Wat Phra Singh and Wat Chedi Luang",
      "Three Kings Monument and Lanna history stop",
      "Small group — meets near Thapae Gate",
      "Bottled water",
    ],
    booking: { type: "klook", productId: "127326" },
    background: "from-[#1a1000] to-[#3a2800]",
  },
  {
    kind: "bundle",
    slug: "big-day-out",
    emoji: "🐘",
    emojis: ["🐘", "💦"],
    badge: "Full day · pickup 7:30am",
    saveBadge: "Save ฿400",
    category: "nature",
    title: "Elephant Camp + Sticky Waterfall",
    hook: "Two of the most-booked day-trips north of Chiang Mai, in one ticket.",
    price: 2800,
    priceOriginal: 3200,
    priceLabel: "from ฿2,800 / person",
    duration: "Full day",
    distance: "Hotel pickup",
    contributorSlug: "pom",
    contributorQuote:
      "Most guests would do the elephants and the waterfall on two separate days — this combo gets you both before dinner.",
    description:
      "A full-day combo: morning at a no-riding elephant camp in Mae Taeng — feeding and observation, lunch at the camp — then a transfer to Bua Tong, the limestone waterfall you can climb up. Air-conditioned minivan, English-speaking guide, entries included. Pickup zone, group size and inclusions are set by the operator on the booking page.",
    inclusions: [
      "Round-trip hotel pickup in air-conditioned minivan (per operator's pickup zone)",
      "Half-day no-riding elephant camp visit",
      "Lunch at the camp",
      "Climb and swim at Bua Tong Sticky Waterfall",
      "English-speaking guide and entries",
    ],
    booking: { type: "klook", productId: "77519" },
    background: "from-[#0a2a10] to-[#1a4a20]",
  },
  {
    kind: "bundle",
    slug: "lunch-run",
    emoji: "🍜",
    emojis: ["🍜", "🥟"],
    badge: "2 hrs · daily",
    saveBadge: "Save ฿200",
    category: "food",
    title: "Chiang Mai Michelin Food Walking Tour",
    hook: "Two hours through Old City stalls on the operator's Michelin route.",
    price: 1200,
    priceOriginal: 1400,
    priceLabel: "from ฿1,200 / person",
    duration: "2 hours",
    distance: "Meets in Old City",
    contributorSlug: "malee",
    contributorQuote:
      "If you only have one food tour in you, do this one — they hit the stalls I'd take you to myself.",
    description:
      "The compact food tour: a local guide walks you through Old City stalls on the operator's Michelin-themed route — Northern Thai noodles, mango sticky rice, fried dough, steamed dumplings — with the history of each shop along the way. Two hours, no transport faff, eat enough that it's lunch. Exact stall lineup is set by the operator on the booking page.",
    inclusions: [
      "Local English-speaking guide",
      "Multiple street food tastings",
      "Drinks included along the route",
      "Small group — meets at a central old-city point",
      "Daily departures",
    ],
    booking: { type: "klook", productId: "77514" },
    background: "from-[#3a1500] to-[#7a3a0a]",
  },
];

export function getBundle(slug: string, locale = "en"): Bundle | undefined {
  const base = bundles.find((b) => b.slug === slug);
  return base ? translateListing(base, locale) : undefined;
}

export function getAllBundles(locale = "en"): Bundle[] {
  return bundles
    .filter((b) => b.status !== "draft")
    .map((b) => translateListing(b, locale));
}
