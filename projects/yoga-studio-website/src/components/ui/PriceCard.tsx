import type { PricingPlan } from "../../data/types";

interface PriceCardProps {
  plan: PricingPlan;
}

export function PriceCard({ plan }: PriceCardProps) {
  return (
    <div
      className={`relative rounded-xl2 border bg-white p-8 text-left ${
        plan.featured ? "border-primary-500 shadow-soft" : "border-sand-300"
      }`}
    >
      {plan.tag ? (
        <span className="absolute -top-3 right-6 rounded-full bg-secondary-600 px-3 py-1 text-xs uppercase tracking-wide text-sand-50">
          {plan.tag}
        </span>
      ) : null}
      <h3 className="text-lg">{plan.name}</h3>
      <p className="mt-3 font-heading text-4xl text-sand-900">
        {plan.price} <span className="font-body text-base text-sand-600">{plan.unit}</span>
      </p>
      <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm text-sand-700">
        {plan.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
    </div>
  );
}
