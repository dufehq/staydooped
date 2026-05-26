export type Category =
  | "food"
  | "culture"
  | "nature"
  | "wellness"
  | "adventure"
  | "nimman";

export const CATEGORIES: { id: Category; icon: string; label: string }[] = [
  { id: "food", icon: "🍜", label: "Food" },
  { id: "culture", icon: "🛕", label: "Culture" },
  { id: "nature", icon: "🐘", label: "Nature" },
  { id: "wellness", icon: "🧘", label: "Wellness" },
  { id: "adventure", icon: "⚡", label: "Adventure" },
  { id: "nimman", icon: "🎨", label: "Nimman" },
];

export type Contributor = {
  slug: string;
  name: string;
  avatar: string;
  role: string;
  loopCount?: number;
};

export type BookingMethod =
  | { type: "klook"; productId: string }
  | { type: "viator"; productId: string }
  | { type: "gyg"; productId: string }
  | { type: "whatsapp"; messageTemplate: string };

type ListingBase = {
  slug: string;
  emoji: string;
  category: Category;
  title: string;
  hook: string;
  /** Lowest tier price in THB. Used for sort/filter. */
  price: number;
  /** Highest tier price in THB. Set when the vendor offers multiple tiers
   *  through our affiliate link. When absent, priceLabel reads "from ฿X". */
  priceMax?: number;
  priceLabel: string;
  duration: string;
  distance: string;
  rating?: string;
  contributorSlug?: string;
  contributorQuote?: string;
  description: string;
  inclusions: string[];
  booking: BookingMethod;
  background: string;
  /** Drafts are excluded from home/listing pages but still resolve at /e/<slug>
   *  for direct preview. Missing = published. Skill writes drafts by default. */
  status?: "draft" | "published";
};

export type Experience = ListingBase & {
  kind: "experience";
  isFeatured?: boolean;
  loops?: number;
};

export type Bundle = ListingBase & {
  kind: "bundle";
  emojis: string[];
  badge: string;
  /** Editorial "Save ฿X" badge. Omit when the vendor's tier range makes a
   *  fixed discount claim misleading. */
  saveBadge?: string;
  /** Editorial strikethrough price. Omit alongside saveBadge. */
  priceOriginal?: number;
};

export type Listing = Experience | Bundle;
