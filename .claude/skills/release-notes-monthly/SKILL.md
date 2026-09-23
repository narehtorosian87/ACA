---
name: release-notes-monthly
description: Monthly agent that finds Asana tickets tagged "Release Note", drafts a release note for each shipped one using the release-notes-writer skill, runs every draft through the release-notes-judge skill as a hard quality gate, and presents the resulting digest in this chat session for Nareh's approval. Once approved, drafts the monthly product-highlights email in Gmail. Runs via a scheduled Routine on the first Monday of each month; also invoke manually when Nareh asks to run, preview, or test the monthly release notes.
---

# Release Notes Monthly Agent

This is a two-phase agent. Phase 1 (research → draft → judge → present) runs unattended and ends by posting a digest in this chat session, then stopping. Phase 2 (draft the email) only runs after Nareh replies approving the digest in this same session — never draft or send the email without that explicit reply.

## Setup

- Asana workspace gid: `257046938451225`. Tag "Release Note" gid: `1218743903701382`.
- Dedupe log: `products/release-notes-agent/monthly-log.md` in the `narehtorosian87/aca` repo. Read it first — it lists every Asana ticket gid already covered by a past (approved and drafted) release-notes email, plus ones already reviewed and deliberately skipped. Never reprocess a ticket already logged unless Nareh explicitly asks you to revisit it.
- "Previous month" = the calendar month before the one this agent runs in (e.g. a run in October covers September).

## Phase 1 — Research, draft, judge, present

1. **Fetch tagged tickets.** Use the Asana tools to list tasks with the "Release Note" tag (`get_tasks` with `tag=1218743903701382`, or `search_tasks` with `tags_any`). Drop any ticket gid already present in the dedupe log.
2. **Pull full context per ticket.** For each remaining ticket, get the full description and the complete comment thread (not just a preview — read the whole history, since the most relevant confirmation is often the newest comment, not the description).
3. **Screen for "did this ever represent a real change."** Completion status is ignored — a ticket does not need to be marked complete to get a note; write one for every tagged, un-logged ticket regardless of where it stands. The only screen is:
   - Skip (bucket: **no change shipped**) any ticket whose thread shows it was resolved without a real customer-facing change at all (e.g. "not a bug", "won't fix", "duplicate", "out of scope for now"). Don't write a note about nothing.
   - Everything else is a **candidate** — including tickets that are still in progress, not yet completed, or only partially verified. For those, the note must say so honestly (e.g. framed as in-progress/rolling out, per whatever the ticket's own comments actually support) rather than implying something is fully live when it is not.
4. **Draft.** For each candidate, invoke the `release-notes-writer` skill, giving it the ticket's description, the full comment thread, and its completion state, as source material, with this explicit instruction: prioritize the most recent/updated information when a comment revises the description or an earlier comment; ignore comments that are just status pings, references to other tickets, or small talk unrelated to what shipped; and if the ticket is not completed or the comments show only partial verification, write the note to honestly reflect that status rather than claiming it is fully live.
5. **Judge — hard gate.** Run every draft through the `release-notes-judge` skill along with the same ticket description + full comment thread + completion state you gave the writer.
   - **PASS** → keep the note for the digest.
   - **REVISE** → send the judge's specific feedback back to the writer, regenerate, and re-judge. Allow at most 2 revision rounds per ticket.
   - **REJECT-NOT-SHIPPED** → move the ticket to the **no change shipped** bucket (don't retry it as a wording problem).
   - If a ticket still hasn't passed after 2 revision rounds, move it to a **needs human review** bucket instead of guessing — include the last draft and the judge's outstanding objections so Nareh can decide.
6. **Present the digest in this chat.** Every tagged ticket reviewed this run must appear in the output with its Asana permalink — no ticket is ever silently dropped, even one with no note. Show, in this order:
   - The month covered.
   - Final judge-approved release notes (this is the main content — the part that would go in the email), each with a link back to its Asana ticket.
   - "No change shipped" bucket — ticket names/links + the one-line reason it was excluded (e.g. "closed as not a bug"), so Nareh can see and override the call if the judge got it wrong.
   - "Needs human review" bucket, if any — ticket name/link, the last draft, and the judge's remaining objections.
   Then stop. Do not draft the email yet, and do not ask "should I send this" — wait for Nareh to actually reply.

## Phase 2 — Approval and email (only after Nareh replies in this session)

Trigger: Nareh replies in this same conversation approving the digest (verbatim "approved" isn't required — treat any clear approval, e.g. "looks good", "send it", as approval). If she instead asks for edits, apply them to the specific notes, re-present, and wait again — don't proceed to email until she's approved the current version.

Once approved:

1. Compile the final set of approved release notes into the email body, in this exact template (fill in `{previous_month}` as the full month name, e.g. "September", and `{Release notes}` with the approved notes, one per shipped item):

   ```
   Dear Champ,

   Please find below the product highlights for month {previous_month} from Product-Development team.

   {Release notes}

   Regards,
   Nareh
   ```

2. Create a Gmail draft (`create_draft`) with that body and a subject like "Product Highlights – {Month} {Year}". Leave the To: field blank — Nareh fills in the recipient herself.
3. Append the newly-covered ticket gids to `products/release-notes-agent/monthly-log.md` (new dated section, same format as existing entries), commit, and push to the repo's default branch — this is routine recurring bookkeeping, push straight there, no PR needed.
4. Also log the "no change shipped" tickets from this run (so they're never re-evaluated).
5. Tell Nareh the Gmail draft is ready and where to find it.

## If something only Nareh can resolve comes up

E.g. can't push to the repo, Asana access fails, or there are zero un-logged tagged tickets this month — say so plainly in the digest rather than guessing or silently producing an empty email.
