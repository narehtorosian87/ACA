import { createClient } from "./supabase/server";
import { requireUserId } from "./supabase/auth-helpers";
import type { ClosetItem, ClosetItemInput } from "./types";

interface ClosetItemRow {
  id: string;
  name: string;
  category: string;
  subcategory: string | null;
  colors: string[];
  pattern: string;
  formality: string;
  warmth: number;
  rain_ok: boolean;
  seasons: string[];
  occasion_tags: string[];
  fit: string | null;
  photo_url: string | null;
  favorite: boolean;
  last_worn_date: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

function rowToItem(row: ClosetItemRow): ClosetItem {
  return {
    id: row.id,
    name: row.name,
    category: row.category as ClosetItem["category"],
    subcategory: row.subcategory ?? undefined,
    colors: row.colors,
    pattern: row.pattern as ClosetItem["pattern"],
    formality: row.formality as ClosetItem["formality"],
    warmth: row.warmth as ClosetItem["warmth"],
    rainOk: row.rain_ok,
    seasons: row.seasons as ClosetItem["seasons"],
    occasionTags: row.occasion_tags as ClosetItem["occasionTags"],
    fit: row.fit ?? undefined,
    photoUrl: row.photo_url ?? undefined,
    favorite: row.favorite,
    lastWornDate: row.last_worn_date ?? undefined,
    notes: row.notes ?? undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function inputToRow(input: Partial<ClosetItemInput>): Record<string, unknown> {
  const row: Record<string, unknown> = {};
  if (input.name !== undefined) row.name = input.name;
  if (input.category !== undefined) row.category = input.category;
  if (input.subcategory !== undefined) row.subcategory = input.subcategory || null;
  if (input.colors !== undefined) row.colors = input.colors;
  if (input.pattern !== undefined) row.pattern = input.pattern;
  if (input.formality !== undefined) row.formality = input.formality;
  if (input.warmth !== undefined) row.warmth = input.warmth;
  if (input.rainOk !== undefined) row.rain_ok = input.rainOk;
  if (input.seasons !== undefined) row.seasons = input.seasons;
  if (input.occasionTags !== undefined) row.occasion_tags = input.occasionTags;
  if (input.fit !== undefined) row.fit = input.fit || null;
  if (input.photoUrl !== undefined) row.photo_url = input.photoUrl || null;
  if (input.favorite !== undefined) row.favorite = input.favorite;
  if (input.lastWornDate !== undefined) row.last_worn_date = input.lastWornDate || null;
  if (input.notes !== undefined) row.notes = input.notes || null;
  return row;
}

export async function getAllItems(): Promise<ClosetItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("closet_items")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []).map(rowToItem);
}

export async function getItem(id: string): Promise<ClosetItem | undefined> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("closet_items")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data ? rowToItem(data) : undefined;
}

export async function createItem(input: ClosetItemInput): Promise<ClosetItem> {
  const supabase = await createClient();
  const userId = await requireUserId(supabase);
  const { data, error } = await supabase
    .from("closet_items")
    .insert({ ...inputToRow(input), user_id: userId })
    .select()
    .single();
  if (error) throw error;
  return rowToItem(data);
}

export async function createManyItems(
  inputs: ClosetItemInput[],
): Promise<ClosetItem[]> {
  const supabase = await createClient();
  const userId = await requireUserId(supabase);
  const { data, error } = await supabase
    .from("closet_items")
    .insert(inputs.map((input) => ({ ...inputToRow(input), user_id: userId })))
    .select();
  if (error) throw error;
  return (data ?? []).map(rowToItem);
}

export async function updateItem(
  id: string,
  patch: Partial<ClosetItemInput>,
): Promise<ClosetItem | undefined> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("closet_items")
    .update({ ...inputToRow(patch), updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .maybeSingle();
  if (error) throw error;
  return data ? rowToItem(data) : undefined;
}

export async function deleteItem(id: string): Promise<boolean> {
  const supabase = await createClient();
  const { error, count } = await supabase
    .from("closet_items")
    .delete({ count: "exact" })
    .eq("id", id);
  if (error) throw error;
  return (count ?? 0) > 0;
}

export async function clearAllItems(): Promise<void> {
  const supabase = await createClient();
  const userId = await requireUserId(supabase);
  const { error } = await supabase
    .from("closet_items")
    .delete()
    .eq("user_id", userId);
  if (error) throw error;
}
