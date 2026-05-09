import { useTranslations } from "next-intl";

const PILLS = [
  { label: "📍 Old City", active: true },
  { label: "🎨 Nimman" },
  { label: "🌿 Nimmanhaemin" },
  { label: "🏔 Doi Suthep" },
];

export function Hero() {
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
      <div className="relative z-10 px-[22px] pt-[52px] pb-9">
        <p className="mb-3.5 flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.4em] text-loop-2">
          <span className="h-px w-5 bg-loop" />
          {t("kicker")}
        </p>
        <h1 className="mb-0.5 font-display text-[72px] leading-[0.92] tracking-wide text-paper">
          {t("wordmarkA")}
          <span className="text-loop">{t("wordmarkB")}</span>
        </h1>
        <p className="mb-4 font-thai text-xs tracking-[0.18em] text-paper/35">
          {t("thaiSubtitle")}
        </p>
        <p className="max-w-[260px] font-serif text-base font-light italic leading-[1.5] text-paper/70">
          <strong className="font-semibold not-italic text-paper">
            {t("tagline")}
          </strong>{" "}
          {t("taglineSuffix")}
        </p>
        <div className="mt-[18px] flex flex-wrap gap-1.5">
          {PILLS.map((p) => (
            <span
              key={p.label}
              className={
                p.active
                  ? "rounded-pill border border-loop bg-loop px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.15em] text-night"
                  : "rounded-pill border border-paper/20 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.15em] text-paper/60"
              }
            >
              {p.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
