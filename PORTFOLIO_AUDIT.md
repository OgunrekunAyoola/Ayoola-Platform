# PORTFOLIO_AUDIT.md

**Repo:** `/Users/macbook/Documents/Ayoola-Platform` · branch `master` · HEAD `5d13755`
**Audit date:** 2026-09-28
**Scope:** Read-only. No files were modified, and nothing was fixed or refactored.

> **Read this first — the repo is not a static portfolio site.** It is a three-tier monorepo:
> a Next.js frontend, an Express/MongoDB backend, and an admin CMS. **All blog posts and
> portfolio projects live in MongoDB, not in the repo.** At audit time the backend is offline,
> so the public site renders *zero* projects and *zero* posts. See §3 and §7.

---

## 1. TECH STACK & SETUP

### 1.1 Monorepo layout

| Piece | Path | Stack |
|---|---|---|
| Frontend | `frontend/` | Next.js 16.1.6 (App Router), React 19.2.3, TypeScript 5 |
| Backend | `backend/` | Node + Express 5.2.1, Mongoose 9.1.5, TypeScript 5.9.3 |
| Docs | `docs/` | Markdown specs (not shipped) |
| Design | `design/` | Untracked HTML design explorations (not shipped) |

### 1.2 Frontend

- **Framework:** Next.js `16.1.6`, App Router, React `19.2.3`.
- **React Compiler is ON** — `frontend/next.config.ts` sets `reactCompiler: true`, with `babel-plugin-react-compiler@1.0.0` as a devDependency.
- **Language:** TypeScript, `strict: true`, path alias `@/*` → `./src/*`.
- **Styling:** **Tailwind CSS v4**, CSS-first. There is **no `tailwind.config.js`** — theming is declared via `@theme` and `:root` / `.dark` CSS custom properties in `frontend/src/app/globals.css`. PostCSS plugin: `@tailwindcss/postcss`.
- **Typography plugin:** `@tailwindcss/typography` `^0.5.19`, loaded via `@plugin` in `globals.css`.
- **UI / icon libraries (two of them, used in parallel):**
  - `lucide-react` `^0.563.0` — used in Header, Footer, Hero, Contact, Services, ProjectCard, PostCard, blog pages.
  - `@heroicons/react` `^2.2.0` — used in ShareButton, AskAyoolaWidget, ReadingPathBuilder, PersonaSummary.
- **Animation:** `framer-motion` `^12.33.0`, plus hand-written CSS keyframes in `globals.css`.
- **Theming:** `next-themes` `^0.4.6` (`attribute="class"`, `defaultTheme="system"`, `enableSystem`).
- **Markdown rendering:** `react-markdown` `^10.1.0`.
- **RSS:** `rss` `^1.2.2`.
- **Class utilities:** `clsx` `^2.1.1` and `tailwind-merge` `^3.4.0` are **both installed but I found no import of either anywhere in `frontend/src`** — they appear to be unused dependencies.
- **Fonts:** `next/font/google` — **Inter** (`--font-inter`, sans) and **Playfair Display** (`--font-playfair`, serif), both `display: "swap"`. Self-hosted/optimised by Next at build time.
  - Note: the `design/*.dc.html` explorations reference **JetBrains Mono**, but the shipped app never loads a mono webfont — `font-mono` falls back to the OS default monospace.
- **Testing:** `vitest` `^4.0.18` + `@testing-library/react` + `jsdom`.

### 1.3 Backend

- **Runtime:** Node, Express `^5.2.1`, CommonJS.
- **DB:** MongoDB via `mongoose` `^9.1.5` (and `mongodb` `^7.0.0`).
- **Auth:** `jsonwebtoken` `^9.0.3` + `bcrypt` `^6.0.0` (single hard-coded admin identity from env, no user table).
- **Security middleware:** `helmet` `^8.1.0`, `express-rate-limit` `^8.2.1`, CORS, 10 kb JSON body limit.
- **Email:** `resend` `^6.9.1`.
- **Dev:** `ts-node-dev`; **Tests:** `jest` `^30.2.0` + `ts-jest` + `supertest`.

### 1.4 Dependency flags

| Item | Finding |
|---|---|
| `express-mongo-sanitize` `^2.2.0` | **Installed and imported but deliberately disabled.** `backend/src/app.ts:29` — `// app.use(mongoSanitize()); // Prevent NoSQL Injection - Disabled due to Express 5 incompatibility`. The import on line 5 is now dead, and NoSQL-injection sanitisation is not running. |
| `@types/express-rate-limit` `^5.1.3` | Deprecated stub — `express-rate-limit` v8 ships its own types. Harmless but obsolete. |
| `clsx`, `tailwind-merge` | Installed, zero imports found. Unused. |
| `@types/node` | Frontend pins `^20`; backend pins `^25.2.0`. Inconsistent across the monorepo. |
| `PORT` mismatch | `backend/src/config/env.ts:6` defaults to `4000`; `backend/.env.example` says `PORT=5000`; `DEPLOY.md` Step 3.6 tells you to health-check **port 8000**. Three different numbers. (In practice Koyeb/Render inject `PORT`, so this mainly misleads local setup.) |
| Versions | Next 16 / React 19 / Tailwind 4 are all current-generation. Nothing is meaningfully out of date. |

### 1.5 Build tool & package manager

- **Package manager:** **npm** — `package-lock.json` in both `frontend/` and `backend/`. No workspace root; the two packages install independently. No pnpm/yarn/bun lockfiles.
- **Build tool:** Next.js's own bundler (Turbopack — the deployed HTML references `/_next/static/chunks/turbopack-*.js`) for the frontend; plain `tsc` for the backend.
- **Linting:** ESLint 9 flat config (`frontend/eslint.config.mjs`) with `eslint-config-next@16.1.6`. Backend has **no linter configured**.

### 1.6 Deployment & hosting

Per `DEPLOY.md` and the config files, three independently hosted pieces:

| Piece | Host | Config file | Status at audit |
|---|---|---|---|
| Frontend | **Netlify** — `https://ayoolaogunrekunn.netlify.app` | `netlify.toml` | ✅ **Live** (HTTP 200) |
| Backend | **Koyeb** (migrated from Render) | `render.yaml` (stale) | ❌ **Down** |
| Database | **MongoDB Atlas** (free M0) | — | Unknown / unreachable |

- `netlify.toml`: `base = "frontend"`, `command = "npm run build"`, `publish = ".next"`, plugin `@netlify/plugin-nextjs` (so SSR and `next/image` work).
- `render.yaml`: a full Render Blueprint for the backend (`rootDir: backend`, healthcheck `/api/health`, free plan). **`DEPLOY.md` says Render was suspended over an unpaid invoice and the backend moved to Koyeb — so `render.yaml` is now stale documentation.** I confirmed `https://ayoola-platform.onrender.com/api/health` returns **HTTP 503**.
- **There is no Koyeb config file in the repo.** The Koyeb deployment is dashboard-configured only; `DEPLOY.md` is the sole record of it, and it does not record the resulting Koyeb URL.
- **No Dockerfile, no GitHub Actions, no CI/CD of any kind.** `.github/` does not exist in this repo. Deploys are git-push-triggered by the hosts.
- **No Vercel config** (though `frontend/public/vercel.svg` is a leftover from `create-next-app`).

### 1.7 Environment variables (names only)

**Frontend** (`NEXT_PUBLIC_*` are baked in at build time):
- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_SITE_URL`

**Backend:**
- `PORT`, `NODE_ENV`
- `MONGODB_URI`, `DB_NAME`
- `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`, `ADMIN_JWT_SECRET`
- `FRONTEND_URL`
- `RESEND_API_KEY`, `RESEND_WEBHOOK_SECRET`
- `AI_PROVIDER_API_KEY`, `AI_PROVIDER_BASE_URL`, `AI_PROVIDER_MODEL`

Local files `frontend/.env.local` and `backend/.env` exist on disk and are correctly gitignored. **No values are reproduced in this report.**

> ⚠️ **`NEXT_PUBLIC_SITE_URL` is not set in the Netlify build.** Proven by the live HTML: `og:url`, `og:image` and `twitter:image` all emit `http://localhost:3000`, and `/sitemap.xml` lists `http://localhost:3000` URLs. See §6.

> ⚠️ **Secrets in git history.** `backend/.env` was committed and later removed (`9ba77b5 fix: untrack .env file and update gitignore`, after `87e494a`). It is untracked today, but **whatever values were in it remain in the git history** and should be treated as compromised.

### 1.8 How to run it locally

Not documented anywhere as a single flow — `README.md` has no run instructions, and `frontend/README.md` is the untouched `create-next-app` boilerplate. Reconstructed from the configs:

```bash
# 1. MongoDB must be running locally on :27017
#    (backend/src/scripts/check-local-db.ts verifies this)

# 2. Backend
cd backend
npm install
cp .env.example .env     # then fill in values
npx ts-node src/scripts/hashAdminPassword.ts "YourPassword"   # → ADMIN_PASSWORD_HASH
npm run dev              # ts-node-dev, defaults to :4000

# 3. Frontend (separate terminal)
cd frontend
npm install
# frontend/.env.local needs NEXT_PUBLIC_API_URL and NEXT_PUBLIC_SITE_URL
npm run dev              # :3000
```

Other scripts: `npm run build` / `npm start` / `npm run lint` / `npm run test` (frontend, vitest); `npm run build` / `npm start` / `npm test` (backend, jest `--runInBand`).

---

## 2. STRUCTURE

### 2.1 File tree (excludes `node_modules/`, `.next/`, `dist/`, lockfiles)

```
Ayoola-Platform/
├── .claude/settings.json              # untracked; allows `npx next *`, `npx tsc *`
├── .gitignore
├── DEPLOY.md                          # Koyeb/Netlify/Atlas recovery guide
├── README.md                          # stale (see §7)
├── netlify.toml
├── render.yaml                        # stale — backend moved off Render
│
├── design/                            # UNTRACKED — not part of the build
│   ├── canvas.json
│   ├── Main.dc.html                   # "A · Evidence Terminal"
│   ├── Editorial.dc.html              # "B · Compliance Editorial"
│   ├── Console.dc.html                # "C · Control Console"
│   └── ayoola-platform-hero-directions.html   # 2.1 MB
│
├── docs/
│   ├── master-spec.md, master-spec-phase2/3/4.md
│   ├── task.md, task-phase2/3/4.md
│   ├── roadmap-v02-to-phase2.md
│   ├── outreach-templates.md, outreach-tracker.csv
│   ├── content/services.md
│   └── templates/case-study-8-sections.md
│
├── backend/
│   ├── .env.example, jest.config.js, tsconfig.json
│   ├── src/
│   │   ├── app.ts, server.ts
│   │   ├── config/{env,db,aiConfig}.ts
│   │   ├── middleware/adminAuth.ts
│   │   ├── models/{Post,Project,Comment,Subscriber,ContactMessage,OutreachTarget}.ts
│   │   ├── routes/{health,posts,projects,subscribers,contact,webhooks,aiRoutes,
│   │   │           adminAuth,adminPosts,adminProjects,adminComments,
│   │   │           adminStats,adminOutreach}.ts
│   │   ├── services/{aiClient,emailService}.ts
│   │   ├── scripts/{hashAdminPassword,check-local-db,test-api,stress-test}.ts
│   │   └── utils/password.ts
│   └── tests/  (6 jest suites)
│
└── frontend/
    ├── DESIGN_HANDOFF.md              # design brief; see §5/§7
    ├── next.config.ts, postcss.config.mjs, eslint.config.mjs
    ├── tsconfig.json, vitest.config.ts, vitest.setup.ts
    ├── public/                        # file.svg globe.svg next.svg vercel.svg window.svg
    └── src/
        ├── app/
        │   ├── layout.tsx             # root layout + global metadata
        │   ├── globals.css            # THE design system
        │   ├── favicon.ico
        │   ├── not-found.tsx
        │   ├── (public)/
        │   │   ├── layout.tsx, loading.tsx, page.tsx
        │   │   ├── robots.ts, sitemap.ts
        │   │   ├── feed.xml/route.ts
        │   │   ├── about/page.tsx
        │   │   ├── services/page.tsx
        │   │   ├── contact/page.tsx
        │   │   ├── blog/page.tsx, blog/[slug]/page.tsx
        │   │   └── portfolio/page.tsx, portfolio/[slug]/page.tsx
        │   └── admin/
        │       ├── login/page.tsx
        │       └── (protected)/
        │           ├── layout.tsx
        │           ├── dashboard/page.tsx
        │           ├── posts/{page,new/page,[id]/page}.tsx
        │           ├── projects/{page,new/page,[id]/page}.tsx
        │           ├── comments/page.tsx
        │           └── outreach/page.tsx
        ├── components/
        │   ├── layout/{Header,Footer,ThemeToggle}.tsx
        │   ├── providers/ThemeProvider.tsx
        │   ├── home/HeroSection.tsx
        │   ├── portfolio/{ProjectCard,PersonaSummary}.tsx
        │   ├── blog/{PostCard,CommentForm,CommentList,LikeButton,
        │   │         AskAyoolaWidget,ReadingPathBuilder}.tsx
        │   ├── newsletter/NewsletterForm.tsx
        │   ├── admin/PostForm.tsx
        │   └── ui/{Button,Skeleton,StatusBadge,ShareButton,
        │            ScrollReveal,FramedPortrait}.tsx  (+ 5 .test.tsx)
        ├── context/ToastContext.tsx
        └── lib/{api-client.ts, motion.ts, sanity.test.ts}
```

### 2.2 Routes

**Public** (all wrapped by `src/app/(public)/layout.tsx` → `Header` + `<main>` + `Footer`):

| Route | Rendered by | Rendering mode | Data source |
|---|---|---|---|
| `/` | `app/(public)/page.tsx` | `force-dynamic` | API: posts + projects |
| `/about` | `app/(public)/about/page.tsx` | Static | Hardcoded |
| `/services` | `app/(public)/services/page.tsx` | Static | Hardcoded |
| `/contact` | `app/(public)/contact/page.tsx` | Client component | Hardcoded + POST |
| `/portfolio` | `app/(public)/portfolio/page.tsx` | `force-dynamic` | API: projects |
| `/portfolio/[slug]` | `app/(public)/portfolio/[slug]/page.tsx` | Dynamic | API: single project |
| `/blog` | `app/(public)/blog/page.tsx` | `force-dynamic` | API: posts (limit 100) |
| `/blog/[slug]` | `app/(public)/blog/[slug]/page.tsx` | Dynamic | API: post + comments |
| `/sitemap.xml` | `app/(public)/sitemap.ts` | Generated | API |
| `/robots.txt` | `app/(public)/robots.ts` | Generated | — (**404s in prod, see §6**) |
| `/feed.xml` | `app/(public)/feed.xml/route.ts` | Route handler | API |
| *(any 404)* | `app/not-found.tsx` | Static | Hardcoded |

**Admin** (client-side gated; `admin/(protected)/layout.tsx` reads `localStorage.adminToken` and redirects to `/admin/login` if absent):

`/admin/login` · `/admin/dashboard` · `/admin/posts` · `/admin/posts/new` · `/admin/posts/[id]` · `/admin/projects` · `/admin/projects/new` · `/admin/projects/[id]` · `/admin/comments` · `/admin/outreach`

**Backend API** (`backend/src/app.ts`, all under `/api`):
`/api/health` · `/api/posts` · `/api/projects` · `/api/subscribers` · `/api/contact` · `/api/webhooks` · `/api/ai` · `/api/admin` (login) · `/api/admin/posts` · `/api/admin/projects` · `/api/admin/comments` · `/api/admin/outreach` · `/api/admin/stats`

### 2.3 Shared components & where they're used

| Component | Used by |
|---|---|
| `layout/Header` | `(public)/layout.tsx`, `not-found.tsx` |
| `layout/Footer` | `(public)/layout.tsx`, `not-found.tsx` |
| `layout/ThemeToggle` | `Header`, `admin/(protected)/layout.tsx` |
| `providers/ThemeProvider` | `app/layout.tsx` (root) |
| `context/ToastContext` | `app/layout.tsx` (root); consumed by Contact, ShareButton, admin login, admin outreach |
| `ui/Button` | admin comments/posts/projects/projects-new/projects-[id], admin login, `CommentForm`, `NewsletterForm` — **8 importers, all admin or forms. No public marketing page uses it** (they use the `.btn` CSS classes instead). |
| `ui/FramedPortrait` | `HeroSection`, `about/page.tsx` |
| `ui/ScrollReveal` | **`(public)/page.tsx` only** |
| `ui/ShareButton` | `blog/[slug]`, `portfolio/[slug]` |
| `ui/StatusBadge` | admin posts, admin projects |
| `ui/Skeleton` | `(public)/loading.tsx` |
| `home/HeroSection` | `(public)/page.tsx` |
| `portfolio/ProjectCard` | `(public)/portfolio/page.tsx` |
| `portfolio/PersonaSummary` | `portfolio/[slug]` |
| `blog/PostCard` | **NOT IMPORTED ANYWHERE — dead code** (see §7) |
| `blog/CommentForm`, `CommentList`, `LikeButton`, `AskAyoolaWidget` | `blog/[slug]` |
| `blog/ReadingPathBuilder` | `blog/page.tsx` |
| `newsletter/NewsletterForm` | `Footer`, `blog/[slug]` |
| `admin/PostForm` | admin posts/new, admin posts/[id] |

---

## 3. CONTENT INVENTORY

### 3.0 Where content comes from — critical

| Content type | Source | Reachable for this audit? |
|---|---|---|
| Home hero, "Building with" strip, section headings | **Hardcoded** in `page.tsx` / `HeroSection.tsx` | ✅ |
| About page — all of it | **Hardcoded** in `about/page.tsx` | ✅ |
| Services — all tiers, prices, process | **Hardcoded** in `services/page.tsx` | ✅ |
| Contact — copy, email, socials | **Hardcoded** in `contact/page.tsx` | ✅ |
| Header / Footer / 404 | **Hardcoded** | ✅ |
| **Blog posts** | **MongoDB Atlas** via `/api/posts` | ❌ **NO** |
| **Portfolio projects** | **MongoDB Atlas** via `/api/projects` | ❌ **NO** |
| Comments | MongoDB | ❌ No |

**There is no CMS, no markdown content directory, and no seed/fixture data in the repo.** I verified:
- Local MongoDB is running on `:27017`, database `ayoola-platform` exists, and **every collection is empty** (`posts: 0`, `projects: 0`, `comments: 0`, `subscribers: 0`, `contactmessages: 0`, `outreachtargets: 0`).
- The old Render API returns **503**.
- The live Netlify site renders **"Failed to load projects. Please try again later."** on `/portfolio` and **"Failed to load posts. Please try again later."** on `/blog`.

> **I cannot enumerate a single real project or blog post.** Titles, descriptions, tech tags, live/repo links and hero images all live in the Atlas database, which is not reachable from this environment. `docs/templates/case-study-8-sections.md` defines a case-study template, but no filled-in case studies exist in the repo. **To inventory that content you must bring the backend back up (`DEPLOY.md`) or dump the Atlas collections.**

---

### 3.1 Global chrome — Header (`components/layout/Header.tsx`)

Sticky, appears on every public page.

- Brand mark: **`AO`** (amber square)
- Brand name: **`Ayoola Ogunrekun`** (hidden below `sm`)
- Brand tagline: **`systems · writing · craft`** (hidden below `sm`)
- Desktop nav: **`Home`** `/` · **`About`** `/about` · **`Portfolio`** `/portfolio` · **`Services`** `/services` · **`Blog`** `/blog` · **`Contact`** `/contact`
- Theme toggle, `aria-label="Toggle theme"`, sr-only text **`Toggle theme`**
- CTA button: **`Start a project`** → `/contact` (hidden below `sm`)
- Mobile menu button, `aria-label="Toggle menu"`; mobile panel repeats all six nav links plus a full-width **`Start a project`** button.

### 3.2 Global chrome — Footer (`components/layout/Footer.tsx`)

Four blocks:

1. **Brand column**
   - `AO` mark, **`Ayoola Ogunrekun`**
   - Bio: **`Writer, software engineer, and creator. Building systems that ship — and keep shipping.`**
   - Links: **`Admin`** → `/admin/login` · **`RSS`** → `/feed.xml`
2. **Explore column** — heading **`Explore`**; links **`Portfolio`**, **`Services`**, **`Blog`**, **`About`**
3. **Newsletter card**
   - Heading: **`The systems notebook`**
   - Copy: **`Occasional notes on building durable software. No spam, unsubscribe anytime.`**
   - Then `NewsletterForm` renders its own nested block (see §3.9) — **producing two stacked headings and two blurbs in the same card.**
4. **Bottom bar**
   - **`© 2026 Ayoola Ogunrekun`** (year is `new Date().getFullYear()`)
   - **`Built with intent · Lagos 🇳🇬`**

### 3.3 `/` — Home

**Section 1 — Hero** (`components/home/HeroSection.tsx`)

- Eyebrow (with blinking dot): **`Ayoola Ogunrekun`**
- H1: **`I build intelligent systems that ship — and keep shipping.`**
  (the word **`systems`** is italic, rendered in an amber gradient `--accent` → `#f59e0b`)
- Sub-paragraph: **`Software engineer, writer, and operator. I design resilient platforms, weave in AI where it earns its place, and write about what I learn along the way.`**
- Buttons: **`View systems`** → `/portfolio` (primary) · **`Start a project`** → `/contact` (secondary)
- Mono footnote: **`// available for select engagements · 2026`**
- Right column: `FramedPortrait` plus three floating "signal chips" (`hidden lg:flex`):
  - Chip 1 (Code icon): **`/systems/core`**
  - Chip 2 (TrendingUp icon): label **`uptime`**, value **`99.98%`** — **a hardcoded, unsourced metric**
  - Chip 3: Terminal icon only, no text

**Section 2 — "Building with" strip** (`page.tsx`)

- Label: **`Building with`**
- Items (hardcoded `STACK` array): **`Next.js`** · **`TypeScript`** · **`Node`** · **`AI / LLMs`** · **`PostgreSQL`**
- ⚠️ **`PostgreSQL` is listed but the entire platform runs on MongoDB.** No Postgres anywhere in the repo. Also note AWS — central to the target positioning — is absent.

**Section 3 — Featured Thoughts** *(renders only if the API returns ≥1 post — currently hidden)*

- Eyebrow: **`Featured thoughts`**
- H2: **`Writing on systems & craft`**
- Link: **`All writing`** → `/blog`
- Up to 3 post cards: first tag (or fallback **`Writing`**), title, excerpt, **`{n} min read`**

**Section 4 — Selected Work** *(renders only if the API returns ≥1 project — currently hidden)*

- Eyebrow: **`Selected work`**
- H2: **`Systems I've shipped`**
- Link: **`Full portfolio`** → `/portfolio`
- Up to 3 project cards (featured first): category icon, first 2 tech tags joined by `·`, title, year badge, summary

> **On the live site today, the home page is: hero → "Building with" strip → footer.** Both content sections are empty and silently omitted. There is no empty state.

### 3.4 `/about`

- Eyebrow: **`About`**
- H1: **`The engineer behind the systems.`**
- `FramedPortrait` (left column)
- Paragraph 1: **`I'm Ayoola — a software engineer who builds at the intersection of software, AI, and writing. Ayoola Platform is my umbrella for everything I make: client systems, personal tools, and experiments at the edge of AI and the web.`**
- Paragraph 2: **`I care about the unglamorous parts — durability: software that survives its authors, scales without drama, and stays kind to the next engineer. I'm interested in how technology can change operations, storytelling, and even policy — not only business metrics.`** (`durability` is emphasised)
- Paragraph 3: **`When I'm not shipping, I'm writing. The blog is where I think out loud about systems, abstraction, and the discipline of finishing.`** (`The blog` links to `/blog`)
- Skill pills (hardcoded `SKILLS`): **`AI integration`** · **`full-stack engineering`** · **`product & systems`** · **`automation`** · **`technical writing`**
- Buttons: **`Work with me`** → `/contact` · **`See the work`** → `/portfolio`

> No experience/employment history, no timeline, no education, no résumé link, no testimonials anywhere on the site.

### 3.5 `/services`

- Eyebrow: **`Services`**
- H1: **`Ways to work together.`**
- Intro: **`Focused engagements for teams that need to ship something durable. Clear scope, senior hands, no theatre.`** + emphasised **`Lagos-based, serving global clients.`**

**Three service cards** (hardcoded `SERVICES`):

| # | Name | Price | Price label | Timeline | Badge |
|---|---|---|---|---|---|
| 1 | **`Custom Web Platforms`** | **`From $1,500`** | `fixed scope` | `2–4 weeks` | — |
| 2 | **`AI-Assisted Features`** | **`From $800`** | `from` | `1–2 weeks` | **`Most popular`** |
| 3 | **`Consulting & Strategy`** | **`Retainer / hourly`** | `flexible` | `ongoing` | — |

1. **Custom Web Platforms** — desc: **`Best for teams drowning in admin work or founders needing a robust MVP to validate their idea.`**
   Bullets: `Full-stack web applications` · `Custom admin dashboard` · `Database & auth setup` · `Deployment & hosting`
   CTA: **`Scope a build`** → `/contact`
2. **AI-Assisted Features** — desc: **`Add intelligence to existing platforms — search, chatbots, auto-summaries, and RAG pipelines.`**
   Bullets: `LLM integration` · `RAG pipelines` · `Vector database setup` · `Custom agents`
   CTA: **`Add AI`** → `/contact`
3. **Consulting & Strategy** — desc: **`Technical direction for non-technical founders — architecture reviews, hiring support, and roadmap planning.`**
   Bullets: `Technical feasibility audit` · `Fractional CTO services` · `Codebase review` · `Team mentorship`
   CTA: **`Let's talk`** → `/contact`

**Process section** — H2: **`How we work`**

| Step | Title | Description |
|---|---|---|
| `01` | **`Discovery`** | **`30-min call. No jargon. Just business problems.`** |
| `02` | **`Proposal`** | **`Fixed-price quote. Clear deliverables. No surprises.`** |
| `03` | **`Build`** | **`Weekly check-ins. Live progress link from day 7.`** |
| `04` | **`Launch`** | **`Deployment, training videos, and full code handoff.`** |

**CTA banner**
- H3: **`Not sure which fits?`**
- Copy: **`Tell me what you're building. I'll tell you honestly whether — and how — I can help.`**
- Button: **`Start a conversation`** → `/contact`

> **Drift vs. `docs/content/services.md`:** the doc specifies a *different* set — headline `Work With Me`, a **`Technical Writing & Documentation`** tier at **`From $300 / piece`** (not on the live page), a **`Schedule Discovery Call`** Calendly/Cal.com CTA (never built), and an availability block (**`Available for 1 new project in November.`**, **`Response Time: Within 24 hours.`**, `hello@ayoola.io`) that the live page also omits. The shipped page replaced the writing tier with `Consulting & Strategy`.

### 3.6 `/contact`

Left column:
- Eyebrow: **`Contact`**
- H1: **`Let's build something durable.`**
- Copy: **`Tell me about the system you're trying to ship. I read every message and reply within two business days.`**
- Email link: **`hello@ayoola.io`** → `mailto:hello@ayoola.io`
- Location: **`Lagos, Nigeria · remote-friendly`**
- Social icon links:
  - GitHub → **`https://github.com/ayoola`**
  - LinkedIn → **`https://linkedin.com/in/ayoola`**
  - ⚠️ **Both are placeholders.** The repo's own git author is `OgunrekunAyoola`, so `github.com/ayoola` is a *different person's* account (it returns HTTP 200 — an existing but unrelated profile). See §7.

Right column — form (`glass` card):
- Field `Name`, placeholder **`Your name`**, required
- Field `Email`, placeholder **`you@company.com`**, required
- Field `Inquiry type` (select, default `consulting`):
  **`Consulting / Strategy`** · **`Engineering / Development`** · **`Speaking / Writing`** · **`Other`**
- Field `What are you building?` (textarea, 4 rows), placeholder **`A few sentences about the system, the timeline, and where you're stuck…`**, required
- Submit: **`Send message`** (→ **`Sending...`** while submitting)
- Success state: **`Message sent.`** / **`Thanks for reaching out — I'll get back to you within two business days.`** / button **`Send another`**

### 3.7 `/portfolio`

- Eyebrow: **`Portfolio`**
- H1: **`Systems, shipped.`**
- Intro: **`A selection of the platforms, tools, and experiments I've designed, built, and kept running.`**
- Projects grouped into three category sections, each rendered only if non-empty. Headings are the raw category key (capitalised) + a mono sub-label:

| Section heading | Sub-label |
|---|---|
| **`systems`** | **`High-value platforms`** |
| **`tools`** | **`Utilities & libraries`** |
| **`experiments`** | **`Prototypes & concepts`** |

- Empty state: **`No projects found.`**
- Error state: **`Failed to load projects. Please try again later.`** ← **what the live site shows today**
- `ProjectCard` renders: category icon, up to 3 tech tags joined by `·`, title, **year badge derived from `createdAt`** (i.e. the DB insert date, not the project's real date), summary, and the footer link **`View case study`**. **Cards have no image** — the visual header is a generated gradient + grid pattern.

### 3.8 `/portfolio/[slug]` — case study

Per-project, from the DB: tech tag pills, H1 title, summary, **`Role`** (+ `project.role`), **`Links`** (**`Live Demo ↗`** → `demoUrl`, **`GitHub ↗`** → `repoUrl`), **`Share`**, then the `PersonaSummary` AI widget, then `project.description` rendered as markdown.

**`PersonaSummary` widget:**
- Label: **`AI summary`**, badge **`tailored`**
- Copy: **`Short on time? Get a summary of this work tailored to your role.`**
- Persona buttons: **`🚀 Founder`** · **`💰 Investor`** · **`⚙️ Engineer`** · **`🏛️ Policymaker`** · **`👶 ELI5`**
- Empty state: **`Select a role above to see a customized summary.`**
- Loading: **`Generating tailored summary...`**
- Result heading: **`For {Persona}`**; attribution: **`Generated by Ayoola AI`**
- Error strings: `I'm currently overloaded with requests. Please give me a moment and try again.` / `I've received too many requests recently. Please wait a moment.` / `I encountered a temporary glitch. Please try asking again in a few seconds.` / `Failed to generate summary. Please try again.`

> ⚠️ **This whole page is hardcoded `bg-black text-white` with `yellow-500` accents** and ignores the design system — see §5.

### 3.9 `/blog`

- Eyebrow: **`Blog`**
- H1: **`Writing.`**
- Intro: **`Notes on building systems, the discipline of shipping, and reading code you didn't write.`**
- `ReadingPathBuilder` — **only renders when `postCount >= 3`**, so it is invisible today
- Empty state: **`No posts published yet. Check back soon!`**
- Error state: **`Failed to load posts. Please try again later.`** ← **what the live site shows today**
- Each row: date (`MMM d`), first tag (or **`Writing`**), title, excerpt, **`{n} min read · {n} likes`**

**`ReadingPathBuilder`:**
- H2: **`Curate Your Learning Path`**
- Copy: **`Tell me what you want to learn, and I'll build a custom reading list from my articles.`**
- Placeholder: **`e.g., I want to master Next.js authentication...`**
- Button: **`Generate Path`** (→ **`Curating...`**)
- Validation error: **`Please enter a specific learning goal (at least 5 characters).`**
- Failure: **`Failed to generate reading path. Please try again.`** (plus the same three overload/rate-limit/glitch strings as above)

**`NewsletterForm`** (used in Footer and on blog posts):
- Heading: **`Newsletter`**
- Copy: **`Get the latest thoughts on tech, policy, and creativity.`**
- Placeholder: **`email@example.com`**
- Button: **`Subscribe`** → **`Subscribing...`** → **`Subscribed ✓`**
- Success: **`Thanks for subscribing!`** · Failure: **`Something went wrong. Please try again.`**

> Note the copy conflict: the Footer wrapper sells **"The systems notebook — Occasional notes on building durable software"**, while the form inside it says **"Get the latest thoughts on tech, policy, and creativity."** Two different newsletter propositions in one card.

### 3.10 `/blog/[slug]` — article

Back link **`All writing`**; eyebrow `{first tag} · {n} min read`; H1 title; author row **`Ayoola Ogunrekun`** with avatar letter **`A`** and the formatted date; `LikeButton` (`♡`/`♥` + count) and `ShareButton`; optional hero image; markdown body; then:

- `AskAyoolaWidget` — H3 **`Ask Ayoola AI`**, copy **`Curious? Ask my digital twin anything about this post!`**, placeholder **`e.g., What's the main takeaway? or How does this apply to me?`**, attribution **`Generated by Ayoola AI`**, failure **`Failed to get an answer. Please try again.`**
- `NewsletterForm`
- Comments — H3 **`Comments ({n})`**; empty state **`No comments yet. Be the first to share your thoughts!`**
- `CommentForm` — H3 **`Leave a Comment`**; fields `Name` (placeholder **`John Doe`**), `Email (not published)` (placeholder **`john@example.com`**), `Comment` (placeholder **`Share your thoughts...`**); button **`Post Comment`** → **`Submitting...`**; success **`Comment posted successfully!`**; error **`Failed to submit comment. Please try again.`**

### 3.11 404 page (`app/not-found.tsx`)

- H2: **`404 - Not Found`**
- Copy: **`Could not find the requested resource.`**
- Button: **`Return Home`** → `/`

### 3.12 Admin (not public-facing)

`/admin/login` — H1 **`Admin Login`**, copy **`Enter your credentials to continue`**, error **`Invalid credentials`**.
Protected nav: **`Dashboard`** · **`Posts`** · **`Projects`** · **`Comments`** · **`Outreach`**; mobile header title **`Admin Panel`**.

### 3.13 Contact methods & social links — consolidated

| Channel | Value | Where | Status |
|---|---|---|---|
| Email | `hello@ayoola.io` | `/contact`, `docs/content/services.md` | ⚠️ `ayoola.io` resolves (`64.29.17.1`) but has **no MX record** — mail is very unlikely to be deliverable |
| GitHub | `https://github.com/ayoola` | `/contact` | ⚠️ Placeholder — resolves to an unrelated account |
| LinkedIn | `https://linkedin.com/in/ayoola` | `/contact` | ⚠️ Placeholder |
| Contact form | `POST /api/contact` | `/contact` | ❌ Backend down → form fails |
| Newsletter | `POST /api/subscribers` | Footer, blog posts | ❌ Backend down → fails |
| Location | `Lagos, Nigeria · remote-friendly` | `/contact` | — |
| RSS | `/feed.xml` | Footer | ✅ Serves (but with `localhost:3000` links and no items) |

**No phone, no Calendly/Cal.com, no X/Twitter, no résumé/CV link anywhere on the site.**

---

## 4. ASSETS

### 4.1 Complete shipped asset inventory

| Path | Size | Used? |
|---|---|---|
| `frontend/src/app/favicon.ico` | 25 KB | ✅ Auto-wired by Next; served as `/favicon.ico?favicon.0b3bf435.ico` at `sizes="256x256"` |
| `frontend/public/file.svg` | 391 B | ❌ **Unused** — `create-next-app` default |
| `frontend/public/globe.svg` | 1.0 KB | ❌ **Unused** — `create-next-app` default |
| `frontend/public/next.svg` | 1.3 KB | ❌ **Unused** — `create-next-app` default |
| `frontend/public/vercel.svg` | 128 B | ❌ **Unused** — `create-next-app` default (and the site is on Netlify) |
| `frontend/public/window.svg` | 385 B | ❌ **Unused** — `create-next-app` default |

**That is the entire asset library: one favicon and five unused boilerplate SVGs.**

### 4.2 Missing assets that the code references

| Referenced path | Referenced from | Live status |
|---|---|---|
| `/ayoola-portrait.jpg` | `FramedPortrait.tsx:28` (default `src`) — used by the Hero and About page | **404** |
| `/og-image.jpg` | `app/layout.tsx` — `openGraph.images` and `twitter.images` | **404** |

- The portrait miss degrades gracefully: `FramedPortrait` catches `onError` and swaps to an abstract silhouette overlaid with the literal text **`// add your portrait`**. **So the hero and About page currently show a placeholder blob with a "todo" comment rendered on it, on the live production site.**
- The OG image miss does not degrade: every social/link preview points at a 404 (and at `localhost` — see §6).

### 4.3 Fonts

- **Inter** and **Playfair Display**, fetched at build time by `next/font/google` and self-hosted. The built `.next/static/media/` contains 12 `.woff2` files, 8.8 KB–83 KB each. No font files are committed to the repo.
- **No monospace webfont is loaded**, despite `font-mono` being used heavily across the UI (eyebrows, chips, badges, footer). Mono text renders in whatever the OS provides.

### 4.4 Videos, résumé/CV

**None.** No video files and no résumé/CV file or link anywhere in the repo.

### 4.5 Large files

| File | Size | Note |
|---|---|---|
| `design/ayoola-platform-hero-directions.html` | **2.1 MB** | Untracked; a self-contained design-exploration page with inlined JS. Not shipped. |
| `frontend/node_modules/` | 546 MB | gitignored |
| `frontend/.next/` | 237 MB | gitignored (stale build from 2026-07-19) |
| `backend/node_modules/` | 112 MB | gitignored |

Repo working directory is **910 MB** total; **nothing oversized is tracked in git** (137 tracked files). `.DS_Store` files are present on disk in the root, `frontend/`, `backend/` and `docs/` but are gitignored.

---

## 5. DESIGN SYSTEM (as it exists)

### 5.1 Tokens — `frontend/src/app/globals.css`

The system is genuinely well-defined. Light is `:root`, dark is `.dark` (class strategy via `next-themes`).

| Token | Light | Dark | Purpose |
|---|---|---|---|
| `--background` | `#fafafa` | `#0a0a0a` | page background |
| `--foreground` | `#171717` | `#ededed` | primary text |
| `--muted` | `#404040` | `#a3a3a3` | secondary text |
| `--accent` | `#b45309` (amber-700) | `#f59e0b` (amber-500) | brand, CTAs, links |
| `--accent-soft` | `rgba(180,83,9,.12)` | `rgba(245,158,11,.14)` | tinted fills |
| `--accent-line` | `rgba(180,83,9,.32)` | `rgba(245,158,11,.34)` | accent borders |
| `--card-bg` | `rgba(255,255,255,.6)` | `rgba(30,30,30,.4)` | glass surfaces |
| `--card-border` | `rgba(0,0,0,.08)` | `rgba(255,255,255,.06)` | borders |
| `--selection-bg` | `rgba(217,119,6,.2)` | `rgba(245,158,11,.3)` | text selection |
| `--chrome` | `rgba(250,250,250,.72)` | `rgba(10,10,10,.72)` | header/footer bg |
| `--glow` | `rgba(217,119,6,.28)` | `rgba(245,158,11,.3)` | ambient glow |
| `--hair` | `rgba(0,0,0,.07)` | `rgba(255,255,255,.08)` | hairline rules |

Both light and dark `--accent` values carry inline comments explaining they were darkened for contrast — contrast was deliberately considered.

Two source-of-truth mismatches: `DESIGN_HANDOFF.md` documents dark `--card-border` as `rgba(255,255,255,.05)` (actual: `.06`), and lists only 8 of the 12 tokens.

### 5.2 Typography

- **Serif:** Playfair Display — all headings, brand mark, some body emphasis
- **Sans:** Inter — body, buttons, nav, form fields
- **Mono:** `font-mono` (**no webfont loaded**) — eyebrows, chips, badges, dates, footer
- Base scale in `@layer base`: `h1` → `text-4xl md:text-5xl lg:text-7xl`; `h2` → `text-3xl md:text-4xl` with `mt-12 mb-6`; `h3` → `text-2xl md:text-3xl` with `mt-8 mb-4`
- **However, almost every real page overrides the base scale with arbitrary `clamp()` values**, e.g. hero `text-[clamp(40px,5.4vw,68px)]`, page H1s `text-[clamp(34px,4.6vw,56px)]`, blog H1 `text-[clamp(32px,4.4vw,48px)]`, section H2s `text-[clamp(28px,3.4vw,40px)]`. The `@layer base` scale is effectively dead for the public pages and only applies to un-classed headings (404, admin, markdown).

### 5.3 Spacing / layout conventions

- Container widths vary by page and are set ad hoc: `1200px` (home, portfolio, services, footer, header), `1100px` (about), `980px` (contact), `920px` (blog list), `720px` (blog post), `max-w-4xl` (case study), `max-w-7xl` (loading).
- Gutters are consistent on the newer pages: `px-5 sm:px-7`.
- **Vertical rhythm is not tokenised.** Values are hand-tuned half-pixel-ish literals: `py-[22px]`, `gap-x-11 gap-y-[18px]`, `mb-[34px]`, `gap-[22px]`, `pt-[7px]`, `mt-11`, `pb-9`. There is no spacing scale.
- Radii are similarly ad hoc: `rounded-[11px]`, `[13px]`, `[18px]`, `rounded-2xl`, `[25px]`, `[26px]`, `[34px]`, plus `rounded-lg`/`rounded-xl` in older components.

### 5.4 Dark / light mode

- Supported via `next-themes`, `attribute="class"`, `defaultTheme="system"`, `enableSystem`, `disableTransitionOnChange`, with `suppressHydrationWarning` on `<html>`.
- Toggle is present in both the public Header and the admin layout.
- **Light-mode parity is broken on several surfaces** — see §5.7.

### 5.5 Component layer (CSS classes in `globals.css`)

`.glass` / `.glass-card` (blurred surface), `.glass-i` (hover lift `-4px` + accent border + glow shadow), `.btn` + `.btn-primary` / `.btn-secondary` / `.btn-ghost`, `.navlink` (sliding underline, `data-active` state), `.field` (form inputs with accent focus ring), `.lk` (inline accent link).

### 5.6 Animations & interactive effects

| Effect | Powered by | Where |
|---|---|---|
| Hero staggered entrance | framer-motion (`fadeUp`, `staggerChildren: 0.1`) | `HeroSection` |
| Scroll-triggered reveal | framer-motion `whileInView`, `viewport={{ once: true, margin: "-100px" }}` | `ScrollReveal` — **home page only** |
| `floaty` / `floatyB` | CSS keyframes, 8s infinite | hero chips, portrait |
| `glowpulse` | CSS keyframes, 7s infinite | hero + about radial glow |
| `blink` | CSS keyframes, 2.4s infinite | hero eyebrow dot |
| `fadeInUp` / `fadeIn` | CSS `@theme` animations | AI widget results, loading state |
| Glass hover lift | CSS transition, `cubic-bezier(.16,1,.3,1)` | `.glass-i` cards |
| Nav underline slide | CSS `::after` right-inset transition | `.navlink` |
| Button hover lift | CSS `translateY(-2px)` + brightness + glow | `.btn-primary` |
| Smooth scroll | `html { scroll-behavior: smooth }` | global |

`prefers-reduced-motion: reduce` is honoured — but **only for the four CSS keyframe classes** (`.anim-floaty`, `.anim-floaty-b`, `.anim-glow`, `.anim-blink`). **The framer-motion animations are not gated**, so reduced-motion users still get the hero stagger and every scroll reveal.

### 5.7 Inconsistencies — the big one

**Two visual systems coexist in the same app.** Pages written in the recent design refresh use tokens; older pages and components still hardcode a dark-only `black / neutral-* / yellow-500` palette. Count of raw non-token colour utilities (`text-white`, `bg-black`, `text-black`, `neutral-###`, `yellow-###`, `gray-###`) per file:

| Occurrences | File | Public? |
|---|---|---|
| 72 | `app/admin/(protected)/outreach/page.tsx` | admin |
| 31 | `components/blog/ReadingPathBuilder.tsx` | ✅ **public** (`/blog`) |
| 20 | `app/(public)/portfolio/[slug]/page.tsx` | ✅ **public** (case studies) |
| 19 | `components/blog/AskAyoolaWidget.tsx` | ✅ **public** (blog posts) |
| 19 | `app/admin/(protected)/comments/page.tsx` | admin |
| 17 | `app/admin/login/page.tsx` | admin |
| 10 | `components/admin/PostForm.tsx` | admin |
| 8 | `components/blog/PostCard.tsx` | dead code |
| 8 | `components/blog/CommentList.tsx` | ✅ **public** (blog posts) |
| 4 | `components/blog/LikeButton.tsx` | ✅ **public** (blog posts) |
| 4 | `app/not-found.tsx` | ✅ **public** (404) |
| 3 each | `ToastContext`, `StatusBadge`, `ui/Button`, admin projects | mixed |
| 1 each | `PersonaSummary`, `Header`, `Footer`, `app/layout`, `services` | mostly benign (`text-white` on amber) |

**Consequences in light mode** (the default for any visitor whose OS is light):
- **`/portfolio/[slug]`** — the entire case study page is `bg-black text-white`. **A visitor in light mode clicks a project and the page turns pure black.** This is the single most jarring break, and it is on the page that matters most for a portfolio.
- **`/blog`** — `ReadingPathBuilder` is a dark `neutral-900` card with a `bg-black` input, sitting on a `#fafafa` page.
- **`/blog/[slug]`** — `AskAyoolaWidget` (dark card, black input), `CommentList` (dark cards, `neutral-300` body text on near-white), `LikeButton` (`bg-neutral-800`).
- **404** — `text-gray-400` body and a `bg-yellow-500 text-black` button that matches no button style in the design system.

**Button styles — four competing systems:**
1. `.btn` / `.btn-primary` / `.btn-secondary` / `.btn-ghost` CSS classes — used by all public marketing pages
2. `ui/Button.tsx` React component with 5 variants — used only by admin pages and the two form components. **Its `primary` variant is `bg-[var(--accent)] text-black`, whereas `.btn-primary` is `bg-[var(--accent)] color:#fff`.** Two different primary buttons, differing in text colour, appear on the same page (e.g. the footer's `Subscribe` vs the header's `Start a project`).
3. Raw inline buttons — `not-found.tsx` (`bg-yellow-500 text-black`), `ReadingPathBuilder` (`bg-yellow-500 text-black`)
4. `PersonaSummary` pill buttons — bespoke `rounded-full` with token colours

Also: the header CTA has to fight the class system with `!important` overrides (`!px-[18px] !py-2.5 !text-sm`).

**Icon libraries:** `lucide-react` and `@heroicons/react` are both used, sometimes adjacently — `PersonaSummary` uses Heroicons while the surrounding `/portfolio/[slug]` page uses Lucide. Two icon design languages, two bundles.

**Prose styling:** `/blog/[slug]` correctly uses `prose dark:prose-invert`. `/portfolio/[slug]` uses `prose prose-invert prose-yellow` — **unconditionally inverted**, consistent with its black background but inconsistent with everything else.

### 5.8 Design explorations in `design/` (untracked, not shipped)

Three artboards from 2026-08-19, plus `canvas.json` with the strategic notes. **These are on a completely different positioning from the live site** and are much closer to the AI-systems direction:

- **A · Evidence Terminal** (`Main.dc.html`) — dark. Eyebrow `human-in-the-loop · SOC 2 · OWASP LLM10`. H1 **`AI agents that survive the audit.`** Sub: `You shipped agents to production. Now you have to prove they're safe. I build the approval gates, rollback, and audit trail that make them pass a compliance review.` CTA `Book an assessment` / `See the work`. Right column is a live audit-trail log mock with a `HUMAN GATE — awaiting approval` row.
  *Note:* `Bet: sell the technical buyer (security / eng lead)... Tradeoff: reads as developer-tool; may feel cold to an exec.`
- **B · Compliance Editorial** (`Editorial.dc.html`) — light, centred. Eyebrow `Agent governance & audit-readiness`. H1 **`Make your AI agents survive the audit.`** Trust row: `OWASP` / `SOC 2` / `SOX` / `HITL`.
  *Note:* `Bet: sell the exec / compliance buyer... Tradeoff: less obviously technical; leans on trust over proof.`
- **C · Control Console** (`Console.dc.html`).
  *Note:* `Bet: show the product. The HITL approval console IS the hero... Tradeoff: commits hardest to a product story you haven't fully built yet.`

All three keep Playfair/Inter/amber but add **JetBrains Mono**, which the shipped app does not load. None of this work has been merged into the app.

---

## 6. SEO, METADATA & SHARING

### 6.1 Global metadata (`app/layout.tsx`)

- `metadataBase`: `process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"`
- Title default: **`Ayoola Ogunrekun`**; template: **`%s | Ayoola Ogunrekun`**
- Description: **`Writer, Software Engineer, Expert, Entrepreneur, Creator`**
- Keywords: `Ayoola Ogunrekun, Software Engineer, Writer, Entrepreneur, Blog, Portfolio`
- `authors` / `creator`: `Ayoola Ogunrekun`
- Open Graph: `type: website`, `locale: en_US`, `siteName`, image `/og-image.jpg` 1200×630, alt `Ayoola Ogunrekun`
- Twitter: `summary_large_image`, same title/description/image
- `robots: { index: true, follow: true }`

### 6.2 Per-page titles & descriptions (as they actually render)

| Route | Rendered `<title>` | Description |
|---|---|---|
| `/` | `Ayoola Ogunrekun` | `Writer, Software Engineer, Expert, Entrepreneur, Creator` |
| `/about` | `About \| Ayoola Ogunrekun` | `Ayoola Ogunrekun — software engineer, writer, and creator building intelligent systems.` |
| `/services` | `Services \| Ayoola Ogunrekun` | `Ways to work with Ayoola — custom web platforms, AI features, and technical consulting.` |
| `/portfolio` | **`Portfolio \| Ayoola Ogunrekun \| Ayoola Ogunrekun`** ⚠️ | `Selected works and case studies.` |
| `/blog` | **`Blog \| Ayoola \| Ayoola Ogunrekun`** ⚠️ | `Thoughts on software engineering, design, and technology.` |
| `/portfolio/[slug]` | `{title} \| Ayoola \| Ayoola Ogunrekun` ⚠️ | project summary |
| `/blog/[slug]` | `{title} \| Ayoola \| Ayoola Ogunrekun` ⚠️ | post excerpt |
| `/contact` | `Ayoola Ogunrekun` ⚠️ | falls back to global |

**Two title bugs, both verified against the live HTML:**
1. **Double/triple suffix.** `/portfolio`, `/blog` and both dynamic routes already include a suffix in their own `title`, and the root `template: "%s | Ayoola Ogunrekun"` appends another. `/about` and `/services` do it correctly.
2. **Brand inconsistency** — some say `Ayoola`, some say `Ayoola Ogunrekun`.
3. **`/contact` exports no metadata at all** (it's a `"use client"` component, so it cannot), so the highest-intent commercial page has a generic title and description.

### 6.3 Open Graph / Twitter — broken in production

Pulled live from `https://ayoolaogunrekunn.netlify.app/`:

```
og:url        http://localhost:3000
og:image      http://localhost:3000/og-image.jpg
twitter:image http://localhost:3000/og-image.jpg
```

**`NEXT_PUBLIC_SITE_URL` is not set in the Netlify build**, so `metadataBase` fell back to localhost. Combined with `og-image.jpg` returning 404 anyway, **every share of this site on LinkedIn, X, Slack or iMessage produces a bare, image-less preview pointing at localhost.** For someone whose funnel is LinkedIn → site, this is the highest-impact defect in the audit.

Blog posts do add richer per-article OG tags (`type: article`, `publishedTime`, `authors`, `tags`, hero image) — correctly implemented, but moot while the backend is down.

### 6.4 Favicon

`frontend/src/app/favicon.ico` (25 KB), auto-detected by Next. Served as `<link rel="icon" href="/favicon.ico?favicon.0b3bf435.ico" sizes="256x256" type="image/x-icon">`. **No `apple-touch-icon`, no PNG variants, no `manifest.json`, no `theme-color`.**

### 6.5 Sitemap

`app/(public)/sitemap.ts` → `/sitemap.xml`, HTTP 200. **Live content is broken:**

```xml
<loc>http://localhost:3000</loc>
<loc>http://localhost:3000/blog</loc>
<loc>http://localhost:3000/portfolio</loc>
<loc>http://localhost:3000/about</loc>
<loc>http://localhost:3000/contact</loc>
```

- Every URL is `localhost:3000` (same `NEXT_PUBLIC_SITE_URL` root cause).
- **`/services` is missing entirely** from the static list.
- Zero post or project entries — the API fetch failed and the code swallows the error.
- `lastmod` is `2026-07-19` for all entries (build time of the last deploy).

### 6.6 robots.txt — **404 in production**

`app/(public)/robots.ts` exists and is correctly written (allow `/`, disallow `/admin/`, sitemap pointer). But **`https://ayoolaogunrekunn.netlify.app/robots.txt` returns HTTP 404 with `content-type: text/html`** — it serves the app's 404 page (which itself carries `<meta name="robots" content="noindex">`).

Notably `/sitemap.xml` and `/feed.xml` from the *same* directory both return 200, so this is specific to `robots.txt`. `robots.ts` and `sitemap.ts` sit inside the `(public)` route group rather than at `app/` root. **I could not determine the exact cause** (Next 16 route-group handling vs. the Netlify adapter) without changing files, which is out of scope for this audit. The observable fact: **the site has no robots.txt and does not advertise its sitemap.**

### 6.7 RSS

`/feed.xml` returns 200 with valid RSS 2.0. Channel title `Ayoola Ogunrekun`, description `Writer, Software Engineer, Expert, Entrepreneur, Creator`, `<link>http://localhost:3000</link>` (same bug). **Zero items** — backend down. No `<link rel="alternate" type="application/rss+xml">` in the document `<head>`, so feed readers can't auto-discover it; it's only reachable via the footer link.

### 6.8 Analytics & tracking

**None.** I grepped the live home page HTML for `gtag`, `googletagmanager`, `plausible`, `analytics`, `posthog`, `hotjar`, `fathom`, `umami` — zero matches, and there is no analytics dependency in `package.json`. **There is no visitor measurement of any kind.** (The backend has an `/api/admin/stats` endpoint, but it only counts posts/projects/comments.)

### 6.9 Structured data

**No JSON-LD anywhere.** No `Person`, `WebSite`, `Article`, `BreadcrumbList` or `ProfessionalService` schema.

---

## 7. HEALTH CHECK

### 7.1 Broken / dead links & endpoints (verified)

| Target | Result | Impact |
|---|---|---|
| `https://ayoola-platform.onrender.com/api/health` | **503** | Old backend, suspended (per `DEPLOY.md`, unpaid invoice) |
| Live `/portfolio` | Renders **`Failed to load projects. Please try again later.`** | **Portfolio shows nothing** |
| Live `/blog` | Renders **`Failed to load posts. Please try again later.`** | **Blog shows nothing** |
| Live `/` | Featured Thoughts + Selected Work sections **silently omitted** | Home is hero + tech strip + footer |
| `/og-image.jpg` | **404** | Broken social previews |
| `/ayoola-portrait.jpg` | **404** | Hero + About render the `// add your portrait` placeholder |
| `/robots.txt` | **404** | No crawler directives |
| `https://github.com/ayoola` | 200, but **not the user's account** (git author is `OgunrekunAyoola`) | **Sends visitors to a stranger's profile** |
| `https://linkedin.com/in/ayoola` | 200 (LinkedIn auth wall; almost certainly not the user's profile) | Placeholder |
| `mailto:hello@ayoola.io` | Domain resolves, **no MX record** | **The only email on the site is likely undeliverable** |
| `https://ayoola-platform.netlify.app` | **404** — dead site still in the backend CORS allowlist (`app.ts:36`) | Stale config |

Internal `Link` hrefs all resolve to real routes — no broken internal navigation. `/services`, `/about`, `/contact` all return 200.

### 7.2 Placeholder / lorem ipsum text

No lorem ipsum. But there are real placeholders shipping to production:

- **`// add your portrait`** — literally rendered on the hero and About page today (`FramedPortrait.tsx:76`).
- **`99.98%` uptime** in the hero — a hardcoded, unsourced, unattributed metric.
- **`PostgreSQL`** in the "Building with" strip — the platform uses MongoDB exclusively. Also `AWS` is absent despite being central to the target positioning.
- **`github.com/ayoola` / `linkedin.com/in/ayoola`** — placeholder social URLs.
- **`hello@ayoola.io`** — placeholder-grade email on a domain with no mail configured.
- `docs/task.md:328`: `Add a "My Journey as a Developer" section with placeholder text for now.` — never built.
- `docs/task-phase3.md:129`: `Ensure empty states are graceful (e.g. "Coming soon" when category has no projects).` — unchecked; the portfolio just hides empty categories.

### 7.3 TODO / FIXME comments

Only one in shipped source:
- `backend/src/routes/webhooks.ts:18` — `// Future TODO: Store email in database or notify admin`

No `FIXME`, `HACK` or `XXX` anywhere.

### 7.4 Dead code, unused components, disabled code

- **`components/blog/PostCard.tsx` — completely unused.** Zero importers. A full 100-line card component with image handling, tags, dates and like counts. `/blog` renders an inline list row instead. `DESIGN_HANDOFF.md` §4.5 still lists it as a file to upgrade.
- **`backend/src/app.ts:5`** — `import mongoSanitize from "express-mongo-sanitize"` with the only usage commented out on line 29. Dead import *and* a disabled security control.
- **`lib/motion.ts`** — exports `fadeUp`, `fadeIn`, `staggerContainer`, `slideInLeft`, `slideInRight`. **Only `fadeUp` is imported anywhere** (`HeroSection`, `ScrollReveal`). The other four are unused.
- **`clsx` and `tailwind-merge`** — installed, zero imports.
- **`frontend/public/*.svg`** — all five `create-next-app` defaults unused.
- **`render.yaml`** — stale; the backend no longer runs on Render.
- **`README.md` is materially wrong:**
  - `**Auth**: Supabase (for Admin authentication)` — **there is no Supabase.** Auth is bcrypt + JWT against env vars.
  - Links to `master-spec.md` at the repo root; the file is actually at `docs/master-spec.md`. **Broken link.**
  - No local-setup instructions.
- **`frontend/README.md`** — untouched `create-next-app` boilerplate, references Vercel.
- **`frontend/DESIGN_HANDOFF.md`** — a genuinely good brief, but it describes a round of work that was **only partially completed**. It explicitly flags the missing OG image, the missing portrait, and the `neutral`/`yellow` theming debt in `PersonaSummary`, `page.tsx` and blog components. `PersonaSummary` and `page.tsx` *were* fixed; `ReadingPathBuilder`, `AskAyoolaWidget`, `CommentList`, `LikeButton`, `not-found.tsx` and `/portfolio/[slug]` **were not**. Its §4.1 also still describes home-page content as "hard-coded placeholders" — that's now stale, the home page is API-driven.
- No commented-out JSX blocks found.

### 7.5 Mobile responsiveness (from reading the code)

**Handled well:**
- Header collapses to a hamburger at `md`, with `aria-expanded` / `aria-controls` and auto-close on nav.
- Grids use `repeat(auto-fit, minmax(…, 1fr))` throughout — they reflow naturally.
- Hero reorders correctly (`order-2 lg:order-1` for copy, `order-1 lg:order-2` for portrait) and centres text on mobile.
- Hero chips are `hidden lg:flex` — no small-screen clutter.
- Fluid `clamp()` type scales everywhere.
- `body { overflow-x: hidden }` guards against horizontal scroll.
- Forms stack (`flex-col sm:flex-row`).

**Likely problems:**
1. **Section header rows use `flex items-end justify-between` with no wrap** (home page, both section headers). On narrow viewports the `All writing` / `Full portfolio` pill is `shrink-0` next to a `clamp(28px,3.4vw,40px)` heading — the heading will compress hard. Not a break, but cramped.
2. **`/portfolio/[slug]` metadata row** — `flex flex-wrap gap-12` with `gap-12` (48px) is a very large mobile gap; Role/Links/Share will stack with big dead space.
3. **`/portfolio/[slug]` H1 at `text-7xl` on `md`+** with `tracking-tight` — long project titles will be tight on tablets.
4. **Mobile nav is `absolute w-full`** inside a `sticky` header. It overlays content rather than pushing it — fine, but it has no scroll lock, so the page scrolls behind the open menu.
5. **The hero portrait reserves `min-h-[420px]`** on mobile for what is currently a placeholder blob — a lot of empty vertical space above the fold on phones.
6. **`ReadingPathBuilder` / `AskAyoolaWidget`** use `bg-black` inputs inside cards on a light page — visually broken at every breakpoint, not just mobile.

### 7.6 Accessibility

**Good:**
- `lang="en"` on `<html>`.
- `.btn:focus-visible` gives a 2px accent outline with offset; `.field:focus` gives an accent ring; `ThemeToggle` has `focus-visible:ring`.
- `aria-label` on the theme toggle, menu toggle, share button, like button, and both social icon links.
- `aria-current="page"` on active nav links (desktop and mobile).
- `sr-only` text on the theme toggle.
- Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`, `<article>`, `<section>`, `<time dateTime=…>`.
- Every form input has a real `<label htmlFor>`.
- `prefers-reduced-motion` respected for CSS animations.
- Accent colours were explicitly chosen for contrast (per the comments in `globals.css`).

**Problems:**
1. **Heading hierarchy is broken on the 404 page** — it starts at `<h2>` (`404 - Not Found`) with no `<h1>`.
2. **Heading hierarchy on `/blog/[slug]`** — `<h1>` title, then `<h3>` for "Ask Ayoola AI", "Comments", "Leave a Comment". **No `<h2>` anywhere** — levels are skipped.
3. **`ReadingPathBuilder` renders an `<h2>` on `/blog`** ("Curate Your Learning Path") that sits above the page's own content but below the `<h1>` — acceptable, but it also renders `<h3>` for each result item under it, which is fine. The `/blog` list itself uses `<span>` for post titles, not headings — **so the blog index has no per-post heading structure at all**, hurting both a11y and SEO.
4. **Alt text:**
   - `FramedPortrait` has a proper default `alt="Ayoola Ogunrekun"` ✅
   - Blog hero image uses `alt={post.title}` ✅ (but via a raw `<img>` with an eslint-disable, not `next/image` — no optimisation, no dimensions, **layout shift risk**)
   - `PostCard` (dead) same pattern
   - Decorative SVG icons are largely unlabelled — mostly fine since they're adjacent to text, but the third hero chip is a **Terminal icon with no text and no label** — announced as nothing.
5. **Contrast risks:**
   - `text-[var(--muted)]/80` and `placeholder-[var(--muted)]/50` in `PostCard` / `NewsletterForm` — compounding opacity on an already-muted token will fall below 4.5:1.
   - `text-gray-400` on the 404 page against `#fafafa` in light mode — **fails AA**.
   - `.field::placeholder` is `var(--muted)` at `opacity: 0.7` — borderline.
   - `font-serif font-bold text-5xl text-[var(--foreground)]/15` for the process step numbers on `/services` — intentionally decorative, but the numbers are the only thing distinguishing the steps.
   - `selection:text-yellow-200` on `<body>` against `--selection-bg` — very low contrast on selected text.
   - `.btn-primary` is `#fff` on `--accent` `#b45309` in light mode (≈4.9:1, passes) but `#fff` on `#f59e0b` in dark mode (**≈2.1:1, fails badly**). Meanwhile `ui/Button`'s primary uses `text-black` on the same accent — which passes in dark and fails in light. **Neither button is correct in both themes.**
6. **`LikeButton` has no `aria-pressed`** and no way to un-like; it can be clicked repeatedly and increments every time (no session guard — the code comments acknowledge this).
7. **Mobile menu has no focus trap and no Escape-to-close.**
8. **Toasts** render in a `fixed` container with no `role="status"` / `aria-live` — screen readers won't announce success or error messages.
9. **`suppressHydrationWarning` on `<time>`** elements masks a real locale mismatch between server and client rendering.

### 7.7 Half-finished / abandoned

| Thing | State |
|---|---|
| **The backend** | Down. Two-thirds of the site's content is unreachable. `DEPLOY.md` documents the Koyeb migration but **never records the resulting URL**, and `render.yaml` still describes the dead Render deployment. |
| **The `design/` folder** | Three strategic hero directions from 2026-08-19 exploring an **"AI agents that survive the audit"** positioning — untracked, unmerged, and completely disconnected from the shipped site. This is the most recent design thinking in the repo and none of it has landed. |
| **`DESIGN_HANDOFF.md`** | A partially-executed brief. Roughly half the theming debt it lists was fixed; the rest is still open. |
| **`docs/` phase specs** | `master-spec.md` + phases 2/3/4 and matching `task*.md` checklists, with unchecked boxes. `docs/content/services.md` has drifted from the shipped `/services` page (a whole service tier differs). |
| **Outreach system** | A full DB model, API, admin UI, Resend integration and `docs/outreach-templates.md` — a substantial CRM feature built into a personal portfolio. `docs/outreach-tracker.csv` is 259 bytes. Unclear whether it was ever used. |
| **AI features** | Three user-facing AI widgets (`AskAyoolaWidget`, `ReadingPathBuilder`, `PersonaSummary`) that depend on `AI_PROVIDER_API_KEY`. `app.ts` logs `AI Service: Disabled (Missing API Key)` when unset. Two of the three are also the worst-themed components on the site. Note the backend references `generativelanguage.googleapis.com` (Google Gemini) while `.env.example` suggests an OpenAI-compatible endpoint. |
| **Tests** | 6 backend jest suites + 5 frontend component tests. `frontend/src/lib/sanity.test.ts` is a stub asserting `expect(true).toBe(true)`. No test covers a page, a route, or the API client. No CI runs any of them. |
| **`frontend/tsconfig.tsbuildinfo`** | Present on disk from a stale build. |
| **Stale build artefacts** | `frontend/.next/` is 237 MB from 2026-07-19. |

### 7.8 Security notes (observed, not exploited)

- **`backend/.env` was committed to git history** (`87e494a`) and later untracked (`9ba77b5`). The values remain recoverable from history. Any `MONGODB_URI`, `ADMIN_JWT_SECRET`, `ADMIN_PASSWORD_HASH` or API key that was in that file should be rotated.
- **NoSQL-injection sanitisation is disabled** (`app.ts:29`).
- **`config/env.ts` ships insecure fallbacks**: `ADMIN_JWT_SECRET` defaults to the literal string `"secret"` and `ADMIN_EMAIL` to `"admin@example.com"`. If the env var is ever missing in production, the JWT signing key is `"secret"`.
- **CORS allows any `*.netlify.app` origin** plus any `192.168.*` / `172.*` / `10.*` origin — the private-network allowance is dev convenience left enabled in production code.
- **Admin auth is client-side only** — `admin/(protected)/layout.tsx` checks `localStorage` and returns `null`. The route is not protected by middleware; the JWT in `localStorage` is XSS-readable. (The API itself does verify the token, so this is a UI-gating weakness, not an open door.)

---

## 8. SUMMARY

The engineering here is better than the site it produces. The design system in `globals.css` is thoughtful — twelve well-named tokens, a real light/dark implementation, contrast decisions documented in comments, a coherent glass-and-amber surface language, and motion that respects `prefers-reduced-motion`. The Header, Footer, hero, About, Services and Contact pages are genuinely well-built and read as one designed thing. The stack is current (Next 16, React 19, Tailwind 4, React Compiler on) with no meaningful dependency rot, and the backend is a competent Express/Mongo API with helmet, rate limiting, JWT auth, RSS, sitemap and a working admin CMS. Someone who knows what they're doing built this.

What's messy is that **it was refreshed halfway and stopped.** Two visual systems coexist: the tokenised one, and an older dark-only `black/neutral/yellow-500` one that still governs `/portfolio/[slug]` — meaning a light-mode visitor who clicks any project lands on a pure-black page — plus the two AI widgets on the blog, the comment list, the like button and the 404. There are four competing button implementations whose two "primary" variants disagree on text colour, and neither passes contrast in both themes. Two icon libraries. A base heading scale that every real page overrides with bespoke `clamp()` values, and no spacing scale at all. `DESIGN_HANDOFF.md` names most of this debt precisely and was only half-executed.

What's fragmented is more serious than the design. **The site is three independently-hosted pieces and one of them is off**, so the frontend is live and pretty while the portfolio says "Failed to load projects" and the blog says "Failed to load posts." Every project and post lives only in a MongoDB Atlas instance — not in the repo, with no seed data, no export, no markdown fallback — so the entire body of work is one hosting lapse away from invisible, and it is invisible right now. `DEPLOY.md` documents the Koyeb migration but never records the resulting URL; `render.yaml` still describes the dead deployment; the `README` claims Supabase auth that doesn't exist and links to a spec file at the wrong path. On top of that, `NEXT_PUBLIC_SITE_URL` was never set on Netlify, so every Open Graph tag and every sitemap URL in production points at `http://localhost:3000`, `og-image.jpg` and `ayoola-portrait.jpg` both 404 (the hero currently renders a placeholder with the text `// add your portrait` on it), `robots.txt` returns the 404 page, there's no analytics of any kind, and the only contact email sits on a domain with no MX record while both social links point somewhere that isn't the user.

And the positioning has already moved on without the code. The live site sells a generalist — "Writer, Software Engineer, Expert, Entrepreneur, Creator" — with a tech strip that lists PostgreSQL (the app runs on MongoDB) and never mentions AWS. Meanwhile the untracked `design/` folder holds three dated, annotated hero directions built around "AI agents that survive the audit," HITL approval gates, SOC 2 and OWASP LLM10 — far closer to where the user says they're going, and entirely unmerged. The strategy exists in the repo; it just isn't shipping.

---

*Audit performed read-only. No files were created or modified other than this report.*
