import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getAllListingSlugs, getListing } from "@/content";
import { getContributor } from "@/content/contributors";
import { routing } from "@/i18n/routing";
import { BookCTA } from "@/components/BookCTA";

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

  const listing = getListing(slug);
  if (!listing) notFound();

  const contributor = getContributor(listing.contributorSlug);
  const isBundle = listing.kind === "bundle";

  return (
    <main className="mx-auto max-w-[430px] pb-12">
      <div
        className={`relative flex h-[220px] items-center justify-center bg-gradient-to-br ${listing.background}`}
      >
        <span className="text-[88px]">{listing.emoji}</span>
        <Link
          href={`/${locale}`}
          aria-label="Back"
          className="absolute left-3.5 top-3.5 flex h-9 w-9 items-center justify-center rounded-full bg-night/55 text-base text-paper backdrop-blur-sm"
        >
          ‹
        </Link>
      </div>

      <article className="px-5 pt-5">
        <p className="mb-1.5 text-[9px] font-medium uppercase tracking-[0.25em] text-loop">
          {isBundle ? `Bundle · ${listing.duration}` : `${listing.category} · ${listing.duration}`}
        </p>
        <h1 className="mb-3 font-serif text-[26px] font-semibold leading-[1.1] text-ink">
          {listing.title}
        </h1>

        <div className="mb-3.5 flex flex-wrap items-center gap-1.5">
          <span className="font-serif text-xl font-semibold text-loop">
            {listing.priceLabel}
          </span>
          {isBundle ? (
            <span className="text-xs text-muted line-through">
              ฿{listing.priceOriginal.toLocaleString()}
            </span>
          ) : null}
          <span className="rounded-pill border border-border bg-warm px-2.5 py-1 text-[10px] text-muted">
            {listing.duration}
          </span>
          <span className="rounded-pill border border-border bg-warm px-2.5 py-1 text-[10px] text-muted">
            {listing.distance}
          </span>
          {!isBundle && listing.rating ? (
            <span className="rounded-pill border border-border bg-warm px-2.5 py-1 text-[10px] text-muted">
              {listing.rating}
            </span>
          ) : null}
        </div>

        <div className="mb-3.5 flex items-start gap-2 rounded-btn bg-warm px-3 py-2.5">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sand text-[15px]">
            {contributor.avatar}
          </span>
          <p className="text-[11.5px] leading-[1.5] text-muted">
            Looped by{" "}
            <strong className="font-medium text-ink">{contributor.name}</strong> ·{" "}
            {contributor.role}
            <br />
            <em>&ldquo;{listing.contributorQuote}&rdquo;</em>
          </p>
        </div>

        <p className="mb-4 text-[13.5px] leading-[1.7] text-muted">
          {listing.description}
        </p>

        <p className="mb-2 text-[9px] font-medium uppercase tracking-[0.25em] text-muted">
          {isBundle ? "What's in the bundle" : "What's included"}
        </p>
        <ul className="mb-5 flex flex-col gap-1.5">
          {listing.inclusions.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-[13px] leading-[1.5] text-ink"
            >
              <span className="mt-0.5 shrink-0 text-jade">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <BookCTA booking={listing.booking} />
      </article>
    </main>
  );
}
