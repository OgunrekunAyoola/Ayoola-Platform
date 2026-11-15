# Services page content

The live copy is `frontend/content/site/services.yaml`; this file is a readable summary of it. If the two disagree, the YAML wins. Update both together.

Page: `/services`. Old URLs `/work-with-me` and `/ai` redirect here (`/ai` to the AI section).

## Intro

**Headline:** Three ways to work together.
**Sub:** Make an app you built fast safe to run, build a product properly from the start, or put AI to work in finance with a person in the loop. Based in Lagos (UTC+1), with full overlap with the UK and EU.
**Next steps:** Book a call (opens `/contact` until a booking link exists) or Request a quick scan (`/contact?type=rescue`).

## 01 · Rescue & security audit (`#rescue`)

For founders who shipped with Lovable, Bolt, Cursor or v0 on Supabase or Firebase, and now take payments or hold personal data.

| Offer | Price | What's included |
|---|---|---|
| Quick scan | **$450, fixed** | Written report of the top 10 risks, a 30-minute call, delivered in 2 days. The $450 is credited if they move to audit + fix within 14 days |
| Audit + fix | **From $2,500**, scope agreed in writing first | Critical and high issues fixed, a test for each fix proving the hole is closed, a written report, 5 to 7 days |
| Stabilise retainer | Quoted after the audit | |

**What I check:** row-level security off or without policies, open Firebase rules, service keys in the browser bundle, public storage buckets, unsigned payment webhooks, account flows that let one user act as another.

**Proof:** live-app recovery; tipping platform money controls.

## 02 · Product builds (`#builds`)

For founders and teams whose product handles money, compliance records or other people's data. Quoted after a call.

**Included:** architecture and data model, business rules enforced in the database, payments and webhooks that reconcile, integration tests against the running app, CI/CD and infrastructure as code, handoff docs and runbooks.

**How it works:** Discovery (a 30-minute call) → Scope (written, agreed before work starts) → Build (weekly demos) → Handoff (docs, runbooks, walkthrough).

**Proof:** food-safety compliance SaaS; tipping platform; OpsFlow.

## 03 · AI & finance automation (`#ai`)

"AI kept in its place." The model reads, classifies and drafts; code computes the figures and people approve what matters. Quoted after a call.

**Offers:** Finance automation · Production AI build · AI readiness review.
**Principles:** the model never has the final say; arithmetic decides what gets flagged; every decision leaves a record.
**Illustration:** `close-run.log`, labelled "Illustrative".

**Proof:** month-end close platform; OpsFlow output gates.

## Rules

- These are the only two public prices. Everything else is "Quoted after a call". There's no checkout: payment is by invoice or a payment link sent by email.
- No client or agency names; every claim traces to a case study.
