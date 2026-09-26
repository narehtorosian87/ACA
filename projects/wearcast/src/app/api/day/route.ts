import { NextResponse } from "next/server";
import { getDayContext, updateDayContext } from "@/lib/day-context-store";
import type { DayContext } from "@/lib/types";

export async function GET() {
  const context = await getDayContext();
  return NextResponse.json({ context });
}

export async function PATCH(request: Request) {
  const patch = (await request.json()) as Partial<DayContext>;
  const context = await updateDayContext(patch);
  return NextResponse.json({ context });
}

export async function DELETE() {
  const context = await updateDayContext({
    city: undefined,
    latitude: undefined,
    longitude: undefined,
    weather: undefined,
    plans: [],
    moodChips: [],
    moodNote: undefined,
  });
  return NextResponse.json({ context });
}
