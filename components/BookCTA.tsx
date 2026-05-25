import { useTranslations } from "next-intl";
import type { BookingMethod } from "@/content/types";

type Props = {
  booking: BookingMethod;
  slug: string;
  locale: string;
  whatsappNumber?: string;
};

export function buildBookingUrl(
  booking: BookingMethod,
  slug: string,
  locale: string,
  whatsappNumber?: string,
): string {
  if (booking.type === "whatsapp") {
    const num = whatsappNumber ?? "0000000000";
    const text = encodeURIComponent(booking.messageTemplate);
    return `https://wa.me/${num}?text=${text}`;
  }
  return `/api/go/${slug}?locale=${locale}`;
}

export function BookCTA({ booking, slug, locale, whatsappNumber }: Props) {
  const t = useTranslations("BookCTA");
  const href = buildBookingUrl(booking, slug, locale, whatsappNumber);
  const isExternal = booking.type === "whatsapp";
  const label =
    booking.type === "whatsapp" ? t("bookDirect") : t("bookThisLoop");
  return (
    <div>
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="block w-full rounded-[10px] bg-loop py-4 text-center text-[13px] font-medium uppercase tracking-[0.15em] text-night transition-colors active:bg-loop-2"
      >
        {label}
      </a>
      <p className="mt-2 text-center text-[10px] text-muted">
        {t("footnote")}
      </p>
    </div>
  );
}
