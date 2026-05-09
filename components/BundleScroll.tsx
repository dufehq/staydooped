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
      <div className="flex gap-2.5 overflow-x-auto px-[18px] pb-5 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {bundles.map((b) => (
          <BundleCard key={b.slug} bundle={b} locale={locale} />
        ))}
      </div>
    </>
  );
}
