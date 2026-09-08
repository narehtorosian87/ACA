import { render, screen } from "@testing-library/react";
import { PriceCard } from "./PriceCard";
import type { PricingPlan } from "../../data/types";

const basePlan: PricingPlan = {
  id: "drop-in",
  name: "Drop-In",
  price: "$22",
  unit: "/ class",
  features: ["Single group class", "Any style, any instructor"],
};

describe("PriceCard", () => {
  it("renders the plan name, price, unit, and every feature", () => {
    render(<PriceCard plan={basePlan} />);
    expect(screen.getByRole("heading", { name: "Drop-In" })).toBeInTheDocument();
    expect(screen.getByText("$22")).toBeInTheDocument();
    expect(screen.getByText("/ class")).toBeInTheDocument();
    expect(screen.getByText("Single group class")).toBeInTheDocument();
    expect(screen.getByText("Any style, any instructor")).toBeInTheDocument();
  });

  it("does not render a tag when the plan has none", () => {
    render(<PriceCard plan={basePlan} />);
    expect(screen.queryByText(/most popular/i)).not.toBeInTheDocument();
  });

  it("renders a tag badge when the plan has one", () => {
    render(<PriceCard plan={{ ...basePlan, tag: "Most popular", featured: true }} />);
    expect(screen.getByText("Most popular")).toBeInTheDocument();
  });
});
