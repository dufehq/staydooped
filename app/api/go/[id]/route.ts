import { NextResponse } from "next/server";
import { track } from "@vercel/analytics/server";
import { getListing } from "@/content";
import type { BookingMethod } from "@/content/types";

type Vendor = Exclude<BookingMethod["type"], "whatsapp">;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: slug } = await params;
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") ?? "en";

  const listing = await getListing(slug);
  if (!listing) {
    return NextResponse.json({ error: "Unknown listing" }, { status: 404 });
  }

  const booking = listing.booking;
  if (booking.type === "whatsapp") {
    return NextResponse.json(
      { error: "WhatsApp listings use direct wa.me links, not /api/go" },
      { status: 400 },
    );
  }

  const subId = `${locale}-${slug}`;
  const target = buildAffiliateUrl(booking.type, booking.productId, subId);

  void track("affiliate_click", {
    slug,
    vendor: booking.type,
    productId: booking.productId,
    locale,
  });

  return NextResponse.redirect(target, 302);
}

function buildAffiliateUrl(
  vendor: Vendor,
  productId: string,
  subId: string,
): string {
  switch (vendor) {
    case "klook": {
      const u = new URL(`https://www.klook.com/activity/${productId}/`);
      const aff = process.env.KLOOK_AFF_ID;
      if (aff) {
        u.searchParams.set("aid", aff);
        u.searchParams.set("aff_adid", subId);
      }
      return u.toString();
    }
    case "viator": {
      const u = new URL(
        `https://www.viator.com/tours/Chiang-Mai/d5267-${productId}`,
      );
      const aff = process.env.VIATOR_AFF_ID;
      if (aff) u.searchParams.set("pid", aff);
      u.searchParams.set("mcid", subId);
      return u.toString();
    }
    case "gyg": {
      const u = new URL(
        `https://www.getyourguide.com/chiang-mai-l271/-t${productId}`,
      );
      const aff = process.env.GYG_AFF_ID;
      if (aff) u.searchParams.set("partner_id", aff);
      u.searchParams.set("cmp", subId);
      return u.toString();
    }
  }
}
