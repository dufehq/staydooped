import Image from "next/image";
import Link from "next/link";
import type { Experience } from "@/content/types";
import { getListingImageUrl } from "@/lib/images";

type Props = {
  experiences: Experience[];
  locale: string;
};

export function ListingList({ experiences, locale }: Props) {
  return (
    <ul className="flex flex-col gap-2 px-[18px] md:grid md:grid-cols-2 md:gap-4 md:px-12 lg:gap-6 lg:px-16">
      {experiences.map((e) => (
        <li key={e.slug}>
          <Link
            href={`/${locale}/e/${e.slug}`}
            className="flex items-center gap-3 rounded-[12px] border border-border bg-white-cream px-3 py-2.5 transition-shadow hover:shadow-ambient active:scale-[0.98] md:gap-5 md:px-5 md:py-4 lg:gap-6 lg:px-6 lg:py-5"
          >
            <div
              className={`relative h-12 w-12 shrink-0 overflow-hidden rounded-[10px] bg-gradient-to-br ${e.background} md:h-16 md:w-16 md:rounded-xl lg:h-20 lg:w-20`}
            >
              <Image
                src={getListingImageUrl(e.slug)}
                alt={e.title}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="mb-0.5 font-serif text-[15px] font-semibold leading-tight text-ink md:mb-1 md:text-lg lg:text-xl">
                {e.title}
              </h3>
              <p className="mb-1 line-clamp-2 text-[10px] leading-snug text-muted md:mb-2 md:text-xs lg:text-sm">
                {e.hook}
              </p>
              <div className="flex items-center gap-2 md:gap-3">
                <span className="text-xs font-medium text-loop md:text-sm lg:text-base">
                  {e.priceLabel}
                </span>
                <span className="text-[9.5px] text-muted md:text-xs">
                  ⏱ {e.duration}
                </span>
              </div>
            </div>
            <span className="shrink-0 text-lg text-border-strong md:text-2xl">
              ›
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
