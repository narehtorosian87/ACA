import type { PricingPlan } from "./types";

export const groupPricing: PricingPlan[] = [
  {
    id: "drop-in",
    name: "Drop-In",
    price: "$22",
    unit: "/ class",
    features: ["Single group class", "Any style, any instructor", "No commitment"],
  },
  {
    id: "five-pack",
    name: "5-Class Pack",
    price: "$95",
    unit: "/ pack",
    features: ["$19 per class", "Valid for 3 months", "Shareable with a housemate"],
  },
  {
    id: "ten-pack",
    name: "10-Class Pack",
    price: "$170",
    unit: "/ pack",
    features: ["$17 per class", "Valid for 6 months", "Best value for regulars"],
    tag: "Most popular",
    featured: true,
  },
  {
    id: "unlimited",
    name: "Monthly Unlimited",
    price: "$140",
    unit: "/ month",
    features: ["Unlimited group classes", "Auto-renews monthly", "Pause anytime"],
  },
];

export const privatePricing: PricingPlan[] = [
  {
    id: "single-session",
    name: "Single Session",
    price: "$95",
    unit: "/ 60 min",
    features: ["One-to-one with an instructor", "Built around your goals", "In-studio or at your home"],
  },
  {
    id: "five-session-package",
    name: "5-Session Package",
    price: "$425",
    unit: "/ package",
    features: ["$85 per session", "Same instructor throughout", "Valid for 4 months"],
    tag: "Best value",
    featured: true,
  },
  {
    id: "partner-session",
    name: "Partner Session",
    price: "$130",
    unit: "/ 60 min",
    features: ["For two people, one instructor", "Great for couples or friends", "Shared, tailored session"],
  },
];

export const pricingNote =
  "Rates above are a first draft while we finalize studio pricing. Nothing here is final yet.";
