import Link from "next/link";
import type { Experience } from "@/content/types";
import { LoopedBy } from "./LoopedBy";

type Props = {
  experience: Experience;
  locale: string;
};

export function FeaturedCard({ experience: e, locale }: Props) {
  return (
    <div className="px-[18px]">
      <Link
        href={`/${locale}/e/${e.slug}`}
        className="block overflow-hidden rounded-card shadow-card transition-transform active:scale-[0.98]"
      >
        <div
          className={`relative flex h-[190px] items-center justify-center bg-gradient-to-br ${e.background} text-[80px]`}
        >
          {e.emoji}
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(transparent_40%,rgba(14,11,7,0.92))]"
          />
          {e.loops ? (
            <span className="absolute right-3 top-3 rounded-pill bg-loop px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.15em] text-night">
              🔥 {e.loops} loops
            </span>
          ) : null}
        </div>
        <div className="bg-night px-4 pt-3.5 pb-4">
          <p className="mb-1.5 text-[8px] font-medium uppercase tracking-[0.25em] text-loop-2">
            {e.category} · {e.duration}
          </p>
          <h3 className="mb-2.5 font-serif text-[21px] font-semibold leading-[1.15] text-paper">
            {e.title}
          </h3>
          <div className="flex flex-wrap items-center gap-2.5">
            <p className="text-[15px] font-medium text-loop-2">
              ฿{e.price.toLocaleString()}{" "}
              <span className="text-[10px] font-light text-paper/40">
                / person
              </span>
            </p>
            {e.rating ? (
              <span className="rounded-pill bg-paper/10 px-2 py-0.5 text-[9px] text-paper/55">
                {e.rating.split(" · ")[0]}
              </span>
            ) : null}
            <span className="rounded-pill bg-paper/10 px-2 py-0.5 text-[9px] text-paper/55">
              ⏱ {e.duration}
            </span>
          </div>
          <LoopedBy contributorSlug={e.contributorSlug} variant="feature" />
        </div>
      </Link>
    </div>
  );
}
