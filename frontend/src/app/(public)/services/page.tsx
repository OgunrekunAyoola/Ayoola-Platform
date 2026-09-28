import Link from "next/link";
import {
  Check,
  ArrowRight,
  Layers,
  Sparkles,
  Compass,
  type LucideIcon,
} from "lucide-react";

export const metadata = {
  title: "Services",
  description:
    "Ways to work with Ayoola — custom web platforms, AI features, and technical consulting.",
};

interface Service {
  name: string;
  icon: LucideIcon;
  price: string;
  priceLabel: string;
  timeline: string;
  desc: string;
  points: string[];
  cta: string;
  featured?: boolean;
}

const SERVICES: Service[] = [
  {
    name: "Custom Web Platforms",
    icon: Layers,
    price: "From $1,500",
    priceLabel: "fixed scope",
    timeline: "2–4 weeks",
    desc: "Best for teams drowning in admin work or founders needing a robust MVP to validate their idea.",
    points: [
      "Full-stack web applications",
      "Custom admin dashboard",
      "Database & auth setup",
      "Deployment & hosting",
    ],
    cta: "Scope a build",
  },
  {
    name: "AI-Assisted Features",
    icon: Sparkles,
    price: "From $800",
    priceLabel: "from",
    timeline: "1–2 weeks",
    desc: "Add intelligence to existing platforms — search, chatbots, auto-summaries, and RAG pipelines.",
    points: [
      "LLM integration",
      "RAG pipelines",
      "Vector database setup",
      "Custom agents",
    ],
    cta: "Add AI",
    featured: true,
  },
  {
    name: "Consulting & Strategy",
    icon: Compass,
    price: "Retainer / hourly",
    priceLabel: "flexible",
    timeline: "ongoing",
    desc: "Technical direction for non-technical founders — architecture reviews, hiring support, and roadmap planning.",
    points: [
      "Technical feasibility audit",
      "Fractional CTO services",
      "Codebase review",
      "Team mentorship",
    ],
    cta: "Let's talk",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Discovery",
    desc: "30-min call. No jargon. Just business problems.",
  },
  {
    step: "02",
    title: "Proposal",
    desc: "Fixed-price quote. Clear deliverables. No surprises.",
  },
  {
    step: "03",
    title: "Build",
    desc: "Weekly check-ins. Live progress link from day 7.",
  },
  {
    step: "04",
    title: "Launch",
    desc: "Deployment, training videos, and full code handoff.",
  },
];

export default function Services() {
  return (
    <section className="max-w-[1200px] mx-auto px-5 sm:px-7 pt-20 pb-24">
      <div className="font-mono text-xs tracking-[0.14em] uppercase text-[var(--accent)] mb-3.5">
        Services
      </div>
      <h1 className="font-serif font-extrabold tracking-tight leading-[1.05] text-[clamp(34px,4.6vw,56px)] text-[var(--foreground)] mb-3.5">
        Ways to work together.
      </h1>
      <p className="text-[18px] text-[var(--muted)] max-w-[560px] mb-11">
        Focused engagements for teams that need to ship something durable. Clear
        scope, senior hands, no theatre.{" "}
        <span className="text-[var(--foreground)]">
          Lagos-based, serving global clients.
        </span>
      </p>

      {/* Service cards */}
      <div className="grid gap-[22px] [grid-template-columns:repeat(auto-fit,minmax(290px,1fr))]">
        {SERVICES.map((svc) => {
          const Icon = svc.icon;
          return (
            <div
              key={svc.name}
              className="glass glass-i rounded-[18px] p-7 flex flex-col gap-4 relative"
              style={
                svc.featured
                  ? { borderColor: "var(--accent-line)" }
                  : undefined
              }
            >
              {svc.featured && (
                <span className="absolute -top-3 left-7 bg-[var(--accent)] text-[var(--accent-contrast)] text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  Most popular
                </span>
              )}
              <div className="w-12 h-12 rounded-[13px] bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center">
                <Icon className="w-6 h-6" />
              </div>
              <h2 className="font-serif font-semibold text-[23px] tracking-tight text-[var(--foreground)]">
                {svc.name}
              </h2>
              <p className="text-[15px] text-[var(--muted)] leading-[1.6] flex-1">
                {svc.desc}
              </p>
              <ul className="flex flex-col gap-2.5 my-1">
                {svc.points.map((pt) => (
                  <li
                    key={pt}
                    className="flex items-start gap-2.5 text-sm text-[var(--foreground)]"
                  >
                    <Check className="w-[15px] h-[15px] text-[var(--accent)] shrink-0 mt-0.5" />
                    {pt}
                  </li>
                ))}
              </ul>
              <div className="flex items-baseline gap-2 pt-3.5 border-t border-[var(--hair)]">
                <span className="font-mono text-[13px] text-[var(--muted)]">
                  {svc.priceLabel}
                </span>
                <span className="font-serif font-bold text-[24px] text-[var(--foreground)]">
                  {svc.price}
                </span>
                <span className="font-mono text-[12px] text-[var(--muted)] ml-auto">
                  {svc.timeline}
                </span>
              </div>
              <Link href="/contact" className="btn btn-secondary w-full">
                {svc.cta}
              </Link>
            </div>
          );
        })}
      </div>

      {/* Process */}
      <h2 className="font-serif font-bold text-[28px] tracking-tight text-[var(--foreground)] mt-20 mb-8">
        How we work
      </h2>
      <div className="grid gap-[22px] [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
        {PROCESS.map((item) => (
          <div key={item.step} className="glass rounded-2xl p-6">
            <div className="font-serif font-bold text-5xl text-[var(--foreground)]/15 mb-4">
              {item.step}
            </div>
            <h3 className="font-serif font-semibold text-xl text-[var(--foreground)] mb-2">
              {item.title}
            </h3>
            <p className="text-[var(--muted)] text-sm leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* CTA banner */}
      <div
        className="glass rounded-[18px] p-8 mt-9 flex flex-wrap items-center justify-between gap-5"
        style={{
          background:
            "linear-gradient(150deg, var(--accent-soft), var(--card-bg))",
        }}
      >
        <div>
          <h3 className="font-serif font-bold text-[26px] tracking-tight text-[var(--foreground)] mb-1.5">
            Not sure which fits?
          </h3>
          <p className="text-[15.5px] text-[var(--muted)] max-w-[460px]">
            Tell me what you&apos;re building. I&apos;ll tell you honestly
            whether — and how — I can help.
          </p>
        </div>
        <Link href="/contact" className="btn btn-primary">
          Start a conversation
          <ArrowRight className="w-[17px] h-[17px]" />
        </Link>
      </div>
    </section>
  );
}
