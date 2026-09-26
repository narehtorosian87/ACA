import { readJsonFile, writeJsonFile } from "./json-store";
import type { DayContext } from "./types";

const FILE_NAME = "today.json";

function todayDateString(): string {
  return new Date().toISOString().slice(0, 10);
}

function emptyContext(): DayContext {
  return {
    date: todayDateString(),
    plans: [],
    moodChips: [],
  };
}

export async function getDayContext(): Promise<DayContext> {
  const stored = await readJsonFile<DayContext | null>(FILE_NAME, null);
  if (!stored || stored.date !== todayDateString()) {
    return emptyContext();
  }
  return stored;
}

export async function updateDayContext(
  patch: Partial<DayContext>,
): Promise<DayContext> {
  const current = await getDayContext();
  const next: DayContext = { ...current, ...patch, date: todayDateString() };
  await writeJsonFile(FILE_NAME, next);
  return next;
}
