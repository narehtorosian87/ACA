import { readJsonFile, writeJsonFile } from "./json-store";
import type { Settings } from "./types";

const FILE_NAME = "settings.json";

export async function getSettings(): Promise<Settings> {
  return readJsonFile<Settings>(FILE_NAME, {});
}

export async function updateSettings(patch: Partial<Settings>): Promise<Settings> {
  const current = await getSettings();
  const next = { ...current, ...patch };
  await writeJsonFile(FILE_NAME, next);
  return next;
}
