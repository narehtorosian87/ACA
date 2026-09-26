import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const steps = [
  {
    number: "01",
    title: "Tag your closet",
    body: "Add what you own once — category, color, warmth, and when you'd wear it. Photos optional.",
  },
  {
    number: "02",
    title: "Tell us your day",
    body: "Your plans, your city, and how you feel like dressing. Weather is pulled in automatically.",
  },
  {
    number: "03",
    title: "Get two outfits",
    body: "A full head-to-toe outfit, twice over — each with a plain-English reason it was picked.",
  },
];

const features = [
  {
    title: "Weather-aware",
    body: "Real forecast for your city, so you're never caught in the rain without a jacket.",
    accent: "bg-sage-soft text-sage",
  },
  {
    title: "Plan-aware",
    body: "A client meeting and a gym session call for different outfits — Wearcast knows the difference.",
    accent: "bg-terracotta-soft text-terracotta",
  },
  {
    title: "Mood-aware",
    body: "Feeling bold, cozy, or low-key? Pick a mood chip and it shapes the whole outfit.",
    accent: "bg-gold/30 text-ink",
  },
  {
    title: "Explains itself",
    body: "Every recommendation comes with the reasoning behind it — never a black box.",
    accent: "bg-cream-soft text-ink-soft",
  },
];

function GarmentGlyph({ kind, tone }: { kind: "top" | "bottom" | "shoes" | "outer"; tone: string }) {
  const shapes: Record<typeof kind, string> = {
    top: "M6 4 L12 2 L18 4 L18 8 L15 9 L15 21 L9 21 L9 9 L6 8 Z",
    bottom: "M8 3 H16 L17 21 H13 L12 12 L11 21 H7 Z",
    shoes: "M4 15 H10 L13 12 H20 C21 12 22 13 22 15 V17 H4 Z",
    outer: "M5 4 L12 2 L19 4 L20 9 L17 10 L17 22 H7 L7 10 L4 9 Z",
  };
  return (
    <svg viewBox="0 0 24 24" className={`h-10 w-10 ${tone}`} fill="currentColor">
      <path d={shapes[kind]} />
    </svg>
  );
}

function OutfitMock({
  label,
  reason,
  items,
}: {
  label: string;
  reason: string;
  items: { kind: "top" | "bottom" | "shoes" | "outer"; name: string; tone: string }[];
}) {
  return (
    <div className="w-full max-w-xs rounded-3xl border border-line bg-white/70 p-6 shadow-[0_18px_40px_-24px_rgba(36,31,26,0.35)]">
      <p className="text-xs font-semibold uppercase tracking-wide text-terracotta">
        {label}
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {items.map((item) => (
          <div
            key={item.name}
            className="flex flex-col items-center gap-2 rounded-2xl bg-cream-soft py-4"
          >
            <GarmentGlyph kind={item.kind} tone={item.tone} />
            <span className="text-xs font-medium text-ink-soft">{item.name}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-ink-soft">
        <span className="font-semibold text-ink">Why: </span>
        {reason}
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-6 pt-16 pb-20 sm:pt-24">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-terracotta">
                Daily outfit recommendations
              </p>
              <h1 className="font-display mt-4 text-4xl leading-[1.1] text-ink sm:text-5xl">
                Stop staring at your closet.{" "}
                <span className="italic text-terracotta">Wearcast</span> already
                decided.
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
                Two full outfits, every morning — built from what's actually in
                your closet, matched to your plans, the weather, and the mood
                you're in.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/today"
                  className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-terracotta"
                >
                  Get today&apos;s outfits
                </Link>
                <Link
                  href="/closet"
                  className="rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-terracotta hover:text-terracotta"
                >
                  Set up my closet
                </Link>
              </div>
            </div>

            <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
              <OutfitMock
                label="Outfit 1"
                reason="9°C and drizzling, plus your 2pm client meeting — tailored layers that stay sharp and dry."
                items={[
                  { kind: "outer", name: "Wool coat", tone: "text-ink-soft" },
                  { kind: "top", name: "Cream shirt", tone: "text-sage" },
                  { kind: "bottom", name: "Tailored trousers", tone: "text-ink" },
                  { kind: "shoes", name: "Leather boots", tone: "text-terracotta" },
                ]}
              />
              <div className="hidden sm:block sm:translate-y-8">
                <OutfitMock
                  label="Outfit 2"
                  reason="Same weather, more 'relaxed' mood — a knit and denim instead of tailoring."
                  items={[
                    { kind: "outer", name: "Rain jacket", tone: "text-sage" },
                    { kind: "top", name: "Chunky knit", tone: "text-gold" },
                    { kind: "bottom", name: "Straight denim", tone: "text-ink" },
                    { kind: "shoes", name: "Suede sneakers", tone: "text-terracotta" },
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-line/80 bg-cream-soft/60">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              How it works
            </h2>
            <div className="mt-12 grid gap-10 sm:grid-cols-3">
              {steps.map((step) => (
                <div key={step.number}>
                  <span className="font-display text-4xl text-terracotta-soft">
                    {step.number}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-display text-3xl text-ink sm:text-4xl">
            Built to actually get it right
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-line bg-white/60 p-6"
              >
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${feature.accent}`}
                >
                  {feature.title}
                </span>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                  {feature.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="rounded-3xl bg-ink px-8 py-14 text-center sm:px-16">
            <h2 className="font-display text-3xl text-cream sm:text-4xl">
              Your closet already has the outfit.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-cream/80">
              Add a few items and let Wearcast put together your next two days.
            </p>
            <Link
              href="/today"
              className="mt-8 inline-block rounded-full bg-terracotta px-7 py-3 text-sm font-semibold text-cream transition-colors hover:bg-terracotta-soft hover:text-ink"
            >
              Start with today
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
