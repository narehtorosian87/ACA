# Release Notes Agent

Course exercise: an agent that turns Asana tickets tagged **"Release Note"** into a monthly, non-technical release-notes digest, with a human approval gate before anything goes out and a separate LLM-judge agent as a quality gate before Nareh ever sees a draft.

## Why this shape

An agent isn't just "prompt + tool calls" — it needs a trigger, a reason to use multiple tools, a point where it should stop and defer to a human, and (ideally) some way to check its own work rather than trusting one generation pass. This one has all four:

- **Trigger**: a scheduled Routine, first Monday of every month.
- **Tool chaining**: Asana (read tickets + comments) → `release-notes-writer` skill (draft) → `release-notes-judge` skill (critique) → Gmail (draft the email).
- **Human-in-the-loop boundary**: the agent stops after presenting the digest and only drafts the email — never sends it — after Nareh explicitly approves in that same chat session. It never sends anything itself.
- **Generator/critic pattern**: the judge is a distinct skill with its own criteria, not the writer grading its own homework. It has three possible verdicts (PASS / REVISE / REJECT-NOT-SHIPPED) and a hard cap on revision rounds, so a stubborn ticket surfaces to Nareh instead of looping forever.

## Pieces

| Piece | Where |
|---|---|
| Orchestrator agent | `.claude/skills/release-notes-monthly/SKILL.md` |
| Judge agent | `.claude/skills/release-notes-judge/SKILL.md` |
| Writer (reused, not built here) | `anthropic-skills:release-notes-writer` |
| Dedupe/history log | `products/release-notes-agent/monthly-log.md` |
| Scheduled trigger | Routine "Release Notes Monthly", cron `0 9 * * 1` (Asia/Yerevan), Mondays — the skill's own logic no-ops silently unless it's the *first* Monday of the month, since cron has no native "Nth weekday" support |

## Design decisions (and why)

- **Scope = whole workspace, by tag, not by project.** The "Release Note" tag spans many Asana projects, so the agent searches by tag across the workspace rather than being pointed at one project.
- **Dedupe via a running log**, not a date window. A ticket tagged a few days late would be missed by a strict "completed last month" filter; the log instead tracks which ticket IDs have already been reviewed, so nothing is repeated and nothing tagged late falls through.
- **Completion status is ignored** (per Nareh's explicit instruction) — every tagged, un-logged ticket gets a note, including ones still in progress. The one real exclusion is a ticket whose thread shows *no actual product change happened at all* (closed as "not a bug", duplicate, won't-fix) — that's a different judgment than "is it finished yet," and the judge still screens for it (`REJECT-NOT-SHIPPED`).
- **Judge is a hard gate**, not advisory — Nareh only sees notes that already passed accuracy + readability review, with a 2-round revision cap before a stuck ticket goes to a "needs human review" bucket instead of forcing a pass.
- **Approval happens by replying in the fired session**, not a separate command — mirrors how the existing `hospitality-weekly-market-analysis` Routine in this repo works, and needs no new infrastructure.
- **Email `To:` is left blank** — Nareh fills in the recipient herself before sending, since the agent doesn't have an authoritative distribution list to target.

## Validated against real data

Before scheduling this live, it was dry-run in chat against the 4 real tickets already tagged "Release Note" in Asana as of 2026-09-23, covering:

1. A clean shipped feature with an old, unrelated 2025 comment mixed into the thread (tests noise-filtering) — **passed the judge on the first draft**.
2. A ticket (UTC → property-local timezone for IBE reporting) initially misjudged by the writer/judge as "closed not-a-bug, no real change" — **caught and corrected by Nareh**: the requested change (switch from UTC to property timezone) did ship; the thread's investigation was clearing an unrelated discrepancy with a different system (OpenGDS), not saying the fix itself didn't happen. The judge skill was tightened to distinguish these two cases explicitly.
3. A bug-fix ticket where the original draft literally had the bug backwards (said checkout/confirmation-page disagreed, when the ticket says those two were always correct and the confirmation *email* was the outlier) and asserted the email fix was confirmed in production when the thread's own last comment says that verification hadn't happened yet — **judge caught the inversion and the overclaim**, sent back for revision; the revised version correctly framed the confirmed parts and hedged the unconfirmed email claim instead of dropping the ticket.
4. An unstarted, uncompleted ticket with no comments at all — **included per the "ignore completion status" rule**, written as an honestly-framed "in development, no confirmed date" note rather than implying it had shipped.

See the chat transcript for the full drafts and judge verdicts from this dry run.

## Open question

The agent currently has no explicit destination email address — Nareh said she'll fill in the `To:` field herself each month rather than have the agent target one automatically.
