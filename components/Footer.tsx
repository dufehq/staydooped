import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("Footer");
  return (
    <footer className="border-t border-border bg-warm px-5 pt-7 pb-12 md:px-12 md:pt-12 md:pb-16 lg:px-16 lg:pt-16 lg:pb-20">
      <div className="md:grid md:grid-cols-[1.2fr_1fr] md:gap-12 lg:gap-20">
        <div>
          <p className="mb-0.5 font-display text-3xl tracking-wide text-ink md:text-5xl lg:text-6xl">
            STAY<span className="text-loop">LOOPED</span>
          </p>
          <p className="font-serif text-[13px] italic text-muted md:text-lg lg:text-xl">
            {t("tagline")}
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <p className="text-[11px] leading-[1.6] text-muted md:text-sm md:leading-relaxed lg:text-base">
            {t("smallPrint")}
          </p>
        </div>
      </div>
    </footer>
  );
}
