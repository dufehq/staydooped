"use client";

import { useState } from "react";
import { CATEGORIES, type Category } from "@/content/types";

type Props = {
  onChange?: (category: Category | "all") => void;
};

export function CategoryTabs({ onChange }: Props) {
  const [active, setActive] = useState<Category | "all">("all");

  function handleClick(id: Category | "all") {
    setActive(id);
    onChange?.(id);
  }

  return (
    <div className="flex gap-[7px] overflow-x-auto px-[18px] pb-3.5 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] md:flex-wrap md:justify-center md:gap-3 md:overflow-visible md:px-12 md:pb-6 lg:gap-4 lg:px-16 lg:pb-8 [&::-webkit-scrollbar]:hidden">
      <CategoryButton
        icon="✨"
        label="All"
        active={active === "all"}
        onClick={() => handleClick("all")}
      />
      {CATEGORIES.map((c) => (
        <CategoryButton
          key={c.id}
          icon={c.icon}
          label={c.label}
          active={active === c.id}
          onClick={() => handleClick(c.id)}
        />
      ))}
    </div>
  );
}

function CategoryButton({
  icon,
  label,
  active,
  onClick,
}: {
  icon: string;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "flex shrink-0 items-center gap-1.5 rounded-btn border-[1.5px] px-3 py-1.5 transition-colors md:gap-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 " +
        (active
          ? "border-night bg-night text-paper"
          : "border-border bg-white-cream text-muted hover:border-night/40 hover:text-ink")
      }
    >
      <span className="text-[15px] md:text-lg">{icon}</span>
      <span className="whitespace-nowrap text-[10px] font-medium tracking-wide md:text-sm lg:text-base">
        {label}
      </span>
    </button>
  );
}
