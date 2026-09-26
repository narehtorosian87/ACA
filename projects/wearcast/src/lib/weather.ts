import type { WeatherSnapshot } from "./types";

interface GeocodeResult {
  name: string;
  admin1?: string;
  country?: string;
  latitude: number;
  longitude: number;
}

export interface ResolvedLocation {
  label: string;
  latitude: number;
  longitude: number;
}

const WEATHER_LABELS: Record<number, string> = {
  0: "Clear sky",
  1: "Mostly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Freezing fog",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Heavy drizzle",
  56: "Freezing drizzle",
  57: "Freezing drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  66: "Freezing rain",
  67: "Freezing rain",
  71: "Light snow",
  73: "Snow",
  75: "Heavy snow",
  77: "Snow grains",
  80: "Light rain showers",
  81: "Rain showers",
  82: "Violent rain showers",
  85: "Snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with hail",
  99: "Thunderstorm with hail",
};

const RAIN_CODES = new Set([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99]);
const SNOW_CODES = new Set([71, 73, 75, 77, 85, 86]);

export async function geocodeCity(query: string): Promise<ResolvedLocation | null> {
  const url = new URL("https://geocoding-api.open-meteo.com/v1/search");
  url.searchParams.set("name", query);
  url.searchParams.set("count", "1");
  url.searchParams.set("language", "en");

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return null;
  const data = (await res.json()) as { results?: GeocodeResult[] };
  const first = data.results?.[0];
  if (!first) return null;

  const parts = [first.name, first.admin1, first.country].filter(Boolean);
  return {
    label: parts.join(", "),
    latitude: first.latitude,
    longitude: first.longitude,
  };
}

export async function fetchWeather(
  latitude: number,
  longitude: number,
): Promise<WeatherSnapshot> {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(latitude));
  url.searchParams.set("longitude", String(longitude));
  url.searchParams.set(
    "current",
    "temperature_2m,apparent_temperature,precipitation_probability,wind_speed_10m,weather_code",
  );
  url.searchParams.set("timezone", "auto");

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Weather lookup failed");
  const data = (await res.json()) as {
    current: {
      temperature_2m: number;
      apparent_temperature: number;
      precipitation_probability: number;
      wind_speed_10m: number;
      weather_code: number;
    };
  };

  const code = data.current.weather_code;
  return {
    temperatureC: data.current.temperature_2m,
    feelsLikeC: data.current.apparent_temperature,
    precipitationChance: data.current.precipitation_probability,
    windKph: data.current.wind_speed_10m,
    conditionCode: code,
    conditionLabel: WEATHER_LABELS[code] ?? "Unsettled weather",
    isRaining: RAIN_CODES.has(code),
    isSnowing: SNOW_CODES.has(code),
  };
}
