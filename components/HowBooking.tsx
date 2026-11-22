import { useTranslations } from "next-intl";

export function HowBooking() {
  const t = useTranslations("HowBooking");

  const steps = [
    { n: "01", icon: "🧭", title: t("step1Title"), body: t("step1Body") },
    { n: "02", icon: "🎫", title: t("step2Title"), body: t("step2Body") },
    { n: "03", icon: "🌏", title: t("step3Title"), body: t("step3Body") },
  ];

  return (
    <section className="px-[18px] py-6 md:px-12 lg:px-16">
      <div className="rounded-[24px] bg-warm px-5 py-9 md:px-11 md:py-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-jade">
          {t("eyebrow")}
        </p>
        <h2 className="mt-1 font-serif text-[26px] font-semibold tracking-tight text-ink md:text-4xl">
          {t("title")}
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.n}
              className="relative rounded-[16px] border border-border bg-white-cream p-5 shadow-card"
            >
              <span className="absolute right-5 top-4 text-xs font-semibold text-muted">
                {s.n}
              </span>
              <div className="mb-3.5 grid h-[42px] w-[42px] place-items-center rounded-xl bg-warm text-xl">
                {s.icon}
              </div>
              <h3 className="mb-1.5 font-serif text-[17px] font-semibold text-ink">
                {s.title}
              </h3>
              <p className="text-[13.5px] leading-relaxed text-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
