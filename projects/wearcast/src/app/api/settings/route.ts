import { NextResponse } from "next/server";
import { getSettings, updateSettings } from "@/lib/settings-store";
import type { Settings } from "@/lib/types";

export async function GET() {
  const settings = await getSettings();
  return NextResponse.json({ settings });
}

export async function PATCH(request: Request) {
  const patch = (await request.json()) as Partial<Settings>;
  const settings = await updateSettings(patch);
  return NextResponse.json({ settings });
}
