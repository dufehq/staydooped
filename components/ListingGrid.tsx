import Image from "next/image";
import Link from "next/link";
import type { Experience } from "@/content/types";
import { LoopedBy } from "./LoopedBy";

type Props = {
  experiences: Experience[];
  locale: string;
};

export function ListingGrid({ experiences, locale }: Props) {
  return (
    <div className="grid grid-cols-2 gap-2.5 px-[18px] md:grid-cols-3 md:gap-5 md:px-12 lg:grid-cols-4 lg:gap-6 lg:px-16">
      {experiences.map((e) => (
        <Link
          key={e.slug}
          href={`/${locale}/e/${e.slug}`}
          className="overflow-hidden rounded-[12px] border border-border bg-white-cream transition-transform hover:shadow-ambient active:scale-[0.97]"
        >
          <div
            className={`relative h-[90px] overflow-hidden bg-gradient-to-br ${e.background} md:h-[140px] lg:h-[180px]`}
          >
            <Image
              src={`/images/listings/${e.slug}.webp`}
              alt={e.title}
              fill
              sizes="(min-width: 1024px) 320px, (min-width: 768px) 253px, 50vw"
              className="object-cover"
            />
          </div>
          <div className="px-2.5 pt-2.5 pb-3 md:px-4 md:pt-4 md:pb-5">
            <p className="mb-1 text-[8px] font-medium uppercase tracking-[0.15em] text-muted md:text-[10px] lg:text-xs">
              {e.category}
            </p>
            <h3 className="mb-1 font-serif text-sm font-semibold leading-tight text-ink md:mb-1.5 md:text-base lg:text-lg">
              {e.title}
            </h3>
            <p className="mb-1.5 line-clamp-2 text-[10px] leading-snug text-muted md:mb-2 md:text-xs lg:text-sm">
              {e.hook}
            </p>
            <p className="text-xs font-medium text-loop md:text-sm lg:text-base">
              ฿{e.price.toLocaleString()}{" "}
              <span className="text-[10px] font-light text-muted md:text-xs">
                /person
              </span>
            </p>
            <div className="mt-1 md:mt-2">
              <LoopedBy contributorSlug={e.contributorSlug} variant="tag" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
