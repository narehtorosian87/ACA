# Output format

## Report structure (use this exact shape for every weekly entry)

```markdown
## Week of <YYYY-MM-DD> (covering <start date> – <end date>)

### General hospitality industry

1. **<Headline>** — <Source name>, <publish date>
   - Summary: <2-4 sentence factual summary>
   - Why it matters for Hotelchamp: <specific booking-engine-relevant read>
   - Source: <link>

2. ...

### Hospitality technology & AI

1. **<Headline>** — <Source name>, <publish date>
   - Summary: <2-4 sentence factual summary>
   - Why it matters for Hotelchamp: <specific booking-engine-relevant read>
   - Source: <link>

2. ...

### So what this week
<3-5 sentence synthesis of the one or two things most worth the PM's attention this week, written so it's still useful when re-read at quarterly planning time.>

---
```

Notes:
- Number items 1..N within each section; there is no fixed count per section (max 10 total across both sections combined).
- If one focus area genuinely has nothing credible/new this week, say so explicitly ("No qualifying tech/AI news this week from approved sources") rather than omitting the heading or padding it with a weak item.
- Keep headlines close to the source's own headline/framing — don't editorialize in the headline itself, save analysis for "Why it matters."
- End every weekly entry with a `---` horizontal rule to visually separate weeks.

## Log file structure

The running log lives at `products/hospitality-weekly-market-analysis/weekly-log.md` in the `narehtorosian87/aca` repo. It's a single file, **most recent week at the top**:

```markdown
# Hospitality Weekly Market Analysis — Log

Running weekly log for Hotelchamp product/roadmap planning. Newest entries first.

## Week of 2026-09-15 (covering 2026-09-08 – 2026-09-15)
...

## Week of 2026-09-08 (covering 2026-09-01 – 2026-09-08)
...
```

When creating the file for the first time, use this header, then add the first week's entry below it. On every later run, insert the new week's entry right after the header (and after any short intro text), above all previous entries — never at the bottom, and never overwrite previous weeks.
