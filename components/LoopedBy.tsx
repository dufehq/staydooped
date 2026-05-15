import { useTranslations } from "next-intl";
import { getContributor } from "@/content/contributors";

type Props = {
  contributorSlug: string;
  variant?: "card" | "feature" | "tag";
  hint?: string;
};

export function LoopedBy({ contributorSlug, variant = "card", hint }: Props) {
  const t = useTranslations("LoopedBy");
  const c = getContributor(contributorSlug);

  if (variant === "feature") {
    return (
      <div className="mt-2.5 flex items-center gap-1.5 border-t border-paper/10 pt-2.5 text-[10px] text-paper/45">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-paper/10 text-[11px]">
          {c.avatar}
        </span>
        {t("loopedBy")}{" "}
        <strong className="ml-0.5 font-medium text-paper/70">{c.name}</strong>
        <span className="mx-1.5">·</span>
        {c.role}
      </div>
    );
  }

  if (variant === "tag") {
    return (
      <p className="text-[9.5px] text-muted">
        {t("by")} {c.name} {c.avatar}
      </p>
    );
  }

  return (
    <div className="mt-2 flex items-center gap-1.5 border-t border-border-soft pt-2 text-[9.5px] text-muted">
      <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full border border-border bg-warm text-[10px]">
        {c.avatar}
      </span>
      <span>
        {t("loopedBy")}{" "}
        <strong className="font-medium text-ink">{c.name}</strong>
        {hint ? <> · {hint}</> : <> · {c.role}</>}
      </span>
    </div>
  );
}
