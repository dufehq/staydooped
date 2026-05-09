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
  tagline?: string;
  price: number;
  priceLabel: string;
  duration: string;
  distance: string;
  rating?: string;
  contributorSlug: string;
  contributorQuote: string;
  description: string;
  inclusions: string[];
  booking: BookingMethod;
  background: string;
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
  saveBadge: string;
  priceOriginal: number;
};

export type Listing = Experience | Bundle;
