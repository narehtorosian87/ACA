"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function LoginForm({ next }: { next: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    const supabase = createClient();
    const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo },
    });

    if (error) {
      setStatus("error");
      setError(error.message);
      return;
    }
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl bg-sage-soft/40 px-6 py-8 text-center">
        <p className="font-display text-xl text-ink">Check your email</p>
        <p className="mt-2 text-sm text-ink-soft">
          We sent a sign-in link to <span className="font-medium">{email}</span>.
          Click it to get into Wearcast.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="flex flex-col gap-2 text-sm font-medium text-ink">
        Email
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-ink outline-none focus:border-terracotta"
        />
      </label>
      {error && <p className="text-sm text-terracotta">{error}</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-terracotta disabled:opacity-60"
      >
        {status === "sending" ? "Sending link…" : "Send me a sign-in link"}
      </button>
      <p className="text-center text-xs text-ink-soft">
        No password needed — we&apos;ll email you a link to sign in.
      </p>
    </form>
  );
}
