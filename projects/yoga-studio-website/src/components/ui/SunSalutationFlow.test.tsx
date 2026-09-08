import { render } from "@testing-library/react";
import { SunSalutationFlow } from "./SunSalutationFlow";
import { sunSalutationPoses } from "../../data/poses";

describe("SunSalutationFlow", () => {
  it("renders exactly one illustration layer per pose in the data set", () => {
    const { container } = render(<SunSalutationFlow />);
    expect(container.querySelectorAll(".pose-layer")).toHaveLength(sunSalutationPoses.length);
  });

  it("renders the Sanskrit and English name for every pose", () => {
    const { container } = render(<SunSalutationFlow />);
    const text = container.textContent ?? "";
    for (const pose of sunSalutationPoses) {
      expect(text).toContain(pose.sanskrit);
      expect(text).toContain(pose.english);
    }
  });

  it("is marked decorative for assistive tech, since it's a supplementary animation", () => {
    const { container } = render(<SunSalutationFlow />);
    expect(container.querySelector("[aria-hidden='true']")).toBeInTheDocument();
  });

  it("staggers each pose layer's animation delay so they don't all show at once", () => {
    const { container } = render(<SunSalutationFlow />);
    const layers = Array.from(container.querySelectorAll<HTMLElement>(".pose-layer"));
    const delays = layers.map((layer) => layer.style.animationDelay);
    expect(new Set(delays).size).toBe(layers.length);
  });
});
