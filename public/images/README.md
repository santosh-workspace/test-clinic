# Image slots

Every photo here is a **royalty-free placeholder** (Unsplash / Pexels licence — free for
commercial use, no attribution required). The Google Business Profile could not be read
programmatically, so none of these are photos of the actual hospital.

## How to swap in a real photo

1. Crop the real photo to roughly the ratio in the table below.
2. Save it as JPEG, quality ~80, at the listed width.
3. Overwrite the file **keeping the exact same filename**.

That's it. `src/config/images.ts` imports these statically, so Next.js re-derives the
dimensions and the blur placeholder at the next build. No code changes needed.

If you change the alt text (you should, once these are real photos), edit
`src/config/images.ts` — every alt string lives there.

## Slots

| File | Ratio | Width | Where it appears | Priority to replace |
| --- | --- | --- | --- | --- |
| `hero-hospital.jpg` | 3:2 | 1920 | Homepage hero — the LCP image | **Highest** |
| `doctors/dr-ramdash-nagargoje.jpg` | 4:5 | 1000 | Doctor cards, doctors page, paediatrics page | **Highest** |
| `doctors/dr-manisha-nagargoje.jpg` | 4:5 | 1000 | Doctor cards, doctors page, eye care page | **Highest** |
| `hospital-exterior.jpg` | 3:2 | 1600 | About page, contact page, location section | High |
| `consultation-room.jpg` | 3:2 | 1400 | Departments, about | High |
| `ward.jpg` | 3:2 | 1400 | About — facility strip | Medium |
| `patient-room.jpg` | 3:2 | 1400 | About — facility strip | Medium |
| `corridor.jpg` | 3:2 | 1400 | About — parallax band | Medium |
| `operating-theatre.jpg` | 3:2 | 1400 | Services — surgical consultations | Medium |
| `equipment.jpg` | 3:2 | 1400 | Services — diagnostics | Medium |
| `eye-exam.jpg` | 3:2 | 1400 | Eye care department hero | High |
| `eye-clinic.jpg` | 4:5 | 1400 | Eye care department — portrait band | Medium |
| `eyewear.jpg` | 3:2 | 1400 | Eye care — vision testing card | Low |
| `child-happy.jpg` | 4:5 | 1400 | Paediatrics department hero | High |
| `mother-children.jpg` | 3:2 | 1400 | Paediatrics — consultation card | Medium |
| `newborn.jpg` | 3:2 | 1400 | Paediatrics — newborn care card | Medium |

## Also worth adding

- `og-image.jpg` (1200×630) — the social share card. Currently generated at runtime by
  `src/app/opengraph-image.tsx`; a real photo of the hospital front would be stronger.
- A real logo. The current mark is an inline SVG monogram in
  `src/components/brand/Logo.tsx` — vector, so it scales cleanly, but a real logo file
  should replace it if one exists.
