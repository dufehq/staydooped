import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function TopNav() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-paper/95 px-[18px] py-3 backdrop-blur-sm md:px-12 lg:px-16">
      <Link
        href="/"
        className="font-display text-lg tracking-wide text-ink hover:text-loop transition-colors"
      >
        STAY<span className="text-loop">LOOPED</span>
      </Link>
      <LocaleSwitcher />
    </header>
  );
}
