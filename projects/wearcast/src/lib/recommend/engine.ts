import type {
  ClosetCategory,
  ClosetItem,
  DayContext,
  OccasionTag,
  OutfitItem,
  OutfitRecommendation,
} from "../types";
import {
  FORMALITY_BY_RANK,
  isLoudPattern,
  NEUTRAL_COLORS,
  OCCASION_TARGET_FORMALITY,
  MOOD_HINTS,
  warmthTargetFromTemperature,
} from "./constants";
import { scoreItem, type ScoredItem, type ScoringContext } from "./scoring";
import { buildOutfitExplanation } from "./explain";

const TOP_N_PER_CATEGORY = 3;

interface OutfitCandidate {
  slots: Partial<Record<ClosetCategory, ScoredItem>>;
  score: number;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function pickTopN(scored: ScoredItem[], n: number): ScoredItem[] {
  return [...scored].sort((a, b) => b.score - a.score).slice(0, n);
}

function candidateSignature(candidate: OutfitCandidate): string {
  return Object.values(candidate.slots)
    .map((s) => s?.item.id)
    .sort()
    .join("|");
}

function candidateBaseIdentity(candidate: OutfitCandidate): string {
  if (candidate.slots.dress) return `dress:${candidate.slots.dress.item.id}`;
  return `top:${candidate.slots.top?.item.id}|bottom:${candidate.slots.bottom?.item.id}`;
}

function scoreCandidate(candidate: OutfitCandidate): number {
  const items = Object.values(candidate.slots).filter(Boolean) as ScoredItem[];
  const base = items.reduce((sum, s) => sum + s.score, 0) / items.length;

  const loudCount = items.filter((s) => isLoudPattern(s.item.pattern)).length;
  const patternPenalty = loudCount > 1 ? (loudCount - 1) * 0.08 : 0;

  const colors = new Set(items.flatMap((s) => s.item.colors));
  const nonNeutral = [...colors].filter((c) => !NEUTRAL_COLORS.has(c));
  const colorPenalty = nonNeutral.length >= 3 ? 0.05 : 0;

  return clamp(base - patternPenalty - colorPenalty, 0, 1);
}

function deriveTargetFormality(
  plans: DayContext["plans"],
  moodChips: DayContext["moodChips"],
): number {
  const base =
    plans.length === 0
      ? OCCASION_TARGET_FORMALITY.casual
      : Math.max(...plans.map((p) => OCCASION_TARGET_FORMALITY[p.occasionTag]));
  const moodBias = moodChips.reduce(
    (sum, mood) => sum + MOOD_HINTS[mood].formalityBias,
    0,
  );
  return clamp(base + moodBias, 1, 5);
}

export interface RecommendationResult {
  outfits: OutfitRecommendation[];
  missingCategories: ClosetCategory[];
  targetFormalityLabel: string;
}

export function generateRecommendations(
  items: ClosetItem[],
  context: DayContext,
  today: Date = new Date(),
): RecommendationResult {
  const todaysOccasions: OccasionTag[] = [
    ...new Set(context.plans.map((p) => p.occasionTag)),
  ];
  const targetFormality = deriveTargetFormality(context.plans, context.moodChips);
  const warmthTarget = context.weather
    ? warmthTargetFromTemperature(context.weather.feelsLikeC)
    : 3;
  const needsRain =
    context.weather?.isRaining ||
    (context.weather?.precipitationChance ?? 0) >= 50;
  const needsOuterLayer =
    warmthTarget >= 3 || needsRain || Boolean(context.weather?.isSnowing);

  const scoringContext: ScoringContext = {
    targetFormality,
    warmthTarget,
    needsRain,
    todaysOccasions,
    moodChips: context.moodChips,
    today,
  };

  const scored = items.map((item) => scoreItem(item, scoringContext));
  const byCategory: Record<ClosetCategory, ScoredItem[]> = {
    top: [],
    bottom: [],
    dress: [],
    outerwear: [],
    shoes: [],
    accessory: [],
  };
  for (const s of scored) byCategory[s.item.category].push(s);

  const tops = pickTopN(byCategory.top, TOP_N_PER_CATEGORY);
  const bottoms = pickTopN(byCategory.bottom, TOP_N_PER_CATEGORY);
  const dresses = pickTopN(byCategory.dress, TOP_N_PER_CATEGORY);
  const shoes = pickTopN(byCategory.shoes, TOP_N_PER_CATEGORY);
  const bestOuterwear = pickTopN(byCategory.outerwear, 1)[0];
  const bestAccessory = pickTopN(byCategory.accessory, 1)[0];

  const canFormBase = (tops.length > 0 && bottoms.length > 0) || dresses.length > 0;
  const missingCategories: ClosetCategory[] = [];
  if (!canFormBase) {
    if (dresses.length === 0) {
      if (tops.length === 0) missingCategories.push("top");
      if (bottoms.length === 0) missingCategories.push("bottom");
    }
  }
  if (shoes.length === 0) missingCategories.push("shoes");

  if (!canFormBase || shoes.length === 0) {
    return { outfits: [], missingCategories, targetFormalityLabel: FORMALITY_BY_RANK[targetFormality - 1] };
  }

  const bases: Partial<Record<ClosetCategory, ScoredItem>>[] = [];
  for (const top of tops) {
    for (const bottom of bottoms) {
      bases.push({ top, bottom });
    }
  }
  for (const dress of dresses) {
    bases.push({ dress });
  }

  const candidates: OutfitCandidate[] = [];
  for (const base of bases) {
    for (const shoe of shoes) {
      const slots: Partial<Record<ClosetCategory, ScoredItem>> = {
        ...base,
        shoes: shoe,
      };

      if (needsOuterLayer && bestOuterwear) {
        slots.outerwear = bestOuterwear;
      } else if (!needsOuterLayer && bestOuterwear && bestOuterwear.score > 0.7) {
        slots.outerwear = bestOuterwear;
      }

      if (bestAccessory && bestAccessory.score > 0.55) {
        slots.accessory = bestAccessory;
      }

      candidates.push({ slots, score: 0 });
    }
  }

  for (const c of candidates) c.score = scoreCandidate(c);
  candidates.sort((a, b) => b.score - a.score);

  const seenSignatures = new Set<string>();
  const uniqueCandidates = candidates.filter((c) => {
    const sig = candidateSignature(c);
    if (seenSignatures.has(sig)) return false;
    seenSignatures.add(sig);
    return true;
  });

  const first = uniqueCandidates[0];
  const firstIdentity = candidateBaseIdentity(first);
  const second =
    uniqueCandidates.find((c) => candidateBaseIdentity(c) !== firstIdentity) ??
    uniqueCandidates[1];

  const chosen = [first, second].filter((c): c is OutfitCandidate => Boolean(c));

  const outfits: OutfitRecommendation[] = chosen.map((candidate, index) => {
    const outfitItems: OutfitItem[] = (
      Object.entries(candidate.slots) as [ClosetCategory, ScoredItem | undefined][]
    )
      .filter((entry): entry is [ClosetCategory, ScoredItem] => Boolean(entry[1]))
      .map(([role, scored]) => ({ item: scored.item, role }));

    const { reasons, summary } = buildOutfitExplanation({
      candidateItems: outfitItems,
      context,
      targetFormality,
      warmthTarget,
      needsRain,
    });

    return {
      id: `outfit-${index + 1}`,
      label: `Outfit ${index + 1}`,
      items: outfitItems,
      score: candidate.score,
      reasons,
      summary,
    };
  });

  return {
    outfits,
    missingCategories,
    targetFormalityLabel: FORMALITY_BY_RANK[targetFormality - 1],
  };
}
