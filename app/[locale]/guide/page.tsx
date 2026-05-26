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
                {" "}— book experiences and day trips in advance
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
                One thing many guests don't realise: Klook also has <strong>private car hire for full-day trips</strong>. If you want to do Doi Inthanon, Chiang Rai, or Pai at your own pace with a driver who knows the roads, this is the most comfortable way to do it. You set the itinerary, the driver handles the rest.{" "}
                <a
                  href="https://www.klook.com/en-US/search/?query=chiang+mai+private+car&aid=121431"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-ink underline decoration-loop/40 underline-offset-4 hover:decoration-loop"
                >
                  Search "Chiang Mai private car" on Klook →
                </a>
              </p>
              <p>
                The main reason to book ahead: popular experiences sell out, especially on weekends and during high season (November to February). Booking through Klook means instant confirmation, clear pickup details, and a refund policy if plans change.
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
                <a
                  href="https://s.lazada.co.th/s.Z6DXTU?c=a&t=ntv-t1_alp-native"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-ink underline decoration-loop/40 underline-offset-4 hover:decoration-loop"
                >
                  Lazada
                </a>{" "}
                is Thailand's biggest online marketplace — think Amazon, but for Southeast Asia. Prices are often significantly cheaper than tourist-area shops.
              </p>
              <p>
                Our tip: order a few things to the house a day or two after you arrive. Sunscreen, insect repellent, a power adapter, snacks, a daypack — all the things you'd otherwise spend an afternoon hunting for. Delivery to Chiang Mai is usually 1–3 days.
              </p>
              <ul className="space-y-2 pl-4">
                <li className="flex gap-2">
                  <span className="mt-1 shrink-0 text-loop">→</span>
                  <span><strong>Look for "Lazada Mall"</strong> when buying anything branded. Mall sellers are official brand stores — more reliable quality and easier returns.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 shrink-0 text-loop">→</span>
                  <span><strong>Always check the reviews</strong> before you buy, especially from non-Mall sellers.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 shrink-0 text-loop">→</span>
                  <span><strong>Check the shipping date carefully.</strong> Some items ship from overseas and can take 1–2 weeks — if you're leaving soon, filter for Thailand sellers only.</span>
                </li>
              </ul>
              <p>
                Also great for Thai souvenirs — textiles, local snacks, handicrafts — order online and have them delivered straight to where you're staying. No haggling, no carrying bags around all day.
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
                {" "}— rides, food, and full-day drivers
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
                is the Uber of Southeast Asia — rides, motorbike taxis, and food delivery in one app. In Chiang Mai it's the most reliable way to get around without negotiating tuk-tuk fares.
              </p>
              <p>
                Fixed prices shown upfront, no surprises. But beyond the basics: <strong>Grab also lets you book a driver for a full day.</strong> Tell the driver where you want to go — Doi Suthep, the elephant sanctuary, a temple loop outside the city — agree on a price, and they'll wait for you at each stop. Flexible, personal, and often cheaper than a group tour.
              </p>
              <p>
                GrabFood is solid for evenings in. Coverage around Chiang Mai is good.
              </p>
            </div>
          </section>

          {/* Google Translate */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <span className="text-2xl">🌐</span>
              <h2 className="font-serif text-xl font-semibold text-ink md:text-2xl">
                Google Translate — your pocket translator
              </h2>
            </div>
            <div className="space-y-3 text-base leading-relaxed text-ink/80 md:text-lg">
              <p>
                The camera mode is the one to know. Point your phone at a menu, a sign, or a product label and it translates instantly — no typing needed.
              </p>
              <p>
                Download the Thai language pack before you leave the house so it works offline too. Chinese is usually pre-installed but worth double-checking.
              </p>
            </div>
          </section>

          {/* LINE */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <span className="text-2xl">💬</span>
              <h2 className="font-serif text-xl font-semibold text-ink md:text-2xl">
                LINE — how Thailand communicates
              </h2>
            </div>
            <div className="space-y-3 text-base leading-relaxed text-ink/80 md:text-lg">
              <p>
                LINE is the messaging app that runs Thailand. Locals, restaurants, tour operators, drivers — everyone's on it. If you're staying for more than a week or planning to come back, it's worth setting up.
              </p>
              <p>
                Practically: some local restaurants only take bookings via LINE. Small tour operators and private drivers prefer it. A few market vendors use LINE Pay. Think of it less as a chat app and more as the national communication layer.
              </p>
            </div>
          </section>

          {/* Closing */}
          <section className="rounded-2xl bg-sand/50 px-6 py-6 md:px-8 md:py-8">
            <p className="font-serif text-base leading-relaxed text-ink/80 md:text-lg">
              You're looped in. With these on your phone, you're already travelling more like a local than most tourists ever will. Go explore like you actually live here.
            </p>
          </section>

        </div>
      </article>

      <Footer />
    </main>
  );
}
