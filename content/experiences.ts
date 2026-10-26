import type { Experience } from "./types";
import { translateListing } from "./i18n";

export const experiences: Experience[] = [
  {
    kind: "experience",
    slug: "elephant",
    emoji: "🐘",
    category: "nature",
    title: "Kerchor Elephant Eco Park — Half Day",
    hook: "A no-riding camp in the Mae Taeng valley — feeding and observation only.",
    price: 1200,
    priceMax: 1950,
    priceLabel: "฿1,200 – ฿1,950 / person",
    duration: "5 hours",
    distance: "1 hr drive north",
    contributorSlug: "pom",
    contributorQuote:
      "I only send guests to ethical sanctuaries — no riding, no tricks, just elephants being elephants.",
    description:
      "A half-day visit to a no-riding elephant camp in the Mae Taeng valley north of Chiang Mai. You feed the elephants seasonal fruit and watch them bathe in the river — no riding, no shows. Small groups, lunch at the camp, and an English-speaking guide. Pickup zone, group size and inclusions are set by the operator on the booking page.",
    inclusions: [
      "Round-trip hotel pickup (per operator's pickup zone)",
      "Feeding session with the camp's elephants",
      "River bathing observation",
      "Lunch at the camp",
      "English-speaking guide",
    ],
    booking: { type: "klook", productId: "15060" },
    background: "from-[#1a3a1a] to-jade",
    isFeatured: true,
  },
  {
    kind: "experience",
    slug: "cooking",
    emoji: "🍳",
    category: "food",
    title: "Half-Day Thai Cooking Class — Old City",
    hook: "Five Northern Thai dishes you'll actually cook again at home.",
    price: 1000,
    priceLabel: "from ฿1,000 / person",
    duration: "4 hours",
    distance: "5 min walk",
    contributorSlug: "malee",
    contributorQuote:
      "Their khao soi paste from scratch is the closest I've eaten to my grandma's version.",
    description:
      "A small-group Old City cooking class that typically opens with a guided walk through a nearby fresh market to pick herbs, then back to the school's open-air kitchen to cook a set of Northern Thai dishes you've chosen. Menu, group size and pickup zone are set by the operator on the booking page.",
    inclusions: [
      "Guided local market tour with the chef",
      "Cook and eat dishes you choose from the menu",
      "Ingredients, apron, recipe booklet to take home",
      "Small group",
      "Hotel pickup available within Old City (per operator's pickup zone)",
    ],
    booking: { type: "klook", productId: "128275" },
    background: "from-[#7a3a0a] to-loop",
  },
  {
    kind: "experience",
    slug: "massage",
    emoji: "🧘",
    category: "wellness",
    title: "Lila Thai Massage — Ratchadamnoen Branch",
    hook: "Well-reviewed traditional Thai massage on the walk to Wat Phra Singh.",
    price: 400,
    priceMax: 1200,
    priceLabel: "฿400 – ฿1,200 / hour",
    duration: "60 minutes",
    distance: "5 min walk",
    contributorSlug: "noi",
    contributorQuote:
      "Eight years here and Lila is still where I send guests on day one — proper pressure, proper story.",
    description:
      "A long-running Old City Thai massage shop on Ratchadamnoen Road — clean, quiet, and easy to walk to from Thapae Gate. 60-minute traditional Thai massage is the standard booking; longer 90 / 120 min packages are also available on the operator's page.",
    inclusions: [
      "60-minute traditional Thai massage",
      "Loose massage clothing provided",
      "Welcome herbal tea",
      "Air-conditioned rooms",
      "Longer 90 / 120 min packages also bookable",
    ],
    booking: { type: "klook", productId: "88648" },
    background: "from-[#2a1a4a] to-[#5a3a8a]",
  },
  {
    kind: "experience",
    slug: "coffee-farm",
    emoji: "☕",
    category: "nature",
    title: "Jungle Coffee Farm — Trek, Roast & Brew",
    hook: "Skip the cafés. Walk the trail, roast the beans, brew the cup yourself.",
    price: 3800,
    priceLabel: "from ฿3,800 / person",
    duration: "Full day",
    distance: "1.5 hr drive",
    contributorSlug: "sara",
    contributorQuote:
      "I've café-hopped Chiang Mai for two years — this was the first time I actually understood what I was drinking.",
    description:
      "A small-group day trip to a Chiang Mai coffee farm in the hills outside the city. You walk the plantation trail, learn how the cherries are picked and processed, try hand-roasting at the farm's roast lab, then brew a cup yourself. Group size, pickup zone, and exact inclusions are set by the operator on the booking page.",
    inclusions: [
      "Hotel pickup / drop-off (per operator's pickup zone)",
      "Guided trek through the plantation",
      "Hands-on roasting demonstration at the farm's roast lab",
      "Tasting of beans grown on the farm",
      "Lunch on the farm",
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
    priceLabel: "from ฿1,100 / person",
    status: "draft",
    duration: "5 hours",
    distance: "40 min drive",
    contributorSlug: "jake",
    contributorQuote:
      "If you've only got one morning, this is the run I take every visiting friend on.",
    description:
      "A guided half-day up Doi Suthep covering the gilded chedi at Wat Phra That Doi Suthep, the gardens of Bhubing (the royal winter residence), and a Hmong village at the summit for textiles and a viewpoint. Easier than figuring out a songthaew if it's your first trip up. Pickup zone and stop order are set by the operator on the booking page.",
    inclusions: [
      "Round-trip hotel pickup in air-conditioned minivan (per operator's pickup zone)",
      "English-speaking guide",
      "Temple entry and Bhubing Palace entry fees",
      "Stops at Doi Suthep, Bhubing gardens, Hmong village",
      "Bottled water",
    ],
    booking: { type: "klook", productId: "18012" },
    background: "from-[#0a1a3a] to-sky",
  },
  {
    kind: "experience",
    slug: "street-eats",
    emoji: "🍢",
    category: "food",
    title: "Chiang Mai Street Eats — Evening Food Tour",
    hook: "Northern-Thai bites in the alleys most tourists scroll right past.",
    price: 1550,
    priceLabel: "from ฿1,550 / person",
    duration: "3.5 hours",
    distance: "Meets near Thapae Gate",
    contributorSlug: "pom",
    contributorQuote:
      "I send guests on this one when they want the night-market food without me having to map every stall.",
    description:
      "A small-group evening walk with a local guide, stopping at stalls and back-alley vendors a first-time visitor would never find — sai oua sausage, khanom jeen, mango sticky rice, and other Northern-Thai dishes you wouldn't find on a guidebook map. Number of tastings, route, and meeting point are set by the operator on the booking page.",
    inclusions: [
      "Local English-speaking guide",
      "Multiple food and drink tastings",
      "Small group — meets at a central old-city point",
      "Runs most evenings (check operator's schedule)",
      "Bottled water",
    ],
    booking: { type: "klook", productId: "109352" },
    background: "from-[#3a2000] to-loop",
  },
  {
    kind: "experience",
    slug: "zipline",
    emoji: "🌿",
    category: "adventure",
    title: "Pongyang Jungle Coaster & Zipline",
    hook: "Zipline circuit through Mae Rim canopy — plus the rail coaster the kids want.",
    price: 4150,
    priceMax: 6450,
    priceLabel: "฿4,150 – ฿6,450 / person",
    duration: "6 hours",
    distance: "1 hr drive",
    contributorSlug: "tom",
    contributorQuote:
      "I keep going back to Pongyang — fun day out, fewer queues than the bigger names.",
    description:
      "A combo ticket for Pongyang's signature pair: a multi-station zipline circuit through the Mae Rim forest plus the alpine coaster on rails that snakes down the same hillside. Same canopy views as the bigger-name parks, with a rail coaster the kids ask about. Course details, station count, and pickup zone are set by the operator on the booking page.",
    inclusions: [
      "Zipline course and jungle coaster rides",
      "Safety gear and instructors",
      "Round-trip hotel pickup (per operator's pickup zone)",
      "Light refreshments / drinking water",
      "Insurance and park entry",
    ],
    booking: { type: "klook", productId: "88017" },
    background: "from-[#0a2a15] to-jade",
  },
  {
    kind: "experience",
    slug: "doi-inthanon",
    emoji: "🌄",
    category: "nature",
    title: "Doi Inthanon — Full-Day Small Group Tour",
    hook: "Thailand's highest peak, twin pagodas, and a waterfall stop on the way down.",
    price: 1950,
    priceLabel: "from ฿1,950 / person",
    duration: "Full day",
    distance: "2 hr drive south",
    contributorSlug: "jake",
    contributorQuote:
      "If you've got one full day to spare, send guests up Inthanon — it's the highlight that doesn't fit in a half-day.",
    description:
      "A full-day small-group tour up to Doi Inthanon — Thailand's highest peak — covering the twin royal pagodas, the Kew Mae Pan nature viewpoint, and a waterfall stop on the way back down. Pickup zone, group size and exact stops are set by the operator on the booking page.",
    inclusions: [
      "Round-trip hotel pickup (per operator's pickup zone)",
      "English-speaking guide",
      "National park entry and pagoda gardens",
      "Waterfall and viewpoint stops",
      "Lunch en route",
    ],
    booking: { type: "klook", productId: "384" },
    background: "from-[#0a2a4a] to-sky",
  },
  {
    kind: "experience",
    slug: "night-safari",
    emoji: "🦒",
    category: "nature",
    title: "Chiang Mai Night Safari Park Ticket",
    hook: "Wild animals after dark — open-top tram through three themed zones.",
    price: 550,
    priceMax: 1300,
    priceLabel: "฿550 – ฿1,300 / person",
    duration: "Evening · 3 hours",
    distance: "30 min drive south",
    contributorSlug: "pom",
    contributorQuote:
      "Easy win with families and night-owl guests — different vibe to anything else on the list.",
    description:
      "Evening visit to Chiang Mai Night Safari — a 300+ acre wildlife park with three themed zones you ride through on open-top trams: Savanna Safari, Predator Prowl, and Jaguar Trail. The animals are most active after dusk. Transfer options and ticket tier are set by the operator on the booking page.",
    inclusions: [
      "Night Safari entry ticket",
      "Open-top tram rides through themed zones",
      "Walking-only Jaguar Trail access",
      "Optional hotel transfer add-on (per operator)",
    ],
    booking: { type: "klook", productId: "1112" },
    background: "from-[#0a1a1a] to-[#1a3a2a]",
  },
  {
    kind: "experience",
    slug: "khantoke",
    emoji: "🪘",
    category: "culture",
    title: "Khantoke Dinner & Lanna Cultural Show",
    hook: "Lanna feast on a low table, traditional dance, hill-tribe performances.",
    price: 250,
    priceMax: 1400,
    priceLabel: "฿250 – ฿1,400 / person",
    duration: "Evening · 2 hours",
    distance: "15 min drive",
    contributorSlug: "malee",
    contributorQuote:
      "It's touristy in the good way — the food is properly Northern and the dance program is genuinely well-rehearsed.",
    description:
      "Evening dinner show at the Old Chiang Mai Cultural Center: a Khantoke set — sai oua, hung lay curry, sticky rice, dipping sauces — served on the traditional low pedestal table, followed by Lanna classical dance and rotating hill-tribe performances. Menu, seating tier and transfer options are set by the operator on the booking page.",
    inclusions: [
      "Khantoke set dinner (Northern Thai menu)",
      "Lanna classical dance program",
      "Hill-tribe performance segment",
      "Welcome drink",
      "Optional hotel transfer add-on (per operator)",
    ],
    booking: { type: "klook", productId: "1180" },
    background: "from-[#3a0a1a] to-[#7a1a3a]",
  },
];

export function getExperience(
  slug: string,
  locale = "en",
): Experience | undefined {
  const base = experiences.find((e) => e.slug === slug);
  return base ? translateListing(base, locale) : undefined;
}

const isPublished = (e: Experience) => e.status !== "draft";

export async function getFeaturedExperience(
  locale = "en",
): Promise<Experience> {
  const featured = experiences.find((e) => e.isFeatured && isPublished(e));
  if (!featured) throw new Error("No featured experience set");
  return translateListing(featured, locale);
}

export async function getNonFeaturedExperiences(
  locale = "en",
): Promise<Experience[]> {
  return experiences
    .filter((e) => !e.isFeatured && isPublished(e))
    .map((e) => translateListing(e, locale));
}
