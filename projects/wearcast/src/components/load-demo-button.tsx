"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoadDemoButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    await fetch("/api/closet/demo", { method: "POST" });
    setLoading(false);
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="mt-6 inline-block rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-terracotta hover:text-terracotta disabled:opacity-60"
    >
      {loading ? "Loading demo closet…" : "Or try a demo closet"}
    </button>
  );
}
