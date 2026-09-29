import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { createManyItems } from "@/lib/closet-store";
import { updateDayContext } from "@/lib/day-context-store";
import { updateSettings } from "@/lib/settings-store";
import {
  DEMO_CITY,
  DEMO_CLOSET_ITEMS,
  DEMO_LATITUDE,
  DEMO_LONGITUDE,
  DEMO_MOOD_CHIPS,
  DEMO_MOOD_NOTE,
  DEMO_PLANS,
} from "@/lib/demo-data";

export async function POST() {
  const items = await createManyItems(DEMO_CLOSET_ITEMS);

  await updateSettings({
    city: DEMO_CITY,
    latitude: DEMO_LATITUDE,
    longitude: DEMO_LONGITUDE,
  });

  await updateDayContext({
    city: DEMO_CITY,
    latitude: DEMO_LATITUDE,
    longitude: DEMO_LONGITUDE,
    plans: DEMO_PLANS.map((plan) => ({ ...plan, id: randomUUID() })),
    moodChips: [...DEMO_MOOD_CHIPS],
    moodNote: DEMO_MOOD_NOTE,
  });

  return NextResponse.json({ items });
}
