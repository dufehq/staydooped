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
    priceLabel: "฿1,200 / person",
    duration: "2 hours",
    distance: "Old City branch · walk-in",
    contributorSlug: "noi",
    contributorQuote:
      "When guests want spa-not-Thai-massage, Let's Relax is what I send them to — the Bliss combo is the one to book.",
    description:
      "Let's Relax is the cleanest of the chain spas in Old City, and the Lanna Bliss package is the best-value combo on their menu: foot massage, traditional Thai massage, and a herbal compress finish in one ticket. Pre-book on Klook for the discount and a guaranteed slot — walking in on a weekend usually means waiting.",
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
    priceLabel: "฿1,100 / person",
    duration: "3 hours",
    distance: "Starts at Thapae Gate",
    contributorSlug: "jake",
    contributorQuote:
      "Best three hours in the Old City — light hits the stupas at Chedi Luang and you forget you're on a tour.",
    description:
      "A guided 3-hour twilight loop through the Old City's four headline temples — Wat Chedi Luang, Wat Phan Tao, Wat Phra Singh, and the Three Kings Monument — timed so golden hour lands on the stupas. Smaller, calmer, and better-narrated than the daytime versions. Ends near the Sunday/Saturday walking street if you want to keep going.",
    inclusions: [
      "Licensed English-speaking guide",
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
    title: "Elephant Sanctuary + Sticky Waterfall",
    hook: "The two best day-trips north of Chiang Mai, stitched into one.",
    price: 2800,
    priceOriginal: 3200,
    priceLabel: "฿2,800 / person",
    duration: "Full day",
    distance: "Hotel pickup",
    contributorSlug: "pom",
    contributorQuote:
      "Most guests would do the elephants and the waterfall on two separate days — this combo gets you both before dinner.",
    description:
      "The day-out everyone tries to do over two trips, in one. Morning at an ethical no-riding elephant sanctuary in Mae Taeng — feeding, river bathing observation, vegetarian lunch — then a transfer to Bua Tong, the 'sticky' limestone waterfall you can actually climb up. Air-conditioned minivan, English-speaking guide, all entries.",
    inclusions: [
      "Round-trip hotel pickup in air-conditioned minivan",
      "Half-day ethical elephant sanctuary visit",
      "Vegetarian lunch at the sanctuary",
      "Climb and swim at Bua Tong Sticky Waterfall",
      "English-speaking guide and all entries",
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
    title: "Michelin Street Food Walking Tour",
    hook: "Two hours, four Michelin-listed stalls, no menu Googling.",
    price: 1200,
    priceOriginal: 1400,
    priceLabel: "฿1,200 / person",
    duration: "2 hours",
    distance: "Meets in Old City",
    contributorSlug: "malee",
    contributorQuote:
      "If you only have one food tour in you, do this one — they hit the stalls I'd take you to myself.",
    description:
      "The compact food tour: a local foodie guide walks you through four Michelin Bib Gourmand and Plate-listed stalls in the Old City — Hakka-style noodles, mango sticky rice, pa tong go fried dough, khao kriab pak moh steamed dumplings — with the history of each shop along the way. Two hours, no transport faff, eat enough that it's lunch.",
    inclusions: [
      "Local English-speaking foodie guide",
      "4 Michelin-listed street food tastings",
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
  return bundles.map((b) => translateListing(b, locale));
}
