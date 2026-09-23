# Capsule Wardrobe Builder — PRD (high level)

## Problem
Building a capsule wardrobe (a small set of items that mix-and-match into many outfits) is a fun styling
exercise, but doing it well by hand requires knowing (a) what occasions you actually need to dress for and
(b) which combination of items covers the most outfits for the least money. Most people either overbuy
random pieces or default to whatever's already at the top of a shopping site.

## Goal
Given a budget, a style preference, and a sense of upcoming occasions, suggest a small set of items that
maximizes the number of usable outfit combinations — and show *why* (which items pair with which).

## Non-goals (v1)
- Not a real checkout/purchase flow — no payment processing.
- Not sourcing live inventory from real retailers (seed dataset, see Open Questions).
- Not a general closet-organizing app — scope is the *capsule building* decision, not long-term wardrobe management.

## Target user
Someone who wants a lightweight, semi-playful tool to answer "if I had $X to spend, what should I buy to get
the most mileage?" — course demo audience, but framed as a real personal tool.

## Core user flow
1. User sets a budget and a style preference (e.g. "minimal", "casual", "smart-casual").
2. User connects Google Calendar (optional) so the app can read upcoming event titles/types over the next
   1–2 weeks and infer an occasion mix (e.g. "3 casual days, 1 dressier event, 1 workout").
   - If they skip this, they manually pick an occasion mix from presets instead.
3. App runs a combination search over the seed item catalog (tagged by category, color, style, price) to find
   the item set, within budget, that produces the most valid outfit combinations covering the needed occasions.
4. Results screen: the chosen capsule (5–8 items), total spend vs. budget, and the outfit combinations it
   unlocks (shown as outfit "recipes": top + bottom + shoes, etc.).
5. User can swap an item out and see the combination count recalculate.

## Key features — MVP
- Budget + style input form
- Google Calendar connector: read event titles for the next N days → map to occasion tags (rule-based or
  simple LLM classification of event titles)
- Manual occasion-mix fallback (no calendar connected)
- Seed item catalog (curated JSON: ~30–50 items, tagged category/color/style/price/occasion-fit)
- Combination optimizer: given budget + occasion mix, pick items maximizing valid outfit count
  (start simple — greedy or brute-force over a small catalog; doesn't need to be a fancy solver)
- Results view: capsule list, spend, outfit combination grid
- Swap-item interaction that live-recalculates combinations

## Stretch features
- Gmail connector: scan past order confirmations to pre-seed "items you already own" so the capsule
  fills gaps instead of suggesting duplicates
- Save/share a capsule
- Multiple style profiles saved per user

## Data model (rough)
- **Item**: id, name, category (top/bottom/shoes/outerwear/accessory), color, style tags, price, occasion tags, image_url
- **OccasionMix**: derived or manual — list of {occasion_type, count} for the planning window
- **Capsule**: user_id, budget, style_pref, selected item_ids, total_spend, combination_count
- **Outfit**: derived (not stored) — a valid item_id combination matching an occasion

## High-level architecture
- **Frontend**: form (budget/style/calendar-connect) → results view (capsule + outfit grid) with swap interaction
- **Backend**: 
  - `/occasions` — calls Google Calendar API (OAuth via connector), returns inferred occasion mix
  - `/capsule` — runs the optimizer against the seed catalog given budget + occasion mix, returns capsule + combinations
  - seed catalog stored as static JSON or a small DB table
- **Connector**: Google Calendar (read-only, events for next N days) — this is the one place external, personal
  data feeds the "smart" part of the product

## Open questions
1. Seed catalog: hand-curate now, or start from a free mock catalog (e.g. Fake Store API) and enrich tags ourselves?
2. Occasion inference: simple keyword rules on event titles, or a Claude call to classify event titles into
   occasion types? (Rules are more reliable for a demo; LLM is more flexible/fun.)
3. Optimizer complexity: is brute-force over ~30-50 items fast enough, or do we need to cap combinations
   checked / use a greedy heuristic?
4. How much of "swap an item" needs to be real-time vs. just a re-submit?

## Success looks like (for the course deliverable)
- A working end-to-end flow: connect calendar (or skip) → set budget/style → get a capsule with a visible,
  correct combination count → swap an item and see it update.
- Calendar connector visibly changing the output (different occasion mix → different capsule) — this is the
  part that proves the connector isn't decorative.
