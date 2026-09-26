import type { Formality, MoodChip, OccasionTag, Pattern } from "../types";

/** Numeric ordering used to compare/interpolate formality levels. */
export const FORMALITY_ORDER: Record<Formality, number> = {
  very_casual: 1,
  casual: 2,
  smart_casual: 3,
  business: 4,
  formal: 5,
};

export const FORMALITY_BY_RANK: Formality[] = [
  "very_casual",
  "casual",
  "smart_casual",
  "business",
  "formal",
];

/** How formal an item of clothing typically needs to be for a given plan type. */
export const OCCASION_TARGET_FORMALITY: Record<OccasionTag, number> = {
  work: 4,
  casual: 2,
  gym: 1,
  date: 3,
  travel: 2,
  outdoor: 2,
  party: 4,
  lounge: 1,
};

const LOUD_PATTERNS: Pattern[] = ["graphic", "floral", "plaid", "striped"];

export function isLoudPattern(pattern: Pattern): boolean {
  return LOUD_PATTERNS.includes(pattern);
}

/** Colors treated as "safe neutrals" that coordinate with anything. */
export const NEUTRAL_COLORS = new Set([
  "#241f1a", // black
  "#55493f", // charcoal
  "#e5dac7", // cream
  "#ffffff", // white
  "#9a9a9a", // grey
  "#8b5a2b", // brown
]);

export interface MoodHint {
  formalityBias: number;
  preferredPatterns: Pattern[];
  preferredColors: string[];
  preferredOccasions: OccasionTag[];
  rainOkWeight: number;
}

const emptyHint = (): MoodHint => ({
  formalityBias: 0,
  preferredPatterns: [],
  preferredColors: [],
  preferredOccasions: [],
  rainOkWeight: 0,
});

export const MOOD_HINTS: Record<MoodChip, MoodHint> = {
  cozy: {
    ...emptyHint(),
    formalityBias: -1,
    preferredPatterns: ["textured", "solid"],
    preferredOccasions: ["lounge", "casual"],
  },
  bold: {
    ...emptyHint(),
    preferredPatterns: ["graphic", "striped", "plaid"],
    preferredColors: ["#c1592e", "#e2a63f", "#7d2e46"],
  },
  professional: {
    ...emptyHint(),
    formalityBias: 1,
    preferredPatterns: ["solid"],
    preferredOccasions: ["work"],
  },
  relaxed: {
    ...emptyHint(),
    formalityBias: -1,
    preferredOccasions: ["casual", "lounge"],
  },
  romantic: {
    ...emptyHint(),
    preferredPatterns: ["floral"],
    preferredColors: ["#7d2e46", "#e5dac7"],
  },
  adventurous: {
    ...emptyHint(),
    preferredOccasions: ["outdoor", "travel"],
    rainOkWeight: 1,
  },
  low_key: {
    ...emptyHint(),
    preferredColors: ["#241f1a", "#55493f", "#e5dac7", "#9a9a9a"],
  },
};

/** Warmth level (1-5) a "feels like" temperature in Celsius calls for. */
export function warmthTargetFromTemperature(feelsLikeC: number): 1 | 2 | 3 | 4 | 5 {
  if (feelsLikeC <= 2) return 5;
  if (feelsLikeC <= 8) return 4;
  if (feelsLikeC <= 15) return 3;
  if (feelsLikeC <= 21) return 2;
  return 1;
}

export const SCORE_WEIGHTS = {
  formality: 0.28,
  warmth: 0.22,
  rain: 0.12,
  occasion: 0.18,
  mood: 0.12,
  favoriteBonus: 0.04,
  recencyPenaltyMax: 0.25,
  recencyDecayDays: 4,
};
