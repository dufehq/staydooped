"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

const OPTIONS = [
  { locale: "en" as const, label: "EN" },
  { locale: "zh" as const, label: "中文" },
];

export function LocaleSwitcher() {
  const current = useLocale();
  const pathname = usePathname();
  const t = useTranslations("Common");

  return (
    <nav
      aria-label={t("language")}
      className="inline-flex items-center gap-0.5 rounded-pill border border-paper/20 bg-night/55 p-0.5 backdrop-blur-sm"
    >
      {OPTIONS.map(({ locale, label }) => {
        const active = current === locale;
        return (
          <Link
            key={locale}
            href={pathname}
            locale={locale}
            aria-current={active ? "true" : undefined}
            className={
              "rounded-pill px-3 py-1 text-[11px] font-medium tracking-wide transition md:px-4 md:py-1.5 md:text-sm " +
              (active
                ? "bg-paper text-night"
                : "text-paper/65 hover:text-paper")
            }
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
