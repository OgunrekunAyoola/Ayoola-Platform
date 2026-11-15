import Link from "next/link";
import BookCallButton from "@/components/ui/BookCallButton";
import Portrait from "@/components/ui/Portrait";
import Rich from "@/components/ui/Rich";
import { pageMetadata } from "@/lib/page-meta";
import { getAbout } from "@/lib/site-content";

export function generateMetadata() {
  return pageMetadata({ ...getAbout().meta, path: "/about" });
}

const row = "wrap pt-[clamp(64px,9vw,110px)] flex flex-wrap gap-x-[clamp(40px,5vw,96px)] gap-y-6 items-start";
const rowLabel = "label m-0 pt-2 flex-[1_1_240px]";
const rowBody = "flex-[2_1_520px] min-w-0";

export default function About() {
  const about = getAbout();

  return (
    <div>
      <section className="wrap pt-[clamp(56px,7vw,96px)] grid gap-[clamp(40px,5vw,96px)] items-end [grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr))]">
        <div>
          <div className="eyebrow mb-6">{about.eyebrow}</div>
          <h1 className="text-[clamp(39px,5.3vw,90px)] leading-none m-0 mb-9 max-w-[12ch]">
            <Rich text={about.title} />
          </h1>
          <p className="display m-0 text-[clamp(18px,1.64vw,23px)] leading-[1.4] max-w-[34ch]">{about.lead}</p>
        </div>
        <figure className="m-0 relative h-[clamp(400px,min(70vh,118vw),760px)] rounded-[26px] overflow-hidden bg-[var(--figure)]">
          <Portrait priority sizes="(max-width: 960px) 92vw, 46vw" />
          <div className="absolute left-[clamp(16px,5%,36px)] bottom-[clamp(16px,5%,36px)] flex flex-wrap gap-2 pointer-events-none">
            {about.chips.map((chip, i) => (
              <span
                key={chip}
                className={`rounded-full px-4 py-[9px] text-[14px] ${
                  i === about.chips.length - 1
                    ? "bg-[var(--accent)] text-[var(--on-accent)]"
                    : "bg-[rgba(238,241,234,0.92)]"
                }`}
              >
                {chip}
              </span>
            ))}
          </div>
        </figure>
      </section>

      <section data-reveal className={row}>
        <h2 className={rowLabel}>{about.storyTitle}</h2>
        <div className={`${rowBody} flex flex-col gap-[22px] text-[18px] leading-[1.75] text-[var(--body)] max-w-[68ch]`}>
          {about.story.map((paragraph, i) => (
            <p
              key={paragraph}
              className={
                i === 0
                  ? "display m-0 text-[clamp(22px,2.1vw,30px)] leading-[1.25] text-[var(--foreground)]"
                  : "em-display m-0"
              }
            >
              <Rich text={paragraph} />
            </p>
          ))}
        </div>
      </section>

      <section data-reveal className={row}>
        <h2 className={rowLabel}>{about.experienceTitle}</h2>
        <ol className={`${rowBody} list-none m-0 p-0 border-b border-[var(--hair)]`}>
          {about.experience.map((item) => (
            <li
              key={item.role + item.org}
              className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1 py-[18px] border-t border-[var(--hair)]"
            >
              <span className="text-[16.5px] leading-[1.5] min-w-0">
                <span className="display text-[clamp(18px,1.5vw,21px)]">{item.role}</span>
                <span className="text-[var(--muted)]"> · {item.org}</span>
              </span>
              <span className="font-mono text-[12.5px] text-[var(--muted)] whitespace-nowrap">{item.dates}</span>
            </li>
          ))}
        </ol>
      </section>

      <section data-reveal className={row}>
        <h2 className={rowLabel}>{about.toolkitTitle}</h2>
        <div className={`${rowBody} grid gap-x-10 gap-y-8 [grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr))]`}>
          {about.toolkit.map((group) => (
            <div key={group.title} className="border-t border-[var(--foreground)] pt-[18px] flex flex-col gap-[14px]">
              <span className="display text-[20px]">{group.title}</span>
              <span className="flex flex-wrap gap-x-[14px] gap-y-2">
                {group.items.map((item) => (
                  <span key={item} className="font-mono text-[12.5px] text-[var(--muted)]">
                    {item}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap pt-[clamp(64px,9vw,110px)] pb-[clamp(72px,9vw,110px)]">
        <div className="border-t border-[var(--foreground)] pt-[clamp(28px,4vw,44px)] flex flex-wrap items-center justify-between gap-7">
          <h2 className="text-[clamp(25px,2.81vw,39px)] leading-[1.08] m-0 max-w-[20ch]">
            <Rich text={about.closing.title} />
          </h2>
          <div className="flex flex-wrap gap-4 items-center">
            <BookCallButton className="btn btn-ink h-14 px-7 text-[16.5px]" />
            <Link href="/services" className="link-u text-[16px] font-medium">
              See services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
