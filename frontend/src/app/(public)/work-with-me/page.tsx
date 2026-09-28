import Link from "next/link";
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

const INCLUDES = [
  "Architecture and system design",
  "Deployment on Bedrock AgentCore or your AWS setup",
  "Human approval gates and confidence routing",
  "Run tracking and an audit trail",
  "Infrastructure as code and CI/CD",
  "Handoff docs, runbooks and a walkthrough",
];

const PROCESS = [
  { step: "01", title: "Discovery", desc: "A 30-minute call about the problem, not a sales pitch." },
  { step: "02", title: "Scope", desc: "A written scope and a fixed price. No surprises." },
  { step: "03", title: "Build", desc: "Weekly demos, so you see progress as it happens." },
  { step: "04", title: "Handoff", desc: "Documentation, runbooks and a walkthrough for your team." },
];

const h2 = "text-[clamp(32px,4.4vw,60px)] leading-[1.06] tracking-[-0.02em]";

export default function WorkWithMe() {
  return (
    <div className="max-w-[1200px] mx-auto px-5 sm:px-7 pt-16 sm:pt-20 pb-24 sm:pb-[110px]">
      <div className="eyebrow mb-6">Work with me</div>
      <h1 className="text-[clamp(44px,6vw,84px)] leading-[1.02] tracking-[-0.03em] mb-6">
        Two ways to <em>work together.</em>
      </h1>
      <p className="text-[17.5px] sm:text-[19px] leading-[1.6] text-[var(--muted)] max-w-[600px] mb-8">
        Lagos-based, working with teams worldwide. Clear scope, production
        standards, no theatre.
      </p>
      <nav aria-label="On this page" className="flex flex-wrap gap-3 mb-14 sm:mb-[72px]">
        <a href="#roles" className="btn btn-secondary btn-sm">
          Full-time roles ↓
        </a>
        <a href="#builds" className="btn btn-secondary btn-sm">
          Production AI builds ↓
        </a>
      </nav>

      {/* A — Roles */}
      <section
        id="roles"
        className="scroll-mt-[100px] rounded-[32px] bg-[var(--tint-blue)] p-[clamp(26px,5vw,64px)] grid gap-10 sm:gap-12 [grid-template-columns:repeat(auto-fit,minmax(min(100%,400px),1fr))]"
      >
        <div>
          <h2 className="text-[clamp(30px,3.6vw,46px)] leading-[1.1] tracking-[-0.02em] mb-5">
            Full-time remote roles
          </h2>
          <p className="text-[17px] sm:text-[17.5px] leading-[1.65] text-[var(--body)] mb-8">
            I&apos;m open to full-time remote AI engineering roles: applied AI,
            LLM platform and infrastructure, AI product engineering, and agent
            systems. Strongest fit: teams where AI touches real money, real
            customers or real operations.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={site.cvPath} download className="btn btn-primary">
              Download CV ↓
            </a>
            <Link href="/contact" className="btn btn-secondary">
              Get in touch
            </Link>
          </div>
        </div>
        <div className="rounded-[22px] bg-[var(--card)] p-6 sm:p-[30px]">
          <h3 className="font-mono font-normal text-[12px] tracking-[0.1em] uppercase text-[var(--muted)] mb-[18px]">
            What I bring
          </h3>
          <ul className="flex flex-col">
            {BRING.map((item) => (
              <li
                key={item}
                className="flex gap-3 items-start py-[13px] border-t border-[var(--hair)] text-[16px] leading-[1.5]"
              >
                <span aria-hidden="true" className="text-[var(--accent)]">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* B — Builds */}
      <section id="builds" className="scroll-mt-[100px] pt-24 sm:pt-[110px]">
        <h2 className={`${h2} mb-3`}>Production AI builds</h2>
        <p className="font-serif italic text-[clamp(22px,2.6vw,32px)] text-[var(--accent)] mb-4">
          AI agents that survive the audit.
        </p>
        <p className="text-[17px] sm:text-[17.5px] leading-[1.6] text-[var(--muted)] max-w-[600px] mb-12">
          For teams putting AI into finance, compliance or other workflows where
          mistakes are expensive.
        </p>

        <div className="grid gap-[22px] items-stretch [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]">
          <div className="rounded-[28px] border border-[var(--hair)] bg-[var(--card)] p-7 sm:p-10 flex flex-col gap-[18px]">
            <h3 className="text-[30px] sm:text-[34px] tracking-[-0.015em]">AI Readiness Review</h3>
            <p className="text-[16.5px] leading-[1.65] text-[var(--muted)]">
              For teams with an AI system that works but can&apos;t get sign-off.
              I review your system and deliver a written report: where it will
              fail, which controls are missing, and exactly what to fix first.
            </p>
            <div className="mt-auto flex flex-wrap items-baseline justify-between gap-2 pt-[22px] border-t border-[var(--hair)]">
              <span className="font-serif font-semibold text-[28px]">
                From ${site.reviewPriceFrom}
              </span>
              <span className="font-mono text-[13px] text-[var(--muted)]">1–2 weeks</span>
            </div>
          </div>

          <div className="on-inverse rounded-[28px] bg-[var(--inverse)] text-[var(--inverse-fg)] p-7 sm:p-10 flex flex-col gap-[18px]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-[30px] sm:text-[34px] tracking-[-0.015em]">Production AI Build</h3>
              <span className="rounded-full bg-[var(--accent-bright)] text-[#14212b] text-[12px] font-semibold tracking-[0.06em] uppercase px-3 py-1.5">
                Core offer
              </span>
            </div>
            <p className="text-[16.5px] leading-[1.65] text-[var(--inverse-muted)]">
              I design, build and deploy a production AI system on your AWS
              stack, whether that&apos;s agents or an LLM pipeline, with the
              controls built in from day one.
            </p>
            <ul className="flex flex-col gap-2.5">
              {INCLUDES.map((item) => (
                <li key={item} className="flex gap-3 text-[15.5px] leading-[1.5]">
                  <span aria-hidden="true" className="text-[var(--accent-bright)]">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-wrap items-baseline justify-between gap-2 pt-[22px] border-t border-[var(--inverse-hair)]">
              <span className="font-serif font-semibold text-[28px]">
                From ${site.buildPriceFrom}
              </span>
              <span className="font-mono text-[13px] text-white/75">4–6 weeks</span>
            </div>
          </div>
        </div>

        <h2 className="text-[clamp(30px,3.6vw,46px)] tracking-[-0.02em] mt-24 sm:mt-[110px] mb-10">
          How it works
        </h2>
        <ol className="grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(min(100%,230px),1fr))]">
          {PROCESS.map((item) => (
            <li
              key={item.step}
              className="border-t-[1.5px] border-[var(--foreground)] pt-[22px] flex flex-col gap-2.5"
            >
              <span className="font-mono text-[13px] text-[var(--accent)]">{item.step}</span>
              <h3 className="text-[26px]">{item.title}</h3>
              <p className="text-[16px] leading-[1.6] text-[var(--muted)]">{item.desc}</p>
            </li>
          ))}
        </ol>

        <CtaBand
          tone="green"
          as="h3"
          className="mt-20"
          title="Not sure which fits?"
          body="Tell me what you're building. I'll tell you honestly whether and how I can help."
        />
      </section>
    </div>
  );
}
