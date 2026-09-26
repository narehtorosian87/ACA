"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Settings } from "@/lib/types";

export function SettingsForm({ initialSettings }: { initialSettings: Settings }) {
  const router = useRouter();
  const [city, setCity] = useState(initialSettings.city ?? "");
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);
  const [clearing, setClearing] = useState<"closet" | "today" | null>(null);

  async function handleSaveCity() {
    setSaving(true);
    await fetch("/api/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ city }),
    });
    setSaving(false);
    setSavedMessage("Saved.");
    setTimeout(() => setSavedMessage(null), 2000);
  }

  async function handleClearCloset() {
    if (!confirm("Remove every item from your closet? This can't be undone.")) return;
    setClearing("closet");
    await fetch("/api/closet", { method: "DELETE" });
    setClearing(null);
    router.refresh();
  }

  async function handleClearToday() {
    if (!confirm("Clear today's weather, plans, and mood?")) return;
    setClearing("today");
    await fetch("/api/day", { method: "DELETE" });
    setClearing(null);
    router.refresh();
  }

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
          Location
        </h2>
        <p className="mt-1 text-sm text-ink-soft">
          Used to pull the weather on the Today page.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City, e.g. Amsterdam"
            className="w-64 rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-ink outline-none focus:border-terracotta"
          />
          <button
            type="button"
            onClick={handleSaveCity}
            disabled={saving}
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream hover:bg-terracotta disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save"}
          </button>
          {savedMessage && (
            <span className="text-sm text-sage">{savedMessage}</span>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
          Data
        </h2>
        <p className="mt-1 max-w-md text-sm text-ink-soft">
          Everything is stored locally in this project&apos;s data folder —
          nothing leaves your machine. Use these to start fresh.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleClearToday}
            disabled={clearing !== null}
            className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink hover:border-terracotta hover:text-terracotta disabled:opacity-60"
          >
            {clearing === "today" ? "Clearing…" : "Clear today's plan"}
          </button>
          <button
            type="button"
            onClick={handleClearCloset}
            disabled={clearing !== null}
            className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink hover:border-terracotta hover:text-terracotta disabled:opacity-60"
          >
            {clearing === "closet" ? "Clearing…" : "Clear entire closet"}
          </button>
        </div>
      </section>
    </div>
  );
}
