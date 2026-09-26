"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GarmentGlyph } from "@/components/garment-glyph";
import { FORMALITY_OPTIONS, OCCASION_OPTIONS } from "@/lib/constants";
import type { ClosetItem } from "@/lib/types";

function formalityLabel(value: ClosetItem["formality"]): string {
  return FORMALITY_OPTIONS.find((opt) => opt.value === value)?.label ?? value;
}

function occasionLabel(value: ClosetItem["occasionTags"][number]): string {
  return OCCASION_OPTIONS.find((opt) => opt.value === value)?.label ?? value;
}

export function ClosetItemCard({ item }: { item: ClosetItem }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [favorite, setFavorite] = useState(item.favorite);

  async function toggleFavorite() {
    setBusy(true);
    const body = new FormData();
    body.set("data", JSON.stringify({ favorite: !favorite }));
    const res = await fetch(`/api/closet/${item.id}`, { method: "PATCH", body });
    setBusy(false);
    if (res.ok) {
      setFavorite(!favorite);
      router.refresh();
    }
  }

  async function handleDelete() {
    if (!confirm(`Remove "${item.name}" from your closet?`)) return;
    setBusy(true);
    const res = await fetch(`/api/closet/${item.id}`, { method: "DELETE" });
    setBusy(false);
    if (res.ok) router.refresh();
  }

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white/70">
      <div className="relative flex h-36 items-center justify-center bg-cream-soft">
        {item.photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.photoUrl}
            alt={item.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <GarmentGlyph category={item.category} className="h-14 w-14 text-ink-soft/70" />
        )}
        <button
          type="button"
          onClick={toggleFavorite}
          disabled={busy}
          aria-label={favorite ? "Remove favorite" : "Mark favorite"}
          className={`absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full text-sm shadow-sm transition-colors ${
            favorite ? "bg-terracotta text-cream" : "bg-white/90 text-ink-soft"
          }`}
        >
          ★
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="font-medium text-ink">{item.name}</p>
        <div className="flex flex-wrap gap-1.5 text-xs text-ink-soft">
          <span className="rounded-full bg-cream-soft px-2 py-0.5">
            {formalityLabel(item.formality)}
          </span>
          {item.occasionTags.slice(0, 2).map((tag) => (
            <span key={tag} className="rounded-full bg-cream-soft px-2 py-0.5">
              {occasionLabel(tag)}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center gap-4 pt-2 text-sm font-semibold">
          <Link href={`/closet/${item.id}/edit`} className="text-ink hover:text-terracotta">
            Edit
          </Link>
          <button
            type="button"
            onClick={handleDelete}
            disabled={busy}
            className="text-ink-soft hover:text-terracotta"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
