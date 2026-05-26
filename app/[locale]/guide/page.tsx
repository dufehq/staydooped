import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Footer } from "@/components/Footer";

export default async function GuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="mx-auto max-w-[430px] md:max-w-[760px] lg:max-w-[960px]">
      <div className="px-[22px] pt-8 pb-4 md:px-12 md:pt-12 lg:px-16 lg:pt-16">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-muted hover:text-ink md:text-xs"
        >
          ← Back
        </Link>
      </div>

      <article className="px-[22px] pb-16 md:px-12 lg:px-16">
        <header className="mb-10 md:mb-14">
          <p className="mb-3 text-[9px] font-medium uppercase tracking-[0.4em] text-loop md:text-xs">
            From your hosts
          </p>
          <h1 className="font-serif text-3xl font-semibold leading-snug text-ink md:text-4xl lg:text-5xl">
            A few apps that'll make your Chiang Mai trip a lot easier
          </h1>
          <p className="mt-4 font-serif text-base italic text-muted md:text-lg">
            We use all of these ourselves — thought they'd be handy to have on your phone before you arrive.
          </p>
        </header>

        <div className="space-y-12 md:space-y-16">

          {/* Klook */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <span className="text-2xl">🎫</span>
              <h2 className="font-serif text-xl font-semibold text-ink md:text-2xl">
                <a
                  href="https://www.klook.com/city/165-chiang-mai-things-to-do/?aid=121431"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-loop/40 underline-offset-4 hover:decoration-loop"
                >
                  Klook
                </a>
                {" "}— book your experiences in advance
              </h2>
            </div>
            <div className="space-y-3 text-base leading-relaxed text-ink/80 md:text-lg">
              <p>
                Most of the tours and activities on this site are bookable through{" "}
                <a
                  href="https://www.klook.com/city/165-chiang-mai-things-to-do/?aid=121431"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-ink underline decoration-loop/40 underline-offset-4 hover:decoration-loop"
                >
                  Klook
                </a>
                . It's what we'd recommend for anything that needs a time slot — elephant sanctuaries, cooking classes, day trips out of the city.
              </p>
              <p>
                The main reason to book ahead: popular experiences sell out, especially on weekends and during high season (November to February). Booking through Klook also means you get instant confirmation, clear pickup details, and a refund policy if plans change.
              </p>
              <p>
                Download the app before you travel — it's easier to manage bookings from your phone on the go than through a browser.
              </p>
            </div>
          </section>

          {/* Lazada */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <span className="text-2xl">🛒</span>
              <h2 className="font-serif text-xl font-semibold text-ink md:text-2xl">
                <a
                  href="https://s.lazada.co.th/s.Z6DXTU?c=a&t=ntv-t1_alp-native"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-loop/40 underline-offset-4 hover:decoration-loop"
                >
                  Lazada
                </a>
                {" "}— order souvenirs and essentials to your door
              </h2>
            </div>
            <div className="space-y-3 text-base leading-relaxed text-ink/80 md:text-lg">
              <p>
                This one's a bit of a hidden gem for travellers.{" "}
                <a
                  href="https://s.lazada.co.th/s.Z6DXTU?c=a&t=ntv-t1_alp-native"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-ink underline decoration-loop/40 underline-offset-4 hover:decoration-loop"
                >
                  Lazada
                </a>{" "}
                is Thailand's biggest online marketplace — think Amazon, but for Southeast Asia. Prices are often significantly cheaper than what you'd find in tourist-area shops.
              </p>
              <p>
                Our tip: order a few things to the house a day or two after you arrive. Sunscreen, insect repellent, a power adapter, snacks, a lightweight daypack — all the things you'd otherwise spend an afternoon hunting for. Delivery to Chiang Mai is usually 1–3 days.
              </p>
              <p>
                It's also a great way to pick up Thai souvenirs — traditional textiles, local snacks, handicrafts — without the haggling or the heavy bags on your flight home. Order, ship directly to your address back home, done.
              </p>
            </div>
          </section>

          {/* Grab */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <span className="text-2xl">🚗</span>
              <h2 className="font-serif text-xl font-semibold text-ink md:text-2xl">
                <a
                  href="https://www.grab.com/th/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-loop/40 underline-offset-4 hover:decoration-loop"
                >
                  Grab
                </a>
                {" "}— your everyday ride and food app
              </h2>
            </div>
            <div className="space-y-3 text-base leading-relaxed text-ink/80 md:text-lg">
              <p>
                <a
                  href="https://www.grab.com/th/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-ink underline decoration-loop/40 underline-offset-4 hover:decoration-loop"
                >
                  Grab
                </a>{" "}
                is the Uber of Southeast Asia — it covers rides, motorbike taxis, and food delivery all in one app. In Chiang Mai it's the most reliable way to get around without negotiating fares with tuk-tuk drivers.
              </p>
              <p>
                The fixed-price rides are displayed upfront, so no surprises. For trips out to places like the elephant sanctuary or Doi Inthanon, a GrabCar is usually the most comfortable option — just make sure to book a bit ahead of time.
              </p>
              <p>
                GrabFood is also worth having for evenings when you want something delivered to the house. Coverage around Thapae is solid.
              </p>
            </div>
          </section>

          {/* Closing note */}
          <section className="rounded-2xl bg-sand/50 px-6 py-6 md:px-8 md:py-8">
            <p className="font-serif text-base italic leading-relaxed text-ink/70 md:text-lg">
              If you need any local advice — where to eat, what to skip, how to get somewhere — feel free to message us. That's what we're here for. Enjoy Chiang Mai.
            </p>
            <p className="mt-3 text-sm font-medium text-muted">— Your hosts at Thapae Soi 4</p>
          </section>

        </div>
      </article>

      <Footer />
    </main>
  );
}
