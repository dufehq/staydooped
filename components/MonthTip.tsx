"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MONTH_GUIDE, monthText } from "@/content/monthGuide";

// Correct the month to the viewer's clock before first paint (no flash, no
// hydration mismatch — server and client both start at index 0).
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function MonthTip() {
  const locale = useLocale();
  const t = useTranslations("MonthGuide");
  const [idx, setIdx] = useState(0);

  useIsoLayoutEffect(() => {
    setIdx(new Date().getMonth());
  }, []);

  const entry = MONTH_GUIDE[idx];
  const text = monthText(entry, locale);

  const btn =
    "grid h-7 w-7 place-items-center rounded-pill border border-border bg-white-cream text-base leading-none text-ink transition-colors hover:border-loop hover:text-loop";

  return (
    <section className="px-[18px] py-2 md:px-12 lg:px-16" aria-label="Chiang Mai month guide">
      <div className="flex items-start gap-4 rounded-[18px] border border-border bg-gradient-to-br from-warm to-white-cream px-5 py-[18px] shadow-card">
        <div className="mt-0.5 shrink-0 text-[32px] leading-none" aria-hidden>
          {entry.emoji}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
              {t("tipEye")}
            </span>
            <div className="inline-flex items-center gap-2.5">
              <button
                type="button"
                aria-label={t("prev")}
                onClick={() => setIdx((i) => (i + 11) % 12)}
                className={btn}
              >
                ‹
              </button>
              <strong className="min-w-[96px] text-center font-serif text-[18px] font-semibold text-loop">
                {text.name}
              </strong>
              <button
                type="button"
                aria-label={t("next")}
                onClick={() => setIdx((i) => (i + 1) % 12)}
                className={btn}
              >
                ›
              </button>
            </div>
          </div>
          <p className="mb-2.5 mt-2.5 text-[15px] leading-relaxed">{text.tip}</p>
          <Link
            href={`/guide/${entry.slug}`}
            className="text-[13px] font-semibold text-loop hover:underline"
          >
            {t("readMore")}
          </Link>
        </div>
      </div>
    </section>
  );
}
