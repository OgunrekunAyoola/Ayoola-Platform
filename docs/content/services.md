# Services page content

The live copy is `frontend/content/site/services.yaml`; this file is a readable summary of it. If the two disagree, the YAML wins. Update both together.

Page: `/services`. Old URLs `/work-with-me` and `/ai` redirect here (`/ai` to the AI section).

## Copy rules

- Every line answers "what does the client get?"
- No tool or stack names (those live in the About toolkit and the case-study chips). Platforms the client already uses, like Supabase or Stripe, are fine where they say who an offer is for.
- No sentence appears word for word on another page, except the prices.
- Each section has one H2, then a tagline, a short intro, the offer cards, one block under a small subhead, and proof.

## Intro

**Headline:** Three ways to work together.
**Sub:** An app you built fast, made safe to run. A product built properly from the start. AI put to work in your business, with a person signing off. Based in Lagos (UTC+1), with a full overlap with the UK and EU.
**Next steps:** "Book a call" (the Cal.com discovery call, 30 min) or "Request a quick scan" (`/contact?type=rescue`).

## 01 · Rescue & security audit (`#rescue`)

**Tagline:** Find the holes before someone else does.
For apps built fast with Lovable, Bolt, Cursor or v0 on Supabase or Firebase that now take payments or hold personal data.

| Offer | Price | What's included |
|---|---|---|
| Quick scan | **$450, fixed** | Written report of the top 10 risks, a 30-minute call, delivered in 2 days. The $450 is credited if they move to audit + fix within 14 days |
| Audit + fix | **From $2,500**, scope agreed in writing first | Every critical and high issue fixed, a test for each fix proving the hole is closed, a written report, 5 to 7 days |
| Stabilise retainer | Quoted after the audit | |

**What I look for:** customers who can see each other's data, database rules open to anyone, secret keys shipped in the app, files anyone can open, payment notifications that could be faked, account takeover.

**Proof:** live-app recovery; tipping platform money controls.

## 02 · Product builds (`#builds`)

**Tagline:** Built properly, then handed over. Quoted after a call.
For founders and teams whose product handles money, compliance records or other people's data. They own the code, the cloud account and the docs at the end.

**How it works:** Discovery (a 30-minute call) → Scope (written, agreed before work starts) → Build (weekly demos) → Handoff (docs, runbooks, walkthrough).

**Proof:** food-safety compliance SaaS; tipping platform; OpsFlow.

## 03 · AI systems (`#ai`)

Named to match the "AI systems" section on Home. Finance stays the lead offer, not the whole section. The contact form's `?type=ai` preselects it.

**H2:** AI systems. **Tagline:** Automate the busywork. Keep the decisions. Quoted after a call.

**Offers:** Finance automation (first) · Production AI build (which can start with a written review of an existing system).
**Rules for AI that does real work:** the model never has the final say; arithmetic decides what gets flagged; every decision leaves a record.
**Illustration:** `close-run.log` beside the intro, labelled "Illustrative".

**Proof:** month-end close platform; OpsFlow.

## Rules

- These are the only two public prices. Everything else is "Quoted after a call". There's no checkout: payment is by invoice or a payment link sent by email.
- No client or agency names; every claim traces to a case study.
