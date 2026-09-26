import { NextResponse } from "next/server";
import { fetchWeather, geocodeCity } from "@/lib/weather";
import { updateSettings } from "@/lib/settings-store";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");
  if (!city) {
    return NextResponse.json({ error: "city is required" }, { status: 400 });
  }

  const location = await geocodeCity(city);
  if (!location) {
    return NextResponse.json(
      { error: `Couldn't find "${city}". Try a different spelling.` },
      { status: 404 },
    );
  }

  try {
    const weather = await fetchWeather(location.latitude, location.longitude);
    await updateSettings({
      city: location.label,
      latitude: location.latitude,
      longitude: location.longitude,
    });
    return NextResponse.json({ location, weather });
  } catch {
    return NextResponse.json(
      { error: "Weather service is unavailable right now." },
      { status: 502 },
    );
  }
}
