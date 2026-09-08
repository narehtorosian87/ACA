# Ekam Yoga Studio — Website (v1)

A first version of the marketing website for a fictional yoga studio, built as a course exercise. Plain HTML, CSS, and a small amount of vanilla JS, no build step or framework, so it can be opened straight in a browser or hosted anywhere that serves static files.

Later, this is meant to grow into a two-sided app (student + instructor), but this project covers the studio-facing website only.

## Viewing it locally

No install needed. Either:

- Open `index.html` directly in a browser, or
- Serve the folder so relative links and fonts behave exactly as they would in production:

  ```
  cd projects/yoga-studio-website
  python3 -m http.server 8000
  ```

  then visit `http://localhost:8000`.

## Structure

```
yoga-studio-website/
  index.html              Home page, with an animated sun salutation flow
  pricing.html             Group class and private session pricing
  schedule.html             Weekly class schedule + group class sign-up form
  styles-of-yoga.html       Short guide to the yoga styles taught here
  private-classes.html      Private session info + application form
  css/styles.css            Shared styling (palette, layout, animation, forms)
  js/main.js                 Mobile nav toggle, active-link highlighting, demo form handling
```

## Design notes

- Palette: warm cream background, sage green as the primary accent, a soft clay/terracotta highlight for emphasis. No stock-photo hero, no gradients-as-decoration.
- Type: Fraunces (serif) for headings, Jost (sans) for body text, loaded from Google Fonts.
- Home page animation: a pure CSS/SVG crossfade loop through eight poses of a sun salutation (Tadasana → Urdhva Hastasana → Uttanasana → Ardha Uttanasana → Phalakasana → Bhujangasana → Adho Mukha Svanasana → Uttanasana), each labeled with its Sanskrit and English name. No JS required, and it respects `prefers-reduced-motion`.
- Studio name "Ekam" is Sanskrit for "one," tying into the "one breath, one body" framing used across the copy.

## What's real vs. placeholder in this v1

- **Pricing** is placeholder, flagged as a draft directly on the pricing page.
- **Schedule** (classes, days/times, instructor names) is invented for this draft.
- **Forms** (group class sign-up, private session application) are front-end only: they validate, show a success message, and reset, but nothing is actually sent anywhere yet. Wiring them to a real backend/email/CRM is a next step.

## Natural next steps

- Hook the two forms up to a real destination (email, form backend, or a booking system).
- Replace placeholder pricing, schedule, and instructor bios with real studio details.
- Add a contact/location page once the studio has a physical address.
- Start on the instructor-facing app.
