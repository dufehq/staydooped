"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

const OPTIONS = [
  { locale: "en" as const, label: "EN" },
  { locale: "zh" as const, label: "中文" },
  { locale: "th" as const, label: "ไทย" },
];

type Size = "default" | "prominent";

export function LocaleSwitcher({ size = "default" }: { size?: Size } = {}) {
  const current = useLocale();
  const pathname = usePathname();
  const t = useTranslations("Common");

  const navCls =
    size === "prominent"
      ? "inline-flex items-center gap-1 rounded-pill border border-paper/25 bg-night/65 p-1 backdrop-blur-sm shadow-card"
      : "inline-flex items-center gap-0.5 rounded-pill border border-paper/20 bg-night/55 p-0.5 backdrop-blur-sm";

  const linkCls =
    size === "prominent"
      ? "rounded-pill px-5 py-2 text-base font-semibold tracking-wide transition md:px-7 md:py-2.5 md:text-lg"
      : "rounded-pill px-3 py-1 text-[11px] font-medium tracking-wide transition md:px-4 md:py-1.5 md:text-sm";

  return (
    <nav aria-label={t("language")} className={navCls}>
      {OPTIONS.map(({ locale, label }) => {
        const active = current === locale;
        return (
          <Link
            key={locale}
            href={pathname}
            locale={locale}
            aria-current={active ? "true" : undefined}
            className={
              linkCls +
              " " +
              (active ? "bg-paper text-night" : "text-paper/65 hover:text-paper")
            }
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
