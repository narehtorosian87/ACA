"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { MOOD_OPTIONS, OCCASION_OPTIONS } from "@/lib/constants";
import type {
  DayContext,
  MoodChip,
  OccasionTag,
  PlanEntry,
  WeatherSnapshot,
} from "@/lib/types";

function toggleMood(list: MoodChip[], value: MoodChip): MoodChip[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export function TodayForm({
  initialCity,
  initialContext,
}: {
  initialCity?: string;
  initialContext: DayContext;
}) {
  const router = useRouter();
  const [city, setCity] = useState(initialContext.city ?? initialCity ?? "");
  const [locationLabel, setLocationLabel] = useState(initialContext.city ?? "");
  const [weather, setWeather] = useState<WeatherSnapshot | undefined>(
    initialContext.weather,
  );
  const [coords, setCoords] = useState<{ latitude?: number; longitude?: number }>({
    latitude: initialContext.latitude,
    longitude: initialContext.longitude,
  });
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  const [plans, setPlans] = useState<PlanEntry[]>(initialContext.plans);
  const [planTitle, setPlanTitle] = useState("");
  const [planTime, setPlanTime] = useState("");
  const [planTag, setPlanTag] = useState<OccasionTag>("work");

  const [moodChips, setMoodChips] = useState<MoodChip[]>(initialContext.moodChips);
  const [moodNote, setMoodNote] = useState(initialContext.moodNote ?? "");

  const [submitting, setSubmitting] = useState(false);

  async function handleCheckWeather() {
    if (!city.trim()) {
      setWeatherError("Enter a city first.");
      return;
    }
    setWeatherLoading(true);
    setWeatherError(null);
    const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
    const data = await res.json();
    setWeatherLoading(false);
    if (!res.ok) {
      setWeatherError(data.error ?? "Couldn't fetch weather.");
      return;
    }
    setWeather(data.weather);
    setLocationLabel(data.location.label);
    setCoords({ latitude: data.location.latitude, longitude: data.location.longitude });
  }

  function addPlan() {
    if (!planTitle.trim()) return;
    setPlans([
      ...plans,
      {
        id: crypto.randomUUID(),
        title: planTitle.trim(),
        time: planTime || undefined,
        occasionTag: planTag,
      },
    ]);
    setPlanTitle("");
    setPlanTime("");
  }

  function removePlan(id: string) {
    setPlans(plans.filter((p) => p.id !== id));
  }

  async function handleSubmit() {
    setSubmitting(true);
    await fetch("/api/day", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        city: locationLabel || city,
        latitude: coords.latitude,
        longitude: coords.longitude,
        weather,
        plans,
        moodChips,
        moodNote,
      }),
    });
    router.push("/recommendations");
  }

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
          1. Weather
        </h2>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCheckWeather()}
            placeholder="City, e.g. Amsterdam"
            className="w-64 rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-ink outline-none focus:border-terracotta"
          />
          <button
            type="button"
            onClick={handleCheckWeather}
            disabled={weatherLoading}
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream hover:bg-terracotta disabled:opacity-60"
          >
            {weatherLoading ? "Checking…" : "Check weather"}
          </button>
        </div>
        {weatherError && (
          <p className="mt-2 text-sm text-terracotta">{weatherError}</p>
        )}
        {weather && (
          <div className="mt-4 flex flex-wrap items-center gap-4 rounded-2xl bg-cream-soft px-5 py-4">
            <p className="font-display text-2xl text-ink">
              {Math.round(weather.temperatureC)}°C
            </p>
            <div className="text-sm text-ink-soft">
              <p>
                {weather.conditionLabel} · feels like{" "}
                {Math.round(weather.feelsLikeC)}°C
              </p>
              <p>
                {locationLabel} · {weather.precipitationChance}% chance of
                precipitation · {Math.round(weather.windKph)} km/h wind
              </p>
            </div>
          </div>
        )}
      </section>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
          2. Today&apos;s plans
        </h2>
        <div className="mt-4 space-y-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="flex items-center justify-between rounded-xl border border-line bg-white/70 px-4 py-3"
            >
              <div className="text-sm">
                <span className="font-medium text-ink">{plan.title}</span>
                {plan.time && (
                  <span className="ml-2 text-ink-soft">{plan.time}</span>
                )}
                <span className="ml-2 rounded-full bg-cream-soft px-2 py-0.5 text-xs text-ink-soft">
                  {OCCASION_OPTIONS.find((o) => o.value === plan.occasionTag)?.label}
                </span>
              </div>
              <button
                type="button"
                onClick={() => removePlan(plan.id)}
                className="text-sm font-semibold text-ink-soft hover:text-terracotta"
              >
                Remove
              </button>
            </div>
          ))}
          {plans.length === 0 && (
            <p className="text-sm text-ink-soft">
              Nothing added yet — plans help match formality (e.g. a client
              meeting vs. a gym session).
            </p>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-end gap-3">
          <label className="flex flex-col gap-1 text-xs font-medium text-ink-soft">
            What
            <input
              value={planTitle}
              onChange={(e) => setPlanTitle(e.target.value)}
              placeholder="e.g. Client meeting"
              className="w-48 rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink outline-none focus:border-terracotta"
            />
          </label>
          <label className="flex flex-col gap-1 text-xs font-medium text-ink-soft">
            Time (optional)
            <input
              type="time"
              value={planTime}
              onChange={(e) => setPlanTime(e.target.value)}
              className="rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink outline-none focus:border-terracotta"
            />
          </label>
          <label className="flex flex-col gap-1 text-xs font-medium text-ink-soft">
            Type
            <select
              value={planTag}
              onChange={(e) => setPlanTag(e.target.value as OccasionTag)}
              className="rounded-xl border border-line bg-white px-3 py-2 text-sm text-ink outline-none focus:border-terracotta"
            >
              {OCCASION_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={addPlan}
            className="rounded-full border border-line px-5 py-2 text-sm font-semibold text-ink hover:border-terracotta hover:text-terracotta"
          >
            + Add plan
          </button>
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
          3. How do you feel like dressing?
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {MOOD_OPTIONS.map((opt) => {
            const active = moodChips.includes(opt.value);
            return (
              <button
                type="button"
                key={opt.value}
                onClick={() => setMoodChips(toggleMood(moodChips, opt.value))}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "border-terracotta bg-terracotta-soft/40 text-ink"
                    : "border-line bg-white text-ink-soft hover:border-terracotta"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
        <textarea
          value={moodNote}
          onChange={(e) => setMoodNote(e.target.value)}
          rows={2}
          placeholder="Anything else? e.g. 'want to feel put-together but not stiff'"
          className="mt-4 w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-ink outline-none focus:border-terracotta"
        />
      </section>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={submitting}
        className="rounded-full bg-terracotta px-8 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-ink disabled:opacity-60"
      >
        {submitting ? "Putting it together…" : "Get my outfits"}
      </button>
    </div>
  );
}
