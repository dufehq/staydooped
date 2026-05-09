import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations("Hero");
  return (
    <main className="mx-auto max-w-[430px] px-6 pt-20 pb-32">
      <p className="mb-3 text-[9px] font-medium uppercase tracking-[0.4em] text-loop">
        {t("kicker")}
      </p>
      <h1 className="font-display text-7xl leading-[0.92] tracking-wide text-night">
        {t("wordmarkA")}
        <span className="text-loop">{t("wordmarkB")}</span>
      </h1>
      <p className="mt-2 font-thai text-xs tracking-[0.2em] text-muted">
        {t("thaiSubtitle")}
      </p>
      <p className="mt-4 font-serif text-base italic text-muted">
        <strong className="font-semibold not-italic text-ink">{t("tagline")}</strong>{" "}
        {t("taglineSuffix")}
      </p>
      <div className="mt-12 rounded-card border border-[var(--color-border)] bg-white-cream p-6 shadow-[var(--shadow-ambient)]">
        <p className="font-serif text-sm text-muted">
          Phase 1 scaffold ✓ — design tokens, fonts, i18n routing, and the locale layer
          are wired. Real components land in Phase 2.
        </p>
      </div>
    </main>
  );
}
