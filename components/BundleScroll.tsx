import { getTranslations } from "next-intl/server";
import { getAllBundles } from "@/content/bundles";
import { BundleCard } from "./BundleCard";
import { SectionHeader } from "./SectionHeader";

type Props = { locale: string };

export async function BundleScroll({ locale }: Props) {
  const t = await getTranslations("Sections");
  const bundles = await getAllBundles(locale);
  return (
    <>
      <SectionHeader
        label={t("newOnStaylooped")}
        title={t("bundlesTitle")}
        subtitle={t("bundlesSubtitle")}
      />
      <div className="flex gap-2.5 overflow-x-auto px-[18px] pb-5 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-12 md:pb-8 lg:grid-cols-4 lg:gap-6 lg:px-16 lg:pb-12 [&::-webkit-scrollbar]:hidden">
        {bundles.map((b) => (
          <BundleCard key={b.slug} bundle={b} locale={locale} />
        ))}
      </div>
    </>
  );
}
