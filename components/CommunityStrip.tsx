const AVATARS = ["🏠", "🧘", "🍜", "🗺️"];

export function CommunityStrip() {
  return (
    <div className="flex items-center gap-2.5 bg-loop px-[18px] py-3 md:gap-4 md:px-12 md:py-5 lg:px-16 lg:py-6">
      <div className="flex">
        {AVATARS.map((a, i) => (
          <span
            key={i}
            className="-mr-1.5 flex h-[26px] w-[26px] items-center justify-center rounded-full border-2 border-loop bg-night text-xs md:h-9 md:w-9 md:text-base lg:h-10 lg:w-10 lg:text-lg"
          >
            {a}
          </span>
        ))}
      </div>
      <div className="ml-3.5 flex-1 md:ml-5">
        <p className="text-[11px] font-medium leading-[1.3] text-night md:text-sm lg:text-base">
          Curated by 24 locals &amp; hosts
        </p>
        <p className="mt-px text-[9.5px] text-night/60 md:text-xs lg:text-sm">
          Hosts, guides, chefs, expats — all loop contributors
        </p>
      </div>
      <div className="shrink-0 text-right">
        <p className="font-display text-[22px] leading-none tracking-wide text-night md:text-3xl lg:text-4xl">
          148
        </p>
        <p className="text-[8px] font-medium uppercase tracking-[0.1em] text-night/55 md:text-[10px] lg:text-xs">
          Loops
        </p>
      </div>
    </div>
  );
}
