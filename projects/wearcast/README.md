# Wearcast

Daily outfit recommendations built from your own closet — matched to your
plans, the weather, and how you feel like dressing. Two full outfits, every
day, with a plain-English reason for each.

This is the MVP: no auth, no database — everything is stored as JSON files
under `data/` and photos under `public/uploads/`, so it runs entirely on
your machine.

## Getting started

```bash
npm install
npm run seed   # populates a 25-item demo closet + a sample day (skip if you'd rather start empty)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## How it works

1. **Closet** (`/closet`) — tag what you own: category, color, pattern,
   formality, warmth, seasons, occasions, optional photo.
2. **Today** (`/today`) — enter your city (pulls live weather from
   [Open-Meteo](https://open-meteo.com), no API key needed), log today's
   plans, and pick a mood.
3. **Recommendations** (`/recommendations`) — two full outfits, assembled by
   a transparent rule-based scoring engine (`src/lib/recommend/`), each with
   a short explanation of why it was picked.

Everything is local: closet items and today's context live in
`data/*.json`; there's no server-side database and no accounts.

## Resetting data

- **Settings page** → "Clear today's plan" / "Clear entire closet" buttons.
- **`npm run seed`** → regenerates the demo closet and sample day from
  scratch (overwrites `data/*.json`).

## Project structure

```
src/
  app/                 Pages and API routes (Next.js App Router)
  components/          UI components (forms, cards, layout)
  lib/
    types.ts            Shared TypeScript types
    constants.ts         Dropdown/option lists for the UI
    *-store.ts           JSON-file read/write helpers
    weather.ts           Open-Meteo geocoding + forecast
    recommend/           Scoring engine + explanation generator
scripts/seed.mjs        Demo data generator (npm run seed)
data/                   JSON "database" (closet, today's context, settings)
```

## What's next

This MVP intentionally skips: user accounts, a real database, photo-based
or email-based closet import, and an LLM-generated explanation (the current
explainer is deterministic and rule-based, but written so an LLM call could
slot in later without touching the scoring engine). Calendar-connector
import is also left for a fast-follow — today's plans are manual input only.

Once validated locally, this is a standard Next.js app and deploys to
Vercel as-is (the JSON-file storage would need to move to a real database
first, since Vercel's filesystem isn't persistent).
