import { randomUUID } from "crypto";
import { readJsonFile, writeJsonFile } from "./json-store";
import type { ClosetItem, ClosetItemInput } from "./types";

const FILE_NAME = "closet.json";

export async function getAllItems(): Promise<ClosetItem[]> {
  return readJsonFile<ClosetItem[]>(FILE_NAME, []);
}

export async function getItem(id: string): Promise<ClosetItem | undefined> {
  const items = await getAllItems();
  return items.find((item) => item.id === id);
}

export async function createItem(input: ClosetItemInput): Promise<ClosetItem> {
  const items = await getAllItems();
  const now = new Date().toISOString();
  const item: ClosetItem = {
    ...input,
    id: randomUUID(),
    createdAt: now,
    updatedAt: now,
  };
  items.push(item);
  await writeJsonFile(FILE_NAME, items);
  return item;
}

export async function updateItem(
  id: string,
  patch: Partial<ClosetItemInput>,
): Promise<ClosetItem | undefined> {
  const items = await getAllItems();
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return undefined;
  const updated: ClosetItem = {
    ...items[index],
    ...patch,
    id: items[index].id,
    createdAt: items[index].createdAt,
    updatedAt: new Date().toISOString(),
  };
  items[index] = updated;
  await writeJsonFile(FILE_NAME, items);
  return updated;
}

export async function deleteItem(id: string): Promise<boolean> {
  const items = await getAllItems();
  const next = items.filter((item) => item.id !== id);
  if (next.length === items.length) return false;
  await writeJsonFile(FILE_NAME, next);
  return true;
}

export async function replaceAllItems(items: ClosetItem[]): Promise<void> {
  await writeJsonFile(FILE_NAME, items);
}
