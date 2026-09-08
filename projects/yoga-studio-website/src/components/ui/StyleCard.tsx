import type { YogaStyle } from "../../data/types";

interface StyleCardProps {
  style: YogaStyle;
}

export function StyleCard({ style }: StyleCardProps) {
  return (
    <div className="rounded-xl2 border border-sand-300 bg-white p-7">
      <div className="mb-2 flex flex-wrap items-baseline gap-2.5">
        <h3 className="text-lg">{style.name}</h3>
        <span className="text-xs uppercase tracking-wide text-primary-700">{style.tag}</span>
      </div>
      <p className="text-sand-700">{style.description}</p>
    </div>
  );
}
