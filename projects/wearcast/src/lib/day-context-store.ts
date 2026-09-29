import { createClient } from "./supabase/server";
import { requireUserId } from "./supabase/auth-helpers";
import type { DayContext } from "./types";

interface DayContextRow {
  date: string;
  city: string | null;
  latitude: number | null;
  longitude: number | null;
  weather: DayContext["weather"] | null;
  plans: DayContext["plans"];
  mood_chips: DayContext["moodChips"];
  mood_note: string | null;
}

function todayDateString(): string {
  return new Date().toISOString().slice(0, 10);
}

function rowToContext(row: DayContextRow): DayContext {
  return {
    date: row.date,
    city: row.city ?? undefined,
    latitude: row.latitude ?? undefined,
    longitude: row.longitude ?? undefined,
    weather: row.weather ?? undefined,
    plans: row.plans ?? [],
    moodChips: row.mood_chips ?? [],
    moodNote: row.mood_note ?? undefined,
  };
}

function emptyContext(): DayContext {
  return { date: todayDateString(), plans: [], moodChips: [] };
}

export async function getDayContext(): Promise<DayContext> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("day_context")
    .select("date, city, latitude, longitude, weather, plans, mood_chips, mood_note")
    .eq("date", todayDateString())
    .maybeSingle();
  if (error) throw error;
  return data ? rowToContext(data) : emptyContext();
}

export async function updateDayContext(
  patch: Partial<DayContext>,
): Promise<DayContext> {
  const supabase = await createClient();
  const userId = await requireUserId(supabase);
  const current = await getDayContext();
  const merged: DayContext = { ...current, ...patch, date: todayDateString() };

  const { data, error } = await supabase
    .from("day_context")
    .upsert(
      {
        user_id: userId,
        date: merged.date,
        city: merged.city ?? null,
        latitude: merged.latitude ?? null,
        longitude: merged.longitude ?? null,
        weather: merged.weather ?? null,
        plans: merged.plans,
        mood_chips: merged.moodChips,
        mood_note: merged.moodNote ?? null,
      },
      { onConflict: "user_id,date" },
    )
    .select("date, city, latitude, longitude, weather, plans, mood_chips, mood_note")
    .single();
  if (error) throw error;
  return rowToContext(data);
}
