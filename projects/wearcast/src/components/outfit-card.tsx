"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { GarmentGlyph } from "@/components/garment-glyph";
import type { OutfitRecommendation } from "@/lib/types";

export function OutfitCard({ outfit }: { outfit: OutfitRecommendation }) {
  const router = useRouter();
  const [marking, setMarking] = useState(false);
  const [marked, setMarked] = useState(false);

  async function handleMarkWorn() {
    setMarking(true);
    const today = new Date().toISOString().slice(0, 10);
    await Promise.all(
      outfit.items.map((outfitItem) => {
        const body = new FormData();
        body.set("data", JSON.stringify({ lastWornDate: today }));
        return fetch(`/api/closet/${outfitItem.item.id}`, {
          method: "PATCH",
          body,
        });
      }),
    );
    setMarking(false);
    setMarked(true);
    router.refresh();
  }

  return (
    <div className="flex flex-col rounded-3xl border border-line bg-white/70 p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-terracotta">
        {outfit.label}
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {outfit.items.map((outfitItem) => (
          <div
            key={outfitItem.item.id}
            className="flex flex-col items-center gap-2 rounded-2xl bg-cream-soft py-4 text-center"
          >
            {outfitItem.item.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={outfitItem.item.photoUrl}
                alt={outfitItem.item.name}
                className="h-12 w-12 rounded-lg object-cover"
              />
            ) : (
              <GarmentGlyph
                category={outfitItem.item.category}
                className="h-10 w-10 text-ink-soft"
              />
            )}
            <span className="px-1 text-xs font-medium text-ink-soft">
              {outfitItem.item.name}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-5 text-sm leading-relaxed text-ink-soft">
        <span className="font-semibold text-ink">Why: </span>
        {outfit.summary}
      </p>

      {outfit.reasons.length > 0 && (
        <ul className="mt-3 space-y-1 text-xs text-ink-soft">
          {outfit.reasons.map((reason, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-terracotta">·</span>
              {reason}
            </li>
          ))}
        </ul>
      )}

      <button
        type="button"
        onClick={handleMarkWorn}
        disabled={marking || marked}
        className="mt-6 self-start rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-terracotta hover:text-terracotta disabled:opacity-60"
      >
        {marked ? "Marked as worn ✓" : marking ? "Saving…" : "I wore this"}
      </button>
    </div>
  );
}
