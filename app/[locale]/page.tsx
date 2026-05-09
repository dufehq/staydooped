import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { CommunityStrip } from "@/components/CommunityStrip";
import { BundleScroll } from "@/components/BundleScroll";
import { SectionHeader } from "@/components/SectionHeader";
import { CategoryTabs } from "@/components/CategoryTabs";
import { FeaturedCard } from "@/components/FeaturedCard";
import { ListingGrid } from "@/components/ListingGrid";
import { ListingList } from "@/components/ListingList";
import { Manifesto } from "@/components/Manifesto";
import { Footer } from "@/components/Footer";
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

  const featured = getFeaturedExperience();
  const rest = getNonFeaturedExperiences();
  const grid = rest.slice(0, 4);
  const list = rest.slice(4);

  return (
    <main className="mx-auto max-w-[430px]">
      <Hero />
      <CommunityStrip />
      <BundleScroll locale={locale} />

      <SectionHeader title="Explore" paddingClassName="px-[18px] pt-7 pb-2" />
      <CategoryTabs />

      <SectionHeader
        label="Community top pick"
        title="Most looped this week"
        paddingClassName="px-[18px] pt-7 pb-2.5"
      />
      <FeaturedCard experience={featured} locale={locale} />

      <SectionHeader title="Around the loop" />
      <ListingGrid experiences={grid} locale={locale} />

      <SectionHeader title="More loops" paddingClassName="px-[18px] pt-7 pb-3.5 mt-3" />
      <ListingList experiences={list} locale={locale} />

      <Manifesto />
      <Footer />
    </main>
  );
}
