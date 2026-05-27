import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { BundleScroll } from "@/components/BundleScroll";
import { SectionHeader } from "@/components/SectionHeader";
import { FeaturedCard } from "@/components/FeaturedCard";
import { ListingGrid } from "@/components/ListingGrid";
import { ListingList } from "@/components/ListingList";
import { Manifesto } from "@/components/Manifesto";
import { Footer } from "@/components/Footer";
import { CarCallout } from "@/components/CarCallout";
import {
  getFeaturedExperience,
  getNonFeaturedExperiences,
} from "@/content/experiences";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Sections");
  const featured = getFeaturedExperience(locale);
  const rest = getNonFeaturedExperiences(locale);
  const grid = rest.slice(0, 4);
  const list = rest.slice(4);

  return (
    <main className="mx-auto max-w-[430px] md:max-w-[760px] lg:max-w-[1280px]">
      <Hero featuredSlug={featured.slug} />

      <CarCallout />

      <SectionHeader
        label={t("communityTopPick")}
        title={t("mostLooped")}
        paddingClassName="px-[18px] pt-6 pb-2.5 md:px-12 md:pt-10 lg:px-16 lg:pt-14"
      />
      <FeaturedCard experience={featured} locale={locale} />

      <BundleScroll locale={locale} />

      <SectionHeader title={t("aroundTheLoop")} />
      <ListingGrid experiences={grid} locale={locale} />

      <SectionHeader
        title={t("moreLoops")}
        paddingClassName="px-[18px] pt-7 pb-3.5 mt-3 md:px-12 md:pt-12 lg:px-16 lg:pt-16"
      />
      <ListingList experiences={list} locale={locale} />

      <Manifesto />
      <Footer />
    </main>
  );
}
