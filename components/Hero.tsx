import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";

const PILL_KEYS: { key: string; active?: boolean }[] = [
  { key: "pillOldCity", active: true },
  { key: "pillNimman" },
  { key: "pillNimmanhaemin" },
  { key: "pillDoiSuthep" },
];

type Props = {
  featuredSlug?: string;
};

export function Hero({ featuredSlug }: Props = {}) {
  const t = useTranslations("Hero");

  return (
    <section className="relative overflow-hidden bg-night">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_15%_85%,rgba(224,123,42,0.4),transparent_45%),radial-gradient(circle_at_85%_20%,rgba(46,107,80,0.35),transparent_45%),radial-gradient(circle_at_50%_50%,rgba(14,11,7,0.6),transparent_70%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06] [background:repeating-linear-gradient(0deg,transparent_0_28px,rgba(255,255,255,0.6)_28px_29px)]"
      />
      <div className="relative z-10 px-[22px] pt-5 pb-9 md:px-12 md:pt-8 md:pb-20 lg:px-16 lg:pt-10 lg:pb-28">
        <div className="mb-7 flex justify-center md:mb-12 lg:mb-16">
          <LocaleSwitcher size="prominent" />
        </div>
        <p className="mb-3.5 flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.4em] text-loop-2 md:mb-5 md:text-xs lg:text-sm">
          <span className="h-px w-5 bg-loop md:w-8 lg:w-12" />
          {t("kicker")}
        </p>
        <h1 className="mb-0.5 font-display text-[72px] leading-[0.92] tracking-wide text-paper md:text-[120px] md:leading-[0.9] lg:text-[180px]">
          {t("wordmarkA")}
          <span className="text-loop">{t("wordmarkB")}</span>
        </h1>
        <p className="mb-4 font-thai text-xs tracking-[0.18em] text-paper/35 md:mb-6 md:text-base lg:text-lg">
          {t("thaiSubtitle")}
        </p>
        <p className="max-w-[260px] font-serif text-base font-light italic leading-[1.5] text-paper/70 md:max-w-md md:text-2xl lg:max-w-2xl lg:text-3xl">
          <strong className="font-semibold not-italic text-paper">
            {t("tagline")}
          </strong>{" "}
          {t("taglineSuffix")}
        </p>
        {featuredSlug ? (
          <Link
            href={`/e/${featuredSlug}`}
            className="mt-5 inline-flex items-center gap-2 rounded-pill bg-loop px-5 py-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-night transition-colors hover:bg-loop-2 active:bg-loop-2 md:mt-7 md:px-7 md:py-3.5 md:text-sm lg:mt-9 lg:px-8 lg:py-4 lg:text-base"
          >
            {t("ctaLabel")}
          </Link>
        ) : null}
        <div className="mt-[18px] flex flex-wrap gap-1.5 md:mt-8 md:gap-2 lg:mt-10 lg:gap-3">
          {PILL_KEYS.map((p) => (
            <span
              key={p.key}
              className={
                "rounded-pill px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.15em] md:px-4 md:py-1.5 md:text-xs lg:px-5 lg:py-2 lg:text-sm " +
                (p.active
                  ? "border border-loop bg-loop text-night"
                  : "border border-paper/20 text-paper/60")
              }
            >
              {t(p.key)}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
