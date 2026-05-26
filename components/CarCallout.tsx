export function CarCallout() {
  return (
    <div className="mx-[18px] my-5 flex flex-col gap-3 rounded-2xl border border-border bg-sand/40 px-5 py-4 md:mx-12 md:my-8 md:flex-row md:items-center md:justify-between md:px-8 md:py-5 lg:mx-16">
      <div className="flex items-start gap-3 md:items-center">
        <span className="mt-0.5 text-xl md:mt-0 md:text-2xl">🚗</span>
        <div>
          <p className="text-sm font-semibold text-ink md:text-base">
            Need a private car for the day?
          </p>
          <p className="mt-0.5 text-xs leading-relaxed text-muted md:text-sm">
            Book a driver and set your own itinerary — Doi Inthanon, Chiang Rai, Pai, or wherever you want to go.
          </p>
        </div>
      </div>
      <div className="flex shrink-0 gap-2 pl-8 md:pl-0">
        <a
          href="https://www.klook.com/en-US/search/?query=chiang+mai+private+car&aid=121431"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-pill bg-night px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-paper transition-colors hover:bg-ink md:text-xs"
        >
          🎫 Klook
        </a>
        <a
          href="https://www.grab.com/th/"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-pill border border-border bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-ink transition-colors hover:border-night md:text-xs"
        >
          🚗 Grab
        </a>
      </div>
    </div>
  );
}
