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
            className={`flex h-[90px] items-center justify-center bg-gradient-to-br ${e.background} text-4xl md:h-[140px] md:text-5xl lg:h-[180px] lg:text-7xl`}
          >
            {e.emoji}
          </div>
          <div className="px-2.5 pt-2.5 pb-3 md:px-4 md:pt-4 md:pb-5">
            <p className="mb-1 text-[8px] font-medium uppercase tracking-[0.15em] text-muted md:text-[10px] lg:text-xs">
              {e.category}
            </p>
            <h3 className="mb-1.5 font-serif text-sm font-semibold leading-tight text-ink md:mb-2 md:text-base lg:text-lg">
              {e.title}
            </h3>
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
