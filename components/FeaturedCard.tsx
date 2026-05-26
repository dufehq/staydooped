import Image from "next/image";
import Link from "next/link";
import type { Experience } from "@/content/types";

type Props = {
  experience: Experience;
  locale: string;
};

export function FeaturedCard({ experience: e, locale }: Props) {
  return (
    <div className="px-[18px] md:px-12 lg:px-16">
      <Link
        href={`/${locale}/e/${e.slug}`}
        className="block overflow-hidden rounded-card shadow-card transition-transform hover:shadow-card-hover active:scale-[0.98] md:grid md:grid-cols-[1fr_1.1fr]"
      >
        <div
          className={`relative h-[190px] overflow-hidden bg-gradient-to-br ${e.background} md:h-auto md:min-h-[320px]`}
        >
          <Image
            src={`/images/listings/${e.slug}.webp`}
            alt={e.title}
            fill
            priority
            sizes="(min-width: 1024px) 640px, (min-width: 768px) 380px, 100vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(transparent_40%,rgba(14,11,7,0.92))] md:bg-[linear-gradient(to_right,transparent_60%,rgba(14,11,7,0.6))]"
          />
        </div>
        <div className="bg-night px-4 pt-3.5 pb-4 md:flex md:flex-col md:justify-center md:px-8 md:py-8 lg:px-12 lg:py-12">
          <p className="mb-1.5 text-[8px] font-medium uppercase tracking-[0.25em] text-loop-2 md:mb-3 md:text-[10px] lg:text-xs">
            {e.category} · {e.duration}
          </p>
          <h3 className="mb-1.5 font-serif text-[21px] font-semibold leading-[1.15] text-paper md:mb-2.5 md:text-3xl lg:text-5xl">
            {e.title}
          </h3>
          <p className="mb-2.5 text-[12px] leading-snug text-paper/65 md:mb-5 md:text-base lg:text-lg">
            {e.hook}
          </p>
          <div className="flex flex-wrap items-center gap-2.5 md:gap-3">
            <p className="text-[15px] font-medium text-loop-2 md:text-xl lg:text-2xl">
              {e.priceLabel}
            </p>
            <span className="rounded-pill bg-paper/10 px-2 py-0.5 text-[9px] text-paper/55 md:px-3 md:py-1 md:text-xs">
              ⏱ {e.duration}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
