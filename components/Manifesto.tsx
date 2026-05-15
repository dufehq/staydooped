import { useTranslations } from "next-intl";
import { contributors } from "@/content/contributors";

const FEATURED = ["pom", "malee", "jake"] as const;

export function Manifesto() {
  const t = useTranslations("Manifesto");
  const tCommon = useTranslations("Common");
  return (
    <section className="relative mx-[18px] my-7 overflow-hidden rounded-card bg-night px-5 py-6 md:mx-12 md:my-12 md:px-12 md:py-12 lg:mx-16 lg:my-16 lg:px-20 lg:py-16">
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-[30px] -right-5 font-display text-[160px] leading-none text-loop/[0.07] md:-bottom-12 md:-right-8 md:text-[280px] lg:text-[420px]"
      >
        ∞
      </span>
      <div className="md:grid md:grid-cols-[1.4fr_1fr] md:gap-16 lg:gap-24">
        <div>
          <p className="mb-2.5 text-[8px] font-medium uppercase tracking-[0.375em] text-loop md:mb-4 md:text-[10px] lg:text-xs">
            {t("label")}
          </p>
          <h2 className="mb-3.5 font-serif text-2xl font-semibold leading-[1.2] text-paper md:mb-6 md:text-4xl lg:text-5xl">
            {t("titleLine1")}
            <br />
            {t.rich("titleLine2", {
              em: (chunks) => (
                <em className="not-italic text-loop-2 italic">{chunks}</em>
              ),
            })}
          </h2>
          <p className="mb-4 text-[13px] leading-[1.7] text-paper/60 md:mb-8 md:text-base lg:text-lg">
            {t.rich("body", {
              strong: (chunks) => (
                <strong className="font-medium text-paper">{chunks}</strong>
              ),
            })}
            <br />
            <br />
            {t("bodyExtra")}
          </p>
        </div>
        <div className="relative z-10 flex flex-col gap-2.5 md:gap-4 md:self-center lg:gap-5">
          {FEATURED.map((slug) => {
            const c = contributors[slug];
            return (
              <div key={slug} className="flex items-center gap-2.5 md:gap-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/10 bg-paper/5 text-lg md:h-12 md:w-12 md:text-xl lg:h-14 lg:w-14 lg:text-2xl">
                  {c.avatar}
                </span>
                <div>
                  <p className="text-[13px] font-medium text-paper md:text-base lg:text-lg">
                    {c.name}
                  </p>
                  <p className="mt-px text-[10px] text-paper/40 md:text-xs lg:text-sm">
                    {c.role}
                    {c.loopCount
                      ? ` · ${t("loopsSuffix", { count: c.loopCount })}`
                      : null}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <button
        type="button"
        className="relative z-10 mt-4 w-full rounded-btn border border-paper/20 bg-transparent py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-paper/60 transition-colors hover:bg-paper/5 active:bg-paper/10 md:mt-12 md:w-auto md:px-10 md:py-4 md:text-sm"
      >
        {tCommon("becomeContributor")}
      </button>
    </section>
  );
}
