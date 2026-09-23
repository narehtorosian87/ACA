---
name: release-notes-writer
description: Turn a shipped product change into a polished internal release note for Hotelchamp's non-technical teams (Sales, Customer Success, Customer Support, Marketing). Trigger whenever the user shares an Asana ticket link and asks for a release note, pastes rough notes about something that just shipped and wants it written up, or says things like "write a release note for this", "turn this ticket into a release note", or "polish this into a release note." Also trigger if they paste an Asana URL together with a phrase like "can you write this up" or "release note please" without naming the skill explicitly. The output explains what changed and why it matters in plain language for someone with no engineering background — it is not a technical changelog.
---

# Release Notes Writer

These notes exist so Sales, Customer Success, Customer Support, and Marketing understand what changed in the booking engine without having to read a ticket or ask engineering. The reader is smart but not technical, and busy — they are skimming this alongside nine other notes to find the one that affects their conversation with a customer today. Every choice below serves that reader.

## Step 1 — Gather the input

The source of the information should never change how the note is written, only what you have to work with:

- **Asana link given**: fetch the ticket yourself using the Asana MCP tools (the task for title/description, and its stories/comments for extra context) rather than asking the user to paste it. Read the whole thread, not just the description — the real "why" or a scoping decision is often buried in a comment.
- **Notes typed in chat**: use them as given, no need to go looking for more.
- **Both are available**: use both, and let the chat notes take precedence if they conflict with the ticket (they are usually the more current or more accurate framing).

If, after gathering everything, you genuinely cannot tell what category this is or why the change matters to the reader, ask one short clarifying question rather than guessing — a wrong guess here produces a note that is confidently wrong, which is worse than pausing to ask.

## Step 2 — Pick the category

Every note starts with exactly one of these, uppercase, followed by a colon:

- **NEW** — a completely new feature or product.
- **UPDATED** — a change or improvement to something that already existed.
- **FIXED** — a bug or issue that was resolved.

This is usually obvious from the ticket type or the user's framing. Ask only if it is truly ambiguous (e.g., a change that reads like it could be either an improvement or a fix).

## Step 3 — Write the note

Read the three real examples below closely — they are the house style, not just inspiration. Match their sentence rhythm, paragraph length, and tone rather than inventing a new structure.

**Shape of a note:**

```
CATEGORY: Title

Paragraph(s) explaining what changed, written so the value is obvious
without the reader having to infer it.
```

- **Title** — short and descriptive. For a NEW note announcing something big, a celebratory tone with a couple of emoji is fine (see the Widescreen IBE example). For UPDATED and FIXED, keep the title plain and, when a source ticket exists, make it a markdown link to that ticket — that is the trail back to technical detail for anyone who needs it, so the note body itself never has to get technical.
- **Body** — plain language, no jargon. If the underlying change involves something like "rate-limiting on an endpoint" or "a new field on the booking payload," say what that means for what the reader will actually see or tell a customer, not the mechanism. Weave the "why this matters" into the prose itself — do not bolt on a separate "Why it matters" or "What changed" labeled section. None of the real examples use that structure, and forcing it tends to produce the stiff, template-y tone this is meant to avoid.
- **Bullet list** — only pull one out when a NEW feature bundles several distinct sub-changes worth naming individually (see the Widescreen IBE example's six-item list). Do not force bullets into an UPDATED or FIXED note that is really just one or two sentences.
- **"Note:" line** — use this pattern for a forward-looking caveat or known limitation worth flagging (see the currency fallback example). Skip it if there is nothing like that to say.
- **Configuration or action needed** — state it in plain prose, naming who needs to do what (the Hotelchamp team, or the customer), only when something genuinely needs to be configured or communicated. Do not add a filler "no action needed" line when there is nothing to do — none of the real examples do this, and inventing that pattern would make every note longer for no reason.

**Length and tone**: match the real examples — a FIXED or UPDATED note is often two to four sentences; a NEW note announcing something significant can run longer, but should still read like someone explaining it to a colleague, not a formal announcement. Not too wordy, not technical, not overly formal — this is an internal note, not a press release.

**Contractions**: never use them. Write "do not" instead of "don't," "cannot" instead of "can't," "it is" instead of "it's," and so on, with no exceptions. Expand every contraction as a final check before presenting the note — read back through it once specifically looking for these.

## Real examples (the house style)

**NEW:**

> NEW: ✨ 🚀 Widescreen IBE (IBE 2.0) is live ✨ 🚀
>
> The Widescreen version of the booking engine (IBE 2.0) is now live. This version is designed to provide a better booking experience on desktop, taking advantage of the larger screen space available on this device type. The core booking flow and functionality remain the same, with several UI/UX improvements, including:
>
> - Infinite scroll in the calendar
> - Date bar added to the IBE header
> - Image slider available in the Rooms step
> - Room cards displayed in a two-column layout
> - Image gallery for selected room images in the Rates step
> - Merged Summary and Check-out step, reducing the booking flow by one step
>
> As part of the rollout plan, the widescreen version is currently enabled for selected customers, and will be gradually enabled for others based on the rollout plan. Eventually, it will become the default and only version of the booking engine for desktop.
>
> The mobile version remains unchanged.

**UPDATED:**

> UPDATED: [Address data sent to OpenGDS](https://app.asana.com/1/257046938451225/task/1212977786619286)
>
> Address information collected in the booking engine check-out form is now included in the booking data sent to OpenGDS.
> This ensures that all contact details provided by the guest during check-out are available to our hotel customers within the corresponding booking in OpenGDS.

**FIXED:**

> FIXED: [Booking Engine currency fallback behavior](https://app.asana.com/1/257046938451225/project/1213282077906645/task/1213380530995694?focus=true)
>
> Resolved an issue where the booking engine was incorrectly defaulting to EUR, regardless of the property's configured default currency in OpenGDS. The booking engine now correctly follows the property's default currency.
> For chain setups with multiple currencies, when switching between properties, the currency of the first selected property is used (unless the user manually changes it).
> Note: This logic will be further improved in future iterations to better align with the user's location.

## Step 4 — Deliver

Present the finished note in a single markdown code block so it can be copied cleanly into Slack, email, or wherever it needs to go next. Do not write it to a file — this skill only produces chat output. If you drafted more than one note in the same turn (e.g., a batch from several tickets), give each its own code block in the same order the user provided them.
