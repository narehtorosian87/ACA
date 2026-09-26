import { FORMALITY_OPTIONS, MOOD_OPTIONS, OCCASION_OPTIONS } from "../constants";
import type { DayContext, OutfitItem } from "../types";
import { MOOD_HINTS } from "./constants";

function formalityLabel(rank: number): string {
  const index = Math.round(rank) - 1;
  const clamped = Math.max(0, Math.min(FORMALITY_OPTIONS.length - 1, index));
  return FORMALITY_OPTIONS[clamped].label.toLowerCase();
}

function occasionLabel(tag: string): string {
  return OCCASION_OPTIONS.find((o) => o.value === tag)?.label ?? tag;
}

function moodLabel(chip: string): string {
  return MOOD_OPTIONS.find((o) => o.value === chip)?.label ?? chip;
}

/**
 * Deterministic, zero-API-key explanation of why an outfit was chosen.
 * The signature is intentionally self-contained so this can later be
 * swapped for a call to an LLM (same inputs, richer prose) without
 * touching the scoring engine.
 */
export function buildOutfitExplanation({
  candidateItems,
  context,
  targetFormality,
  warmthTarget,
  needsRain,
}: {
  candidateItems: OutfitItem[];
  context: DayContext;
  targetFormality: number;
  warmthTarget: number;
  needsRain: boolean;
}): { reasons: string[]; summary: string } {
  const reasons: string[] = [];

  let weatherClause: string;
  if (context.weather) {
    const temp = Math.round(context.weather.temperatureC);
    const condition = context.weather.conditionLabel.toLowerCase();
    weatherClause = `${temp}°C and ${condition}`;
    const outerwear = candidateItems.find((i) => i.role === "outerwear");
    if (needsRain && outerwear?.item.rainOk) {
      reasons.push(
        `Rain is likely, so the ${outerwear.item.name.toLowerCase()} was picked for being rain-ready.`,
      );
    } else if (warmthTarget >= 4) {
      reasons.push(`It's cold out, so warmer, layered pieces were prioritized.`);
    } else if (warmthTarget <= 2) {
      reasons.push(`Mild weather, so lighter pieces were prioritized.`);
    }
  } else {
    weatherClause = "no weather set yet";
    reasons.push("Add today's weather on the Today page for a sharper pick.");
  }

  let planClause = "";
  if (context.plans.length > 0) {
    const leadPlan = [...context.plans].sort(
      (a, b) => (a.time ?? "").localeCompare(b.time ?? ""),
    )[0];
    planClause = `your "${leadPlan.title}" plan`;
    reasons.push(
      `${occasionLabel(leadPlan.occasionTag)} plans called for ${formalityLabel(
        targetFormality,
      )} dressing.`,
    );
  } else {
    reasons.push("No plans logged today, so this stays easygoing.");
  }

  if (context.moodChips.length > 0) {
    const mood = context.moodChips[0];
    const hint = MOOD_HINTS[mood];
    const matchedItem = candidateItems.find(
      (i) =>
        hint.preferredPatterns.includes(i.item.pattern) ||
        i.item.colors.some((c) => hint.preferredColors.includes(c)),
    );
    if (matchedItem) {
      reasons.push(
        `The ${matchedItem.item.name.toLowerCase()} leans into your "${moodLabel(mood)}" mood.`,
      );
    } else {
      reasons.push(`Chosen with your "${moodLabel(mood)}" mood in mind.`);
    }
  }

  const favoriteItem = candidateItems.find((i) => i.item.favorite);
  if (favoriteItem) {
    reasons.push(`Includes one of your favorites, the ${favoriteItem.item.name.toLowerCase()}.`);
  }

  const styleClause =
    context.moodChips.length > 0
      ? `a ${moodLabel(context.moodChips[0]).toLowerCase()} take on ${formalityLabel(targetFormality)}`
      : `a balanced ${formalityLabel(targetFormality)} outfit`;

  const summary = planClause
    ? `${weatherClause}, plus ${planClause} — ${styleClause}.`
    : `${weatherClause} — ${styleClause}.`;

  return { reasons, summary };
}
