import type {
  ClosetCategory,
  Formality,
  MoodChip,
  OccasionTag,
  Pattern,
  Season,
} from "./types";

export const CATEGORY_OPTIONS: { value: ClosetCategory; label: string }[] = [
  { value: "top", label: "Top" },
  { value: "bottom", label: "Bottom" },
  { value: "dress", label: "Dress / Jumpsuit" },
  { value: "outerwear", label: "Outerwear" },
  { value: "shoes", label: "Shoes" },
  { value: "accessory", label: "Accessory" },
];

export const FORMALITY_OPTIONS: { value: Formality; label: string }[] = [
  { value: "very_casual", label: "Very casual" },
  { value: "casual", label: "Casual" },
  { value: "smart_casual", label: "Smart casual" },
  { value: "business", label: "Business" },
  { value: "formal", label: "Formal" },
];

export const PATTERN_OPTIONS: { value: Pattern; label: string }[] = [
  { value: "solid", label: "Solid" },
  { value: "striped", label: "Striped" },
  { value: "plaid", label: "Plaid" },
  { value: "floral", label: "Floral" },
  { value: "graphic", label: "Graphic / printed" },
  { value: "textured", label: "Textured / knit" },
  { value: "other", label: "Other" },
];

export const SEASON_OPTIONS: { value: Season; label: string }[] = [
  { value: "spring", label: "Spring" },
  { value: "summer", label: "Summer" },
  { value: "fall", label: "Fall" },
  { value: "winter", label: "Winter" },
];

export const OCCASION_OPTIONS: { value: OccasionTag; label: string }[] = [
  { value: "work", label: "Work" },
  { value: "casual", label: "Everyday casual" },
  { value: "gym", label: "Gym / active" },
  { value: "date", label: "Date" },
  { value: "travel", label: "Travel" },
  { value: "outdoor", label: "Outdoor" },
  { value: "party", label: "Party / going out" },
  { value: "lounge", label: "Lounge / home" },
];

export const MOOD_OPTIONS: { value: MoodChip; label: string }[] = [
  { value: "cozy", label: "Cozy" },
  { value: "bold", label: "Bold" },
  { value: "professional", label: "Professional" },
  { value: "relaxed", label: "Relaxed" },
  { value: "romantic", label: "Romantic" },
  { value: "adventurous", label: "Adventurous" },
  { value: "low_key", label: "Low-key" },
];

export const WARMTH_LABELS: Record<number, string> = {
  1: "Very light",
  2: "Light",
  3: "Medium",
  4: "Warm",
  5: "Very warm",
};

export const COLOR_SWATCHES: { value: string; label: string }[] = [
  { value: "#241f1a", label: "Black" },
  { value: "#55493f", label: "Charcoal" },
  { value: "#e5dac7", label: "Cream" },
  { value: "#ffffff", label: "White" },
  { value: "#8b5a2b", label: "Brown" },
  { value: "#c1592e", label: "Terracotta" },
  { value: "#6f7d5c", label: "Sage" },
  { value: "#3a4a6b", label: "Navy" },
  { value: "#5b7ea0", label: "Denim blue" },
  { value: "#e2a63f", label: "Mustard" },
  { value: "#7d2e46", label: "Burgundy" },
  { value: "#9a9a9a", label: "Grey" },
];
