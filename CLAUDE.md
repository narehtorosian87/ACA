# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

This is Nareh's personal workspace for the ACA course. It is not a software project with a build/test/lint toolchain — it holds course exercises, custom Claude Code skills, and finished deliverables. There is no fixed tech stack; expect a mix of documents, artifacts, and possibly small scripts depending on what each exercise requires.

## Structure

- `projects/` — one subfolder per course exercise or project, work in progress.
- `products/` — finished outputs meant to be shared or handed in.
- `.claude/skills/` — custom Claude Code skills authored during the course, one folder per skill with a `SKILL.md` (frontmatter + instructions). `example-skill/` is a minimal reference, not something to build on top of.

## Working conventions

- When starting a new course exercise, create a new folder under `projects/<exercise-name>/` rather than working at the repo root.
- When an exercise's output is a finished, presentable deliverable, save or copy it into `products/`.
- When asked to build a new skill, scaffold it under `.claude/skills/<skill-name>/SKILL.md` matching the structure in `example-skill/`.
