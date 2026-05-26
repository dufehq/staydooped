import Image from "next/image";
import Link from "next/link";
import type { Bundle } from "@/content/types";

type Props = {
  bundle: Bundle;
  locale: string;
};

export function BundleCard({ bundle, locale }: Props) {
  return (
    <Link
      href={`/${locale}/e/${bundle.slug}`}
      className="block w-60 shrink-0 overflow-hidden rounded-card shadow-card transition-transform hover:shadow-card-hover active:scale-[0.97] md:w-auto md:shrink"
    >
      <div
        className={`relative h-[130px] overflow-hidden bg-gradient-to-br ${bundle.background} md:h-[180px] lg:h-[200px]`}
      >
        <Image
          src={`/images/listings/${bundle.slug}.webp`}
          alt={bundle.title}
          fill
          sizes="(min-width: 1024px) 320px, (min-width: 768px) 380px, 240px"
          className="object-cover"
        />
        <span className="absolute left-2.5 top-2.5 z-10 rounded-pill bg-night/55 px-2 py-0.5 text-[8px] font-medium uppercase tracking-[0.15em] text-paper backdrop-blur-sm md:left-3 md:top-3 md:px-2.5 md:py-1 md:text-[10px]">
          {bundle.badge}
        </span>
        {bundle.saveBadge ? (
          <span className="absolute right-2.5 top-2.5 z-10 rounded-pill bg-loop px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.1em] text-night md:right-3 md:top-3 md:px-2.5 md:py-1 md:text-[10px]">
            {bundle.saveBadge}
          </span>
        ) : null}
      </div>
      <div className="bg-white-cream px-3.5 pt-3 pb-3.5 md:px-5 md:pt-4 md:pb-5">
        <h3 className="mb-1 font-serif text-[17px] font-semibold leading-tight text-ink md:text-xl lg:text-2xl">
          {bundle.title}
        </h3>
        <p className="mb-2 text-[11px] leading-[1.4] text-muted md:text-sm md:leading-snug">
          {bundle.hook}
        </p>
        <ul className="mb-2.5 flex flex-col gap-0.5 md:mb-3 md:gap-1">
          {bundle.inclusions.slice(0, 3).map((item) => (
            <li
              key={item}
              className="flex items-center gap-1.5 text-[11px] text-ink md:text-xs"
            >
              <span className="h-1 w-1 shrink-0 rounded-full bg-loop md:h-1.5 md:w-1.5" />
              <span className="truncate">{item}</span>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between">
          <p className="font-serif text-base font-semibold text-loop md:text-lg">
            {bundle.priceLabel}
            {bundle.priceOriginal && bundle.priceOriginal > bundle.price ? (
              <span className="ml-1 text-[11px] font-normal text-muted line-through md:text-xs">
                ฿{bundle.priceOriginal.toLocaleString()}
              </span>
            ) : null}
          </p>
          <span className="rounded-tight bg-ink px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.1em] text-paper md:px-4 md:py-2 md:text-[11px]">
            Book →
          </span>
        </div>
      </div>
    </Link>
  );
}
