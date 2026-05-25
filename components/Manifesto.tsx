import { useTranslations } from "next-intl";

export function Manifesto() {
  const t = useTranslations("Manifesto");
  return (
    <section className="relative mx-[18px] my-7 overflow-hidden rounded-card bg-night px-5 py-6 md:mx-12 md:my-12 md:px-12 md:py-12 lg:mx-16 lg:my-16 lg:px-20 lg:py-16">
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-[30px] -right-5 font-display text-[160px] leading-none text-loop/[0.07] md:-bottom-12 md:-right-8 md:text-[280px] lg:text-[420px]"
      >
        ∞
      </span>
      <div className="relative z-10 max-w-2xl">
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
          {t("body")}
          <br />
          <br />
          {t("bodyExtra")}
        </p>
      </div>
    </section>
  );
}
