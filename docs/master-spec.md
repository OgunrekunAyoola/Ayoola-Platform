# Master Spec – Ayoola Platform (Blog + Portfolio + Brand)

Author: Ayoola Ogunrekun  
Version: 0.1 (MVP, 5 days target)  
Stack: Next.js (app router), Node.js API, MongoDB (Atlas), Supabase (auth), Monorepo

---

## 1. Product Vision

### 1.1 Overall

Create a unified web platform where:

- The **blog** showcases Ayoola as a serious writer and thinker across tech, policy, creativity, and life.
- The **portfolio** demonstrates technical depth through case studies and a transparent dev journey.
- The **brand/agency** side positions Ayoola as an expert consultant, writer, and creator to attract high‑quality clients, partners, and investors.

Public visitors should feel like they are entering the world of a premium expert, not just a random dev blog.

---

## 2. Information Architecture

Single Next.js app with these main areas:

- `/` – Brand home (expert positioning).
- `/blog` – Blog index.
- `/blog/[slug]` – Blog post.
- `/portfolio` – Portfolio overview.
- `/portfolio/[slug]` – Project / case study detail.
- `/services` – Services/offerings.
- `/about` – About Ayoola (expert narrative).
- `/contact` – Contact form.
- `/admin/*` – Admin interface (auth‑protected, Ayoola only).

Later:

- `/rss.xml` – RSS feed for blog.
- Optional gated case‑study routes like `/portfolio/[slug]/full` that require email.

---

## 3. Brand & Design System

### 3.1 Identity

- Primary name: **Ayoola Ogunrekun**.
- Roles to highlight: Writer, Software Engineer, Expert, Entrepreneur, Creator.
- Future: A named “agency” can be introduced later, but the core still revolves around Ayoola’s expertise.

### 3.2 Visual Direction

- Palette:
  - Background: near black / very dark gray.
  - Accent: **sunset yellow** as primary highlight.
  - Neutral: white/gray for text.
- Style:
  - Dark mode first.
  - Bold minimalism; big typography; lots of spacing.
  - Mobile‑first layouts.
- Components:
  - Global header with logo (placeholder), name, navigation.
  - Reusable button styles (primary yellow, secondary outline).
  - Card components for posts, projects, and case studies.
  - Typography scale for headings, body, captions.

---

## 4. Users and Access Model

### 4.1 Public Visitors

- No account / login required to:
  - Browse blog posts.
  - Browse public portfolio items.
  - Browse brand pages (home, services, about).
- Email‑gated actions:
  - Comment on a blog post → requires name + email.
  - Like a post → ideally tied to email (or anonymous first; can evolve).
  - View certain deep case‑study details → requires email.
- All captured emails feed into a single **Subscriber** list used for newsletters and higher‑touch outreach.

### 4.2 Admin (Ayoola)

- Single admin user (for now).
- Uses Supabase auth:
  - Admin sign‑in with email/password via Supabase.
  - Public signup disabled or effectively ignored.
- Admin can:
  - Create/edit/delete blog posts.
  - Create/edit/delete portfolio projects and case studies.
  - Approve/delete comments.
  - Mark content as public vs email‑gated.

---

## 5. Core Features (MVP)

### 5.1 Blog

**Goals**

- Showcase Ayoola’s voice and thinking.
- Build audience and funnel into consulting/newsletter.

**MVP Features**

- Blog index at `/blog`:
  - List of posts with title, date, tags, short excerpt.
  - Pagination or “load more”.
- Post page at `/blog/[slug]`:
  - Render rich text / markdown.
  - Show hero image (optional).
  - Show reading time, published date, tags.
  - Comment list + comment form:
    - Fields: name, email, comment.
    - Email captured to `Subscriber` table.
    - Simple moderation flag (`isApproved`) so spam can be filtered.
  - Like button:
    - Increments visible like count.
    - First version can be “dumb” (one click = +1) and improved later.
- Draft → Publish workflow:
  - Posts have `status` (`draft`, `published`).
  - Only `published` appears on public pages.
- Newsletter:
  - Global email capture component in layout and/or sidebar.
  - Store signups in `Subscriber` with `source = 'newsletter_form'`.
- RSS:
  - `rss.xml` generated from published posts (later in the 5‑day window if possible).

### 5.2 Portfolio

**Goals**

- Show real work and journey in a narrative way.
- Make it easy for serious people to understand your sophistication.

**MVP Features**

- `/portfolio`:
  - “My Journey as a Developer” section (timeline text).
  - Grid/list of at least 3 projects.
- `/portfolio/[slug]`:
  - Detailed case‑study style page:
    - Title, summary.
    - Sections: Problem, Context, Solution, Results, Learnings.
    - Tech stack tags.
    - Links to live demo / repo (where exists).
- Intro video:
  - Simple embed of a video (YouTube/Vimeo) on `/portfolio` or `/about`.
- Resume:
  - Downloadable PDF link.
  - Summary on page.

### 5.3 Brand / Agency

**Goals**

- Position Ayoola as a high‑value consultant and partner.
- Speak to policymakers, founders, investors, etc.

**MVP Features**

- `/` (Home):
  - Hero with name, roles, one sharp line about what you do.
  - Clear CTA: “Work with Ayoola” / “Request a consultation”.
  - Highlights: 2–3 featured posts + 2–3 featured projects.
  - Short credibility section.
- `/services`:
  - High‑level offerings:
    - Consulting (strategy, product, tech).
    - Writing (thought leadership, ghostwriting).
    - Engineering (prototypes, UX/tech architecture).
  - Each with short description and potential outcomes.
- `/about`:
  - Narrative of your journey, philosophy, and how you work.
- `/contact`:
  - Contact form (name, email, message, optional “type of work”).
  - Professional email address visible.
  - Form submissions stored in DB and/or emailed.

---

## 6. Data Models (First Cut)

These are conceptual; actual schema may differ slightly in code but should preserve fields.

### 6.1 User

- `id`: string (from Supabase auth).
- `email`: string.
- `name`: string (optional).
- `role`: enum (`admin`, later maybe `reader`).
- `createdAt`: Date.
- `updatedAt`: Date.

### 6.2 Post

- `id`: string (Mongo ObjectId).
- `slug`: string (unique).
- `title`: string.
- `excerpt`: string.
- `content`: string (markdown or rich text).
- `tags`: string[].
- `status`: enum (`draft`, `published`).
- `publishedAt`: Date (nullable).
- `heroImage`: string (URL, optional).
- `readingTime`: number (minutes).
- `likeCount`: number (default 0).
- `commentCount`: number (default 0).
- `createdAt`: Date.
- `updatedAt`: Date.

### 6.3 Comment

- `id`: string.
- `postId`: string (ref Post).
- `authorName`: string.
- `authorEmail`: string.
- `body`: string.
- `createdAt`: Date.
- `isApproved`: boolean (default false).

### 6.4 Subscriber

- `id`: string.
- `email`: string (unique).
- `source`: enum (`comment`, `like`, `gated_case_study`, `newsletter_form`).
- `createdAt`: Date.

### 6.5 Project

- `id`: string.
- `slug`: string (unique).
- `title`: string.
- `summary`: string.
- `description`: string (rich text/markdown).
- `techStack`: string[].
- `role`: string (e.g. “Lead Engineer”, “Solo Builder”).
- `links`: {
  - `demoUrl`?: string;
  - `repoUrl`?: string;
    }
- `isFeatured`: boolean.
- `visibility`: enum (`public`, `email_gated`).
- `createdAt`: Date.
- `updatedAt`: Date.

### 6.6 CaseStudy (optional, can be merged into Project)

If separate:

- `projectId`: string (ref Project).
- `problem`: string.
- `context`: string.
- `solution`: string.
- `results`: string.
- `impact`: string.
- `pdfUrl`?: string.

---

## 7. Routes and Pages

### 7.1 Public Pages (Next.js)

- `GET /`
- `GET /blog`
- `GET /blog/[slug]`
- `GET /portfolio`
- `GET /portfolio/[slug]`
- `GET /services`
- `GET /about`
- `GET /contact`
- `GET /rss.xml` (static, generated).

### 7.2 Public API Endpoints (Node API)

Prefix: `/api` (can be proxied through Next or separate server).

Blog:

- `GET /api/posts` – list published posts (with pagination).
- `GET /api/posts/:slug` – get single published post.
- `POST /api/posts/:id/like` – increment like count (no auth).
- `GET /api/posts/:id/comments` – list approved comments.
- `POST /api/posts/:id/comments` – create comment, capture email → Subscriber.

Portfolio:

- `GET /api/projects` – list projects (respect `visibility`).
- `GET /api/projects/:slug` – get single project.
- Later: `POST /api/projects/:slug/unlock` – capture email for gated content (optional in MVP).

Subscribers:

- `POST /api/subscribers` – add email with `source`.

Contact:

- `POST /api/contact` – submit contact form (store + maybe send email).

### 7.3 Admin API Endpoints (Auth Required)

Prefix: `/api/admin` (protected via Supabase JWT).

Posts:

- `POST /api/admin/posts` – create post.
- `PUT /api/admin/posts/:id` – update post.
- `DELETE /api/admin/posts/:id` – delete post.

Projects:

- `POST /api/admin/projects` – create project.
- `PUT /api/admin/projects/:id` – update project.
- `DELETE /api/admin/projects/:id` – delete project.

Comments:

- `GET /api/admin/comments` – list pending comments.
- `PUT /api/admin/comments/:id/approve` – approve.
- `DELETE /api/admin/comments/:id` – remove.

---

## 8. Auth Strategy (Supabase)

- Use Supabase for **admin auth only** initially.
- Public users:
  - No Supabase accounts needed.
  - Email captured as plain Subscriber entries.
- Admin login:
  - Supabase project with email/password; only Ayoola’s email is allowed as admin.
  - RLS / access control configured so only admin user can access admin tables and functions (future work).

Admin in frontend:

- `/admin/login` – simple Supabase email/password sign‑in screen.
- Once logged in, admin dashboard (Next.js pages) uses Supabase client to get JWT and attaches it in `Authorization: Bearer <token>` to Node admin API.

---

## 9. Architecture & Tech Decisions

- Monorepo:
  - `frontend/` – Next.js app.
  - `backend/` – Node API + Mongo models.
  - `docs/` – specs, design, etc.
- Frontend:
  - Next.js (App Router) for SEO, layouts, and routing.
  - Styling: Tailwind CSS or similar utility‑first system.
  - Data fetching: fetch API or lightweight client wrapper.
- Backend:
  - Node.js with Express (or similar) plus Mongoose/Mongo driver.
  - Deployed on Render or similar service.
- Database:
  - MongoDB Atlas cluster.
- Supabase:
  - Cloud project with free tier.
- Deployment:
  - Next.js app on Vercel/Netlify/Render (chosen later).
  - Domain hooked to frontend; backend under API URL (e.g. `api.yourdomain.com` or Render URL).

---

## 10. MVP Timeline (5 Days)

### Day 1

- Finalize spec and repo structure (monorepo).
- Set up Next.js app and basic pages/routes.
- Set up Node backend + Mongo connection + health endpoint.

### Day 2

- Implement basic Post and Project models + public APIs.
- Implement `/blog`, `/blog/[slug]`, `/portfolio`, `/portfolio/[slug]` with real data.

### Day 3

- Add comments, likes, and Subscriber model + endpoints.
- Add global newsletter signup component.

### Day 4

- Implement admin auth with Supabase + admin CRUD screens for posts/projects.
- Wire up contact form and services/about pages.

### Day 5

- Polish UI: typography, colors, responsiveness, animations.
- Implement basic SEO (meta tags, social images, sitemaps).
- Optional: RSS feed and any small refinements.

---

## 11. AI Usage Rules (Trae / Other Tools)

- This `master-spec.md` is the single source of truth for:
  - Routes and their purpose.
  - Data models and field names.
  - Public vs admin vs email‑gated behavior.
- AI **can**:
  - Generate boilerplate code, components, pages, and API handlers that follow this spec.
  - Propose refactors and performance improvements.
- AI **must not**:
  - Change API shapes, route paths, or core data models without explicit human approval and an update to this spec.
- For each feature:
  - Ayoola writes the intent and expected behavior first.
  - AI generates code.
  - Ayoola reviews and adjusts copy/design manually.

---
