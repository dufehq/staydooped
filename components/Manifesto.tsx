import { contributors } from "@/content/contributors";

const FEATURED = ["pom", "malee", "jake"] as const;

export function Manifesto() {
  return (
    <section className="relative mx-[18px] my-7 overflow-hidden rounded-card bg-night px-5 py-6">
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-[30px] -right-5 font-display text-[160px] leading-none text-loop/[0.07]"
      >
        ∞
      </span>
      <p className="mb-2.5 text-[8px] font-medium uppercase tracking-[0.375em] text-loop">
        What is StayLooped?
      </p>
      <h2 className="mb-3.5 font-serif text-2xl font-semibold leading-[1.2] text-paper">
        Built by locals.
        <br />
        For <em className="not-italic text-loop-2 italic">every</em> visitor.
      </h2>
      <p className="mb-4 text-[13px] leading-[1.7] text-paper/60">
        StayLooped isn&apos;t one person&apos;s opinion. It&apos;s a living guide built by
        the people who{" "}
        <strong className="font-medium text-paper">actually live here</strong> —
        hosts, long-term expats, local chefs, guides, and residents. Every
        recommendation is a &ldquo;Loop&rdquo; — a real endorsement from a real person
        with their name on it.
        <br />
        <br />
        No algorithms. No paid placements. No fake reviews.
      </p>
      <div className="flex flex-col gap-2.5">
        {FEATURED.map((slug) => {
          const c = contributors[slug];
          return (
            <div key={slug} className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/10 bg-paper/5 text-lg">
                {c.avatar}
              </span>
              <div>
                <p className="text-[13px] font-medium text-paper">{c.name}</p>
                <p className="mt-px text-[10px] text-paper/40">
                  {c.role}
                  {c.loopCount ? ` · ${c.loopCount} loops` : null}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <button
        type="button"
        className="mt-4 w-full rounded-btn border border-paper/20 bg-transparent py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-paper/60 transition-colors active:bg-paper/10"
      >
        + Become a Loop contributor
      </button>
    </section>
  );
}
