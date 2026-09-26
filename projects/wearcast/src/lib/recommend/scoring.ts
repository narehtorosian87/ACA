import type { ClosetItem, MoodChip, OccasionTag } from "../types";
import { FORMALITY_ORDER, MOOD_HINTS, SCORE_WEIGHTS } from "./constants";

export interface ScoringContext {
  targetFormality: number;
  warmthTarget: number;
  needsRain: boolean;
  todaysOccasions: OccasionTag[];
  moodChips: MoodChip[];
  today: Date;
}

export interface ScoredItem {
  item: ClosetItem;
  score: number;
  matchedMood: boolean;
}

function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}

/** Warmth matters less for shoes/accessories than for garments worn over the torso. */
function warmthWeightFor(item: ClosetItem): number {
  if (item.category === "shoes" || item.category === "accessory") {
    return SCORE_WEIGHTS.warmth * 0.4;
  }
  return SCORE_WEIGHTS.warmth;
}

function recencyPenalty(item: ClosetItem, today: Date): number {
  if (!item.lastWornDate) return 0;
  const lastWorn = new Date(item.lastWornDate);
  const daysSince = Math.max(
    0,
    (today.getTime() - lastWorn.getTime()) / (1000 * 60 * 60 * 24),
  );
  if (daysSince >= SCORE_WEIGHTS.recencyDecayDays) return 0;
  const fraction = 1 - daysSince / SCORE_WEIGHTS.recencyDecayDays;
  return SCORE_WEIGHTS.recencyPenaltyMax * fraction;
}

function moodFit(item: ClosetItem, moodChips: MoodChip[]): number {
  if (moodChips.length === 0) return 0.7;
  let score = 0.5;
  for (const mood of moodChips) {
    const hint = MOOD_HINTS[mood];
    if (hint.preferredPatterns.includes(item.pattern)) score += 0.2;
    if (item.colors.some((c) => hint.preferredColors.includes(c))) score += 0.2;
    if (item.occasionTags.some((t) => hint.preferredOccasions.includes(t))) {
      score += 0.15;
    }
    if (hint.rainOkWeight > 0 && item.rainOk) score += 0.1;
  }
  return clamp01(score);
}

export function scoreItem(item: ClosetItem, ctx: ScoringContext): ScoredItem {
  const itemFormality = FORMALITY_ORDER[item.formality];
  const formalityFit = 1 - Math.abs(itemFormality - ctx.targetFormality) / 4;

  const warmthFit = 1 - Math.abs(item.warmth - ctx.warmthTarget) / 4;

  const rainFit = ctx.needsRain ? (item.rainOk ? 1 : 0.3) : 1;

  const occasionFit =
    ctx.todaysOccasions.length === 0
      ? 1
      : item.occasionTags.some((t) => ctx.todaysOccasions.includes(t))
        ? 1
        : 0.4;

  const mood = moodFit(item, ctx.moodChips);
  const matchedMood = ctx.moodChips.length > 0 && mood > 0.7;

  const favoriteBonus = item.favorite ? SCORE_WEIGHTS.favoriteBonus : 0;
  const penalty = recencyPenalty(item, ctx.today);

  const score = clamp01(
    SCORE_WEIGHTS.formality * clamp01(formalityFit) +
      warmthWeightFor(item) * clamp01(warmthFit) +
      SCORE_WEIGHTS.rain * rainFit +
      SCORE_WEIGHTS.occasion * occasionFit +
      SCORE_WEIGHTS.mood * mood +
      favoriteBonus -
      penalty,
  );

  return { item, score, matchedMood };
}
