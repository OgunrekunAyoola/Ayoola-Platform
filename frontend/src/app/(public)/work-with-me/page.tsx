import Link from "next/link";
import { Check, Download } from "lucide-react";
import { site } from "@/config/site";
import CtaBand from "@/components/ui/CtaBand";

export const metadata = {
  title: "Work with me",
  description:
    "Full-time remote AI engineering roles, or fixed-scope builds that take your AI from demo to production with the controls built in.",
};

const BRING = [
  "Multi-agent systems on AWS Bedrock AgentCore and LangGraph",
  "LLM pipelines with human-in-the-loop controls and confidence-based routing",
  "Production ownership, from staging to deploys to incident response",
  "Infrastructure as code, CI/CD and AWS networking",
  "Full-stack product engineering",
];

interface Offer {
  name: string;
  desc: string;
  timeline: string;
  price: string;
  badge?: string;
  includes?: string[];
}

const OFFERS: Offer[] = [
  {
    name: "AI Readiness Review",
    desc: "For teams with an AI system that works but can't get sign-off. I review your system and deliver a written report: where it will fail, which controls are missing, and exactly what to fix first.",
    timeline: "1–2 weeks",
    price: `From $${site.reviewPriceFrom}`,
  },
  {
    name: "Production AI Build",
    badge: "Core offer",
    desc: "I design, build and deploy a production AI system on your AWS stack, whether that's agents or an LLM pipeline, with the controls built in from day one.",
    includes: [
      "Architecture and system design",
      "Deployment on Bedrock AgentCore or your AWS setup",
      "Human approval gates and confidence routing",
      "Run tracking and an audit trail",
      "Infrastructure as code and CI/CD",
      "Handoff docs, runbooks and a walkthrough",
    ],
    timeline: "4–6 weeks",
    price: `From $${site.buildPriceFrom}`,
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Discovery",
    desc: "A 30-minute call about the problem, not a sales pitch.",
  },
  {
    step: "02",
    title: "Scope",
    desc: "A written scope and a fixed price. No surprises.",
  },
  {
    step: "03",
    title: "Build",
    desc: "Weekly demos, so you see progress as it happens.",
  },
  {
    step: "04",
    title: "Handoff",
    desc: "Documentation, runbooks and a walkthrough for your team.",
  },
];

const h2 =
  "font-serif font-bold tracking-tight text-[clamp(28px,3.4vw,40px)] leading-[1.15] text-[var(--foreground)]";

export default function WorkWithMe() {
  return (
    <div className="max-w-[1200px] mx-auto px-5 sm:px-7 pt-16 sm:pt-20 pb-24">
      <div className="font-mono text-xs tracking-[0.14em] uppercase text-[var(--accent)] mb-3.5">
        Work with me
      </div>
      <h1 className="font-serif font-extrabold tracking-tight leading-[1.05] text-[clamp(34px,4.6vw,56px)] text-[var(--foreground)] mb-3.5">
        Two ways to work together.
      </h1>
      <p className="text-[17px] sm:text-[18px] text-[var(--muted)] leading-[1.65] max-w-[600px] mb-8">
        Lagos-based, working with teams worldwide. Clear scope, production
        standards, no theatre.
      </p>
      <nav aria-label="On this page" className="flex flex-wrap gap-3 mb-16">
        <a href="#roles" className="btn btn-secondary !py-2.5 !text-sm">
          Full-time roles
        </a>
        <a href="#builds" className="btn btn-secondary !py-2.5 !text-sm">
          Production AI builds
        </a>
      </nav>

      {/* A — Roles */}
      <section id="roles" className="scroll-mt-24">
        <div className="glass rounded-[18px] p-7 sm:p-9 grid gap-9 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className={`${h2} mb-4`}>Full-time remote roles</h2>
            <p className="text-[16.5px] text-[var(--muted)] leading-[1.7] mb-7">
              I&apos;m open to full-time remote AI engineering roles: applied
              AI, LLM platform and infrastructure, AI product engineering, and
              agent systems. Strongest fit: teams where AI touches real money,
              real customers or real operations.
            </p>
            <div className="flex flex-wrap gap-3.5">
              <a href={site.cvPath} download className="btn btn-primary">
                Download CV
                <Download className="w-[17px] h-[17px]" />
              </a>
              <Link href="/contact" className="btn btn-secondary">
                Get in touch
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-mono text-[11px] tracking-[0.1em] uppercase text-[var(--muted)] mb-4">
              What I bring
            </h3>
            <ul className="flex flex-col gap-3">
              {BRING.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-[15px] leading-[1.5] text-[var(--foreground)]"
                >
                  <Check className="w-4 h-4 text-[var(--accent)] shrink-0 mt-[3px]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* B — Builds */}
      <section id="builds" className="scroll-mt-24 pt-20">
        <h2 className={`${h2} mb-3`}>Production AI builds</h2>
        <h3 className="font-serif italic font-semibold text-[clamp(21px,2.4vw,26px)] text-[var(--accent)] mb-3">
          AI agents that survive the audit.
        </h3>
        <p className="text-[16.5px] text-[var(--muted)] leading-[1.65] max-w-[600px] mb-10">
          For teams putting AI into finance, compliance or other workflows
          where mistakes are expensive.
        </p>

        <div className="grid gap-[22px] grid-cols-1 lg:grid-cols-2 items-stretch">
          {OFFERS.map((offer) => (
            <div
              key={offer.name}
              className="glass rounded-[18px] p-7 flex flex-col gap-4 relative"
              style={
                offer.badge ? { borderColor: "var(--accent-line)" } : undefined
              }
            >
              {offer.badge && (
                <span className="absolute -top-3 left-7 bg-[var(--accent)] text-[var(--accent-contrast)] text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  {offer.badge}
                </span>
              )}
              <h4 className="font-serif font-semibold text-[24px] tracking-tight text-[var(--foreground)]">
                {offer.name}
              </h4>
              <p className="text-[15px] text-[var(--muted)] leading-[1.65]">
                {offer.desc}
              </p>
              {offer.includes && (
                <ul className="flex flex-col gap-2.5 my-1">
                  {offer.includes.map((pt) => (
                    <li
                      key={pt}
                      className="flex items-start gap-2.5 text-sm leading-[1.5] text-[var(--foreground)]"
                    >
                      <Check className="w-[15px] h-[15px] text-[var(--accent)] shrink-0 mt-[3px]" />
                      {pt}
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-auto flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 pt-4 border-t border-[var(--hair)]">
                <span className="font-serif font-bold text-[22px] text-[var(--foreground)]">
                  {offer.price}
                </span>
                <span className="font-mono text-[12.5px] text-[var(--muted)]">
                  {offer.timeline}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Process */}
        <h2 className={`${h2} mt-20 mb-8`}>How it works</h2>
        <ol className="grid gap-[22px] [grid-template-columns:repeat(auto-fill,minmax(min(100%,220px),1fr))]">
          {PROCESS.map((item) => (
            <li key={item.step} className="glass rounded-2xl p-6">
              <div className="font-mono text-[13px] text-[var(--accent)] mb-3">
                {item.step}
              </div>
              <h3 className="font-serif font-semibold text-xl text-[var(--foreground)] mb-2">
                {item.title}
              </h3>
              <p className="text-[var(--muted)] text-[14.5px] leading-relaxed">
                {item.desc}
              </p>
            </li>
          ))}
        </ol>

        <CtaBand
          as="h3"
          className="mt-12"
          title="Not sure which fits?"
          body="Tell me what you're building. I'll tell you honestly whether and how I can help."
        />
      </section>
    </div>
  );
}
