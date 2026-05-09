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
    <div className="flex gap-[7px] overflow-x-auto px-[18px] pb-3.5 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
        "flex shrink-0 items-center gap-1.5 rounded-btn border-[1.5px] px-3 py-1.5 transition-colors " +
        (active
          ? "border-night bg-night text-paper"
          : "border-border bg-white-cream text-muted")
      }
    >
      <span className="text-[15px]">{icon}</span>
      <span className="whitespace-nowrap text-[10px] font-medium tracking-wide">
        {label}
      </span>
    </button>
  );
}
