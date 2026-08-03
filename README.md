# Meridian Physio & Recovery

A premium, mobile-first landing page for a boutique sports-physiotherapy clinic, built with Next.js 15 (App Router), TypeScript, and Tailwind CSS.

## Design concept

The clinic's whole pitch is "we measure recovery, we don't guess." Every design decision follows from that:

- **Signature element** — the hero features an animated goniometer arc (the actual tool physios use to measure joint angles), not a stock photo. It draws itself on load and reads out a live degree count.
- **Palette** — deep pine (`#1F4D43`) for trust/clinical authority, warm ochre (`#C98A2C`) as the single accent for calls to action, cool sage-paper background (`#F1F4F2`) rather than the generic warm-cream default.
- **Type** — Fraunces (display, used sparingly) + Inter (body) + IBM Plex Mono (data: stats, timestamps, degree readouts) — the mono face reinforces the "measured, not guessed" idea anywhere a number appears.
- **Process section** uses numbered steps deliberately, because intake really is a fixed five-stage sequence — not decoration.

## What's included

- `Navbar` — sticky header, accessible mobile drawer, thumb-friendly sticky mobile CTA bar (safe-area aware)
- `Hero` — animated signature SVG + headline + trust stats
- `Services` — 3 core programmes
- `ProcessTimeline` — the 5-stage treatment sequence
- `Testimonials` — patient outcomes with recovery timeframes instead of star ratings
- `CTA` — booking section with an accessible form
- `Footer`
- SEO: per-page metadata, Open Graph/Twitter cards, `MedicalClinic` JSON-LD structured data
- Accessibility: skip link, visible focus rings everywhere, `prefers-reduced-motion` respected, labeled form fields
- Mobile-first: fluid type scale, 44px+ touch targets, sticky mobile CTA with safe-area padding

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000. `npm run build` produces a production build (requires network access to fetch Google Fonts at build time).

## Extending this

This ships the hero + core conversion path. Natural next additions, following the same design tokens (`tailwind.config.ts`):
- About/team section
- Pricing/insurance section
- FAQ section + `FAQPage` schema
- Dark mode (tokens are already isolated as CSS-friendly names, easy to add a `dark:` variant pass)
- Real photography or Higgsfield-generated imagery for a team/facility section (the hero intentionally uses illustration instead, to keep the signature moment original rather than generic stock-photo AI output)
