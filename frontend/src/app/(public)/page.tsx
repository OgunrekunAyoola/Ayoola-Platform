import Link from "next/link";
import { ArrowRight, Boxes, UserCheck, ScrollText, type LucideIcon } from "lucide-react";
import HeroSection from "@/components/home/HeroSection";
import ProjectCard from "@/components/portfolio/ProjectCard";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import CtaBand from "@/components/ui/CtaBand";
import { getAllWriting, getAllWork } from "@/lib/content";
import { site } from "@/config/site";
import { getSiteUrl } from "@/lib/site-url";

const PROOF = [
  "26+ AI agents in production",
  "LLM pipelines & human-in-the-loop controls",
  "End-to-end AWS infrastructure",
  "Full-stack AI products",
];

const PRINCIPLES: { title: string; body: string; icon: LucideIcon }[] = [
  {
    title: "Scoped, not sprawling",
    body: "Every component owns one job, whether it's an agent, a pipeline stage or a service. Easier to test, reason about and roll back.",
    icon: Boxes,
  },
  {
    title: "Humans own the judgment calls",
    body: "Confidence scoring decides what runs on its own and what waits for a person. Uncertainty is routed, not hidden.",
    icon: UserCheck,
  },
  {
    title: "Every action leaves a trace",
    body: "Work is tracked end to end, so you can always answer: what ran, what it decided, who approved it.",
    icon: ScrollText,
  },
];

const WAYS = [
  {
    title: "Full-time remote",
    body: "Joining a team shipping AI into production: applied AI, LLM platforms, AI products and agent systems.",
    href: "/work-with-me#roles",
  },
  {
    title: "Production AI builds",
    body: "Fixed-scope engagements to take your AI from demo to production, with the controls built in.",
    href: "/work-with-me#builds",
  },
];

export default function Home() {
  const writing = getAllWriting().slice(0, 3);
  const work = getAllWork().filter((w) => w.featured);

  const siteUrl = getSiteUrl();
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: siteUrl || undefined,
    jobTitle: site.jobTitle,
    sameAs: [site.githubUrl, site.linkedinUrl].filter(Boolean),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <HeroSection />

      {/* Proof strip */}
      <section className="max-w-[1200px] mx-auto px-5 sm:px-7">
        <ScrollReveal className="glass rounded-2xl px-7 py-6">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-4">
            {PROOF.map((item, i) => (
              <li
                key={item}
                className={`font-serif font-bold text-[18px] leading-[1.3] text-[var(--foreground)] lg:px-6 lg:first:pl-0 lg:last:pr-0 ${
                  i > 0 ? "lg:border-l lg:border-[var(--hair)]" : ""
                } ${i % 2 === 1 ? "sm:pl-6 sm:border-l sm:border-[var(--hair)]" : ""}`}
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 pt-4 border-t border-[var(--hair)] font-mono text-[12px] leading-[1.6] text-[var(--muted)]">
            {site.stack.join(" · ")}
          </p>
        </ScrollReveal>
      </section>

      {/* Principles */}
      <section className="max-w-[1200px] mx-auto px-5 sm:px-7 pt-20">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Principles"
            title="How I build AI people can trust"
          />
        </ScrollReveal>
        <div className="grid gap-[22px] grid-cols-1 md:grid-cols-3">
          {PRINCIPLES.map(({ title, body, icon: Icon }, i) => (
            <ScrollReveal key={title} delay={i}>
              <div className="glass rounded-2xl p-6 h-full flex flex-col gap-3.5">
                <span className="w-11 h-11 rounded-[12px] bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center">
                  <Icon className="w-[22px] h-[22px]" />
                </span>
                <h3 className="font-serif font-semibold text-[21px] leading-[1.25] tracking-tight text-[var(--foreground)]">
                  {title}
                </h3>
                <p className="text-[15px] text-[var(--muted)] leading-[1.6]">
                  {body}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Selected work */}
      {work.length > 0 && (
        <section className="max-w-[1200px] mx-auto px-5 sm:px-7 pt-20">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Selected work"
              title="Systems in production"
              action={
                <Link href="/portfolio" className="btn btn-ghost shrink-0 !pl-0 sm:!pl-[14px]">
                  All work
                  <ArrowRight className="w-4 h-4" />
                </Link>
              }
            />
          </ScrollReveal>
          <div className="grid gap-[22px] [grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr))]">
            {work.map((project, i) => (
              <ScrollReveal key={project.slug} delay={i}>
                <ProjectCard project={project} />
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* Two ways to work together */}
      <section className="max-w-[1200px] mx-auto px-5 sm:px-7 pt-20">
        <ScrollReveal>
          <SectionHeading eyebrow="Work with me" title="Two ways to work together" />
        </ScrollReveal>
        <div className="grid gap-[22px] grid-cols-1 md:grid-cols-2">
          {WAYS.map((way, i) => (
            <ScrollReveal key={way.title} delay={i}>
              <Link
                href={way.href}
                className="glass glass-i group rounded-2xl p-7 h-full flex flex-col gap-3"
              >
                <h3 className="font-serif font-semibold text-[24px] tracking-tight text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                  {way.title}
                </h3>
                <p className="text-[15.5px] text-[var(--muted)] leading-[1.6] flex-1">
                  {way.body}
                </p>
                <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-[var(--accent)] pt-1">
                  Learn more
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Writing — only when posts exist */}
      {writing.length > 0 && (
        <section className="max-w-[1200px] mx-auto px-5 sm:px-7 pt-20">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Writing"
              title="Latest writing"
              action={
                <Link href="/blog" className="btn btn-ghost shrink-0 !pl-0 sm:!pl-[14px]">
                  All writing
                  <ArrowRight className="w-4 h-4" />
                </Link>
              }
            />
          </ScrollReveal>
          <div className="grid gap-[22px] [grid-template-columns:repeat(auto-fill,minmax(min(100%,260px),1fr))]">
            {writing.map((post, i) => (
              <ScrollReveal key={post.slug} delay={i}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="glass glass-i group flex flex-col gap-3.5 rounded-2xl p-6 min-h-[210px] h-full"
                >
                  <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-[var(--accent)]">
                    {post.tags?.[0] ?? "Writing"}
                  </span>
                  <h3 className="font-serif font-semibold text-[21px] leading-[1.2] tracking-tight text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-[14.5px] text-[var(--muted)] leading-[1.55] flex-1 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <span className="font-mono text-xs text-[var(--muted)]">
                    {post.readingTime} min read
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* Closing CTA */}
      <section className="max-w-[1200px] mx-auto px-5 sm:px-7 pt-20 pb-24">
        <ScrollReveal>
          <CtaBand
            title="Your AI works in the demo. Now it has to work in production."
            body="The gap between a promising prototype and a system real teams rely on is where I do my best work."
          />
        </ScrollReveal>
      </section>
    </div>
  );
}
