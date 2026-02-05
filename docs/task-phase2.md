---

## 2. `tasks-phase2.md`

```md
# Tasks – Phase 2 (AI Features + Fun Blog)

This file defines concrete implementation tasks for Phase 2.  
Always respect `master-spec.md` and `master-spec-phase2.md`.  
Do NOT skip tasks or modify files outside the current task scope.

---

## Phase 2 – Setup & Backend

### Task 2.1 – Backend AI Config

**Goal:** Add AI provider config and helper function.

- Files:
  - `backend/src/config/aiConfig.ts` (new)
  - `backend/src/services/aiClient.ts` (new)
  - `backend/.env.example` (update)
  - `backend/src/index.ts` or main server file (wire env)

**Steps:**

1. Create `aiConfig.ts` reading:
   - `AI_PROVIDER_API_KEY`
   - `AI_PROVIDER_BASE_URL`
   - `AI_PROVIDER_MODEL`
   - Throw if missing in non-dev.
2. Create `aiClient.ts`:
   - Export a function `generateText({ systemPrompt, userPrompt, jsonMode? })`.
   - For now, implement minimal HTTP client to provider (assume OpenAI-compatible).
3. Update `.env.example` with new AI vars.
4. Ensure errors are logged but not leaked.

Acceptance:

- Server runs without crashing when AI env vars are present.
- `generateText` can be unit-tested with a mock.

---

### Task 2.2 – Post Q&A Endpoint

**Goal:** Implement `POST /api/ai/posts/:id/qa`.

- Files:
  - `backend/src/routes/aiRoutes.ts` (new) OR extend existing `routes`.
  - `backend/src/routes/index.ts` (to mount `/api/ai`).
  - `backend/src/models/Post.ts` (if needed for lean queries).

**Steps:**

1. Add new Express router for AI endpoints (`/api/ai`).
2. Implement `POST /posts/:id/qa`:
   - Validate `id` and `question`.
   - Fetch published post.
   - Build prompt as per spec.
   - Call `generateText`.
   - Return `{ answer }`.
3. Add simple rate limit middleware for this route.
4. Add error handling (400/404/500).

Acceptance:

- Given valid `id` and question, returns `200` with `answer`.
- Invalid `id` or missing question returns `400`.
- Non-existent post returns `404`.

---

### Task 2.3 – Reading Path Endpoint

**Goal:** Implement `POST /api/ai/reading-path`.

- Files:
  - `backend/src/routes/aiRoutes.ts` (extend).
  - `backend/src/models/Post.ts` (ensure required fields).

**Steps:**

1. Implement `POST /reading-path`:
   - Validate `goal`.
   - Fetch all published posts (id, title, slug, excerpt, tags).
   - Build system + user prompt with posts list and goal.
   - Request JSON-like output from AI and parse.
   - Map AI-selected posts back to actual posts.
2. Enforce 3–5 posts in response.
3. Add rate limiting.

Acceptance:

- For valid `goal` and at least 3 posts:
  - Returns `intro` and `path` array with valid posts.
- Handles parse errors and returns friendly 500.

---

### Task 2.4 – Persona Summary Endpoint

**Goal:** Implement `POST /api/ai/projects/:id/persona-summary`.

- Files:
  - `backend/src/routes/aiRoutes.ts` (extend).
  - `backend/src/models/Project.ts`.

**Steps:**

1. Implement `POST /projects/:id/persona-summary`:
   - Validate `id` and `persona`.
   - Fetch project with full description.
   - Use persona-specific instructions in prompt.
   - Call `generateText`, return `{ persona, summary }`.
2. Add rate limiting.

Acceptance:

- For each persona, returns distinct summaries.
- Invalid persona returns `400`.

---

## Phase 2 – Frontend Components

### Task 2.5 – Frontend: Ask Ayoola Widget

**Goal:** Add Q&A widget to blog post page.

- Files:
  - `frontend/src/app/blog/[slug]/page.tsx`
  - `frontend/src/components/AskAyoolaWidget.tsx` (new)
  - Any shared `lib/apiClient.ts` if exists.

**Steps:**

1. Create `AskAyoolaWidget`:
   - Props: `postId: string`.
   - State: `question`, `answer`, `loading`, `error`.
   - UI: textarea, button, result card.
2. Wire to backend:
   - POST to `${process.env.NEXT_PUBLIC_API_URL}/api/ai/posts/${postId}/qa`.
3. Insert widget on post page (below content, above comments).

Acceptance:

- Asking a valid question shows loading then an answer.
- Errors are surfaced gracefully.

---

### Task 2.6 – Frontend: Reading Path Builder

**Goal:** Add reading path builder to `/blog`.

- Files:
  - `frontend/src/app/blog/page.tsx`
  - `frontend/src/components/ReadingPathBuilder.tsx` (new)

**Steps:**

1. Create `ReadingPathBuilder`:
   - State: `goal`, `result`, `loading`, `error`.
   - UI: input + button, result list.
2. Only render if there are at least 3 posts (pass count as prop).
3. Integrate at top of `/blog`, after intro text.

Acceptance:

- Entering a goal returns 3–5 posts with blurbs and clickable links.
- Empty or too-short goal is prevented client-side.

---

### Task 2.7 – Frontend: Persona Summary Widget

**Goal:** Add persona summary widget to project pages.

- Files:
  - `frontend/src/app/portfolio/[slug]/page.tsx`
  - `frontend/src/components/PersonaSummary.tsx` (new)

**Steps:**

1. Create `PersonaSummary`:
   - Props: `projectId: string`.
   - Buttons for each persona.
   - Shows selected persona and summary.
2. On button click:
   - Call backend endpoint.
   - Show loading & handle errors.

Acceptance:

- Switching personas updates summary without page reload.
- Works on mobile and desktop.

---

## Phase 2 – Fun Blog & Design Pass

### Task 2.8 – Global Spacing & Typography

**Goal:** Make blog and portfolio pages feel more spacious and premium.

- Files:
  - `frontend/src/app/layout.tsx` (if global container)
  - `frontend/src/app/page.tsx`
  - `frontend/src/app/blog/page.tsx`
  - `frontend/src/app/blog/[slug]/page.tsx`
  - `frontend/src/app/portfolio/page.tsx`
  - `frontend/src/app/portfolio/[slug]/page.tsx`

**Steps:**

1. Add `max-w-4xl` or `max-w-5xl mx-auto px-4` to main content containers.
2. Increase vertical spacing between sections (`py-16`, `space-y-12`).
3. Adjust typography scale:
   - Larger headings.
   - Comfortable body text (`text-lg leading-relaxed`).
4. Ensure consistent look across pages.

Acceptance:

- All main pages share a coherent layout and spacing.
- No cramped sections on desktop or mobile.

---

### Task 2.9 – Blog “Fun” Styling

**Goal:** Make blog feel more playful and distinctive.

- Files:
  - `frontend/src/components/PostCard.tsx` (or equivalent)
  - `frontend/src/app/blog/[slug]/page.tsx`
  - Shared CSS/Tailwind config if needed.

**Steps:**

1. Update post cards:
   - Rounded corners, borders using accent color.
   - Hover effects with slight movement.
2. Add small playful microcopy:
   - In blog header, widget descriptions, etc.
3. Add subtle animations:
   - Fade-in on scroll for sections (use IntersectionObserver or simple libs).
   - Button hover transitions.

Acceptance:

- Blog index and post pages feel more alive without being noisy.
- Animations don’t hurt performance or accessibility.

---

## Phase 2 – Testing & Deployment

### Task 2.10 – Backend Testing

**Goal:** Basic tests for new AI endpoints.

- Files:
  - `backend/tests/aiRoutes.test.ts` (or similar)
  - Test config.

**Steps:**

1. Add tests with mocked `generateText`.
2. Cover:
   - Success cases for all three endpoints.
   - Validation errors.
   - Rate limit path (if feasible).

Acceptance:

- Tests pass locally.
- CI (if any) still passes.

---

### Task 2.11 – Frontend Testing / Manual QA

**Goal:** Ensure AI features work end-to-end.

**Steps:**

1. On staging or local:
   - Test Ask Ayoola on several posts.
   - Test Reading Path with different goals.
   - Test Persona Summaries on at least one project.
2. Test mobile layouts via dev tools.
3. Note and fix any UX issues.

Acceptance:

- No uncaught errors in console.
- All features function reliably.

---

### Task 2.12 – Deployment & Env Wiring

**Goal:** Deploy backend + frontend changes with AI env vars.

**Steps:**

1. Add AI env vars to Render backend.
2. Add/update `NEXT_PUBLIC_API_URL` on Netlify.
3. Deploy backend first, then frontend.
4. Smoke test production URLs.

Acceptance:

- Production site shows new widgets.
- AI features respond correctly in production.

---

## Rules for Trae / AI Coding Agent

- Always read `master-spec.md` and `master-spec-phase2.md` before modifying code.
- Only work on the **task** I specify (e.g. “Task 2.3”), and only touch files listed there unless strictly necessary.
- If existing code conflicts with spec, stop and ask rather than changing the spec.
- Summarize file changes after each task.
```
