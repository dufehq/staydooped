import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAllListingSlugs, getListing } from "@/content";
import { getContributor } from "@/content/contributors";
import { routing } from "@/i18n/routing";
import { BookCTA } from "@/components/BookCTA";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllListingSlugs().map((slug) => ({ locale, slug })),
  );
}

export default async function ExperienceDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const listing = getListing(slug, locale);
  if (!listing) notFound();

  const tDetail = await getTranslations("Detail");
  const tCommon = await getTranslations("Common");
  const tLoopedBy = await getTranslations("LoopedBy");
  const tCat = await getTranslations("Categories");
  const contributor = getContributor(listing.contributorSlug);
  const isBundle = listing.kind === "bundle";

  return (
    <main className="mx-auto max-w-[430px] pb-12 md:max-w-[1100px] md:pb-20 lg:max-w-[1280px] lg:pb-28">
      <div className="md:grid md:grid-cols-[1.05fr_1fr] md:gap-10 md:px-12 md:pt-12 lg:gap-16 lg:px-16 lg:pt-16">
        {/* Visual hero */}
        <div className="md:sticky md:top-12 md:self-start">
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
            <Link
              href={`/${locale}`}
              aria-label={tCommon("back")}
              className="absolute left-3.5 top-3.5 flex h-9 w-9 items-center justify-center rounded-full bg-night/55 text-base text-paper backdrop-blur-sm md:left-5 md:top-5 md:h-11 md:w-11 md:text-lg"
            >
              ‹
            </Link>
            <div className="absolute right-3.5 top-3.5 md:right-5 md:top-5">
              <LocaleSwitcher />
            </div>
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
            {isBundle ? (
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
            {!isBundle && listing.rating ? (
              <span className="rounded-pill border border-border bg-warm px-2.5 py-1 text-[10px] text-muted md:px-3.5 md:py-1.5 md:text-xs">
                {listing.rating}
              </span>
            ) : null}
          </div>

          <div className="mb-3.5 flex items-start gap-2 rounded-btn bg-warm px-3 py-2.5 md:mb-6 md:gap-3 md:px-5 md:py-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sand text-[15px] md:h-10 md:w-10 md:text-xl">
              {contributor.avatar}
            </span>
            <p className="text-[11.5px] leading-[1.5] text-muted md:text-sm md:leading-relaxed lg:text-base">
              {tLoopedBy("loopedBy")}{" "}
              <strong className="font-medium text-ink">
                {contributor.name}
              </strong>{" "}
              · {contributor.role}
              <br />
              <em>&ldquo;{listing.contributorQuote}&rdquo;</em>
            </p>
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
    </main>
  );
}
