import type { Experience } from "./types";
import { translateListing } from "./i18n";

export const experiences: Experience[] = [
  {
    kind: "experience",
    slug: "elephant",
    emoji: "🐘",
    category: "nature",
    title: "Kerchor Elephant Eco Park — Half Day",
    hook: "No riding. No tricks. Just rescued elephants doing elephant things.",
    price: 2500,
    priceLabel: "฿2,500 / person",
    duration: "5 hours",
    distance: "1 hr drive north",
    rating: "⭐ 4.8 · 312 loops",
    contributorSlug: "pom",
    contributorQuote:
      "I only send guests to ethical sanctuaries — no riding, no tricks, just elephants being elephants.",
    description:
      "A genuinely no-riding sanctuary in the Mae Taeng valley. Rescued elephants roam freely while you feed them seasonal fruit and watch them bathe in the river. Small groups, vegetarian lunch at the camp, and a guide who'll tell you each elephant's story.",
    inclusions: [
      "Round-trip hotel pickup from Chiang Mai city",
      "Hands-on feeding session with rescued elephants",
      "River bathing observation (you watch, not bathe them)",
      "Vegetarian lunch at the sanctuary",
      "English-speaking guide throughout",
    ],
    booking: { type: "klook", productId: "15060" },
    background: "from-[#1a3a1a] to-jade",
    isFeatured: true,
    loops: 48,
  },
  {
    kind: "experience",
    slug: "cooking",
    emoji: "🍳",
    category: "food",
    title: "Half-Day Thai Cooking Class — Old City",
    hook: "Five Northern Thai dishes you'll actually cook again at home.",
    price: 1200,
    priceLabel: "฿1,200 / person",
    duration: "4 hours",
    distance: "5 min walk",
    rating: "⭐ 4.8 · 247 loops",
    contributorSlug: "malee",
    contributorQuote:
      "Their khao soi paste from scratch is the closest I've eaten to my grandma's version.",
    description:
      "A small-group Old City class that opens with a guided walk through a nearby fresh market to pick herbs, then back to the school's open-air kitchen. You cook five Northern Thai dishes you've picked — curries, stir-fries, a soup, a dessert — eat what you make, and leave with the recipe booklet.",
    inclusions: [
      "Guided local market tour with the chef",
      "Cook and eat 5 dishes you choose from the menu",
      "All ingredients, apron, recipe booklet to take home",
      "Small group — max 10 people",
      "Hotel pickup within Old City included",
    ],
    booking: { type: "klook", productId: "128275" },
    background: "from-[#7a3a0a] to-loop",
  },
  {
    kind: "experience",
    slug: "temple",
    emoji: "🛕",
    category: "culture",
    title: "Old City Temples Walking Tour",
    hook: "The Lanna history hiding in plain sight, two minutes from the gate.",
    price: 600,
    priceLabel: "฿600 / person",
    duration: "2 hours",
    distance: "Starts at Thapae Gate",
    rating: "⭐ 4.7 · 189 loops",
    contributorSlug: "jake",
    contributorQuote:
      "Four years here and this walk still surprises me — they unpack things you'd never spot on your own.",
    description:
      "A compact morning loop through the Old City's signature temples — Wat Chedi Luang's ruined Lanna stupa, the teak hall at Wat Phan Tao, and the gilded Wat Phra Singh — with a licensed guide who unpacks the Lanna history and Buddhist iconography you'd otherwise miss. No transport needed; everything's inside the moat.",
    inclusions: [
      "Licensed English-speaking guide",
      "Entry to Wat Phra Singh and Wat Chedi Luang",
      "Small group — meets near Thapae Gate",
      "Bottled water",
    ],
    booking: { type: "viator", productId: "163642P94" },
    background: "from-[#4a0a0a] to-rose",
  },
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
    slug: "nimman-coffee",
    emoji: "☕",
    category: "nature",
    title: "Karen Village Coffee Farm Day",
    hook: "Skip the cafés. Meet the family growing the beans.",
    price: 2800,
    priceLabel: "฿2,800 / person",
    duration: "Full day",
    distance: "1.5 hr drive",
    rating: "⭐ 4.8 · 94 loops",
    contributorSlug: "sara",
    contributorQuote:
      "I've café-hopped Nimman for two years — this was the first time I actually understood what I was drinking.",
    description:
      "Not a café crawl — the source. A small-group day trip to a Karen village coffee farm where you trek through the plantation, pick cherries in season, hand-roast a batch over wood fire and brew it three ways with the farmer. The Karen family has been growing arabica here for two generations.",
    inclusions: [
      "Hotel pickup/drop-off in Nimman or Old City",
      "Guided 2-hour trek through coffee plantation and rice paddies",
      "Hands-on roasting workshop with Karen farmer",
      "Tasting flight of beans grown on the farm",
      "Lunch in the village — max 8 people",
    ],
    booking: { type: "gyg", productId: "524069" },
    background: "from-[#2a1a3a] to-[#6a3a8a]",
  },
  {
    kind: "experience",
    slug: "doi-suthep",
    emoji: "🏔️",
    category: "culture",
    title: "Doi Suthep & Bhubing Palace Half-Day",
    hook: "The mountain trio in one morning — and you don't have to drive.",
    price: 1100,
    priceLabel: "฿1,100 / person",
    duration: "5 hours",
    distance: "40 min drive",
    rating: "⭐ 4.8 · 501 loops",
    contributorSlug: "jake",
    contributorQuote:
      "If you've only got one morning, this is the run I take every visiting friend on.",
    description:
      "The mountain trio in one half-day with a guide and a/c minivan: the gilded chedi at Wat Phra That Doi Suthep, the manicured gardens of Bhubing (the royal winter residence), and a Hmong village at the summit for textiles and a viewpoint. Beats the songthaew-and-guess approach if it's your first trip up.",
    inclusions: [
      "Round-trip hotel pickup in air-conditioned minivan",
      "English-speaking guide",
      "All temple entry and Bhubing Palace fees",
      "Stops at Doi Suthep, Bhubing gardens, Hmong village",
      "Bottled water",
    ],
    booking: { type: "klook", productId: "18012" },
    background: "from-[#0a1a3a] to-sky",
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
  {
    kind: "experience",
    slug: "zipline",
    emoji: "🌿",
    category: "adventure",
    title: "Pongyang Jungle Coaster & Zipline",
    hook: "Forty stations through Mae Rim canopy — plus the coaster the kids actually want.",
    price: 2200,
    priceLabel: "฿2,200 / person",
    duration: "6 hours",
    distance: "1 hr drive",
    rating: "⭐ 4.8 · 156 loops",
    contributorSlug: "tom",
    contributorQuote:
      "Gibbon is the famous one — Pongyang is the one I keep going back to. More fun, less queue.",
    description:
      "A combo ticket for Pongyang's flagship pair: a 40-station zipline circuit through the Mae Rim forest plus the alpine coaster on rails that snakes down the same hillside. Cheaper and less of a production than Flight of the Gibbon, with the same canopy views — and the coaster the kids actually want.",
    inclusions: [
      "Zipline course and jungle coaster rides",
      "All safety gear and English-speaking instructors",
      "Round-trip hotel pickup from Chiang Mai city",
      "Light refreshments / drinking water",
      "Insurance and park entry included",
    ],
    booking: { type: "klook", productId: "88017" },
    background: "from-[#0a2a15] to-jade",
  },
];

export function getExperience(
  slug: string,
  locale = "en",
): Experience | undefined {
  const base = experiences.find((e) => e.slug === slug);
  return base ? translateListing(base, locale) : undefined;
}

export function getFeaturedExperience(locale = "en"): Experience {
  const featured = experiences.find((e) => e.isFeatured);
  if (!featured) throw new Error("No featured experience set");
  return translateListing(featured, locale);
}

export function getNonFeaturedExperiences(locale = "en"): Experience[] {
  return experiences
    .filter((e) => !e.isFeatured)
    .map((e) => translateListing(e, locale));
}
