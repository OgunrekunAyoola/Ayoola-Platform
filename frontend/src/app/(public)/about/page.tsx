import Portrait from "@/components/ui/Portrait";
import Rich from "@/components/ui/Rich";
import { formatYearMonth } from "@/lib/dates";
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
        {/* The measure is capped inside the column, so the column lines up with Experience and Toolkit. */}
        <div className={rowBody}>
          <div className="flex flex-col gap-[22px] text-[18px] leading-[1.75] text-[var(--body)] max-w-[68ch]">
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
        </div>
      </section>

      <section data-reveal aria-labelledby="experience-title" className={row}>
        <h2 id="experience-title" className={rowLabel}>
          {about.experienceTitle}
        </h2>
        <div className={rowBody}>
          {/* Role and dates are separate elements, and dates are <time>s, so they aren't read as one string. */}
          <ol className="list-none m-0 p-0 border-b border-[var(--hair)]">
            {about.experience.map((item) => (
              <li key={item.role + (item.org ?? "") + item.start} className="py-[18px] border-t border-[var(--hair)]">
                <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1">
                  <p className="m-0 text-[16.5px] leading-[1.5] min-w-0">
                    <span className="display text-[clamp(18px,1.5vw,21px)]">{item.role}</span>
                    {item.org && (
                      <>
                        <span aria-hidden="true" className="text-[var(--muted)]">
                          {" · "}
                        </span>
                        <span className="sr-only">, </span>
                        <span className="text-[var(--muted)]">{item.org}</span>
                      </>
                    )}
                  </p>
                  <p className="m-0 font-mono text-[12.5px] text-[var(--muted)] whitespace-nowrap">
                    <time dateTime={item.start}>{formatYearMonth(item.start)}</time>
                    <span aria-hidden="true"> – </span>
                    <span className="sr-only"> to </span>
                    {item.end === "present" ? "present" : <time dateTime={item.end}>{formatYearMonth(item.end)}</time>}
                  </p>
                </div>
                {item.details && (
                  <ul className="list-none m-0 mt-2.5 p-0 flex flex-col gap-1.5">
                    {item.details.map((detail) => (
                      <li key={detail} className="flex gap-3 text-[15.5px] leading-[1.5] text-[var(--muted)]">
                        <span aria-hidden="true" className="font-mono text-[var(--accent)]">
                          └
                        </span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
          <p className="m-0 mt-6 text-[15.5px] leading-[1.6] text-[var(--muted)]">
            <span className="font-medium text-[var(--foreground)]">{about.talk.label}:</span> {about.talk.title},{" "}
            {about.talk.event} <time dateTime={String(about.talk.year)}>{about.talk.year}</time>
          </p>
        </div>
      </section>

      <section data-reveal className={row}>
        <h2 className={rowLabel}>{about.toolkitTitle}</h2>
        {/* Four groups, two by two (one column on phones), so none sits alone on a row. */}
        <div className={`${rowBody} grid gap-x-10 gap-y-8 grid-cols-1 min-[560px]:grid-cols-2`}>
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

      {/* No closing row: the footer's call to action closes every page. */}
      <div className="pb-[clamp(72px,9vw,110px)]" />
    </div>
  );
}
