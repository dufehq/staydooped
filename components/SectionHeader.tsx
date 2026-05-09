import Link from "next/link";

type Props = {
  label?: string;
  title: string;
  more?: { href: string; text: string };
  subtitle?: string;
  paddingClassName?: string;
};

export function SectionHeader({
  label,
  title,
  more,
  subtitle,
  paddingClassName = "px-[18px] pt-7 pb-3.5 md:px-12 md:pt-12 md:pb-5 lg:px-16 lg:pt-16 lg:pb-6",
}: Props) {
  return (
    <header className={paddingClassName}>
      {label ? (
        <p className="mb-1 text-[8px] font-medium uppercase tracking-[0.375em] text-loop md:mb-2 md:text-[10px] lg:text-xs">
          {label}
        </p>
      ) : null}
      <div className="flex items-end justify-between gap-4">
        <h2 className="font-serif text-[26px] font-semibold leading-[1.1] tracking-tight text-ink md:text-4xl lg:text-5xl">
          {title}
        </h2>
        {more ? (
          <Link
            href={more.href}
            className="border-b border-loop pb-px text-[9px] font-medium uppercase tracking-[0.25em] text-loop md:text-[11px] lg:text-xs"
          >
            {more.text}
          </Link>
        ) : null}
      </div>
      {subtitle ? (
        <p className="mt-1.5 font-serif text-xs italic text-muted md:mt-3 md:text-base lg:text-lg">
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}
