---
name: hospitality-weekly-market-analysis
description: Produce Hotelchamp's weekly hospitality market analysis for a Product Manager focused on the booking engine product. Trigger this whenever the user asks for the "weekly hospitality analysis", "weekly market update", "hospitality news roundup", asks what happened in hospitality/travel-tech/OTA/hotel-brand news this week, or asks you to check Skift/Hotel Tech Report/PhocusWire/Hospitality Net for updates and what they mean for Hotelchamp's roadmap or booking engine strategy. Also use it proactively every Monday morning when a scheduled run asks for this week's hospitality report.
---

# Hospitality Weekly Market Analysis

Weekly research briefing for a Hotelchamp Product Manager whose main product is the **booking engine**, but who also needs to stay current on general hospitality industry news. The point isn't just to summarize news — it's to translate each item into "does this change what Hotelchamp's booking engine should build, prioritize, or watch."

## Before you start

Read `references/sources.md` for the approved source list and `references/output-template.md` for the exact report structure — follow both.

Then find the running log so you don't repeat last week's stories:

1. Look for `products/hospitality-weekly-market-analysis/weekly-log.md` in the `narehtorosian87/aca` repo (check the working directory first; if it's not checked out, read it via the GitHub tools).
2. Skim the last 4-6 entries' headlines/links. Anything already logged is off-limits this week, even if a new article rehashes it — only cover genuinely new developments.
3. If the log doesn't exist yet, this is the first run — create it using the template's file structure.

## Research

Work out the date window first: today's date back 7 days. Only cover things published or newly reported in that window — not evergreen explainers or older stories resurfacing. This is the easiest place to slip up: a generic search for a topic on an approved outlet will often surface its most *popular* article on that topic, which can easily be weeks or months old even when it ranks first. Confirm the actual publish date for every candidate item (the URL slug often has it, e.g. `skift.com/2026/09/10/...`; otherwise search for the headline plus the expected date range) before including it — don't assume a top search result is recent.

Search the sources in `references/sources.md`, and fetch full articles when you can for more accurate detail and dates. Some environments block WebFetch on news domains (network egress policy) — if that happens, don't burn time retrying; fall back to compiling from WebSearch result summaries/snippets, and lean more heavily on official brand/OTA newsroom search hits (they tend to carry dates clearly). You need enough raw material to find real signal, so don't stop at the first few hits — check multiple sources and multiple query phrasings per focus area before picking your top items, since any single query tends to surface older "evergreen" pieces alongside this week's actual news.

**Two focus areas, both required every week:**
1. **General hospitality industry** — market performance, demand/rate trends, brand M&A or strategy moves, regulatory shifts, major brand news (Marriott, Hilton, Accor, IHG, Hyatt, etc.), OTA news (Booking.com, Expedia, Airbnb, Trip.com).
2. **Hospitality technology, with emphasis on AI** — new product launches, AI features/agents in booking or guest journeys, distribution/tech vendor moves, PMS/CRS/booking-tech news, OTA or brand tech announcements.

Give real weight to news specifically from market leaders (major brands) and big OTAs even if the story is thin elsewhere — the PM cares disproportionately about what Booking.com, Expedia, Airbnb, and the major chains are doing, since that's Hotelchamp's competitive and partner landscape. Airbnb specifically is easy to under-cover because generic searches tend to surface stock/earnings chatter over actual product or strategy news — always check Airbnb's own newsroom directly (news.airbnb.com) each run, not just a generic "Airbnb news" search, before concluding there's nothing from them this week.

**Source discipline (non-negotiable):**
- Only use the credible outlets and official brand/OTA newsrooms listed in `references/sources.md`. If you can't find enough this week from that list, report fewer than 10 items rather than reaching for a blog, forum, or opinion column.
- Skip opinion pieces, op-eds, "X thinks Y" think-pieces, and analyst-speculation-only pieces. Favor reported news: something happened (a launch, a deal, a data release, an earnings result, a partnership).
- Every item needs its own working source link — link directly to the article you used, not a homepage or a search result page.

## Select and write up

Pick the **most significant items overall, up to 10 total**, balanced across the two focus areas based on what actually happened that week — don't force an even split if one side is thin. Prioritize items with clear business relevance over minor product tweaks or filler press releases.

For each item, use the template in `references/output-template.md`:
- A tight 2-4 sentence factual summary (no editorializing beyond what's in the source).
- "What this could mean for Hotelchamp" — be specific, not generic. Connect it to the booking engine: does it suggest a feature to prioritize, a competitive gap, a partner/integration opportunity, a positioning shift, a roadmap risk, or a signal worth watching before acting? Say which of those it is and why. It's fine to say an item is "worth monitoring, no action yet" when that's the honest read — don't manufacture urgency that isn't there.
- The source name, publish date, and link.

Close the report with a short "So what this week" paragraph (3-5 sentences) synthesizing the week across both focus areas into the one or two things most worth the PM's attention — this is what actually gets reused at quarterly roadmap time, so make it concrete enough to act on later, not a vague recap.

## Record it

Append the new report as a new dated section at the top of `products/hospitality-weekly-market-analysis/weekly-log.md` (most recent week first), following the template's file format exactly so old and new entries stay consistent and scannable. Commit with a clear message (e.g. "Add hospitality weekly analysis for week of YYYY-MM-DD") and push to the `narehtorosian87/aca` repo's default branch.

If you were invoked ad hoc (not via the Monday scheduled run) also show the report to the user directly in chat before/after writing it to the log.
