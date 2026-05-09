import { bundles } from "@/content/bundles";
import { BundleCard } from "./BundleCard";
import { SectionHeader } from "./SectionHeader";

type Props = { locale: string };

export function BundleScroll({ locale }: Props) {
  return (
    <>
      <SectionHeader
        label="New on StayLooped"
        title="Ready-made afternoons"
        more={{ href: `/${locale}/bundles`, text: "All" }}
        subtitle="Everything sorted. One price. Zero planning stress."
      />
      <div className="flex gap-2.5 overflow-x-auto px-[18px] pb-5 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-12 md:pb-8 lg:grid-cols-4 lg:gap-6 lg:px-16 lg:pb-12 [&::-webkit-scrollbar]:hidden">
        {bundles.map((b) => (
          <BundleCard key={b.slug} bundle={b} locale={locale} />
        ))}
      </div>
    </>
  );
}
