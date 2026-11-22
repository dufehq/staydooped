import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { HeroScene } from "./HeroScene";

type Props = {
  featuredSlug?: string;
};

export function Hero({ featuredSlug }: Props = {}) {
  const t = useTranslations("Hero");

  return (
    <section className="px-[18px] md:px-12 lg:px-16">
      <nav className="flex items-center justify-between gap-7 py-5">
        <span className="flex items-center gap-2 font-display text-[25px] tracking-[0.04em]">
          <span className="grid h-[30px] w-[30px] place-items-center rounded-[9px] bg-gradient-to-br from-loop to-loop-2 text-[15px]">
            🪷
          </span>
          STAY<span className="font-normal text-loop">LOOPED</span>
        </span>
        <LocaleSwitcher />
      </nav>

      <div className="grid items-center gap-8 pb-12 md:pb-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-11">
        <div className="order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 rounded-pill border border-border bg-white-cream py-1.5 pl-1.5 pr-3.5 text-[13px] shadow-card">
            <span className="grid h-6 w-6 place-items-center rounded-pill bg-jade text-xs">
              🏠
            </span>
            {t.rich("hostChip", {
              b: (chunks) => <b className="font-semibold">{chunks}</b>,
            })}
          </div>

          <h1 className="hero-title mt-5 text-[clamp(38px,6vw,62px)] font-semibold leading-[1.02] tracking-tight">
            {t.rich("headline", {
              hl: (chunks) => <span className="text-loop">{chunks}</span>,
            })}
          </h1>

          <p className="hero-sub mt-3 text-[15px] tracking-[0.02em] text-muted">
            {t("heroSub")}
          </p>

          <p className="mt-5 max-w-[440px] rounded-[14px] border border-border bg-white-cream px-4 py-3.5 text-[15px] leading-relaxed shadow-card">
            {t("heroLede")}
          </p>

          {featuredSlug ? (
            <Link
              href={`/e/${featuredSlug}`}
              className="mt-5 inline-flex items-center gap-2 rounded-pill bg-loop px-5 py-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-loop-2 active:bg-loop-2"
            >
              {t("ctaLabel")}
            </Link>
          ) : null}
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative aspect-[440/360] overflow-hidden rounded-[22px] border border-border bg-[#1a1430] shadow-card">
            <HeroScene />
            <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-xl border border-border bg-white-cream px-3 py-2 text-[12.5px] font-semibold shadow-card">
              <span className="text-jade">✓</span> {t("verified")}
            </div>
            <div className="absolute bottom-4 left-4 rounded-xl border border-border bg-white-cream px-3.5 py-2 shadow-card">
              <div className="text-[10px] uppercase tracking-[0.08em] text-muted">
                {t("fromLabel")}
              </div>
              <div className="font-serif text-base font-semibold">฿250</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
