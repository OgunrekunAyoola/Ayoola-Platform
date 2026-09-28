# Ayoola Platform

Ayoola Ogunrekun's portfolio, blog, and personal brand site — a single
statically-generated Next.js app with no external backend or database.

## Stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS v4 (CSS-first, tokens in `src/app/globals.css`)
- **Content:** Markdown/MDX files with frontmatter, read at build time
  (`gray-matter`), rendered with `react-markdown`
- **Contact form:** a single Next.js route handler (`/api/contact`) that
  sends email via [Resend](https://resend.com) — the only server-side piece
  in the app
- **Hosting:** Netlify (`netlify.toml`, `@netlify/plugin-nextjs`)

There is no backend service, no database, and no admin CMS. All portfolio
projects and blog posts live in this repo as MDX files.

## Project structure

- `frontend/` — the Next.js app (this is the only deployable piece)
  - `content/work/*.mdx` — portfolio case studies
  - `content/writing/*.mdx` — blog posts
  - `src/lib/content.ts` — the loader that reads both at build time
  - `src/config/site.ts` — name, email, socials, location — the single
    source of truth every page reads from
- `docs/` — historical planning docs, not shipped

## Adding content

Drop a new `.mdx` file into `content/work/` or `content/writing/` and it
appears on the site on the next build — no code changes needed. See the
placeholder files in each folder for the required frontmatter fields.

## Running locally

```bash
cd frontend
npm install
cp .env.example .env.local   # then fill in values, see below
npm run dev                  # http://localhost:3000
```

Other scripts (run from `frontend/`): `npm run build`, `npm start`,
`npm run lint`, `npm run test` (Vitest).

## Environment variables

Set in `frontend/.env.local` locally, and in your host's dashboard for
production. See `frontend/.env.example` for the full list (names only —
no values are committed):

- `NEXT_PUBLIC_SITE_URL` — the site's public URL; used for canonical
  links, the sitemap, RSS, and Open Graph/Twitter images
- `RESEND_API_KEY`, `CONTACT_TO_EMAIL` — power the `/contact` form

## Deployment

The frontend deploys to Netlify from `netlify.toml` (`base = "frontend"`,
`@netlify/plugin-nextjs`). Set the environment variables above in the
Netlify site settings before deploying — a missing `NEXT_PUBLIC_SITE_URL`
will log a build warning and fall back to relative URLs.
