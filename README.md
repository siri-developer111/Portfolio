# SIRI — Creative Developer Portfolio

A cinematic, editorial portfolio for **Siri** built with Next.js (App Router), TypeScript, Tailwind CSS v4, GSAP + ScrollTrigger and Motion for React.

## Getting started

Requires **Node.js 20.9+**.

```bash
npm install
npm run dev        # http://localhost:3000
```

Production checks:

```bash
npm run typecheck  # tsc --noEmit
npm run lint       # eslint (eslint-config-next flat config)
npm run build && npm start
```

> No lockfile is included — `npm install` will generate one on first install. Fonts (Inter Tight, Instrument Serif, JetBrains Mono) are downloaded by `next/font` at build time, so the first build needs network access.

## Make it yours

Everything personal lives in **`data/site.ts`**:

| Field | What to change |
| --- | --- |
| `email` | Replace `your.email@example.com` with your real address (used by the contact CTA, mobile menu and copy button). |
| `socials[].href` | Add profile URLs. Links with an empty `href` render as a muted "Soon" chip — never a dead link. |
| `status` | The availability text in the hero and menu. |
| `about.*` | Intro, principles and the creative arc. Add a `year` to any journey entry to display it. |

Other content:

- **Projects** — `data/projects.ts` (five fictional concepts; copy, palettes, images).
- **Skills** — `data/skills.ts` (grouped, no proficiency scores).
- **Portrait** — `public/images/siri-portrait.webp` (your supplied photo, unaltered, converted to WebP). `public/images/og.jpg` is the social share image.
- **Project artwork** — `public/projects/<slug>/{cover,frame-a,frame-b}.webp`. These are original illustrations generated for the concepts; drop in your own mockups with the same names/ratios (16:10 cover and frame-b, 4:5 frame-a) to replace them.

## Structure

```
app/
  layout.tsx            fonts, metadata, motion gate script, nav, cursor
  page.tsx              home: Hero → Marquee → Work → About → Skills → Process → Contact
  projects/[slug]/      statically generated concept detail pages
  globals.css           Tailwind v4 @theme tokens + editorial utilities
  icon.svg, not-found.tsx
components/
  layout/               Nav (active indicator, mobile overlay), Footer, Providers
  sections/             Hero, Marquee, Work, About, Skills, Process, Contact
  projects/             ProjectMedia, ProjectMeta, HorizontalShowcase, ProjectDetail, demos/
  motion/               Reveal, SplitWords, Magnetic, Cursor
  ui/                   CtaButton, Icons
data/                   site.ts, projects.ts, skills.ts
lib/                    animations.ts (GSAP registration, eases, helpers), useMediaQuery.ts, utils.ts
```

## Motion system

- **GSAP + ScrollTrigger** — hero intro timeline (curtain, grid lines, masked headline lines, wordmark letters, portrait clip + scale), scroll parallax, clip-path image reveals, the pinned horizontal VELOCE story, the about statement scrub, journey/process timelines, the contact panel expansion and the footer wordmark fill. Every animation is created inside `useGSAP` + `gsap.matchMedia()`, so it is scoped, reverted on unmount and skipped under `prefers-reduced-motion`.
- **Motion for React** (`motion/react`) — nav active pill, mobile menu overlay, buttons, skills tabs, copy-email feedback, project detail entrances and all interactive demos. `MotionConfig reducedMotion="user"` respects OS settings.
- GSAP and Motion never animate the same element: e.g. `<Magnetic>` (GSAP) wraps a Motion button.
- An inline `<head>` script adds `motion-ok` before first paint so intro elements start hidden without a flash; reduced-motion and no-JS visitors get the fully composed page (with a CSS safety net if JS fails).
- The custom cursor and magnetic effects only run on fine pointers without reduced motion. On touch devices the horizontal showcase is a native snap-scrolling carousel.

## Honesty notes

- The five projects are **fictional concepts**, labelled as such in the UI. No clients, testimonials, awards or metrics are claimed.
- Demo panels are front-end prototypes with illustrative content — no AI, backend, scanning or real measurement is performed (each demo says so).
- No university, employer, years of experience or contact details were invented.

## Icons

Icons are a small inline SVG set in `components/ui/Icons.tsx` (no icon package needed). Swap in `lucide-react` if you prefer — the API shape is the same (`size`, SVG props).
