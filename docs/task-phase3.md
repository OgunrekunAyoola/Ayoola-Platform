text

# tasks-phase3.md

Author: Ayoola Ogunrekun  
Phase: 3 – Commercial Positioning  
Depends on: Phase 2 complete and live

---

## 0. Prep & Audit

- [ ] Re-read `master-spec-phase3.md` once, end-to-end.
- [ ] Open current live site (home, portfolio, project pages, services/about if any).
- [ ] List all existing portfolio projects in a simple table (Name, URL, Status, Category guess).
- [ ] Confirm you are NOT adding new features or refactors in this phase (content + positioning only).

---

## 1. Content Reframing – Case Studies (8 Sections)

### 1.1 Create 8-section template

- [ ] Create a reusable markdown template `docs/templates/case-study-8-sections.md` with headings:
  - Problem Statement
  - Who It’s For
  - Business Impact
  - Architecture Overview
  - What Broke & How It Was Fixed
  - Cost to Run
  - Security & Performance Considerations
  - Tradeoffs
- [ ] Add one short example under each heading (can reuse examples from master spec).

### 1.2 Talent Group Services – Rewrite

- [ ] Re-read the existing Talent Group Services project page.
- [ ] Draft **Problem Statement** (2–3 specific sentences).
- [ ] Draft **Who It’s For** (persona, geography if relevant, business size).
- [ ] Draft **Business Impact** (time saved / revenue / cost; estimate if needed).
- [ ] Draft **Architecture Overview** (stack bullets + 2–3 key decisions).
- [ ] Draft **What Broke & How It Was Fixed** (at least one real issue).
- [ ] Draft **Cost to Run** (monthly cost breakdown).
- [ ] Draft **Security & Performance Considerations**.
- [ ] Draft **Tradeoffs** (what you intentionally did NOT build).
- [ ] Implement content in the frontend (project detail page).
- [ ] Sanity check on mobile and desktop.

### 1.3 Ayoola Platform – Rewrite

- [ ] Re-read the existing Ayoola Platform project page.
- [ ] Draft **Problem Statement** (why this platform exists as a product, not just a portfolio).
- [ ] Draft **Who It’s For** (audience: founders, small businesses, hiring managers).
- [ ] Draft **Business Impact** (how the platform supports content, AI tools, and outreach).
- [ ] Draft **Architecture Overview** (frontend, backend, AI integration, hosting).
- [ ] Draft **What Broke & How It Was Fixed** (real issues from Phase 1/2).
- [ ] Draft **Cost to Run** (including AI provider if applicable).
- [ ] Draft **Security & Performance Considerations**.
- [ ] Draft **Tradeoffs** (what you intentionally postponed).
- [ ] Implement content in the frontend (project detail page).
- [ ] Sanity check on mobile and desktop.

---

## 2. Services Page – /services

### 2.1 Copy & Structure

- [ ] Create `docs/content/services.md` to hold source copy.
- [ ] Write **Hero** section:
  - [ ] Clear headline (“Work With Me” + one-line positioning).
  - [ ] Subheading (who you help, what you build).
  - [ ] Meta line (Lagos-based, global clients, 2–4 week delivery).
  - [ ] Primary CTA label (“Schedule Discovery Call”).
  - [ ] Secondary CTA label (“View Case Studies”).
- [ ] Define **Service Tier 1: Custom Web Platforms**:
  - [ ] Investment range.
  - [ ] Timeline.
  - [ ] Bullet list of what’s included.
  - [ ] “Best for” description.
  - [ ] Link to Talent Group Services case study.
- [ ] Define **Service Tier 2: AI-Assisted Features**:
  - [ ] Investment range.
  - [ ] Timeline.
  - [ ] What’s included (Q&A, recommendations, summaries, workflows).
  - [ ] “Best for” description.
  - [ ] Link to live AI demo on your site.
- [ ] Define **Service Tier 3: Technical Writing & Case Studies**:
  - [ ] Investment range.
  - [ ] Timeline.
  - [ ] Deliverables list.
  - [ ] “Best for” description.
- [ ] Write **How We Work** (4 steps: Discovery, Proposal, Weekly Check-ins, Launch + Handoff).
- [ ] Write **Availability & Contact** (slots/month, turnaround, email, booking link, response time).

### 2.2 Implementation

- [ ] Create new route: `frontend/src/app/services/page.tsx`.
- [ ] Implement layout:
  - [ ] Hero section with both CTAs wired (anchor to Calendly/Cal.com & portfolio).
  - [ ] Service tiers displayed as cards or stacked sections.
  - [ ] Process section with 4 steps.
  - [ ] Availability & contact section at bottom with one clear CTA button.
- [ ] Add “Services” link into site navigation (header + footer if exists).
- [ ] Test navigation from:
  - [ ] Home → Services.
  - [ ] Portfolio → Services.
- [ ] Test page on mobile and desktop.

---

## 3. Portfolio Restructure – Systems / Tools / Experiments

### 3.1 Data Model

- [ ] Update Project schema in backend/admin:
  - [ ] Add `category` field with allowed values: `"systems" | "tools" | "experiments"`.
- [ ] Migrate existing records:
  - [ ] Ayoola Platform → `systems`.
  - [ ] Talent Group Services → `systems`.
  - [ ] Leave placeholders for future tools/experiments.

### 3.2 Frontend

- [ ] Update `/portfolio` page to use categories:
  - [ ] Section: **Systems** with description and `<ProjectGrid category="systems" />`.
  - [ ] Section: **Tools** with description and `<ProjectGrid category="tools" />`.
  - [ ] Section: **Experiments** with description and `<ProjectGrid category="experiments" />`.
- [ ] Ensure empty states are graceful (e.g. “Coming soon” when category has no projects).
- [ ] Test that category filtering works correctly in admin and frontend.

---

## 4. Landing Page – Hero & Proof

### 4.1 Copy

- [ ] Update name block: “Ayoola Ogunrekun”.
- [ ] Write new **headline**:
  - [ ] “I build AI-enhanced web systems that automate operations and help small businesses grow.”
- [ ] Write **subline**:
  - [ ] “Full-stack engineer · Lagos → Global · Available for select projects.”
- [ ] Define **3 proof points**:
  - [ ] Ops time reduction (e.g. “Reduced client ops time by 70% with custom booking automation”).
  - [ ] AI tools usage (e.g. “Shipped AI-powered tools serving 200+ monthly visitors”).
  - [ ] Shipping speed (e.g. “Built and deployed full platforms in under 4 weeks”).
- [ ] Define hero CTAs:
  - [ ] Primary: “View Systems”.
  - [ ] Secondary: “Hire Me”.

### 4.2 Implementation

- [ ] Update `frontend/src/app/page.tsx` hero section.
- [ ] Replace old generic tagline with new headline + subline.
- [ ] Add proof point cards under hero.
- [ ] Wire CTAs:
  - [ ] “View Systems” → `/portfolio#systems`.
  - [ ] “Hire Me” → `/services` or contact section.
- [ ] Test hero on mobile and desktop (line breaks, card layout, CTA visibility).

---

## 5. Outreach – Execution & Tracking

### 5.1 Create Outreach Tracker

- [ ] Create `docs/outreach-tracker.csv` or a simple sheet with columns:
  - [ ] Name / Company.
  - [ ] Contact person.
  - [ ] Role.
  - [ ] Email / Contact channel.
  - [ ] Segment (UK SMB, Agency, AI founder).
  - [ ] Date sent.
  - [ ] Response (yes / no / maybe).
  - [ ] Follow-up date.
  - [ ] Notes.
- [ ] Set a 2-week window start and end date for Phase 3 outreach push.

### 5.2 Define Targets & Templates

- [ ] List at least:
  - [ ] 10 UK service businesses (similar to Talent Group).
  - [ ] 10 design/brand agencies.
  - [ ] 10 AI-adjacent founders.
- [ ] Prepare 1 lightweight email template per segment using new proof points.
- [ ] Personalize each template with:
  - [ ] One line about their business/site.
  - [ ] One relevant proof point.
  - [ ] One clear call to action (“Would you like a quick call to see what this would look like for you?”).

### 5.3 Daily Execution

- [ ] Send 5–10 personalized emails per day for 10 working days.
- [ ] Log each email in the outreach tracker on the same day.
- [ ] Set follow-up dates (e.g. 5–7 days after initial mail).
- [ ] Send one follow-up if no reply by follow-up date.

---

## 6. Revenue Stream – First Dollar

### 6.1 Choose Initial Offer

- [ ] Pick **one** of:
  - [ ] Option A: Paid Discovery Calls.
  - [ ] Option B: Paid Setup Service (clone/ customize Ayoola Platform).
  - [ ] Option C: Sponsored Newsletter / Blog feature.
  - [ ] Option D: First Paid Project (via outreach).
- [ ] Write a 3–5 sentence description of the chosen offer:
  - [ ] Who it’s for.
  - [ ] What they get.
  - [ ] Price.
  - [ ] Delivery timeline.

### 6.2 Implementation

- [ ] Set up payment flow:
  - [ ] Stripe / Paystack / relevant provider payment link.
  - [ ] Confirm currency and amount.
- [ ] Connect payment link to:
  - [ ] Services page (relevant tier or new mini-section).
  - [ ] /about “Building in Public” section if relevant.
- [ ] Mention the offer in your outreach templates where appropriate.

### 6.3 “Building in Public” Block

- [ ] Update `/about` page content source (e.g. `docs/content/about.md`) with:

```markdown
## Building in Public

I'm treating this portfolio as a real product – it has to generate revenue, not just views.

- First dollar earned: [amount + date]
- Recent projects: [short list with links]
- Next focus: [what you're improving now]
  After first sale or paid call, fill in the placeholders.

Commit to updating this block whenever you hit a new milestone.

7. Definition of Done – Checklist
   Phase 3 is DONE when:

Talent Group Services has full 8-section case study.

Ayoola Platform has full 8-section case study.

/services page is live, linked in navigation, and readable on mobile.

/portfolio is grouped into Systems / Tools / Experiments.

Landing page hero and proof points are updated to new positioning.

At least ONE quick-win revenue stream is live on the site.

Outreach tracker shows ≥ 50 emails sent.

At least one revenue event (≥ 1 USD) has occurred and is reflected in “Building in Public”.
```
