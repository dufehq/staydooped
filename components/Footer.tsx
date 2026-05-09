export function Footer() {
  return (
    <footer className="border-t border-border bg-warm px-5 pt-7 pb-12">
      <p className="mb-0.5 font-display text-3xl tracking-wide text-ink">
        STAY<span className="text-loop">LOOPED</span>
      </p>
      <p className="mb-4 font-serif text-[13px] italic text-muted">
        Recommended by people who actually live here.
      </p>
      <ul className="mb-3.5 flex flex-wrap gap-x-3.5 gap-y-2">
        <li className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted">
          About
        </li>
        <li className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted">
          List a business
        </li>
        <li className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted">
          Become a contributor
        </li>
      </ul>
      <p className="text-[11px] leading-[1.6] text-muted">
        Small commissions on bookings keep this guide free and independent. We
        only loop things we&apos;d genuinely recommend to a friend.
      </p>
    </footer>
  );
}
