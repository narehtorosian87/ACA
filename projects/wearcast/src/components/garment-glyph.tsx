import type { ClosetCategory } from "@/lib/types";

const SHAPES: Record<ClosetCategory, string> = {
  top: "M6 4 L12 2 L18 4 L18 8 L15 9 L15 21 L9 21 L9 9 L6 8 Z",
  bottom: "M8 3 H16 L17 21 H13 L12 12 L11 21 H7 Z",
  dress: "M9 3 H15 L16 8 L19 21 H5 L8 8 Z",
  outerwear: "M5 4 L12 2 L19 4 L20 9 L17 10 L17 22 H7 L7 10 L4 9 Z",
  shoes: "M4 15 H10 L13 12 H20 C21 12 22 13 22 15 V17 H4 Z",
  accessory: "M12 3 A5 5 0 1 0 12.01 3 M9 8 L9 20 L15 20 L15 8",
};

export function GarmentGlyph({
  category,
  className = "h-8 w-8",
}: {
  category: ClosetCategory;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d={SHAPES[category]} />
    </svg>
  );
}
