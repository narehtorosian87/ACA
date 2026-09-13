---
name: pm-interview-prep
description: Prepare for a Product Manager job application and interview using a specific job posting/requirements the user shares. Trigger when the user pastes or links a PM job description, or says things like "help me prep for this PM interview", "prep me for this role", "what should I research for this job", "what questions will they ask me", or shares job requirements and asks for interview prep. Produces research to do on the company/product, likely interview questions, personalized best-answer drafts, a company/product critique with a strategic point of view, and smart questions to ask the interviewer — all delivered directly in the chat.
---

# PM Interview Prep

Turns a job posting into a full interview prep package for a Product Manager role: what to research, what they'll likely ask, and how to answer well — personalized to the user's own background where possible.

This skill is meant to work the same way in any project, not just this repo. See **Installing this as a true global skill** at the bottom if it isn't already installed at `~/.claude/skills/pm-interview-prep/`.

## Input

The user will share a job posting or a list of requirements (pasted text, a file, or a link). If they haven't given you the company name, role title, and seniority level, ask before doing deep research — those drive everything else. If the posting is thin on specifics (generic "5+ years experience" boilerplate), say so and focus research on the parts that *are* specific (product area, team, named responsibilities).

## 1. Parse the job post

Extract and keep track of:
- Company, product area/team, role title, seniority, location/remote status
- Stated must-have skills/tools vs. nice-to-haves
- Key responsibilities as written (these map directly to likely interview questions)
- Any signals about interview process, team structure, or reporting line
- Anything unusual or oddly specific — that's often what they'll actually probe on

## 2. Check for the user's background

Look for `resume.md` in this skill's own folder (next to this file). It's the user's reusable background: work history, key projects with metrics, and go-to stories.

- If it exists and has real content, use it to personalize the "best answers" section below.
- If it's missing or still just the empty template, tell the user you don't have their background yet, and either ask them to fill in `resume.md` (in this skill folder) for reuse next time, or just paste relevant experience for this session. Don't block the rest of the prep on this — do the research and question sections either way, and personalize what you can.

## 3. Research

Use WebSearch/WebFetch (or the browser, if that's what's available in this environment) to actually research — don't just hand back a checklist unless the tools aren't available, in which case give the user the checklist to run themselves. Cover, per `references/research-areas.md`:

1. Company & product — what it does, business model, target customer, stage (funding/public financials if relevant)
2. The specific product area this role owns — recent releases, reviews (G2, App Store, Reddit), anything publicly said about its roadmap or pain points
3. Market & competitors — who else plays here, how this company differentiates
4. Recent news — last 6-12 months: funding, leadership changes, layoffs, pivots, notable press or founder/exec interviews and podcasts
5. Team & role context — why the role is likely open (growth vs. backfill), who it reports to if discoverable
6. Interview process & culture signals — Glassdoor/Blind interview reports if findable, stated company values, engineering/product blog

Confirm dates on anything time-sensitive (funding rounds, exec changes) rather than assuming a top search result is current. Cite sources/links for anything factual you report.

## 4. Likely interview questions

Draw on `references/question-bank.md` for the standard PM question categories (behavioral, product sense, analytical/execution, strategy, culture/motivation), but don't just paste generic examples — tailor each one to specifics from the job post and your research (e.g. turn "walk me through improving a product" into "walk me through how you'd improve [their actual product]'s [specific weak spot you found]"). If the JD signals technical/domain fluency (SQL, APIs, specific industry), include a few questions probing that.

## 5. Best answers to prepare

For each likely question, draft a strong answer approach using `references/answer-frameworks.md` (STAR for behavioral, a structured framework for product sense/analytical/strategy questions). Personalize using `resume.md` or what the user pasted this session — pick their most relevant real project/metric per question rather than a generic template answer. Where you don't have enough of their background for a specific question, say so explicitly and give a strong generic structure instead, rather than inventing fake experience for them.

## 6. Company/product critique + strategic POV

Give an honest, specific critique of the company's product and market position (not vague praise), and 1-2 concrete points of view or recommendations the user could raise in an interview (e.g. "I'd expect them to ask how you'd address X — here's a defensible take"). This doubles as both prep material and a way to demonstrate strategic thinking live in the interview.

## 7. Questions to ask the interviewer

3-5 sharp questions tailored to this specific role/team/company (not generic "what's the culture like" filler) — the kind that signal the user actually did the research above.

## Output

Present the whole package directly in this chat session, clearly organized under the sections above. Do not write it to any file in the repo — this skill's output is ephemeral per conversation, not saved.

## Installing this as a true global skill

For this to trigger in every project (not just this repo), copy the whole folder to your user-level skills directory once, on whichever machine actually runs your Claude Code sessions:

```
cp -r .claude/skills/pm-interview-prep ~/.claude/skills/pm-interview-prep
```

Keep developing/updating it here in ACA (so it's version-controlled), and re-run that copy whenever you change it. `resume.md` lives inside the folder, so it travels with the copy — fill it in once at `~/.claude/skills/pm-interview-prep/resume.md` and it's available everywhere.
