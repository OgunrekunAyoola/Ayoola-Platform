import Link from "next/link";
import HeroSection from "@/components/home/HeroSection";
import RunLog from "@/components/home/RunLog";
import ProjectCard from "@/components/portfolio/ProjectCard";
import Portrait from "@/components/ui/Portrait";
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

const PRINCIPLES = [
  {
    n: "01",
    title: "Scoped, not sprawling",
    body: "Every component owns one job, whether it's an agent, a pipeline stage or a service. Easier to test, reason about and roll back.",
  },
  {
    n: "02",
    title: "Humans own the judgment calls",
    body: "Confidence scoring decides what runs on its own and what waits for a person. Uncertainty is routed, not hidden.",
  },
  {
    n: "03",
    title: "Every action leaves a trace",
    body: "Work is tracked end to end, so you can always answer: what ran, what it decided, who approved it.",
  },
];

const WAYS = [
  {
    key: "A",
    title: "Full-time remote",
    body: "Joining a team shipping AI into production: applied AI, LLM platforms, AI products and agent systems.",
    href: "/work-with-me#roles",
    tint: "bg-[var(--tint-blue)] hover:bg-[var(--tint-blue-hover)]",
  },
  {
    key: "B",
    title: "Production AI builds",
    body: "Fixed-scope engagements to take your AI from demo to production, with the controls built in.",
    href: "/work-with-me#builds",
    tint: "bg-[var(--tint-green)] hover:bg-[var(--tint-green-hover)]",
  },
];

const section = "max-w-[1200px] mx-auto px-5 sm:px-7";

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

      <HeroSection
        visual={
          <figure className="m-0 flex flex-col gap-2.5">
            <div className="relative">
              <Portrait variant="hero" priority />
              {/* Overlaps the portrait on sm+; sits under it on phones where the lines won't fit. */}
              <RunLog className="relative -mt-14 mx-3 sm:mx-0 sm:mt-0 sm:absolute sm:left-[7%] sm:right-[5%] sm:bottom-[6%]" />
            </div>
            <figcaption className="text-right font-mono text-[11.5px] text-[var(--subtle)]">
              Illustrative
            </figcaption>
          </figure>
        }
      />

      {/* Proof strip */}
      <section className={`${section} pt-12 pb-5`}>
        <ScrollReveal>
          <ul className="grid gap-px bg-[var(--hair)] border-y border-[var(--hair)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr))]">
            {PROOF.map((item) => (
              <li
                key={item}
                className="bg-[var(--background)] px-6 py-[26px] sm:py-[30px] font-serif font-medium text-[22px] sm:text-[24px] leading-[1.25]"
              >
                {item}
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap gap-2.5 pt-[22px]">
            {site.stack.map((s) => (
              <li
                key={s}
                className="font-mono text-[12.5px] rounded-full bg-[var(--surface)] px-3.5 py-[7px]"
              >
                {s}
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </section>

      {/* Principles */}
      <section className={`${section} pt-24 sm:pt-[110px]`}>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Principles"
            titleClassName="max-w-[16ch]"
            title={
              <>
                How I build AI <em>people can trust</em>
              </>
            }
          />
        </ScrollReveal>
        <div className="grid gap-10 [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))]">
          {PRINCIPLES.map((p, i) => (
            <ScrollReveal key={p.n} delay={i}>
              <div className="border-t-[1.5px] border-[var(--foreground)] pt-[22px] flex flex-col gap-3.5">
                <span className="font-mono text-[13px] text-[var(--accent)]">{p.n}</span>
                <h3 className="text-[25px] sm:text-[27px] leading-[1.2] tracking-[-0.01em]">
                  {p.title}
                </h3>
                <p className="text-[16.5px] leading-[1.6] text-[var(--muted)]">{p.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Selected work — only once case studies exist */}
      {work.length > 0 && (
        <section className={`${section} pt-24 sm:pt-[120px]`}>
          <ScrollReveal>
            <SectionHeading
              eyebrow="Selected work"
              title={
                <>
                  Systems <em>in production</em>
                </>
              }
              action={
                <Link href="/portfolio" className="btn btn-secondary btn-sm">
                  All work →
                </Link>
              }
            />
          </ScrollReveal>
          <div className="grid gap-[22px] [grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr))]">
            {work.map((project, i) => (
              <ScrollReveal key={project.slug} delay={i}>
                <ProjectCard project={project} />
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* Two ways to work together */}
      <section className={`${section} pt-24 sm:pt-[120px]`}>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Work with me"
            className="mb-10 sm:mb-12"
            title={
              <>
                Two ways to <em>work together</em>
              </>
            }
          />
        </ScrollReveal>
        <div className="grid gap-[22px] [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]">
          {WAYS.map((way, i) => (
            <ScrollReveal key={way.key} delay={i}>
              <Link
                href={way.href}
                className={`${way.tint} h-full rounded-[28px] px-7 py-9 sm:px-10 sm:py-11 min-h-[300px] sm:min-h-[320px] flex flex-col gap-4 text-[var(--foreground)] transition-colors`}
              >
                <span className="font-mono text-[12.5px] text-[var(--muted)]">{way.key}</span>
                <h3 className="text-[34px] sm:text-[40px] leading-[1.1] tracking-[-0.02em]">
                  {way.title}
                </h3>
                <p className="text-[17px] leading-[1.6] text-[var(--body)] max-w-[44ch] flex-1">
                  {way.body}
                </p>
                <span className="btn btn-primary btn-sm self-start !h-[46px]">
                  Learn more →
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Writing — only when posts exist */}
      {writing.length > 0 && (
        <section className={`${section} pt-24 sm:pt-[120px]`}>
          <ScrollReveal>
            <SectionHeading
              eyebrow="Writing"
              title="Latest writing"
              action={
                <Link href="/blog" className="btn btn-secondary btn-sm">
                  All writing →
                </Link>
              }
            />
          </ScrollReveal>
          <div className="grid gap-[22px] [grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr))]">
            {writing.map((post, i) => (
              <ScrollReveal key={post.slug} delay={i}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex flex-col gap-3.5 h-full min-h-[240px] rounded-[22px] border border-[var(--hair)] bg-[var(--card)] p-7 transition-colors hover:border-[var(--foreground)]"
                >
                  <span className="font-mono text-[11.5px] tracking-[0.08em] uppercase text-[var(--accent)]">
                    {post.tags?.[0] ?? "Writing"}
                  </span>
                  <h3 className="text-[25px] leading-[1.2]">{post.title}</h3>
                  <p className="text-[15.5px] leading-[1.55] text-[var(--muted)] flex-1 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <span className="font-mono text-[12px] text-[var(--muted)]">
                    {post.readingTime} min read
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* Closing CTA */}
      <section className={`${section} pt-24 sm:pt-[120px] pb-24 sm:pb-[110px]`}>
        <ScrollReveal>
          <CtaBand
            title={
              <>
                Your AI works in the demo. <em>Now it has to work in production.</em>
              </>
            }
            body="The gap between a promising prototype and a system real teams rely on is where I do my best work."
          />
        </ScrollReveal>
      </section>
    </div>
  );
}
