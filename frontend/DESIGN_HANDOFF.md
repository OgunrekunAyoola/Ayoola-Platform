# Design Handoff → Claude Design

**Project:** Ayoola Platform — personal site (blog, portfolio, services) for Ayoola Ogunrekun
**Owner:** Ayoola Ogunrekun
**Date:** 2026-06-18
**Goal of this round:** A beautiful, portrait-led hero (photo side‑by‑side with the hero copy) plus a cohesive visual refresh across the whole public site.

This document is the brief. It points directly at the real files so you can read the current code, then upgrade it **within the existing design system** — extend the tokens and components, do not replace them wholesale.

---

## 0. How to use this handoff

1. Read the **Design System Foundations** (§2) first — all work must use these tokens, not hard-coded colors.
2. Drop the portrait asset where §1 says, with the specs given.
3. Execute the **Hero redesign** (§3) — this is priority #1 and the headline of the request.
4. Work through **Per-page upgrades** (§4) for the whole-site refresh.
5. Honor the **Guardrails** (§6) on every change.
6. Use the **File Map** (§7) as the checklist of what to touch.

**Stack (don't fight it):** Next.js 16 (App Router) · React 19 · Tailwind CSS **v4** (CSS-first `@theme`, no `tailwind.config.js`) · framer-motion v12 · next-themes (light/dark via `.dark` class) · lucide-react + @heroicons/react. Hosting: Netlify with `@netlify/plugin-nextjs` → **full SSR + `next/image` optimization works** (no `unoptimized` needed).

---

## 1. Asset drop — the portrait (Ayoola provides)

Place the portrait here so the hero can reference it directly:

```
frontend/public/ayoola-portrait.jpg      ← primary (chosen treatment: glass frame + glow)
```

Specs:
- **Aspect ratio:** 4:5 portrait (tall). Crop head + upper torso, eyeline in the upper third.
- **Resolution:** at least 1000 × 1250 px (2× of the ~500 px rendered frame). WebP or high-quality JPG.
- **Background:** any — the chosen treatment frames the photo, so a full-bleed background is fine. (A clean/neutral backdrop reads best.)
- Reference in code with `next/image`:
  ```tsx
  import Image from "next/image";
  <Image src="/ayoola-portrait.jpg" alt="Ayoola Ogunrekun" width={500} height={625}
         priority sizes="(max-width: 1024px) 80vw, 500px" />
  ```
  `priority` because it's above the fold; always set `alt`.

**Also missing:** `frontend/public/og-image.jpg` (1200×630) is referenced in [layout.tsx](src/app/layout.tsx#L48) metadata but does not exist. Add a branded OG image while you're touching assets.

---

## 2. Design System Foundations (source of truth)

Defined in [globals.css](src/app/globals.css). **Use these tokens for every color, font, and surface.** No raw `text-white`, `bg-neutral-900`, `text-yellow-500` — those break theming (see §5).

### Tokens

| Token | Light | Dark | Use |
|---|---|---|---|
| `--background` | `#fafafa` | `#0a0a0a` | page bg (already radial-gradient in `body`) |
| `--foreground` | `#171717` | `#ededed` | primary text |
| `--muted` | `#404040` | `#a3a3a3` | secondary text |
| `--accent` | `#b45309` (amber-700) | `#f59e0b` (amber-500) | brand accent, CTAs, links |
| `--card-bg` | `rgba(255,255,255,.6)` | `rgba(30,30,30,.4)` | glass surfaces |
| `--card-border` | `rgba(0,0,0,.08)` | `rgba(255,255,255,.05)` | borders |
| `--selection-bg` | `rgba(217,119,6,.2)` | `rgba(245,158,11,.3)` | text selection |

Use as `text-[var(--foreground)]`, `bg-[var(--card-bg)]`, `border-[var(--card-border)]`, etc.

### Type
- **Serif (headings):** Playfair Display → `font-serif` (var `--font-playfair`)
- **Sans (body):** Inter → `font-sans` (default, var `--font-inter`)
- Base heading scale is set in `@layer base` in globals.css (h1 up to `lg:text-7xl`). Reuse, don't redefine inline unless intentional.

### Components & utilities (reuse these)
- `.glass-card` — the signature surface: `--card-bg` + `backdrop-blur(12px)` + `--card-border`, hover lifts `-4px` and borders to accent. Extend it; don't reinvent.
- [`Button`](src/components/ui/Button.tsx) — variants `primary | secondary | danger | success | ghost`. Use for all buttons.
- [`ScrollReveal`](src/components/ui/ScrollReveal.tsx) — viewport-triggered reveal wrapper used across the landing page.
- [`motion.ts`](src/lib/motion.ts) — shared framer-motion variants: `fadeUp`, `fadeIn`, `staggerContainer`, `slideInLeft`, `slideInRight`. Reuse for consistent timing (0.5s easeOut, 0.1s stagger).
- [`StatusBadge`](src/components/ui/StatusBadge.tsx), [`Skeleton`](src/components/ui/Skeleton.tsx), [`ShareButton`](src/components/ui/ShareButton.tsx) — existing primitives.

**Good reference implementations already tokenized correctly:** [Header.tsx](src/components/layout/Header.tsx) and [Footer.tsx](src/components/layout/Footer.tsx). Match their quality and token discipline everywhere.

---

## 3. PRIORITY #1 — Hero redesign (portrait side-by-side)

**File:** [HeroSection.tsx](src/components/home/HeroSection.tsx)
**Current state:** two-column grid — copy on the left, three floating abstract "system cards" (Code / Content / Growth) stacked on the right. No portrait.

### Chosen direction (decided)
- **Portrait treatment: glass frame + accent glow** (cohesive with `.glass-card`).
- **Cards: portrait in front, cards as ambient depth behind it.** Slim the three full system cards down to **2–3 small floating "signal chips"** (e.g. a `/systems/core` chip, a metric chip, an icon tile) that drift softly *behind/around* the portrait — keeping the engineered feel without competing with the face. Don't keep three full-size stacked cards in front of the photo.

### Layout spec
- Keep the `max-w-7xl` two-column grid (`grid-cols-1 lg:grid-cols-2`, `gap-12`, `items-center`).
- **Left:** the existing copy block — eyebrow ("Ayoola Ogunrekun"), serif H1 with the amber gradient span, sub-paragraph, two CTAs (`View Systems` / `Start a Project`), mono tagline. Keep the `fadeUp` stagger.
- **Right:** the **portrait** as the focal element.
  - Rounded frame (`rounded-2xl`/`rounded-3xl`) using `.glass-card` border + `--card-border`.
  - **Accent glow:** soft amber halo behind/around the frame. Starting point:
    ```html
    <!-- glow layer behind the framed image -->
    <div class="absolute -inset-4 rounded-[2rem] bg-[var(--accent)]/20 blur-3xl opacity-60"></div>
    ```
    plus an optional thin gradient ring (`from-[var(--accent)]/40` → transparent) on the frame.
  - **Subtle float:** gentle infinite y-float (e.g. `animate={{ y: [0, -12, 0] }}` over ~6s ease-in-out), and `whileHover` settle. Respect reduced motion (§6).
  - **Ambient chips behind:** 2–3 small `glass-card` chips with the existing mono labels (`/systems/core`, `/metrics/scale`) and a lucide icon, low opacity, blurred, drifting — reusing the current `Code`/`TrendingUp` icons so the tech identity survives.
- **Responsive / order:** On mobile the portrait should sit **above** the copy (currently right column is `order-1` on mobile via the cards — keep portrait-first on mobile, copy-first on desktop). Center text on mobile, left-align on desktop (current behavior).
- Keep the existing radial background-glow layer behind everything.

### Acceptance for the hero
- Portrait is the clear focal point, beautifully framed, glows softly in the accent, works in **both** light and dark.
- No layout shift on load (use fixed `width`/`height` + `priority`).
- Mobile: portrait on top, copy below, nothing overflows; chips don't clutter small screens (hide or reduce on `< lg`).
- Hero still reads as "engineer who ships systems," not a generic photo banner.

---

## 4. Whole-site refresh (per page)

Scope = whole public site. Priority order below. Apply §2 tokens and §6 guardrails throughout.

### 4.1 Landing page — `/` ([page.tsx](src/app/(public)/page.tsx))
- **Hero:** §3.
- **Theming debt (important):** the **Featured Thoughts** and **Selected Work** sections hard-code `text-white`, `text-neutral-200/400`, `border-neutral-800`, `text-yellow-500`, `bg-neutral-800/900`. These look fine in dark but **break in light mode**. Convert to tokens (`--foreground`, `--muted`, `--accent`, `--card-border`, `.glass-card`).
- Add `ScrollReveal` consistency, refine spacing rhythm (the page uses `space-y-32`; check it breathes on mobile).
- The blog/work items here are **hard-coded placeholders** — keep them as elegant static showcases, or note that they should later bind to real data (out of scope for visuals).
- Consider an "above the fold" trust strip or subtle scroll cue under the hero.

### 4.2 About — `/about` ([about/page.tsx](src/app/(public)/about/page.tsx))
- Uses `prose prose-invert` — `prose-invert` is **dark-only**; in light mode text inverts wrong. Make it theme-aware (e.g. `dark:prose-invert`) or restyle with tokens.
- Currently text-only. **Opportunity:** reuse the portrait (or a secondary photo) here for a proper editorial About — photo + story side-by-side, matching the new hero language.

### 4.3 Portfolio — `/portfolio` ([portfolio/page.tsx](src/app/(public)/portfolio/page.tsx)) + [ProjectCard](src/components/portfolio/ProjectCard.tsx), [PersonaSummary](src/components/portfolio/PersonaSummary.tsx)
- **[PersonaSummary.tsx](src/components/portfolio/PersonaSummary.tsx) has heavy theming debt** — `bg-neutral-900/30`, `text-neutral-100/200/400/500`, `bg-yellow-500`, `text-black` throughout. Convert to tokens + `.glass-card`. This AI summary widget is a signature feature; make it look premium and theme correctly.
- Unify `ProjectCard` with the `.glass-card` system and accent hover.

### 4.4 Services — `/services` ([services/page.tsx](src/app/(public)/services/page.tsx))
- Align cards/CTAs with the system; make pricing/offer blocks visually strong and tokenized.

### 4.5 Blog — `/blog` ([blog/page.tsx](src/app/(public)/blog/page.tsx)), post [\[slug\]](src/app/(public)/blog/[slug]/page.tsx), [PostCard](src/components/blog/PostCard.tsx)
- Refine list/cards and the article reading experience (typography, measure, code blocks via `@tailwindcss/typography`). Ensure `prose` is theme-aware (same `prose-invert` caveat).
- Polish the engagement components: [AskAyoolaWidget](src/components/blog/AskAyoolaWidget.tsx), [CommentForm](src/components/blog/CommentForm.tsx)/[CommentList](src/components/blog/CommentList.tsx), [LikeButton](src/components/blog/LikeButton.tsx), [ReadingPathBuilder](src/components/blog/ReadingPathBuilder.tsx) — check each for hard-coded colors.

### 4.6 Contact — `/contact` ([contact/page.tsx](src/app/(public)/contact/page.tsx))
- Make the form delightful: tokenized inputs, focus rings using `--accent`, clear success/error states (a `ToastContext` exists at [ToastContext.tsx](src/context/ToastContext.tsx)).

### 4.7 Global chrome
- [Header.tsx](src/components/layout/Header.tsx) / [Footer.tsx](src/components/layout/Footer.tsx): already well-tokenized — only minor polish (active-link motion, footer newsletter card). Use as the quality bar.
- [ThemeToggle](src/components/layout/ThemeToggle.tsx): verify the transition feels smooth across all redesigned surfaces.
- [not-found.tsx](src/app/not-found.tsx) and [loading.tsx](src/app/(public)/loading.tsx): give them on-brand states.

### 4.8 System-wide polish ideas (suggested upgrades)
- **Motion language:** consistent entrance (`fadeUp`/`ScrollReveal`), tasteful hover micro-interactions, one signature accent animation (the hero glow/float) echoed lightly elsewhere.
- **Light-mode parity:** every new surface must look intentional in light mode, not just dark.
- **Depth system:** standardize shadow/blur usage so "glass" feels consistent, not ad-hoc.
- **Focus & a11y states:** visible accent focus rings everywhere (Button already does this).
- **OG image** (§1) + favicon polish.

---

## 5. Known theming debt to fix (quick hit-list)

These are concrete, already-spotted issues — fixing them is most of the "whole-site consistency" win:

1. `page.tsx` Featured/Selected sections → `text-white`, `text-neutral-*`, `border-neutral-800`, `text-yellow-500` ⇒ tokens.
2. `PersonaSummary.tsx` → almost entirely hard-coded `neutral`/`yellow` ⇒ tokens + `.glass-card`.
3. `about/page.tsx` → `prose-invert` is dark-only ⇒ `dark:prose-invert` / token-based prose.
4. Audit blog components + any page for `text-white` / `bg-neutral-*` / `text-yellow-*` and replace with `--foreground` / `--card-bg` / `--accent`.
5. Missing `public/og-image.jpg`.

---

## 6. Guardrails (apply to every change)

- **Tokens only.** No hard-coded hex/neutral/white for theme-able surfaces. Use `var(--…)` tokens; if a new token is needed, add it in **both** `:root` and `.dark` in [globals.css](src/app/globals.css).
- **Light + dark must both look intentional.** Test every screen in both.
- **Tailwind v4 / CSS-first.** Extend via `@theme` in globals.css. There is no `tailwind.config.js`.
- **Reuse components** (`Button`, `ScrollReveal`, `.glass-card`, `motion.ts` variants) before authoring new ones.
- **Motion:** keep framer-motion patterns; respect `prefers-reduced-motion` (gate infinite/float animations).
- **Accessibility:** real `alt` text on the portrait and all imagery; maintain AA contrast (note `--accent` light is amber-700 specifically for contrast on white — keep it); visible focus states; semantic headings.
- **Performance:** `next/image` with explicit dimensions + `priority` for the hero portrait → no CLS. Don't bloat bundle.
- **`"use client"`** only where interaction/motion requires it (HeroSection already is). Keep server components server-side.
- **Don't touch** `src/app/admin/**` (internal admin UI) or `backend/**` — public site only.

---

## 7. File Map (checklist)

| Area | File | Action |
|---|---|---|
| **Hero** | [HeroSection.tsx](src/components/home/HeroSection.tsx) | Portrait + glass frame + glow; cards → ambient chips |
| Assets | `public/ayoola-portrait.jpg` | Ayoola adds (§1 specs) |
| Assets | `public/og-image.jpg` | Add branded 1200×630 OG image |
| Landing | [page.tsx](src/app/(public)/page.tsx) | Fix theming debt; polish sections |
| About | [about/page.tsx](src/app/(public)/about/page.tsx) | Theme-aware prose; add editorial photo |
| Portfolio | [portfolio/page.tsx](src/app/(public)/portfolio/page.tsx) · [ProjectCard](src/components/portfolio/ProjectCard.tsx) · [PersonaSummary](src/components/portfolio/PersonaSummary.tsx) | Tokenize PersonaSummary; unify cards |
| Services | [services/page.tsx](src/app/(public)/services/page.tsx) | Tokenize + strengthen offer blocks |
| Blog | [blog/page.tsx](src/app/(public)/blog/page.tsx) · [\[slug\]](src/app/(public)/blog/[slug]/page.tsx) · [PostCard](src/components/blog/PostCard.tsx) · blog/* widgets | Reading experience + tokenize |
| Contact | [contact/page.tsx](src/app/(public)/contact/page.tsx) | Delightful tokenized form |
| Chrome | [Header.tsx](src/components/layout/Header.tsx) · [Footer.tsx](src/components/layout/Footer.tsx) · [ThemeToggle](src/components/layout/ThemeToggle.tsx) | Minor polish (quality bar) |
| States | [not-found.tsx](src/app/not-found.tsx) · [loading.tsx](src/app/(public)/loading.tsx) | On-brand empty/loading |
| Tokens | [globals.css](src/app/globals.css) | Add any new tokens (both `:root` + `.dark`) |
| Shared | [motion.ts](src/lib/motion.ts) · [Button.tsx](src/components/ui/Button.tsx) · [ScrollReveal.tsx](src/components/ui/ScrollReveal.tsx) | Extend, don't replace |

---

## 8. Verify

- `npm run dev` and review `/`, `/about`, `/portfolio`, `/services`, `/blog`, `/contact` in **both** light and dark.
- `npm run build` must pass (React Compiler is on).
- `npm run lint` clean.
- Existing tests under `src/components/ui/*.test.tsx` still green (`npm run test`).
- Hero: no CLS, portrait crisp at 1×/2×, glow visible in both themes, mobile order correct.
