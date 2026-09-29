# Wearcast

Daily outfit recommendations built from your own closet — matched to your
plans, the weather, and how you feel like dressing. Two full outfits, every
day, with a plain-English reason for each.

Each person signs in with a magic-link email and gets their own private
closet. Data lives in Supabase (Postgres + Auth + Storage); the app itself
deploys to Vercel.

## Getting started (local development)

1. Create a free [Supabase](https://supabase.com) project (see
   `supabase/schema.sql` for the database setup — run it once in the
   Supabase SQL editor, and create a public `closet-photos` storage bucket).
2. Copy `.env.local.example` to `.env.local` and fill in your project's URL
   and anon key (Supabase dashboard -> Project Settings -> API).
3. Install and run:
   ```bash
   npm install
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000), sign in with your
   email (you'll get a magic link), then use "Or try a demo closet" on the
   empty Closet page to populate a 25-item demo wardrobe + a sample day.

## How it works

1. **Closet** (`/closet`) — tag what you own: category, color, pattern,
   formality, warmth, seasons, occasions, optional photo.
2. **Today** (`/today`) — enter your city (pulls live weather from
   [Open-Meteo](https://open-meteo.com), no API key needed), log today's
   plans, and pick a mood.
3. **Recommendations** (`/recommendations`) — two full outfits, assembled by
   a transparent rule-based scoring engine (`src/lib/recommend/`), each with
   a short explanation of why it was picked.

## Accounts and data

Sign-in is passwordless (email magic link via Supabase Auth). Every table
(`closet_items`, `day_context`, `settings`) is scoped to the signed-in user
via row-level security, so each person only ever sees their own data —
useful when sharing the live link with friends for testing.

## Resetting your data

- **Settings page** → "Clear today's plan" / "Clear entire closet."
- **Closet page** (when empty) → "Or try a demo closet" to reload the demo
  wardrobe and sample day.

## Project structure

```
src/
  app/                 Pages and API routes (Next.js App Router)
  components/          UI components (forms, cards, layout)
  lib/
    types.ts            Shared TypeScript types
    constants.ts         Dropdown/option lists for the UI
    *-store.ts           Supabase read/write helpers
    weather.ts           Open-Meteo geocoding + forecast
    demo-data.ts         The demo closet + sample day
    recommend/           Scoring engine + explanation generator
    supabase/            Browser/server Supabase clients, auth session refresh
supabase/schema.sql   Database tables, RLS policies, storage bucket setup
```

## Deploying

This is a standard Next.js app — deploy to Vercel by connecting the GitHub
repo, setting the **Root Directory** to `projects/wearcast`, and adding the
same two environment variables from `.env.local` in the Vercel project
settings.

## What's next

Deliberately out of scope for this round: calendar-connector import (plans
are manual input only) and an LLM-generated explanation (the current
explainer is deterministic and rule-based, written so an LLM call could
slot in later without touching the scoring engine).
