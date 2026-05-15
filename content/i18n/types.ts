export type ListingI18n = {
  title?: string;
  hook?: string;
  description?: string;
  contributorQuote?: string;
  inclusions?: string[];
  priceLabel?: string;
  duration?: string;
  distance?: string;
  rating?: string;
  badge?: string;
  saveBadge?: string;
};

export type LocaleTranslations = Record<string, ListingI18n>;
