import { Button } from "../components/ui/Button";
import { Container } from "../components/ui/Container";
import { PriceCard } from "../components/ui/PriceCard";
import { Section } from "../components/ui/Section";
import { groupPricing, pricingNote, privatePricing } from "../data/pricing";

export function PricingPage() {
  return (
    <>
      <Section className="pb-10 text-center">
        <Container>
          <span className="mb-4 inline-block font-body text-xs font-medium uppercase tracking-widest text-primary-700">
            Pricing
          </span>
          <h1 className="text-4xl sm:text-5xl">Simple pricing, no fine print</h1>
          <p className="mx-auto mt-4 max-w-[56ch] text-sand-700">
            Pay as you go, save with a pack, or go unlimited. Private sessions are priced separately since
            they're booked one-to-one.
          </p>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <div className="mb-8">
            <span className="mb-2 inline-block font-body text-xs font-medium uppercase tracking-widest text-primary-700">
              Group Classes
            </span>
            <h2 className="text-3xl">Come to one class, or come every week</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {groupPricing.map((plan) => (
              <PriceCard key={plan.id} plan={plan} />
            ))}
          </div>
          <p className="mt-7 text-center text-sm text-sand-600">{pricingNote}</p>
          <div className="mt-8 text-center">
            <Button to="/schedule">Reserve a class</Button>
          </div>
        </Container>
      </Section>

      <Section tone="alt">
        <Container>
          <div className="mb-8">
            <span className="mb-2 inline-block font-body text-xs font-medium uppercase tracking-widest text-primary-700">
              Private Sessions
            </span>
            <h2 className="text-3xl">One-to-one time, at your pace</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {privatePricing.map((plan) => (
              <PriceCard key={plan.id} plan={plan} />
            ))}
          </div>
          <p className="mt-7 text-center text-sm text-sand-600">{pricingNote}</p>
          <div className="mt-8 text-center">
            <Button to="/private-sessions">Apply for a private session</Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
