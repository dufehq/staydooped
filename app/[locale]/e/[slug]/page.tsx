import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAllListingSlugs, getListing } from "@/content";
import { routing } from "@/i18n/routing";
import { BookCTA } from "@/components/BookCTA";
import { StickyBookBar } from "@/components/StickyBookBar";
import { TopNav } from "@/components/TopNav";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllListingSlugs().map((slug) => ({ locale, slug })),
  );
}

const OG_LOCALE: Record<string, string> = {
  en: "en_US",
  zh: "zh_CN",
  th: "th_TH",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const listing = await getListing(slug, locale);
  if (!listing) return {};

  const image = `/images/listings/${slug}.webp`;
  const enPath = `/e/${slug}`;
  const zhPath = `/zh/e/${slug}`;
  const canonical = locale === "en" ? enPath : `/${locale}/e/${slug}`;

  return {
    title: listing.title,
    description: listing.hook,
    alternates: {
      canonical,
      languages: { en: enPath, zh: zhPath },
    },
    openGraph: {
      type: "article",
      siteName: "StayLooped",
      locale: OG_LOCALE[locale] ?? "en_US",
      title: listing.title,
      description: listing.hook,
      images: [{ url: image, width: 1920, height: 1072, alt: listing.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: listing.title,
      description: listing.hook,
      images: [image],
    },
  };
}

export default async function ExperienceDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const listing = await getListing(slug, locale);
  if (!listing) notFound();

  const tDetail = await getTranslations("Detail");
  const tCat = await getTranslations("Categories");
  const isBundle = listing.kind === "bundle";

  return (
    <main className="mx-auto max-w-[430px] pb-32 md:max-w-[1100px] md:pb-20 lg:max-w-[1280px] lg:pb-28">
      <TopNav />
      <div className="md:grid md:grid-cols-[1.05fr_1fr] md:gap-10 md:px-12 md:pt-12 lg:gap-16 lg:px-16 lg:pt-16">
        {/* Visual hero */}
        <div className="md:sticky md:top-[52px] md:self-start">
          <div
            className={`relative h-[220px] overflow-hidden bg-gradient-to-br ${listing.background} md:h-[480px] md:rounded-card lg:h-[560px]`}
          >
            <Image
              src={`/images/listings/${listing.slug}.webp`}
              alt={listing.title}
              fill
              priority
              sizes="(min-width: 1024px) 545px, (min-width: 768px) 545px, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Text content */}
        <article className="px-5 pt-5 md:px-0 md:pt-0">
          <p className="mb-1.5 text-[9px] font-medium uppercase tracking-[0.25em] text-loop md:mb-3 md:text-xs lg:text-sm">
            {isBundle
              ? `${tDetail("bundleLabel")} · ${listing.duration}`
              : `${tCat(listing.category)} · ${listing.duration}`}
          </p>
          <h1 className="mb-3 font-serif text-[26px] font-semibold leading-[1.1] text-ink md:mb-5 md:text-4xl lg:text-5xl">
            {listing.title}
          </h1>

          <div className="mb-3.5 flex flex-wrap items-center gap-1.5 md:mb-6 md:gap-2.5">
            <span className="font-serif text-xl font-semibold text-loop md:text-3xl lg:text-4xl">
              {listing.priceLabel}
            </span>
            {isBundle && listing.priceOriginal && listing.priceOriginal > listing.price ? (
              <span className="text-xs text-muted line-through md:text-sm lg:text-base">
                ฿{listing.priceOriginal.toLocaleString()}
              </span>
            ) : null}
            <span className="rounded-pill border border-border bg-warm px-2.5 py-1 text-[10px] text-muted md:px-3.5 md:py-1.5 md:text-xs">
              {listing.duration}
            </span>
            <span className="rounded-pill border border-border bg-warm px-2.5 py-1 text-[10px] text-muted md:px-3.5 md:py-1.5 md:text-xs">
              {listing.distance}
            </span>
          </div>

          <p className="mb-4 text-[13.5px] leading-[1.7] text-muted md:mb-6 md:text-base md:leading-relaxed lg:text-lg">
            {listing.description}
          </p>

          <p className="mb-2 text-[9px] font-medium uppercase tracking-[0.25em] text-muted md:mb-3 md:text-xs lg:text-sm">
            {isBundle ? tDetail("whatsInTheBundle") : tDetail("whatsIncluded")}
          </p>
          <ul className="mb-5 flex flex-col gap-1.5 md:mb-8 md:gap-2.5">
            {listing.inclusions.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-[13px] leading-[1.5] text-ink md:gap-3 md:text-base lg:text-lg"
              >
                <span className="mt-0.5 shrink-0 text-jade md:text-xl">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <BookCTA
            booking={listing.booking}
            slug={listing.slug}
            locale={locale}
          />
        </article>
      </div>

      <StickyBookBar
        booking={listing.booking}
        slug={listing.slug}
        locale={locale}
        priceLabel={listing.priceLabel}
      />
    </main>
  );
}
