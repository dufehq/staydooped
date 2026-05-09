import type { Bundle } from "./types";

export const bundles: Bundle[] = [
  {
    kind: "bundle",
    slug: "unwind",
    emoji: "🧘",
    emojis: ["🧘", "🛺"],
    badge: "2 hrs · any afternoon",
    saveBadge: "Save ฿150",
    category: "wellness",
    title: "The Unwind Afternoon",
    tagline: "Your relaxed afternoon, door to door",
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
    tagline: "The CM evening everyone remembers",
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
    tagline: "Everything sorted before you wake up",
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
    tagline: "Eat where locals eat. Zero navigation stress.",
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

export function getBundle(slug: string): Bundle | undefined {
  return bundles.find((b) => b.slug === slug);
}
