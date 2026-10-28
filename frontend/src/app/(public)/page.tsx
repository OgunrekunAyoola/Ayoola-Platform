import Link from "next/link";
import HeroTitle from "@/components/home/HeroTitle";
import HireToggle from "@/components/home/HireToggle";
import LagosClock from "@/components/motion/LagosClock";
import RunLog from "@/components/home/RunLog";
import WorkCard from "@/components/portfolio/WorkCard";
import Portrait from "@/components/ui/Portrait";
import Rich from "@/components/ui/Rich";
import SectionHeading from "@/components/ui/SectionHeading";
import { StackMarquee, WordMarquee } from "@/components/ui/Marquee";
import { getAllWriting, getAllWork } from "@/lib/content";
import { getAi, getHome, getSite } from "@/lib/site-content";
import { site as settings } from "@/config/site";
import { getSiteUrl } from "@/lib/site-url";

const section = "wrap pt-[clamp(72px,9vw,130px)]";

export default function Home() {
  const site = getSite();
  const home = getHome();
  const ai = getAi();
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

      {/* Hero */}
      <section className="wrap pt-[clamp(48px,7vw,110px)] pb-[clamp(36px,4vw,64px)] flex flex-col">
        <div className="rise-in flex flex-wrap items-center gap-x-[26px] gap-y-3 mb-[clamp(28px,3.5vw,48px)]">
          <span className="eyebrow inline-flex items-center gap-[9px]">
            <span aria-hidden="true" className="w-[7px] h-[7px] rounded-full bg-[var(--accent)]" />
            {site.availability}
          </span>
          <span className="eyebrow text-[var(--muted)]">
            <LagosClock />
          </span>
        </div>

        <HeroTitle
          title={home.hero.title}
          className="text-[clamp(36px,5.93vw,108px)] leading-[1.04] mt-0 mb-[clamp(28px,3.5vw,44px)] text-balance max-w-[16ch] flex flex-wrap gap-x-[0.24em]"
        />

        <div className="rise-in-late flex flex-wrap items-center gap-[clamp(22px,4vw,56px)]">
          <div className="flex flex-wrap gap-3">
            <Link href={home.hero.primary.href} className="btn btn-ink h-[58px] px-[30px] text-[17px] gap-3">
              {home.hero.primary.label}{" "}
              <span aria-hidden="true" className="arrow text-[16px]">
                →
              </span>
            </Link>
            <Link href={home.hero.secondary.href} className="link-u h-[58px] px-1.5 text-[17px]">
              {home.hero.secondary.label}
            </Link>
          </div>
          <p className="em-display text-[clamp(16px,1.2vw,18px)] leading-[1.6] text-[var(--muted)] max-w-[44ch] m-0">
            <Rich text={home.hero.sub} />
          </p>
        </div>
      </section>

      <WordMarquee words={home.marquee} />

      {/* Portrait + intro */}
      <section
        data-reveal
        className="wrap pt-[clamp(64px,8vw,110px)] grid gap-[clamp(36px,5vw,88px)] items-center [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]"
      >
        <figure className="m-0 relative h-[clamp(440px,min(76vh,120vw),820px)] rounded-[clamp(22px,2vw,30px)] overflow-hidden bg-[var(--figure)] shadow-[0_44px_80px_-56px_rgba(19,32,26,0.5)]">
          <Portrait sizes="(max-width: 960px) 92vw, 46vw" />
          <div className="absolute left-4 right-4 bottom-4 rounded-[18px] px-5 py-4 bg-[rgba(238,241,234,0.9)] backdrop-blur-[18px] flex items-center justify-between gap-[14px]">
            <span className="flex flex-col gap-[3px] min-w-0">
              <span className="display text-[19px]">{site.name}</span>
              <span className="text-[13.5px] text-[var(--accent)]">{home.intro.portraitLine}</span>
            </span>
            <a
              href={settings.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-[46px] h-[46px] flex-none rounded-full bg-[var(--foreground)] text-[var(--background)] flex items-center justify-center no-underline text-[16px] hover:bg-[var(--accent)] transition-colors"
            >
              ↗
            </a>
          </div>
        </figure>
        <div className="flex flex-col gap-[clamp(28px,3vw,40px)]">
          <p className="display text-[clamp(20px,1.95vw,30px)] leading-[1.3] m-0 max-w-[30ch]">
            {home.intro.statement}
          </p>
          <dl className="flex flex-col m-0">
            {home.intro.facts.map((f) => (
              <div
                key={f.label}
                className="grid [grid-template-columns:minmax(90px,140px)_1fr] gap-5 items-baseline py-[18px] border-t border-[var(--hair)]"
              >
                <dt className="sr-only">{f.label}</dt>
                <dd className="display m-0 text-[clamp(27px,2.34vw,37px)] leading-none text-[var(--accent)]">
                  {f.value}
                </dd>
                <dd aria-hidden="true" className="m-0 text-[15.5px] leading-[1.5] text-[var(--muted)]">
                  {f.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* What I do */}
      <section data-reveal className={section}>
        <SectionHeading
          eyebrow={home.services.eyebrow}
          title={home.services.title}
          titleClassName="max-w-[18ch]"
          className="mb-[clamp(20px,2.5vw,32px)]"
          aside={
            <p className="text-[16.5px] leading-[1.6] text-[var(--muted)] m-0 max-w-[38ch]">
              {home.services.aside}
            </p>
          }
        />
        <div className="flex flex-col border-b border-[var(--hair-strong)]">
          {home.services.items.map((s, i) => (
            <Link
              key={s.title}
              href={s.href}
              className="no-underline text-[var(--foreground)] grid [grid-template-columns:clamp(32px,5vw,80px)_minmax(0,1fr)_auto] min-[700px]:[grid-template-columns:clamp(40px,5vw,80px)_minmax(0,1.1fr)_minmax(0,1.4fr)_auto] gap-x-[clamp(16px,2.5vw,40px)] gap-y-2 items-center py-[clamp(20px,2.4vw,32px)] px-[clamp(4px,1vw,16px)] border-t border-[var(--hair-strong)] transition-[background-color,transform] duration-300 ease-[cubic-bezier(.2,.8,.2,1)] hover:bg-[var(--row-hover)] hover:translate-x-1.5"
            >
              <span className="font-mono text-[12.5px] text-[var(--accent)]">{String(i + 1).padStart(2, "0")}</span>
              {/* Stacked on phones; two grid columns from 700px, as in the design. */}
              <span className="flex flex-col gap-1.5 min-[700px]:contents">
                <span className="display text-[clamp(20px,2.03vw,31px)] leading-[1.1]">{s.title}</span>
                <span className="text-[14.5px] min-[700px]:text-[15.5px] leading-[1.55] text-[var(--muted)] max-w-[44ch]">
                  {s.body}
                </span>
              </span>
              <span aria-hidden="true" className="arrow text-[20px] text-[var(--accent)]">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Selected work */}
      {work.length > 0 && (
        <section data-reveal className={section}>
          <SectionHeading
            eyebrow={home.work.eyebrow}
            title={home.work.title}
            aside={
              <Link href={home.work.action.href} className="btn btn-outline h-12 px-6 text-[15.5px]">
                {home.work.action.label}
              </Link>
            }
          />
          <div className="flex flex-col gap-3">
            {work.map((project, i) => (
              <WorkCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* AI systems */}
      <section
        data-reveal
        className={`${section} grid gap-[clamp(32px,5vw,80px)] items-center [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]`}
      >
        <div className="flex flex-col">
          <div className="eyebrow mb-[18px]">{home.ai.eyebrow}</div>
          <h2 className="h-section mb-5">
            <Rich text={home.ai.title} />
          </h2>
          <p className="text-[17px] leading-[1.65] text-[var(--muted)] m-0 mb-7 max-w-[48ch]">{home.ai.body}</p>
          <ul className="list-none m-0 mb-9 p-0 flex flex-col gap-2.5 text-[16px]">
            {ai.hero.points.map((point) => (
              <li key={point} className="flex gap-3">
                <span aria-hidden="true" className="arrow text-[var(--accent)]">
                  ✓
                </span>
                {point}
              </li>
            ))}
          </ul>
          <Link href={home.ai.action.href} className="btn btn-outline h-12 px-6 text-[15.5px] self-start">
            {home.ai.action.label}
          </Link>
        </div>
        <div className="flex flex-col gap-2.5">
          <div className="bg-[var(--tint)] rounded-[26px] p-[clamp(20px,4vw,48px)]">
            <RunLog log={ai.practice.log} />
          </div>
          <span className="self-end font-mono text-[11.5px] text-[var(--muted)]">Illustrative</span>
        </div>
      </section>

      {/* Feedback */}
      {home.feedback.items.length > 0 && (
        <section data-reveal className={section}>
          <SectionHeading eyebrow={home.feedback.eyebrow} title={home.feedback.title} />
          <div className="grid gap-[14px] [grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))]">
            {home.feedback.items.map((item) => (
              <div
                key={item.said}
                className="rounded-[22px] border border-[var(--card-border)] bg-[var(--card)] p-[30px] flex flex-col gap-5"
              >
                <p className="display font-medium text-[clamp(18px,1.4vw,21px)] leading-[1.4] m-0 flex-1">
                  {item.said}
                </p>
                <div className="pt-4 border-t border-[var(--hair)] flex flex-col gap-1">
                  <span className="text-[15px] font-semibold">{item.who}</span>
                  <span className="font-mono text-[12px] text-[var(--muted)]">{item.where}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 font-mono text-[12px] text-[var(--muted)]">{home.feedback.note}</p>
        </section>
      )}

      <div className="mt-[clamp(72px,9vw,130px)]">
        <StackMarquee items={home.stack} />
      </div>

      {/* How I work */}
      <section data-reveal className={section}>
        <div className="eyebrow mb-[18px]">{home.principles.eyebrow}</div>
        <h2 className="h-section mb-[clamp(36px,5vw,64px)] max-w-[20ch]">
          <Rich text={home.principles.title} />
        </h2>
        <div className="grid gap-[clamp(28px,4vw,52px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))]">
          {home.principles.items.map((p, i) => (
            <div key={p.title} className="flex flex-col gap-[14px] pt-6 border-t border-[var(--foreground)]">
              <span className="display font-medium text-[clamp(34px,3.12vw,50px)] leading-none text-[var(--accent)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-[22px] leading-[1.15] m-0">{p.title}</h3>
              <p className="text-[15.5px] leading-[1.65] text-[var(--muted)] m-0">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <HireToggle hire={home.hire} />

      {/* Writing — only when posts exist */}
      {writing.length > 0 && (
        <section data-reveal className={section}>
          <SectionHeading
            eyebrow={home.writing.eyebrow}
            title={home.writing.title}
            aside={
              <Link href={home.writing.action.href} className="btn btn-outline h-12 px-6 text-[15.5px]">
                {home.writing.action.label}
              </Link>
            }
          />
          <div className="grid gap-[14px] [grid-template-columns:repeat(auto-fill,minmax(min(100%,340px),1fr))]">
            {writing.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="no-underline text-[var(--foreground)] bg-[var(--card)] border border-[var(--card-border)] rounded-[22px] p-[30px] min-h-[240px] flex flex-col gap-3 transition-colors duration-300 hover:border-[var(--accent)]"
              >
                <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-[var(--accent)]">
                  {post.tags[0] ?? home.writing.eyebrow} · {post.readingTime} min read
                </span>
                <span className="display text-[24px] leading-[1.12]">{post.title}</span>
                <span className="text-[15px] leading-[1.55] text-[var(--muted)] flex-1">{post.excerpt}</span>
                <span className="flex justify-between items-center font-mono text-[12px] text-[var(--muted)]">
                  {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                  <span aria-hidden="true" className="arrow text-[18px] text-[var(--accent)]">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="pb-[clamp(88px,10vw,140px)]" />
    </div>
  );
}
