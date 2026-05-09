import type { Experience } from "./types";

export const experiences: Experience[] = [
  {
    kind: "experience",
    slug: "elephant",
    emoji: "🐘",
    category: "nature",
    title: "Morning with Rescued Elephants",
    price: 2800,
    priceLabel: "฿2,800 / person",
    duration: "4 hours",
    distance: "45 min drive",
    rating: "⭐ 4.9 · 312 loops",
    contributorSlug: "pom",
    contributorQuote:
      "This is the one thing I recommend to every single guest. Go early.",
    description:
      "Spend a morning with rescued elephants at a certified ethical sanctuary. No riding — just feeding, bathing, and walking alongside them in their natural habitat. One of the most genuinely moving experiences in Thailand.",
    inclusions: [
      "Round-trip transport from your door",
      "Elephant feeding & bathing session",
      "Vegetarian lunch at the sanctuary",
      "English-speaking guide throughout",
      "Souvenir photo package",
    ],
    booking: { type: "klook", productId: "PLACEHOLDER_ELEPHANT" },
    background: "from-[#1a3a1a] to-jade",
    isFeatured: true,
    loops: 48,
  },
  {
    kind: "experience",
    slug: "cooking",
    emoji: "🍳",
    category: "food",
    title: "Thai Cooking Class",
    price: 1200,
    priceLabel: "฿1,200 / person",
    duration: "3 hours",
    distance: "3 min walk",
    rating: "⭐ 4.8 · 247 loops",
    contributorSlug: "malee",
    contributorQuote:
      "Took me 10 years to find a class this good. Right around the corner from the soi.",
    description:
      "Cook 4 classic Thai dishes — pad thai, tom kha, green curry, mango sticky rice — with a local chef whose family has run this school for two decades. You eat everything. Recipes go home with you.",
    inclusions: [
      "Morning market visit to pick fresh ingredients",
      "All cooking ingredients & equipment",
      "Full recipe booklet to take home",
      "Your cooked dishes as lunch",
      "Small group — max 8 people",
    ],
    booking: { type: "klook", productId: "PLACEHOLDER_COOKING" },
    background: "from-[#7a3a0a] to-loop",
  },
  {
    kind: "experience",
    slug: "temple",
    emoji: "🛕",
    category: "culture",
    title: "Old City Temple Walk",
    price: 650,
    priceLabel: "฿650 / person",
    duration: "2.5 hours",
    distance: "Starts at your door",
    rating: "⭐ 4.7 · 189 loops",
    contributorSlug: "jake",
    contributorQuote:
      "I've done this walk 50 times. I learn something new every time.",
    description:
      "Walk through the Ancient Old City with a monk-trained guide. Five temples including Wat Chedi Luang and Wat Phra Singh. Learn the real stories behind the symbols and history that most tourists walk right past.",
    inclusions: [
      "Small group — max 8 people",
      "Local expert guide",
      "All temple entry fees",
      "Traditional merit-making ceremony",
    ],
    booking: { type: "viator", productId: "PLACEHOLDER_TEMPLE" },
    background: "from-[#4a0a0a] to-rose",
  },
  {
    kind: "experience",
    slug: "massage",
    emoji: "🧘",
    category: "wellness",
    title: "Traditional Thai Massage",
    price: 450,
    priceLabel: "฿450 / person",
    duration: "90 minutes",
    distance: "5 min walk",
    rating: "⭐ 4.9 · 428 loops",
    contributorSlug: "noi",
    contributorQuote:
      "I send every visitor here. Best hands in the Old City, no question.",
    description:
      "The best Thai massage in the Old City, full stop. Trained therapists, clean private rooms, no pressure upselling. Book in advance — they fill up by 3pm most days. The perfect end to a temple walk.",
    inclusions: [
      "90-min traditional Thai massage",
      "Private room",
      "Ginger tea before & after",
      "Shower facilities available",
    ],
    booking: {
      type: "whatsapp",
      messageTemplate:
        "Hi! I'd like to book a 90-min Thai massage via StayLooped — referred by my host.",
    },
    background: "from-[#2a1a4a] to-[#5a3a8a]",
  },
  {
    kind: "experience",
    slug: "nimman-coffee",
    emoji: "☕",
    category: "nimman",
    title: "Nimman Coffee Crawl",
    price: 320,
    priceLabel: "฿320 / person",
    duration: "2 hours",
    distance: "15 min by Grab",
    rating: "⭐ 4.8 · 94 loops",
    contributorSlug: "sara",
    contributorQuote:
      "Nimman is CM's creative neighbourhood. These 3 cafés are the real ones, not the tourist traps.",
    description:
      "Hit three of Nimman's best independent specialty coffee shops with a guide who knows the owners. Learn the coffee sourcing stories, try single-origin Thai beans, and soak in the neighbourhood's creative energy.",
    inclusions: [
      "Guide who knows the neighbourhood",
      "3 specialty coffee tastings included",
      "Intro to Thai single-origin beans",
      "Best spots for photos & co-working tips",
    ],
    booking: { type: "gyg", productId: "PLACEHOLDER_COFFEE" },
    background: "from-[#2a1a3a] to-[#6a3a8a]",
  },
  {
    kind: "experience",
    slug: "doi-suthep",
    emoji: "🏔️",
    category: "culture",
    title: "Doi Suthep Temple Day",
    price: 950,
    priceLabel: "฿950 / person",
    duration: "Full day",
    distance: "30 min drive",
    rating: "⭐ 4.8 · 501 loops",
    contributorSlug: "jake",
    contributorQuote:
      "Don't leave Chiang Mai without doing this. The view from the top changes you.",
    description:
      "Visit the sacred Doi Suthep temple perched 1,080m above Chiang Mai with panoramic city views. Continue to the royal Bhubing Palace garden and a hilltribe village. The essential Chiang Mai day.",
    inclusions: [
      "Shared minivan (pick up from your door)",
      "Temple entry fee included",
      "Local guide all day",
      "Lunch at hilltribe village",
    ],
    booking: { type: "klook", productId: "PLACEHOLDER_DOI" },
    background: "from-[#0a1a3a] to-sky",
  },
  {
    kind: "experience",
    slug: "sunday-market",
    emoji: "🛍️",
    category: "culture",
    title: "Sunday Night Market Tour",
    price: 550,
    priceLabel: "฿550 / person",
    duration: "3 hours",
    distance: "2 min walk",
    rating: "⭐ 4.9 · 203 loops",
    contributorSlug: "pom",
    contributorQuote:
      "It starts right at your door at 5pm. Go early for the best food stalls.",
    description:
      "Navigate the famous Sunday Walking Street like a local. Your guide knows every stall, hidden craft vendor, and best photo spot. Includes 4 street food tastings — mango sticky rice, grilled skewers, coconut ice cream, and more.",
    inclusions: [
      "Local food guide through the market",
      "4 street food tastings included",
      "Hidden vendor access",
      "Shopping & price negotiation tips",
    ],
    booking: {
      type: "whatsapp",
      messageTemplate:
        "Hi! I'd like to join the Sunday Night Market tour via StayLooped.",
    },
    background: "from-[#3a2000] to-loop",
  },
  {
    kind: "experience",
    slug: "zipline",
    emoji: "🌿",
    category: "adventure",
    title: "Jungle Zip-line Adventure",
    price: 2200,
    priceLabel: "฿2,200 / person",
    duration: "6 hours",
    distance: "40 min drive",
    rating: "⭐ 4.8 · 156 loops",
    contributorSlug: "tom",
    contributorQuote:
      "28 lines, rope bridges, free-fall drop. Perfect for groups who want a proper adrenaline day.",
    description:
      "Fly through the jungle canopy on one of Thailand's most thrilling courses. 28 lines, rope bridges, and a 30-meter free-fall drop. All safety gear included. Great for groups of friends — everyone leaves buzzing.",
    inclusions: [
      "Return transport from Thapae Gate",
      "All safety equipment & training",
      "Experienced bilingual guides",
      "Lunch at the jungle camp",
      "GoPro video package",
    ],
    booking: { type: "klook", productId: "PLACEHOLDER_ZIPLINE" },
    background: "from-[#0a2a15] to-jade",
  },
];

export function getExperience(slug: string): Experience | undefined {
  return experiences.find((e) => e.slug === slug);
}

export function getFeaturedExperience(): Experience {
  const featured = experiences.find((e) => e.isFeatured);
  if (!featured) throw new Error("No featured experience set");
  return featured;
}

export function getNonFeaturedExperiences(): Experience[] {
  return experiences.filter((e) => !e.isFeatured);
}
