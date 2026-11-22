import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { TopNav } from "@/components/TopNav";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import { ListingGrid } from "@/components/ListingGrid";
import { getNonFeaturedExperiences } from "@/content/experiences";
import { MONTH_GUIDE, getMonthBySlug, monthText } from "@/content/monthGuide";

type Params = Promise<{ locale: string; month: string }>;

export function generateStaticParams() {
  return MONTH_GUIDE.map((m) => ({ month: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale, month } = await params;
  const entry = getMonthBySlug(month);
  if (!entry) return {};
  const t = await getTranslations({ locale, namespace: "MonthGuide" });
  const text = monthText(entry, locale);
  return {
    title: t("pageTitle", { month: text.name }),
    description: text.tip,
  };
}

export default async function MonthGuidePage({ params }: { params: Params }) {
  const { locale, month } = await params;
  setRequestLocale(locale);

  const entry = getMonthBySlug(month);
  if (!entry) notFound();

  const t = await getTranslations("MonthGuide");
  const text = monthText(entry, locale);
  const prev = MONTH_GUIDE[(entry.index + 11) % 12];
  const next = MONTH_GUIDE[(entry.index + 1) % 12];
  const related = (await getNonFeaturedExperiences(locale)).slice(0, 3);

  const chip =
    "rounded-pill border border-border bg-white-cream px-4 py-2 text-[13px] font-semibold text-muted transition-colors hover:border-loop hover:text-loop";

  return (
    <main className="mx-auto max-w-[430px] md:max-w-[760px] lg:max-w-[960px]">
      <TopNav />

      <article className="px-[22px] pb-10 pt-6 md:px-12 md:pt-8 lg:px-16">
        <header className="rounded-[22px] border border-border bg-gradient-to-br from-warm to-white-cream p-6 shadow-card md:p-9">
          <div className="text-[40px] leading-none" aria-hidden>
            {entry.emoji}
          </div>
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
            {t("kicker")}
          </p>
          <h1 className="mt-1.5 font-serif text-[clamp(30px,5vw,46px)] font-semibold tracking-tight text-ink">
            {t("pageTitle", { month: text.name })}
          </h1>
          <p className="mt-3 max-w-[62ch] text-[16px] leading-relaxed text-ink">
            {text.intro ?? text.tip}
          </p>
        </header>

        <nav
          className="flex flex-wrap items-center justify-center gap-2 py-6"
          aria-label="Other months"
        >
          <Link href={`/guide/${prev.slug}`} className={chip}>
            ‹ {monthText(prev, locale).name}
          </Link>
          <Link href={`/guide/${next.slug}`} className={chip}>
            {monthText(next, locale).name} ›
          </Link>
        </nav>

        {text.sections ? (
          <div className="space-y-9">
            {text.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="font-serif text-[22px] font-semibold text-ink md:text-[26px]">
                  {s.icon ? (
                    <span className="mr-2" aria-hidden>
                      {s.icon}
                    </span>
                  ) : null}
                  {s.heading}
                </h2>
                <div className="mt-2 space-y-3 text-[16px] leading-relaxed text-ink/85">
                  {s.paras.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="rounded-[14px] border border-border bg-warm px-5 py-4 text-[15px] leading-relaxed text-muted">
            {t("comingSoon")}
          </div>
        )}
      </article>

      <SectionHeader title={t("relatedTitle")} />
      <ListingGrid experiences={related} locale={locale} />

      <Footer />
    </main>
  );
}
