tasks.md (full, updated with custom admin auth)
text

# tasks.md – From Spec to MVP (Trae-Oriented)

This file defines concrete tasks and prompts for Trae (Builder/SOLO/IDE) to implement the platform defined in `docs/master-spec.md`.

Always start major sessions in Trae by pasting `master-spec.md` + this `tasks.md` and saying:

> “You must follow `docs/master-spec.md` exactly. Don’t change routes, models, or behaviors without asking me. Use `docs/tasks.md` as the task list.”

---

## Phase 0 – Repo + Monorepo Setup

### Task 0.1 – Create monorepo structure

**Terminal (you):**

```bash
mkdir ayoola-platform
cd ayoola-platform
mkdir frontend backend docs
git init
echo "node_modules
.env
.env.local
.next
dist
.out
" > .gitignore
Trae prompt:

In this repo, we have frontend/, backend/, and docs/.
Create a basic README.md that explains the project at a high level, referencing docs/master-spec.md as the source of truth.
Don’t add any implementation details yet, just purpose, stack, and structure.

Task 0.2 – Copy specs
You:

Add docs/master-spec.md (from our spec).

Add this docs/tasks.md.

Phase 1 – Frontend Skeleton (Next.js + App Router)
Task 1.1 – Create Next.js app
Terminal (you):

bash
cd frontend
npx create-next-app@latest . --typescript
# Prompts:
# - App Router: Yes
# - Tailwind: Yes
# - ESLint: Yes
# - Src dir: Yes
# - Import alias: Yes (@/*)
npm install
Task 1.2 – Clean default boilerplate
Trae prompt:

We are building the app described in docs/master-spec.md.
In frontend, remove default example pages/components from create-next-app and Tailwind boilerplate.
Create a minimal starting structure using the Next.js App Router:

src/app/layout.tsx – global layout with placeholder header/footer.

src/app/page.tsx – Home page wired as /.

src/app/blog/page.tsx – Blog index placeholder.

src/app/portfolio/page.tsx – Portfolio index placeholder.

src/app/services/page.tsx – Services placeholder.

src/app/about/page.tsx – About placeholder.

src/app/contact/page.tsx – Contact placeholder.
Implement them with minimal JSX and Tailwind classes (dark background, yellow accent) but NO data fetching or business logic yet.

Task 1.3 – Layout and design primitives
Trae prompt:

In frontend, implement a basic design system matching docs/master-spec.md:

In src/app/layout.tsx, set up a dark background, sunset yellow accent, and responsive container.

Create src/components/layout/Header.tsx and Footer.tsx:

Header: site name “Ayoola Ogunrekun”, nav links to /, /blog, /portfolio, /services, /about, /contact.

Footer: copyright, email placeholder, and a small newsletter email input (non-functional for now).

Create a reusable Button component in src/components/ui/Button.tsx with primary and secondary variants.
Don’t add any data fetching; focus only on structure and styling.

Phase 2 – Backend Skeleton (Node + Express + Mongo)
Task 2.1 – Node project init
Terminal (you):

bash
cd ../backend
npm init -y
npm install express cors dotenv mongoose jsonwebtoken bcrypt
npm install -D typescript ts-node-dev @types/node @types/express @types/jsonwebtoken @types/bcrypt
npx tsc --init
Task 2.2 – Base server structure
Trae prompt:

In backend, set up a TypeScript Express server consistent with docs/master-spec.md:

src/server.ts – create an Express app with JSON parsing and CORS.

src/config/env.ts – load .env using dotenv and export typed config (PORT, MONGODB_URI, DB_NAME, ADMIN_EMAIL, ADMIN_PASSWORD_HASH, ADMIN_JWT_SECRET).

src/config/db.ts – connect to MongoDB Atlas using Mongoose and log connection success/failure.

src/routes/health.ts – GET /api/health → { status: 'ok' }.
Wire everything in server.ts and start the server on PORT (default 4000).
Add npm scripts for dev (ts-node-dev) and build/start.

Terminal (you):

bash
echo "PORT=4000
MONGODB_URI=your-atlas-uri
DB_NAME=ayoola_platform
ADMIN_EMAIL=your-admin-email@example.com
ADMIN_PASSWORD_HASH=
ADMIN_JWT_SECRET=super-long-random-secret
" > .env

npm run dev
# Check http://localhost:4000/api/health
Phase 3 – Data Models and Public APIs
Task 3.1 – Define Mongoose models
Trae prompt:

In backend, implement Mongoose models based on docs/master-spec.md:

src/models/Post.ts

src/models/Comment.ts

src/models/Subscriber.ts

src/models/Project.ts
Optionally src/models/ContactMessage.ts for contact form.
Use the fields and types exactly as defined in section 6 of the spec.
Add timestamps where appropriate.
Don’t implement business logic yet, just schemas and exports.

Task 3.2 – Public blog API endpoints
Trae prompt:

In backend, implement public blog API routes according to docs/master-spec.md:

Create src/routes/posts.ts with an Express router.

Endpoints:

GET /api/posts – list published posts with pagination (query params page, limit), sorted by publishedAt desc. Only status = 'published'.

GET /api/posts/:slug – return a single published post by slug, or 404 if not found or not published.

POST /api/posts/:id/like – increment post’s likeCount by 1 and return updated count. No auth.
Wire this router in server.ts. Implement basic error handling and JSON responses.

Task 3.3 – Public portfolio API endpoints
Trae prompt:

In backend, implement public project API routes per docs/master-spec.md:

Create src/routes/projects.ts.

Endpoints:

GET /api/projects – list projects where visibility = 'public', sorted by createdAt desc.

GET /api/projects/:slug – return a single project by slug where visibility = 'public' or email_gated (for now still return full data).
Wire the router in server.ts.

Task 3.4 – Subscriber and contact endpoints
Trae prompt:

Implement basic Subscriber + contact endpoints:

src/routes/subscribers.ts:

POST /api/subscribers – body: { email, source }, upsert by email (if email exists, update source list or keep first); return subscriber.

src/routes/contact.ts:

POST /api/contact – body: { name, email, message, typeOfWork? }.

Store in a ContactMessage Mongoose model in src/models/ContactMessage.ts.
Wire these routers in server.ts.

Phase 4 – Connect Frontend to Public APIs
Task 4.1 – API client helpers (frontend)
Trae prompt:

In frontend, create a minimal API client layer:

src/lib/api-client.ts:

Base URL (env‑driven, e.g. NEXT_PUBLIC_API_URL).

Functions:

fetchPosts({ page, limit }) → posts list from /api/posts.

fetchPost(slug) → single post from /api/posts/:slug.

likePost(id) → POST /api/posts/:id/like.

fetchProjects() and fetchProject(slug).

subscribe(email, source).

submitContact(formData).
Use fetch and handle JSON + basic errors.

Task 4.2 – Blog index page
Trae prompt:

Implement the /blog page according to docs/master-spec.md:

In src/app/blog/page.tsx, server component:

Fetch posts via the backend API.

Render a grid/list of posts showing title, date, excerpt, tags, and like count.

Create src/components/blog/PostCard.tsx as a reusable card component using the design system.
Keep layout minimal but visually aligned with the dark/yellow style.

Task 4.3 – Blog post page
Trae prompt:

Implement the dynamic blog post page /blog/[slug]:

Create src/app/blog/[slug]/page.tsx.

Use server‑side data fetching to get the post from /api/posts/:slug.

Render:

Title, date, tags, reading time, hero image if present.

Body rendered as markdown (use react-markdown or similar) with proper styling.

Like button that calls POST /api/posts/:id/like via an async client component.

Add a placeholder section for comments and newsletter to be wired later.

Phase 5 – Comments, Likes, Newsletter
Task 5.1 – Backend comments API
Trae prompt:

Extend backend for comments:

In src/routes/comments.ts (or extend posts.ts), implement:

GET /api/posts/:id/comments – return approved comments (isApproved = true) sorted by createdAt asc.

POST /api/posts/:id/comments – create a new comment:

Validate body: { authorName, authorEmail, body }.

Create a Comment with isApproved = false.

Upsert a Subscriber entry with email and source = 'comment'.

Increment commentCount on the Post.

Return appropriate JSON responses.
Wire this router correctly and ensure types compile.

Task 5.2 – Frontend comments UI
Trae prompt:

Wire comments on the blog post page:

Create src/components/blog/CommentList.tsx and CommentForm.tsx.

On /blog/[slug] page:

Server fetch approved comments and pass them to CommentList.

Client component CommentForm posts to /api/posts/:id/comments:

On success, show “Comment submitted for review” and clear form.

No need for auto-refresh yet; a simple UX is fine.

Task 5.3 – Newsletter signup component
Trae prompt:

Implement a reusable newsletter component:

src/components/newsletter/NewsletterForm.tsx:

Simple email input + submit button.

On submit, call subscribe(email, 'newsletter_form').

Display success or error messages.

Use this component in:

Global footer.

Bottom of blog posts.

Phase 6 – Portfolio & Brand Pages
Task 6.1 – Portfolio pages wired to API
Trae prompt:

Implement portfolio pages based on docs/master-spec.md:

/portfolio (src/app/portfolio/page.tsx):

Fetch projects from /api/projects.

Render a grid/list using a ProjectCard component.

Add a “My Journey as a Developer” section with placeholder text for now.

/portfolio/[slug]:

Fetch project details.

Render as a narrative case study (Problem, Context, Solution, Results, Learnings) using fields from the Project model.
Use Tailwind to match the dark, bold style.

Task 6.2 – Brand/landing pages
Trae prompt:

Implement structured layouts (with placeholder copy) for brand pages:

/:

Hero section with my name, roles (Writer, Software Engineer, Expert, Entrepreneur, Creator), and CTA buttons (e.g. “View Portfolio”, “Read the Blog”, “Work With Me”).

Highlight section with a few featured posts and projects (hard‑code selection for now).

/services:

Sections for Consulting, Writing, Engineering with short descriptions and bullet points.

/about:

A narrative layout with slots for my story.

/contact:

Contact form wired to submitContact.

Show email address.
Focus on structure and layout; I will replace content manually later.

Phase 7 – Custom Admin Auth & Admin UI
Task 7.1 – Admin auth env + password helpers
You (env):

Update backend/.env:

bash
ADMIN_EMAIL=your-admin-email@example.com
ADMIN_PASSWORD_HASH=
ADMIN_JWT_SECRET=super-long-random-secret
Trae prompt:

In backend, implement a simple admin auth helper:

Create src/utils/password.ts with:

hashPassword(plain: string): Promise<string>

verifyPassword(plain: string, hash: string): Promise<boolean>
using bcrypt.

Add a small script or endpoint (e.g. a one-time src/scripts/hashAdminPassword.ts) that:

Reads a plaintext password from an env variable or CLI arg.

Logs a bcrypt hash so I can paste it into ADMIN_PASSWORD_HASH.

Do not store plaintext passwords in code or logs.

(You will run the helper once to generate ADMIN_PASSWORD_HASH.)

Task 7.2 – Admin login endpoint (custom JWT)
Trae prompt:

In backend, implement a custom admin login endpoint:

Create src/routes/adminAuth.ts with:

POST /api/admin/login:

Body: { email, password }.

Compare email to process.env.ADMIN_EMAIL.

Verify password against ADMIN_PASSWORD_HASH using verifyPassword.

On success, issue a JWT signed with ADMIN_JWT_SECRET containing { sub: 'admin', email }.

Return { token }.

On failure, return 401 with a generic error.

Wire this router in server.ts.

Task 7.3 – Admin auth middleware (JWT)
Trae prompt:

Implement admin auth middleware in backend:

Create src/middleware/adminAuth.ts:

Read the Authorization header, expect Bearer <token>.

Verify JWT using ADMIN_JWT_SECRET.

On success, attach req.admin = { email, sub } and call next().

On failure, return 401.

Apply this middleware to all /api/admin/* routes:

Import and use it in admin posts/projects/comments routers.

Task 7.4 – Admin CRUD routes
Trae prompt:

Implement admin CRUD endpoints per docs/master-spec.md:

src/routes/adminPosts.ts:

POST /api/admin/posts, PUT /api/admin/posts/:id, DELETE /api/admin/posts/:id.

All routes must use adminAuth.

src/routes/adminProjects.ts:

POST /api/admin/projects, PUT /api/admin/projects/:id, DELETE /api/admin/projects/:id.

Protected by adminAuth.

src/routes/adminComments.ts:

GET /api/admin/comments for pending comments.

PUT /api/admin/comments/:id/approve.

DELETE /api/admin/comments/:id.

All protected by adminAuth.
Wire these routers in server.ts.

Task 7.5 – Admin login UI (frontend)
Trae prompt:

In frontend, implement a minimal admin login flow:

Create /admin/login at src/app/admin/login/page.tsx (client component):

Form with email + password.

On submit, call POST {API_BASE}/api/admin/login.

On success, store the returned JWT (for MVP): localStorage.setItem('adminToken', token).

Redirect to /admin/dashboard.

Show basic error on failure.

Extend the API client (src/lib/api-client.ts) to:

Attach Authorization: Bearer <token> header for admin calls, reading from localStorage in a helper (e.g. getAdminToken()).

Task 7.6 – Admin layout guard
Trae prompt:

Protect admin routes on the frontend:

Create src/app/admin/layout.tsx as a client layout:

On mount, check for an admin token in localStorage.

If none, redirect to /admin/login.

If present, render children.

Wrap child routes like /admin/dashboard, /admin/posts, /admin/projects with this layout.

Task 7.7 – Admin dashboard + CRUD UI
Trae prompt:

In frontend, build minimal admin CRUD screens:

/admin/dashboard:

Show simple stats (counts) by calling admin endpoints (you can create a small /api/admin/stats if helpful).

/admin/posts:

List posts with buttons/links to edit/delete.

/admin/posts/new and /admin/posts/[id]:

Forms for creating/editing posts (fields from the Post model).

On submit, call corresponding admin Post endpoints.

/admin/projects and analogous routes for projects.
Ensure all admin fetches include the Authorization: Bearer <token> header.

Phase 8 – SEO, RSS, and Polish
Task 8.1 – SEO meta and OG tags
Trae prompt:

Implement basic SEO according to Next.js App Router best practices:

Use export const metadata in key pages (/, /blog, /blog/[slug], /portfolio, /portfolio/[slug]).

For post pages, derive title/description from Post data.

For project pages, derive from Project data.
Add sensible defaults for site title and description.

Task 8.2 – RSS feed
Trae prompt:

Add an RSS feed at /rss.xml:

Create a route handler at src/app/rss.xml/route.ts.

It should:

Fetch published posts (from backend API or directly from Mongo if you integrate the DB).

Generate valid RSS XML (title, link, description, items).

Return it with Content-Type: application/xml.
Use URLs consistent with the spec.

Task 8.3 – UI polish and mobile responsiveness
Trae prompt:

Do a pass over the UI to ensure:

All pages look good on mobile.

Headings and text follow a consistent typography scale.

Buttons, cards, and links reuse the design system components.

Colors stick to dark background + sunset yellow + neutrals.
Make small layout refinements but do not change routes or data models.

Phase 9 – Manual Content & Final Checks (You)
Replace placeholder copy on:

/, /services, /about, /portfolio journey section.

Add 3 real projects via admin UI.

Add 3–5 real blog posts via admin UI.

Manually test:

Comment flow.

Like button.

Newsletter signup.

Contact form.

Admin login and CRUD.

Then deploy frontend + backend based on your chosen hosting.

text

You can now drop both files into `docs/` and start running through the tasks with Trae.
```
