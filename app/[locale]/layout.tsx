import type { Metadata } from "next";
import { Bebas_Neue, Fraunces, DM_Sans, Noto_Serif_Thai, Noto_Sans_SC } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { routing } from "@/i18n/routing";
import "../globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const notoThai = Noto_Serif_Thai({
  subsets: ["thai"],
  variable: "--font-noto-thai",
  display: "swap",
  weight: ["400", "600"],
});

const notoSC = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-noto-sc",
  display: "swap",
  weight: ["400", "500", "700"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://staylooped.co";
const DESCRIPTION =
  "Hand-picked tours and activities in Chiang Mai — vetted by locals, booked through trusted operators.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "StayLooped — Chiang Mai",
    template: "%s · StayLooped Chiang Mai",
  },
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "StayLooped",
    title: "StayLooped — Chiang Mai",
    description: DESCRIPTION,
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "StayLooped — Hand-picked things to do in Chiang Mai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "StayLooped — Chiang Mai",
    description: DESCRIPTION,
    images: ["/og-default.jpg"],
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${bebas.variable} ${fraunces.variable} ${dmSans.variable} ${notoThai.variable} ${notoSC.variable}`}
    >
      <body className="min-h-screen">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
