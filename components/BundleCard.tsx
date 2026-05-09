import Link from "next/link";
import type { Bundle } from "@/content/types";
import { LoopedBy } from "./LoopedBy";

type Props = {
  bundle: Bundle;
  locale: string;
};

export function BundleCard({ bundle, locale }: Props) {
  return (
    <Link
      href={`/${locale}/e/${bundle.slug}`}
      className="block w-60 shrink-0 overflow-hidden rounded-card shadow-card transition-transform active:scale-[0.97]"
    >
      <div
        className={`relative flex h-[130px] items-center justify-center bg-gradient-to-br ${bundle.background}`}
      >
        <span className="absolute left-2.5 top-2.5 z-10 rounded-pill bg-night/55 px-2 py-0.5 text-[8px] font-medium uppercase tracking-[0.15em] text-paper backdrop-blur-sm">
          {bundle.badge}
        </span>
        <span className="absolute right-2.5 top-2.5 z-10 rounded-pill bg-loop px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.1em] text-night">
          {bundle.saveBadge}
        </span>
        <div className="flex gap-1 text-4xl">
          {bundle.emojis.map((e, i) => (
            <span key={i}>{e}</span>
          ))}
        </div>
      </div>
      <div className="bg-white-cream px-3.5 pt-3 pb-3.5">
        <h3 className="mb-1 font-serif text-[17px] font-semibold leading-tight text-ink">
          {bundle.title}
        </h3>
        <p className="mb-2 text-[11px] leading-[1.4] text-muted">
          {bundle.tagline}
        </p>
        <ul className="mb-2.5 flex flex-col gap-0.5">
          {bundle.inclusions.slice(0, 3).map((item) => (
            <li
              key={item}
              className="flex items-center gap-1.5 text-[11px] text-ink"
            >
              <span className="h-1 w-1 shrink-0 rounded-full bg-loop" />
              {item.replace(/^[A-Z]/, (m) => m).slice(0, 36)}
              {item.length > 36 ? "…" : ""}
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between">
          <p>
            <span className="font-serif text-lg font-semibold text-loop">
              ฿{bundle.price.toLocaleString()}
            </span>
            <span className="ml-1 text-[11px] text-muted line-through">
              ฿{bundle.priceOriginal.toLocaleString()}
            </span>
          </p>
          <span className="rounded-tight bg-ink px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.1em] text-paper">
            Loop it →
          </span>
        </div>
        <LoopedBy contributorSlug={bundle.contributorSlug} />
      </div>
    </Link>
  );
}
