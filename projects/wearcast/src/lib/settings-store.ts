import { createClient } from "./supabase/server";
import { requireUserId } from "./supabase/auth-helpers";
import type { Settings } from "./types";

interface SettingsRow {
  city: string | null;
  latitude: number | null;
  longitude: number | null;
}

function rowToSettings(row: SettingsRow | null): Settings {
  if (!row) return {};
  return {
    city: row.city ?? undefined,
    latitude: row.latitude ?? undefined,
    longitude: row.longitude ?? undefined,
  };
}

export async function getSettings(): Promise<Settings> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("settings")
    .select("city, latitude, longitude")
    .maybeSingle();
  if (error) throw error;
  return rowToSettings(data);
}

export async function updateSettings(patch: Partial<Settings>): Promise<Settings> {
  const supabase = await createClient();
  const userId = await requireUserId(supabase);

  const row: Record<string, unknown> = { user_id: userId };
  if (patch.city !== undefined) row.city = patch.city || null;
  if (patch.latitude !== undefined) row.latitude = patch.latitude ?? null;
  if (patch.longitude !== undefined) row.longitude = patch.longitude ?? null;

  const { data, error } = await supabase
    .from("settings")
    .upsert(row, { onConflict: "user_id" })
    .select("city, latitude, longitude")
    .single();
  if (error) throw error;
  return rowToSettings(data);
}
