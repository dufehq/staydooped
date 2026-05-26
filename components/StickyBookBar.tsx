import { useTranslations } from "next-intl";
import type { BookingMethod } from "@/content/types";
import { buildBookingUrl } from "./BookCTA";

type Props = {
  booking: BookingMethod;
  slug: string;
  locale: string;
  priceLabel: string;
  whatsappNumber?: string;
};

export function StickyBookBar({
  booking,
  slug,
  locale,
  priceLabel,
  whatsappNumber,
}: Props) {
  const t = useTranslations("BookCTA");
  const href = buildBookingUrl(booking, slug, locale, whatsappNumber);
  const label = booking.type === "whatsapp" ? t("bookShort") : t("bookShort");

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-paper/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden">
      <div className="mx-auto flex max-w-[430px] items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate font-serif text-base font-semibold text-loop">
            {priceLabel}
          </p>
        </div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-[10px] bg-loop px-5 py-3 text-[13px] font-medium uppercase tracking-[0.12em] text-night active:bg-loop-2"
        >
          {label}
        </a>
      </div>
    </div>
  );
}
