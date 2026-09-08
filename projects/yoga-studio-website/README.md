# Ekam Yoga Studio — Website (v2)

The marketing website for a fictional yoga studio, built as a course exercise. This version rebuilds the original static-HTML v1 as a proper React application with a token-based design system, a small reusable component library, and a test-first workflow (unit/flow tests with Vitest + Testing Library, cross-browser responsive tests with Playwright).

Later, this is meant to grow into a two-sided app (student + instructor), but this project covers the studio-facing website only.

## Stack

- **React 18 + TypeScript + Vite** — app shell and build tooling.
- **React Router** — client-side routing between the five pages.
- **Tailwind CSS** — utility classes driven by a small custom theme (see Design system below), instead of hand-rolled CSS per component.
- **Vitest + React Testing Library** — component and user-flow tests.
- **Playwright** — real-browser responsive/E2E tests across mobile, tablet, and desktop.

## Getting started

```
cd projects/yoga-studio-website
npm install
npm run dev          # start the dev server
npm run test         # run the unit/flow test suite (Vitest)
npm run test:e2e     # run the responsive/E2E suite (Playwright); builds+serves the app itself
npm run build         # type-check and produce a production build in dist/
```

## Architecture

```
yoga-studio-website/
  src/
    data/                 Single source of truth for content
      types.ts             Shared TypeScript types (ClassSession, PricingPlan, ...)
      schedule.ts           Weekly class schedule
      pricing.ts             Group + private session pricing
      yogaStyles.ts            Styles of yoga copy
      poses.ts                  Sun salutation pose illustrations + names
      studio.ts                  Instructors + mantras

    components/
      ui/                   Presentational component library (Button, Card-style
                             components, PriceCard, ScheduleTable, StyleCard,
                             MantraBand, FormField primitives, SunSalutationFlow, ...)
      layout/                Header (nav + mobile menu), Footer, Layout (page shell)
      forms/                   GroupClassSignupForm, PrivateSessionForm

    pages/                  One component per route, composed from ui/ + data/
    App.tsx                  Route definitions
    main.tsx                  Entry point

  e2e/                    Playwright specs (responsive + form flows)
  *.test.tsx              Vitest + Testing Library specs, colocated with the
                           component/page they test
```

**Why this shape:** content (schedule, pricing, styles, poses) lives in `src/data/`, not scattered across JSX. The schedule table and the group-class sign-up dropdown are both generated from `schedule.ts`, so they can never drift out of sync the way two hand-written HTML lists could. Adding a class, changing a price, or editing a pose just means editing one data file — no page markup to touch.

## Design system

Colors, type, spacing, and shadows are defined once in `tailwind.config.js` and consumed everywhere as utility classes, so a rebrand is a config edit, not a find-and-replace across pages:

- **`primary`** (sage green, 50–900): the studio's main color, used for links, buttons, active nav state, and the mantra band.
- **`secondary`** (warm clay, 50–900): accent color used sparingly (pricing "featured" tags).
- **`sand`** (warm cream → ink, 50–900): replaces gray/black/white everywhere — backgrounds, borders, body text.
- **`font-heading`** (Fraunces, serif) / **`font-body`** (Jost, sans) — the two type families used across the site.
- Shared spacing/shape tokens: `shadow-soft`, `rounded-xl2`, `max-w-content`.

The component library in `src/components/ui/` is the second half of the system: `Button`, `PriceCard`, `ScheduleTable`, `StyleCard`, `MantraBand`, and the `FormField` primitives (`TextField`/`SelectField`/`TextareaField`) are the only places that touch raw Tailwind classes for their concern. Pages compose these instead of writing their own markup, so a visual tweak to, say, every price card happens in one file.

## Testing strategy (test-first)

Every non-trivial component and every user-facing flow was written test-first: a failing test was committed to describing the desired behavior, then the component was implemented to make it pass.

- **Unit tests** (`src/components/**/*.test.tsx`): `Button` (variants, routing, submit-safety), `PriceCard`, `ScheduleTable`, `SunSalutationFlow` (renders exactly one layer per pose, staggered so they don't overlap), `Header` (every nav link present, active-link state, mobile menu open/close/auto-close).
- **Form flow tests** (`src/components/forms/*.test.tsx`): both forms are tested for the full flow — required-field validation blocks submission, a valid submission shows the confirmation message, and the form clears afterward. The group class dropdown is asserted to offer exactly the sessions in `schedule.ts`.
- **Cross-page flow tests** (`src/App.test.tsx`): full user journeys through real routing — home → schedule → reserve a class, home → private sessions → apply, styles-of-yoga → schedule, and using the nav bar from an arbitrary page.
- **Responsive/E2E tests** (`e2e/*.spec.ts`, Playwright, real Chromium): every page is loaded at mobile (375px), tablet (768px), and desktop (1440px) widths and asserted to have **no horizontal overflow**; the mobile menu is verified to hide/show links correctly; both forms are exercised end-to-end at mobile and desktop widths; the home page animation is confirmed to render at every breakpoint.

Run `npm run test` for the fast unit/flow suite during development, and `npm run test:e2e` before shipping a layout or CSS change, since that's the one that actually catches responsive breakage in a real browser.

## What's real vs. placeholder in this version

- **Pricing** is placeholder, flagged as a draft directly on the pricing page.
- **Schedule** (classes, days/times, instructor names) is invented for this draft.
- **Forms** (group class sign-up, private session application) are front-end only: they validate, show a success message, and reset, but nothing is actually sent anywhere yet. Wiring them to a real backend/email/CRM is a next step.

## Natural next steps

- Hook the two forms up to a real destination (email, form backend, or a booking system).
- Replace placeholder pricing, schedule, and instructor bios with real studio details.
- Add a contact/location page once the studio has a physical address.
- Add visual regression tests (e.g. Playwright screenshots) once the design stabilizes.
- Start on the instructor-facing app.
