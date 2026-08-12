# Yogeshwari Hospital

Marketing site for **Yogeshwari Hospital — Eye and Pediatric Surgery Centre**,
Chhatrapati Sambhajinagar.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion ·
GSAP + ScrollTrigger · Lenis. Every route is statically prerendered.

---

## ⚠️ Read this before deploying

The Google Business Profile could not be read programmatically, so a handful of
real-world values are **deliberate placeholders**. They are all in one file and
all marked `TODO`:

```bash
src/config/site.ts
```

None of them are plausible-looking fakes — a wrong phone number on a hospital
site is worse than an obviously blank one. Fill these in:

| Value | Why it matters |
| --- | --- |
| `contact.phoneDisplay` / `phoneE164` / `whatsapp` | Every Call and WhatsApp CTA on the site |
| `address.*` | NAP consistency — must match the Google Business Profile character for character |
| `geo.latitude` / `longitude` | `LocalBusiness` schema and the map pin |
| `maps.embedSrc` | Google Maps → Share → Embed a map. Without it a query-based embed is used (works, less precise) |
| `maps.reviewUrl` | The "Write a review" short link |
| `social.*` | Header, footer, mobile menu, contact page, and `sameAs` in schema. Empty strings are hidden automatically |
| `calendly.pediatrics` / `calendly.eyeCare` | Booking. Until set, the appointment page falls back to WhatsApp + phone rather than dead-ending |
| `url` | Canonicals, sitemap, Open Graph |
| `verification.google` | Search Console |
| `doctors[].qualification` / `experience` | Confirm the exact degrees and years with each doctor |

Also review:

- **`src/config/content.ts` → `testimonials`** — placeholder text, clearly labelled.
  Replace with genuine Google reviews or delete the section. Publishing invented
  reviews of a real medical practice is deceptive and is a documented cause of a
  Google manual action. For the same reason **no `aggregateRating` is emitted
  anywhere in the structured data** — once real reviews exist, add it in
  `src/lib/schema.ts` with the true count and average.
- **`src/config/content.ts` → `stats`** — the counters. Confirm the figures.
- **`public/images/`** — all photos are royalty-free placeholders. See
  [`public/images/README.md`](public/images/README.md) for the swap table.

---

## Getting started

```bash
npm install
npm run dev
```

| Script | Does |
| --- | --- |
| `npm run dev` | Dev server on :3000 |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run check` | typecheck + lint + build — run before deploying |

## Deploying to Vercel

Import the repo; the defaults are correct (framework auto-detected, build
`next build`, no env vars required). Then:

1. Set `siteConfig.url` to the production domain — canonicals, `sitemap.xml`,
   `robots.txt` and Open Graph URLs are all derived from it.
2. Add the domain in Google Search Console and submit `/sitemap.xml`.
3. Put the verification token in `siteConfig.verification.google`.

Security headers and long-lived image caching are configured in
[`next.config.ts`](next.config.ts).

---

## Structure

```
src/
├── app/                        one folder per route, all statically prerendered
│   ├── layout.tsx              fonts, metadata, providers, site-wide JSON-LD
│   ├── page.tsx                home
│   ├── about|doctors|services|appointment|contact/
│   ├── departments/
│   │   ├── page.tsx            index
│   │   └── [slug]/page.tsx     pediatrics + eye-care (generateStaticParams)
│   ├── icon.tsx                generated favicon (monogram)
│   ├── opengraph-image.tsx     generated 1200×630 share card
│   ├── sitemap.ts robots.ts manifest.ts not-found.tsx
│   └── globals.css             design tokens (Tailwind v4 @theme)
├── components/
│   ├── brand/                  logo + monogram
│   ├── layout/                 header, footer, page hero, social, mobile action bar
│   ├── providers/              Lenis, cursor, scroll progress, loader, page transition
│   ├── sections/               composable page sections
│   └── ui/                     button, reveal, accordion, tilt, counter, parallax…
├── config/
│   ├── site.ts                 ← all real-world data (the TODO file)
│   ├── content.ts              departments, services, FAQs, testimonials
│   └── images.ts               image manifest (static imports)
└── lib/
    ├── schema.ts               JSON-LD builders
    ├── motion.ts               shared motion language
    └── utils.ts
```

Nothing real-world is hard-coded in a component. Change a phone number in
`site.ts` and it updates the header, footer, hero, contact cards, mobile action
bar, and the `ContactPoint` schema at once.

---

## Design system

Tokens live in `src/app/globals.css` under `@theme` — a Tailwind v4 CSS-first
theme, so no `tailwind.config.js`.

- **Ink** — deep desaturated navy, never pure black
- **Brand** — medical blue, the trust colour
- **Teal** — the care colour; also the eye-care department's accent
- **Sand** — warm off-white that keeps the page from reading clinical-cold
- **Type** — Plus Jakarta Sans for UI, Instrument Serif for italic display
  accents. Both self-hosted by `next/font`, fluid scale clamped at both ends.

Departments carry an accent (`brand` for paediatrics, `teal` for eye care) that
propagates through cards, icons, buttons and the Calendly widget colour.

## Motion

One easing curve (`[0.16, 1, 0.3, 1]`) and three durations across the whole
site, defined in `src/lib/motion.ts`.

**Framer Motion** handles component-level work — scroll reveals, staggers,
word-by-word headlines, accordions, the mobile sheet, magnetic buttons, tilt
cards. **GSAP ScrollTrigger** handles scroll-linked work — parallax and the slow
image zoom — because its `scrub` is driven off the same rAF loop as Lenis
(wired in `providers/SmoothScroll.tsx`), which keeps scrubbed motion in step
with the smoothed scroll position instead of a frame behind it.

Everything animates transform and opacity only, so it stays on the compositor.

### Accessibility of motion

`prefers-reduced-motion` is honoured everywhere, not just dimmed:

- Reveals render their resting state immediately rather than animating.
- Lenis does not initialise at all — native scrolling is left alone.
- The custom cursor does not mount, so the system cursor is untouched.
- The intro loader is skipped entirely.
- The testimonial marquee stops.

Touch devices keep native scroll momentum (`smoothWheel` only) — hijacking touch
on a low-end Android costs more in responsiveness than the smoothing is worth.

---

## Performance notes

- Every route is static (`○`/`●` in the build output). No server rendering at
  request time.
- The hero image is the LCP element: static import, `priority`,
  `fetchPriority="high"`, AVIF/WebP, build-time blur placeholder.
- All imagery is local, so there are no third-party image hosts on the critical
  path and no `remotePatterns` needed.
- Static imports give every image intrinsic dimensions → no CLS.
- The Calendly widget script (~90KB) is injected **only after** a department is
  chosen, so it never touches first load.
- The Google Maps iframe is `loading="lazy"` and below the fold.
- `optimizePackageImports` tree-shakes `react-icons` and `framer-motion`.
- The intro loader is capped at ~1.1s, shown once per session, and renders
  *over* content rather than gating it.

## SEO

- Native App Router Metadata API (not `next-seo`, which is a Pages-Router-era
  library and is unnecessary here).
- Per-page canonical, Open Graph and Twitter card metadata.
- JSON-LD emitted server-side as one connected `@graph` per page with stable
  `@id`s, so Google resolves the relationships rather than seeing unrelated
  islands: `Organization` → `Hospital`/`MedicalOrganization`/`LocalBusiness` →
  `MedicalClinic` (per department) → `Physician` (per doctor), plus `WebSite`,
  `FAQPage`, `BreadcrumbList`, `ContactPoint`, `ReserveAction` and `sameAs`
  social profiles.
- `sitemap.xml` and `robots.txt` generated from config; sitemap priorities
  reflect conversion value, not page count.
- Visible breadcrumbs mirror the `BreadcrumbList` markup on every inner page.
- Target keywords (paediatrician / child specialist / eye specialist /
  ophthalmologist / eye hospital / paediatric hospital in Chhatrapati
  Sambhajinagar) are worked into titles, H1s, body copy and `keywords`.

## Accessibility

Semantic landmarks, a skip link, visible focus rings, `aria-expanded` /
`aria-controls` on the accordion and menus, `aria-current` on active nav items,
labelled icon-only controls, and decorative graphics marked `aria-hidden`.
Animated headlines expose the full string via `aria-label` so a screen reader
hears one sentence rather than a stuttered word list. All tap targets on mobile
are ≥44px; the bottom bar's are ≥56px and clear the iOS home indicator via
`env(safe-area-inset-bottom)`.

Framer Motion serialises each element's `initial` state into the SSR HTML, which
means scroll-revealed sections ship as `opacity: 0`. A `<noscript>` stylesheet in
`layout.tsx` forces the resting state so the page is readable with JavaScript
disabled.

---

## Gotchas worth knowing

**Don't pass `hidden` to `<Button>` / `<ButtonLink>` via `className`.** The
button's base class list contains `inline-flex`, and Tailwind emits
`.inline-flex` *after* `.hidden` in the stylesheet, so `hidden` loses the
cascade and the button never hides. Put responsive visibility on a wrapper
element instead — see the header CTAs for the pattern.

**Client components can't receive a `Department` object.** `Department.icon` and
`service.icon` are React component *functions*, which cannot cross the
server→client boundary. Pass the slug and look it up with `getDepartment()`
inside the client component — that is why `DepartmentDetail` takes `slug`.

**SVG gradients need `gradientUnits="userSpaceOnUse"` on straight strokes.** A
perfectly vertical or horizontal line has a zero-width/height bounding box,
which makes the default `objectBoundingBox` gradient degenerate and the browser
skips painting the stroke. This silently turned the logo's Y into a V once
already.
