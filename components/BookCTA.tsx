import type { BookingMethod } from "@/content/types";

type Props = {
  booking: BookingMethod;
  whatsappNumber?: string;
};

function buildBookingUrl(booking: BookingMethod, whatsappNumber?: string): string {
  switch (booking.type) {
    case "klook":
      return `/api/go/${booking.productId}?p=klook`;
    case "viator":
      return `/api/go/${booking.productId}?p=viator`;
    case "gyg":
      return `/api/go/${booking.productId}?p=gyg`;
    case "whatsapp": {
      const num = whatsappNumber ?? "0000000000";
      const text = encodeURIComponent(booking.messageTemplate);
      return `https://wa.me/${num}?text=${text}`;
    }
  }
}

function ctaLabel(booking: BookingMethod): string {
  return booking.type === "whatsapp"
    ? "Book direct via WhatsApp →"
    : "Book this loop →";
}

export function BookCTA({ booking, whatsappNumber }: Props) {
  const href = buildBookingUrl(booking, whatsappNumber);
  const isExternal = booking.type === "whatsapp";
  return (
    <div>
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="block w-full rounded-[10px] bg-loop py-4 text-center text-[13px] font-medium uppercase tracking-[0.15em] text-night transition-colors active:bg-loop-2"
      >
        {ctaLabel(booking)}
      </a>
      <p className="mt-2 text-center text-[10px] text-muted">
        Instant confirmation · Free cancellation 24h before
      </p>
    </div>
  );
}
