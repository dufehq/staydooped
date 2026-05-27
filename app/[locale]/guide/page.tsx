import { setRequestLocale, getTranslations } from "next-intl/server";
import { Footer } from "@/components/Footer";
import { TopNav } from "@/components/TopNav";

const LINK_CLS =
  "font-medium text-ink underline decoration-loop/40 underline-offset-4 hover:decoration-loop";

export default async function GuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Guide");

  return (
    <main className="mx-auto max-w-[430px] md:max-w-[760px] lg:max-w-[960px]">
      <TopNav />

      <article className="px-[22px] pb-16 pt-8 md:px-12 md:pt-12 lg:px-16 lg:pt-16">
        <header className="mb-10 md:mb-14">
          <p className="mb-3 text-[9px] font-medium uppercase tracking-[0.4em] text-loop md:text-xs">
            {t("kicker")}
          </p>
          <h1 className="font-serif text-3xl font-semibold leading-snug text-ink md:text-4xl lg:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 font-serif text-base italic text-muted md:text-lg">
            {t("subtitle")}
          </p>
        </header>

        <div className="space-y-12 md:space-y-16">

          {/* Klook */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <span className="text-2xl">🎫</span>
              <h2 className="font-serif text-xl font-semibold text-ink md:text-2xl">
                <a
                  href="https://www.klook.com/city/165-chiang-mai-things-to-do/?aid=121431"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-loop/40 underline-offset-4 hover:decoration-loop"
                >
                  Klook
                </a>
                {" "}— {t("klookTagline")}
              </h2>
            </div>
            <div className="space-y-3 text-base leading-relaxed text-ink/80 md:text-lg">
              <p>
                {t.rich("klookP1", {
                  link: (chunks) => (
                    <a
                      href="https://www.klook.com/city/165-chiang-mai-things-to-do/?aid=121431"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={LINK_CLS}
                    >
                      {chunks}
                    </a>
                  ),
                })}
              </p>
              <p>
                {t.rich("klookP2", {
                  strong: (chunks) => <strong>{chunks}</strong>,
                  searchLink: (chunks) => (
                    <a
                      href="https://www.klook.com/en-US/search/?query=chiang+mai+private+car&aid=121431"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={LINK_CLS}
                    >
                      {chunks}
                    </a>
                  ),
                })}
              </p>
              <p>{t("klookP3")}</p>
            </div>
          </section>

          {/* Lazada */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <span className="text-2xl">🛒</span>
              <h2 className="font-serif text-xl font-semibold text-ink md:text-2xl">
                <a
                  href="https://s.lazada.co.th/s.Z6DXTU?c=a&t=ntv-t1_alp-native"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-loop/40 underline-offset-4 hover:decoration-loop"
                >
                  Lazada
                </a>
                {" "}— {t("lazadaTagline")}
              </h2>
            </div>
            <div className="space-y-3 text-base leading-relaxed text-ink/80 md:text-lg">
              <p>
                {t.rich("lazadaP1", {
                  link: (chunks) => (
                    <a
                      href="https://s.lazada.co.th/s.Z6DXTU?c=a&t=ntv-t1_alp-native"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={LINK_CLS}
                    >
                      {chunks}
                    </a>
                  ),
                })}
              </p>
              <p>{t("lazadaP2")}</p>
              <ul className="space-y-2 pl-4">
                <li className="flex gap-2">
                  <span className="mt-1 shrink-0 text-loop">→</span>
                  <span>
                    {t.rich("lazadaTip1", {
                      strong: (chunks) => <strong>{chunks}</strong>,
                    })}
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 shrink-0 text-loop">→</span>
                  <span>
                    {t.rich("lazadaTip2", {
                      strong: (chunks) => <strong>{chunks}</strong>,
                    })}
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 shrink-0 text-loop">→</span>
                  <span>
                    {t.rich("lazadaTip3", {
                      strong: (chunks) => <strong>{chunks}</strong>,
                    })}
                  </span>
                </li>
              </ul>
              <p>{t("lazadaP3")}</p>
            </div>
          </section>

          {/* Grab */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <span className="text-2xl">🚗</span>
              <h2 className="font-serif text-xl font-semibold text-ink md:text-2xl">
                <a
                  href="https://www.grab.com/th/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-loop/40 underline-offset-4 hover:decoration-loop"
                >
                  Grab
                </a>
                {" "}— {t("grabTagline")}
              </h2>
            </div>
            <div className="space-y-3 text-base leading-relaxed text-ink/80 md:text-lg">
              <p>
                {t.rich("grabP1", {
                  link: (chunks) => (
                    <a
                      href="https://www.grab.com/th/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={LINK_CLS}
                    >
                      {chunks}
                    </a>
                  ),
                })}
              </p>
              <p>
                {t.rich("grabP2", {
                  strong: (chunks) => <strong>{chunks}</strong>,
                })}
              </p>
              <p>{t("grabP3")}</p>
            </div>
          </section>

          {/* Google Translate */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <span className="text-2xl">🌐</span>
              <h2 className="font-serif text-xl font-semibold text-ink md:text-2xl">
                Google Translate — {t("translateTagline")}
              </h2>
            </div>
            <div className="space-y-3 text-base leading-relaxed text-ink/80 md:text-lg">
              <p>{t("translateP1")}</p>
              <p>{t("translateP2")}</p>
            </div>
          </section>

          {/* LINE */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <span className="text-2xl">💬</span>
              <h2 className="font-serif text-xl font-semibold text-ink md:text-2xl">
                LINE — {t("lineTagline")}
              </h2>
            </div>
            <div className="space-y-3 text-base leading-relaxed text-ink/80 md:text-lg">
              <p>{t("lineP1")}</p>
              <p>{t("lineP2")}</p>
            </div>
          </section>

          {/* Closing */}
          <section className="rounded-2xl bg-sand/50 px-6 py-6 md:px-8 md:py-8">
            <p className="font-serif text-base leading-relaxed text-ink/80 md:text-lg">
              {t("closing")}
            </p>
          </section>

        </div>
      </article>

      <Footer />
    </main>
  );
}
