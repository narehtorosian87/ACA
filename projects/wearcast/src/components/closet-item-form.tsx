"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  CATEGORY_OPTIONS,
  COLOR_SWATCHES,
  FORMALITY_OPTIONS,
  OCCASION_OPTIONS,
  PATTERN_OPTIONS,
  SEASON_OPTIONS,
  WARMTH_LABELS,
} from "@/lib/constants";
import type {
  ClosetCategory,
  ClosetItem,
  ClosetItemInput,
  Formality,
  OccasionTag,
  Pattern,
  Season,
} from "@/lib/types";

function toggleInArray<T>(list: T[], value: T): T[] {
  return list.includes(value)
    ? list.filter((v) => v !== value)
    : [...list, value];
}

function defaultInput(): ClosetItemInput {
  return {
    name: "",
    category: "top",
    subcategory: "",
    colors: [],
    pattern: "solid",
    formality: "casual",
    warmth: 3,
    rainOk: false,
    seasons: ["spring", "fall"],
    occasionTags: ["casual"],
    fit: "",
    favorite: false,
    notes: "",
  };
}

export function ClosetItemForm({ item }: { item?: ClosetItem }) {
  const router = useRouter();
  const [form, setForm] = useState<ClosetItemInput>(
    item
      ? {
          name: item.name,
          category: item.category,
          subcategory: item.subcategory ?? "",
          colors: item.colors,
          pattern: item.pattern,
          formality: item.formality,
          warmth: item.warmth,
          rainOk: item.rainOk,
          seasons: item.seasons,
          occasionTags: item.occasionTags,
          fit: item.fit ?? "",
          photoUrl: item.photoUrl,
          favorite: item.favorite,
          lastWornDate: item.lastWornDate,
          notes: item.notes ?? "",
        }
      : defaultInput(),
  );
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(
    item?.photoUrl ?? null,
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handlePhotoChange(file: File | null) {
    setPhotoFile(file);
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("Give the item a name.");
      return;
    }
    if (form.colors.length === 0) {
      setError("Pick at least one color.");
      return;
    }
    setError(null);
    setSubmitting(true);

    const body = new FormData();
    body.set("data", JSON.stringify(form));
    if (photoFile) body.set("photo", photoFile);

    const url = item ? `/api/closet/${item.id}` : "/api/closet";
    const method = item ? "PATCH" : "POST";
    const res = await fetch(url, { method, body });

    setSubmitting(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Something went wrong saving this item.");
      return;
    }
    router.push("/closet");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <p className="rounded-xl bg-terracotta-soft/40 px-4 py-3 text-sm text-terracotta">
          {error}
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium text-ink">
          Name
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. Navy wool coat"
            className="rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-normal text-ink outline-none focus:border-terracotta"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-ink">
          Category
          <select
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value as ClosetCategory })
            }
            className="rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-normal text-ink outline-none focus:border-terracotta"
          >
            {CATEGORY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-ink">
          Subcategory (optional)
          <input
            value={form.subcategory}
            onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
            placeholder="e.g. chinos, t-shirt, ankle boots"
            className="rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-normal text-ink outline-none focus:border-terracotta"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-ink">
          Fit (optional)
          <input
            value={form.fit}
            onChange={(e) => setForm({ ...form, fit: e.target.value })}
            placeholder="e.g. slim, relaxed, oversized"
            className="rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-normal text-ink outline-none focus:border-terracotta"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-ink">
          Formality
          <select
            value={form.formality}
            onChange={(e) =>
              setForm({ ...form, formality: e.target.value as Formality })
            }
            className="rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-normal text-ink outline-none focus:border-terracotta"
          >
            {FORMALITY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-ink">
          Pattern
          <select
            value={form.pattern}
            onChange={(e) =>
              setForm({ ...form, pattern: e.target.value as Pattern })
            }
            className="rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-normal text-ink outline-none focus:border-terracotta"
          >
            {PATTERN_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <p className="text-sm font-medium text-ink">Colors</p>
        <p className="text-xs text-ink-soft">Select every color present.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {COLOR_SWATCHES.map((swatch) => {
            const active = form.colors.includes(swatch.value);
            return (
              <button
                type="button"
                key={swatch.value}
                onClick={() =>
                  setForm({ ...form, colors: toggleInArray(form.colors, swatch.value) })
                }
                className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? "border-terracotta bg-terracotta-soft/40 text-ink"
                    : "border-line bg-white text-ink-soft hover:border-terracotta"
                }`}
              >
                <span
                  className="h-3.5 w-3.5 rounded-full border border-line"
                  style={{ backgroundColor: swatch.value }}
                />
                {swatch.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <p className="text-sm font-medium text-ink">
            Warmth: {WARMTH_LABELS[form.warmth]}
          </p>
          <input
            type="range"
            min={1}
            max={5}
            value={form.warmth}
            onChange={(e) =>
              setForm({
                ...form,
                warmth: Number(e.target.value) as ClosetItemInput["warmth"],
              })
            }
            className="mt-3 w-full accent-terracotta"
          />
        </div>

        <label className="flex items-center gap-3 text-sm font-medium text-ink">
          <input
            type="checkbox"
            checked={form.rainOk}
            onChange={(e) => setForm({ ...form, rainOk: e.target.checked })}
            className="h-4 w-4 accent-terracotta"
          />
          Fine to wear in the rain
        </label>
      </div>

      <div>
        <p className="text-sm font-medium text-ink">Seasons</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {SEASON_OPTIONS.map((opt) => {
            const active = form.seasons.includes(opt.value);
            return (
              <button
                type="button"
                key={opt.value}
                onClick={() =>
                  setForm({
                    ...form,
                    seasons: toggleInArray<Season>(form.seasons, opt.value),
                  })
                }
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? "border-sage bg-sage-soft/50 text-ink"
                    : "border-line bg-white text-ink-soft hover:border-sage"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-ink">Occasions</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {OCCASION_OPTIONS.map((opt) => {
            const active = form.occasionTags.includes(opt.value);
            return (
              <button
                type="button"
                key={opt.value}
                onClick={() =>
                  setForm({
                    ...form,
                    occasionTags: toggleInArray<OccasionTag>(
                      form.occasionTags,
                      opt.value,
                    ),
                  })
                }
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? "border-gold bg-gold/20 text-ink"
                    : "border-line bg-white text-ink-soft hover:border-gold"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <p className="text-sm font-medium text-ink">Photo (optional)</p>
          <div className="mt-3 flex items-center gap-4">
            {photoPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photoPreview}
                alt=""
                className="h-20 w-20 rounded-xl object-cover"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-cream-soft text-ink-soft">
                <span className="text-xs">No photo</span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handlePhotoChange(e.target.files?.[0] ?? null)}
              className="text-xs text-ink-soft"
            />
          </div>
        </div>

        <label className="flex items-center gap-3 text-sm font-medium text-ink">
          <input
            type="checkbox"
            checked={form.favorite}
            onChange={(e) => setForm({ ...form, favorite: e.target.checked })}
            className="h-4 w-4 accent-terracotta"
          />
          Mark as a favorite
        </label>
      </div>

      <label className="flex flex-col gap-2 text-sm font-medium text-ink">
        Notes (optional)
        <textarea
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          rows={3}
          placeholder="Anything else worth remembering about this piece"
          className="rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-normal text-ink outline-none focus:border-terracotta"
        />
      </label>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-terracotta disabled:opacity-60"
        >
          {submitting ? "Saving…" : item ? "Save changes" : "Add to closet"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/closet")}
          className="text-sm font-semibold text-ink-soft hover:text-ink"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
