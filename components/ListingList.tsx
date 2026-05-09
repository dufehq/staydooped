import Link from "next/link";
import type { Experience } from "@/content/types";
import { getContributor } from "@/content/contributors";

type Props = {
  experiences: Experience[];
  locale: string;
};

export function ListingList({ experiences, locale }: Props) {
  return (
    <ul className="flex flex-col gap-2 px-[18px]">
      {experiences.map((e) => {
        const c = getContributor(e.contributorSlug);
        return (
          <li key={e.slug}>
            <Link
              href={`/${locale}/e/${e.slug}`}
              className="flex items-center gap-3 rounded-[12px] border border-border bg-white-cream px-3 py-2.5 transition-transform active:scale-[0.98]"
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br ${e.background} text-2xl`}
              >
                {e.emoji}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="mb-0.5 font-serif text-[15px] font-semibold leading-tight text-ink">
                  {e.title}
                </h3>
                <p className="mb-1 text-[9.5px] text-muted">
                  Looped by {c.name} · &ldquo;
                  {e.contributorQuote.slice(0, 36)}
                  {e.contributorQuote.length > 36 ? "…" : ""}&rdquo;
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-loop">
                    ฿{e.price.toLocaleString()}/person
                  </span>
                  {e.rating ? (
                    <span className="text-[9.5px] text-muted">{e.rating}</span>
                  ) : null}
                </div>
              </div>
              <span className="shrink-0 text-lg text-border-strong">›</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
