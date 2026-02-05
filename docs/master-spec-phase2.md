# Master Spec – Phase 2 (AI Features + Fun Blog)

Author: Ayoola Ogunrekun  
Version: Phase 2 (extends v0.2)  
Scope: Add AI-powered experiences and more playful blog UX on top of the existing platform.

---

## 1. Phase 2 Goals

### 1.1 Product Goals

- Make the blog and portfolio feel **alive and interactive**, not static.
- Use AI to turn posts and case studies into **explorable experiences**.
- Strengthen positioning as a **writer–engineer–expert** who builds story-first, AI-enhanced web experiences.
- Support the commercial goal: attract founders, agencies, and serious clients.

### 1.2 Out of Scope

- No new auth types (still only admin JWT).
- No paid subscriptions or memberships.
- No complex multi-tenant system.
- No big CMS refactor (reuse existing models).

---

## 2. AI Features Overview

Phase 2 adds three main AI features:

1. **Ask Ayoola (Post Q&A)**
   - On each blog post page, readers can ask questions about that article and get answers in Ayoola’s tone.

2. **Reading Path Builder (Blog Index)**
   - On `/blog`, readers can describe what they’re trying to figure out and get a curated reading path (3–5 posts) with custom AI-written blurbs.

3. **Persona Summaries (Portfolio Case Studies)**
   - On each project page, buttons like “Explain this to a policymaker / founder / engineer” rewrite the case study for that persona.

All AI calls go through the **backend**, never directly from the frontend.

---

## 3. AI Provider & Environment

### 3.1 Provider Abstraction

- The backend talks to a single AI provider via HTTP API.
- The provider (OpenAI, Anthropic, etc.) is abstracted behind a small internal service.

### 3.2 Environment Variables (Backend)

Add to `backend/.env`:

- `AI_PROVIDER_API_KEY` – secret key for the AI provider.
- `AI_PROVIDER_BASE_URL` – base URL (optional, depending on provider/SDK).
- `AI_PROVIDER_MODEL` – model identifier (e.g. `gpt-4.1`, `gpt-3.5-turbo`, etc.).

These values must **never** be exposed to the frontend.

---

## 4. Backend API – New Endpoints

All endpoints are **public** (no auth) but must include basic rate limiting and input validation.

Base URL: `{BACKEND_URL}` (deployed on Render).

### 4.1 Post Q&A – `POST /api/ai/posts/:id/qa`

- **Purpose:** Answer questions about a single blog post.

**Request**

- Method: `POST`
- URL params:
  - `id`: `Post.id` (Mongo ObjectId as string).
- Body (JSON):
  - `question`: string (required, 10–500 chars).

**Validation**

- Ensure `question` length between 10 and 500 chars.
- Ensure `id` maps to an existing `Post` with `status = 'published'`.

**Processing**

1. Fetch the post by `id` from MongoDB.
2. Build AI prompt:
   - System prompt (example):

     > You are Ayoola Ogunrekun, a Nigerian writer–engineer. You answer questions in a clear, direct, slightly playful tone, but you never lie. You only use the provided article content as your source of truth. If the answer is not in the article, say you don't know.

   - User content:
     - Include post title, tags, and full content.
     - Include the user’s question.

3. Call AI provider with `{ model: AI_PROVIDER_MODEL, prompt/messages }`.
4. Return answer text.

**Response**

- `200 OK`:
  ```json
  {
    "answer": "string"
  }
  400 Bad Request – invalid question or post id.
  ```

429 Too Many Requests – rate limit hit.

500 Internal Server Error – AI or DB errors.

Rate Limiting

Simple IP-based limit, e.g.:

Max 5 Q&A requests per IP per hour per post.

4.2 Reading Path Builder – POST /api/ai/reading-path
Purpose: Suggest a custom reading path across posts.

Request

Method: POST

Body (JSON):

goal: string (required, 10–500 chars) – “What are you trying to figure out?”

Validation

Ensure goal length between 10 and 500 chars.

Ensure there are at least 3 published posts.

Processing

Fetch all published posts:

Fields: id, title, slug, excerpt, tags.

Build AI prompt:

System prompt (example):

You are an editorial curator for Ayoola Ogunrekun’s blog. Your job is to build a short reading path (3–5 posts) that helps the reader with their goal. Only choose from the provided posts. Use a concise, energetic tone.

Provide:

The user’s goal.

A structured list of available posts (title, tags, excerpt, id).

Ask AI to return a JSON-safe structure specifying:

Which posts to include (by id).

A 1–2 sentence blurb for each post.

Optional overall intro (1–2 sentences about the path).

Parse AI response safely (validate JSON shape).

Response

200 OK:

json
{
"intro": "string",
"path": [
{
"postId": "string",
"title": "string",
"slug": "string",
"blurb": "string"
}
]
}
400 Bad Request – invalid goal or parsing issues.

429 Too Many Requests – rate limit hit.

500 Internal Server Error.

Rate Limiting

Max 3 reading-path requests per IP per day.

4.3 Persona Summaries – POST /api/ai/projects/:id/persona-summary
Purpose: Rewrite a project case study for a specific persona.

Request

Method: POST

URL params:

id: Project.id.

Body (JSON):

persona: one of:

"policymaker"

"founder"

"engineer"

Validation

persona must be one of the allowed values.

Project must exist and be public.

Processing

Fetch project by id:

Fields: title, summary, description, techStack, role, links.

Build AI prompt:

System prompt (example):

You are Ayoola Ogunrekun explaining a project. Adjust tone and level of detail for the given persona. Be clear, concise, and concrete.

Persona-specific instructions:

Policymaker:

Focus on impact, outcomes, societal context, clarity; minimal technical jargon.

Founder:

Focus on problem, solution, risks, outcomes, business value.

Engineer:

Focus on architecture, tradeoffs, technical details, reasoning.

Ask for a 150–300 word summary tailored to persona.

Response

200 OK:

json
{
"persona": "policymaker",
"summary": "string"
}
400 Bad Request – invalid persona or project.

429 Too Many Requests.

500 Internal Server Error.

Rate Limiting

Max 5 persona-summary requests per IP per day per project.

5. Frontend UX – New Components
   5.1 Ask Ayoola Widget
   Location: On /blog/[slug], below article content, above comments.

UI:

Title: “Ask Ayoola about this article”

Description: one short line explaining what it does.

Elements:

Textarea (min 2 rows, max 5).

Button: “Ask Ayoola”.

Loading state: “Thinking…”.

Result card showing answer.

Behaviour:

Disable button while loading.

Prevent empty/too-short questions.

Show friendly error message if request fails.

5.2 Reading Path Builder
Location: /blog page, near top (after hero/intro).

UI:

Prompt: “What are you trying to figure out?”

Input: single-line text input or textarea.

Button: “Build my reading path”.

Result:

Optional intro line.

List of 3–5 posts with:

Title (link to post).

Short AI-generated blurb.

Behaviour:

If less than 3 posts exist, hide component entirely.

Allow user to regenerate path with different goals.

5.3 Persona Summary Widget
Location: /portfolio/[slug], near top or after main description.

UI:

Title: “Explain this to…”

Three buttons:

Policymaker.

Founder.

Engineer.

Result area shows summary when persona is selected.

Behaviour:

On persona click:

Show loading state inline.

Replace previous summary with new one.

Keep last selected persona highlighted.

6. Fun & Visual Enhancements (Blog)
   6.1 Tone and Microcopy
   Slightly playful, unfiltered, but clear.

Use small asides, e.g.:

“Ask Ayoola (yes, the actual me, but with more RAM).”

Consistent across widgets.

6.2 Layout & Motion
Increase spacing and typographic scale on blog pages.

Add subtle animations:

Section fade-ins on scroll.

Hover states on cards and buttons.

Use accent color (sunset yellow) more boldly in:

Category tags.

CTA buttons.

Borders for AI widgets.

7. Security & Reliability
   All AI endpoints:

Validate inputs and lengths.

Sanitize responses (no HTML injection).

Catch and log AI errors.

Add basic rate limiting middleware.

Ensure backend never returns raw provider errors or keys.

8. Testing & Acceptance Criteria
   For each feature:

Ask Ayoola

Given a published post and valid question, user gets a coherent answer that references article content.

Very off-topic questions are handled with “not in this article” style responses.

Reading Path

For at least 5 different goals, returns 3–5 posts that exist and have relevant blurbs.

Handles cases where fewer posts exist gracefully.

Persona Summaries

For each persona, summaries differ in focus and level of technical detail.

Switching personas updates text without reload.
