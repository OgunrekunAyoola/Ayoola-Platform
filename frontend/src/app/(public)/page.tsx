import Link from "next/link";
import HeroSection from "@/components/home/HeroSection";
import RunLog from "@/components/home/RunLog";
import ProjectCard from "@/components/portfolio/ProjectCard";
import Portrait from "@/components/ui/Portrait";
import Rich from "@/components/ui/Rich";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import CtaBand from "@/components/ui/CtaBand";
import { getAllWriting, getAllWork } from "@/lib/content";
import { getHome, getSite } from "@/lib/site-content";
import { site as settings } from "@/config/site";
import { getSiteUrl } from "@/lib/site-url";

const TINT = {
  blue: "bg-[var(--tint-blue)] hover:bg-[var(--tint-blue-hover)]",
  green: "bg-[var(--tint-green)] hover:bg-[var(--tint-green-hover)]",
} as const;

const section = "max-w-[1200px] mx-auto px-5 sm:px-7";

export default function Home() {
  const site = getSite();
  const home = getHome();
  const writing = getAllWriting().slice(0, 3);
  const work = getAllWork().filter((w) => w.featured);

  const siteUrl = getSiteUrl();
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: siteUrl || undefined,
    jobTitle: site.role,
    sameAs: [settings.githubUrl, settings.linkedinUrl].filter(Boolean),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <HeroSection
        hero={home.hero}
        visual={
          <figure className="m-0 flex flex-col gap-2.5">
            <div className="relative">
              <Portrait variant="hero" priority />
              {/* Overlaps the portrait on sm+; sits under it on phones where the lines won't fit. */}
              <RunLog
                log={home.runLog}
                className="relative -mt-14 mx-3 sm:mx-0 sm:mt-0 sm:absolute sm:left-[7%] sm:right-[5%] sm:bottom-[6%]"
              />
            </div>
            <figcaption className="text-right font-mono text-[11.5px] text-[var(--subtle)]">
              {home.runLog.caption}
            </figcaption>
          </figure>
        }
      />

      {/* Proof strip */}
      <section className={`${section} pt-12 pb-5`}>
        <ScrollReveal>
          <ul className="grid gap-px bg-[var(--hair)] border-y border-[var(--hair)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr))]">
            {home.proof.items.map((item) => (
              <li
                key={item}
                className="bg-[var(--background)] px-6 py-[26px] sm:py-[30px] font-serif font-medium text-[22px] sm:text-[24px] leading-[1.25]"
              >
                {item}
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap gap-2.5 pt-[22px]">
            {home.proof.stack.map((s) => (
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
            eyebrow={home.principles.eyebrow}
            titleClassName="max-w-[16ch]"
            title={<Rich text={home.principles.title} />}
          />
        </ScrollReveal>
        {/* Two across on desktop so four principles sit as a 2×2. */}
        <div className="grid gap-10 [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]">
          {home.principles.items.map((p, i) => (
            <ScrollReveal key={p.title} delay={i}>
              <div className="border-t-[1.5px] border-[var(--foreground)] pt-[22px] flex flex-col gap-3.5">
                <span className="font-mono text-[13px] text-[var(--accent)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
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
              eyebrow={home.work.eyebrow}
              title={<Rich text={home.work.title} />}
              action={
                <Link href={home.work.action.href} className="btn btn-secondary btn-sm">
                  {home.work.action.label}
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

      {/* Feedback — only when published items exist */}
      {home.feedback.items.length > 0 && (
        <section className={`${section} pt-24 sm:pt-[120px]`}>
          <ScrollReveal>
            <SectionHeading
              eyebrow={home.feedback.eyebrow}
              title={<Rich text={home.feedback.title} />}
            />
          </ScrollReveal>
          {/* ScrollReveal wraps each card in a div, so this is a div grid, not a list. */}
          <div className="grid gap-[22px] [grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))]">
            {home.feedback.items.map((item, i) => (
              <ScrollReveal key={item.said} delay={i} className="h-full">
                <div className="h-full rounded-[22px] bg-[var(--surface)] p-7 flex flex-col gap-5">
                  <p className="font-serif text-[20px] sm:text-[21px] leading-[1.45] flex-1">
                    {item.said}
                  </p>
                  <div className="pt-4 border-t border-[var(--hair)] flex flex-col gap-1">
                    <span className="text-[15px] font-semibold">{item.who}</span>
                    <span className="font-mono text-[12px] text-[var(--muted)]">{item.where}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <p className="mt-5 font-mono text-[12px] text-[var(--subtle)]">{home.feedback.note}</p>
        </section>
      )}

      {/* Two ways to work together */}
      <section className={`${section} pt-24 sm:pt-[120px]`}>
        <ScrollReveal>
          <SectionHeading
            eyebrow={home.ways.eyebrow}
            className="mb-10 sm:mb-12"
            title={<Rich text={home.ways.title} />}
          />
        </ScrollReveal>
        <div className="grid gap-[22px] [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]">
          {home.ways.items.map((way, i) => (
            <ScrollReveal key={way.key} delay={i}>
              <Link
                href={way.href}
                className={`${TINT[way.tint]} h-full rounded-[28px] px-7 py-9 sm:px-10 sm:py-11 min-h-[300px] sm:min-h-[320px] flex flex-col gap-4 text-[var(--foreground)] transition-colors`}
              >
                <span className="font-mono text-[12.5px] text-[var(--muted)]">{way.key}</span>
                <h3 className="text-[34px] sm:text-[40px] leading-[1.1] tracking-[-0.02em]">
                  {way.title}
                </h3>
                <p className="text-[17px] leading-[1.6] text-[var(--body)] max-w-[44ch] flex-1">
                  {way.body}
                </p>
                <span className="btn btn-primary btn-sm self-start !h-[46px]">
                  {home.ways.action}
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
              eyebrow={home.writing.eyebrow}
              title={<Rich text={home.writing.title} />}
              action={
                <Link href={home.writing.action.href} className="btn btn-secondary btn-sm">
                  {home.writing.action.label}
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
          <CtaBand title={<Rich text={home.closing.title} />} body={home.closing.body} />
        </ScrollReveal>
      </section>
    </div>
  );
}
