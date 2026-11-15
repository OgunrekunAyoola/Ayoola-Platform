# Design handoff

**Project:** Ayoola Ogunrekun's freelance site: one audience (clients), one next step (get in touch, or request a quick scan).
**Updated:** 15 November 2026, for the services restructure.
**Brand reference:** Brand kit v2.0 (October 2026). Colours are in `03_Colour` (CSS and JSON tokens), fonts in `04_Typography` (Syne, Geist, Geist Mono), logos and favicons in `02_Logo`, link previews in `07_Marketing/02_Link-Previews`. The kit was made from this site, so its tokens match `globals.css` exactly.

This is the brief for anyone changing how the site looks. The site is a restructure of the v7 design, not a redesign: extend the existing tokens and components; don't replace them.

---

## 1. Stack

Next.js 16 (App Router) · React 19 with the React Compiler · Tailwind CSS v4 (CSS-first; no `tailwind.config.js`) · Netlify (`@netlify/plugin-nextjs`). Fonts are self-hosted from `src/assets/fonts`. **Light only**, by design: there is no dark theme on the site. The kit's dark tokens are for ink assets (link previews, video, business cards).

## 2. Pages and where their copy lives

All page copy is in `content/site/*.yaml`, validated by zod in `src/lib/site-content.ts`, so a missing or misspelled field fails the build. Case studies are `content/work/*.mdx`.

| Route | Page | Copy |
|---|---|---|
| `/` | Hero, marquee, portrait and stats, What I do, Selected work (featured case studies), AI systems, Feedback, **Rescue & security audit**, stack marquee, How I work | `home.yaml` (prices and the run log come from `services.yaml`) |
| `/services` | Three sections on one template (eyebrow, one H2, tagline, intro → offer cards → a block under a small subhead → proof): `#rescue` (priced), `#builds`, `#ai` (with `close-run.log` beside its intro) | `services.yaml` |
| `/portfolio`, `/portfolio/[slug]` | Case studies with honest status lines | `work.yaml`, `content/work/*.mdx` |
| `/about` | Story, Experience (an `<ol>` with `<time>` dates), a Talk line, Toolkit (2×2) | `about.yaml` |
| `/contact` | Form. Nothing is selected unless `?type=rescue|build|ai|other` is in the URL; with rescue selected the message label asks "What's worrying you about the app?" | `contact.yaml` |
| `/blog` | Writing. Unlinked, out of the sitemap and `noindex` until a post is published | `writing.yaml` |

Old URLs: `/work-with-me` → `/services` and `/ai` → `/services#ai` (308s in `next.config.ts`).

## 3. Tokens (`src/app/globals.css`)

| Token | Value | Use |
|---|---|---|
| `--background` | `#eef1ea` (Sage) | Page ground |
| `--foreground` | `#13201a` (Ink) | Headlines, primary text |
| `--body` | `#3a463f` | Long text |
| `--muted` | `#55645b` | Secondary text, labels |
| `--accent` | `#1e6b4a` (Green) | Emphasis words, eyebrows, links, one green panel per view |
| `--accent-hover` | `#17573c` | Hover on green |
| `--accent-dot` | `#3f9a6f` | Status dot only |
| `--on-accent` / `--on-accent-muted` / `--on-accent-soft` | `#f4f8f2` / `#cfe9da` / `#bfe3cf` | Text on green |
| `--card` / `--card-border` / `--card-border-2` | `#f8faf5` / `#dfe4db` / `#d3dacf` | Cards |
| `--hair` / `--hair-strong` | `#d8ded4` / `#c8d0c4` | Rules and list rows |
| `--tint` / `--tint-2` / `--figure` / `--row-hover` | `#dde8dd` / `#e3ebe0` / `#e2e7df` / `#e6ebe2` | Panels, portrait plate, row hover |

Never green text on ink (2.6:1) or mint text on sage (1.2:1). Every text pair in use clears 4.5:1.

**Type:** Syne 700 for headings (−0.035em), Geist for reading text, Geist Mono for `eyebrow` and `label`. Sentence case everywhere; uppercase only in mono labels. One `*emphasis*` per headline (rendered green by `Rich`).

**Shape:** everything pressable is a pill. Cards 22px, offer cards 26px, portrait 30px. Two shadows only (portrait, run log). Focus: 2px accent outline, 3px offset.

## 4. Components (reuse these)

- `Header` / `Footer` (`src/components/layout`): nav is **Services · Work · About** (Writing joins automatically once a post exists). The footer's call to action is the only closing call to action on every page: pages don't add their own closing rows.
- `PrimaryCta` (`src/components/ui`): **the one primary button style**, everywhere: ink pill, 58px, 17px, label plus a Syne →, via the `.btn-cta` class. The header uses the same ink pill at the kit's compact size, with the status dot.
- `BookCallButton`: the booking call to action in that style. Its label comes from `bookingCta()` in `src/config/site.ts`: **"Get in touch"** (opening `/contact`) while `bookingUrl` is empty, **"Book a call"** (opening the link) once it's set. Never hard-code "Book a call"; a test checks.
- `OfferCard` (`src/components/ui`): `featured` makes it the green card; `wide` lays a lone offer across the row. `price` and `priceNote` are display text only (no checkout). Offers without a price show "Quoted after a call".
- `ProofList` (`src/components/services`): case studies cited by slug, showing title, honest status and a one-line note. `stacked` for a half-width column.
- `SectionHeading`, `Rich`, `RunLog`, `WorkCard`, `WorkDiagram`, `Marquee`, `Portrait`.
- `pageMetadata()` (`src/lib/page-meta.ts`): canonical URL plus Open Graph and Twitter text for a page. Every page calls it.
- Share images: `renderOgImage()` (`src/lib/og.tsx`) draws the kit's link-preview card (ink ground, mint eyebrow with dot, Syne headline with mint emphasis, 120×5 accent rule, mono footer). Each route has an `opengraph-image.tsx` and a `twitter-image.tsx`.

## 5. Rules for copy (they affect layout too)

- Every line on Home and Services answers "what does the client get?"
- Tool and stack names belong in the About toolkit and the case-study chips, not in Services copy. (Platforms the client already uses, like Supabase or Stripe, are fine where they say who an offer is for.) A test checks Services.
- No sentence appears word for word on two pages, except the prices. A test checks every page, case studies included.

- Only two public prices, both on the rescue offer: **Quick scan $450 fixed** (credited if they upgrade within 14 days) and **Audit + fix from $2,500**. Everything else is "Quoted after a call". A test fails if any other dollar figure appears in `content/site`.
- No client, agency or colleague names. Case studies keep their honest status lines. Testimonials stay paraphrased ("Paraphrased from real feedback. Names withheld.").
- No job-seeking copy, and nothing from the old full-time pitch under a new heading. A test checks the YAML for it.
- Buttons say what happens: "Get in touch", "Request a quick scan", "See services". A button never promises a call and opens a form. One ink pill per view; pair it with a text link.

## 6. Placeholders

- `bookingUrl` in `src/config/site.ts` is empty, so every booking button reads "Get in touch" and opens `/contact`, and the contact page hides its own booking button. Set the link and they all switch to "Book a call".
- `public/ayoola-portrait.jpg` doesn't exist yet; `Portrait` shows the hatch until it does.

## 7. Verify

From `frontend/`: `npm run lint`, `npx tsc --noEmit`, `npm test`, and `npm run build` with `NEXT_PUBLIC_SITE_URL` set. Then check `/`, `/services`, `/portfolio`, `/about`, `/contact` and a 404 at 1440px and 390px, plus `/work-with-me` and `/ai` redirecting.
