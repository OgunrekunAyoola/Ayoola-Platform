import { formatYearMonth } from "@/lib/dates";
import type { AboutContent } from "@/lib/site-content";

type Item = AboutContent["experience"][number];

/**
 * Experience, newest first.
 *
 * The "·", "–" and "└" between parts are drawn shapes, not characters, and
 * the words a listener needs (", " and " to ") are zero-size text in the flow
 * (.sr-inline, not .sr-only, which browsers pad with spaces and line breaks).
 * So the page text reads "Founder, OpsFlow" and "Mar 2026 to present"
 * everywhere: in a screen reader, a copy-paste, a reader view or a search
 * snippet. Dates are <time> elements.
 */
export default function ExperienceList({ items }: { items: Item[] }) {
  return (
    <ol className="list-none m-0 p-0 border-b border-[var(--hair)]">
      {items.map((item) => (
        <li key={item.role + (item.org ?? "") + item.start} className="py-[18px] border-t border-[var(--hair)]">
          <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1">
            <p className="m-0 text-[16.5px] leading-[1.5] min-w-0">
              <span className="display text-[clamp(18px,1.5vw,21px)]">{item.role}</span>
              {item.org && (
                <>
                  <span className="sr-inline">, </span>
                  <span
                    aria-hidden="true"
                    className="inline-block w-[3px] h-[3px] mx-2 rounded-full bg-[var(--muted)] align-middle"
                  />
                  <span className="text-[var(--muted)]">{item.org}</span>
                </>
              )}
            </p>
            <p className="m-0 font-mono text-[12.5px] text-[var(--muted)] whitespace-nowrap">
              <time dateTime={item.start}>{formatYearMonth(item.start)}</time>
              <span aria-hidden="true" className="inline-block w-[0.6em] h-px mx-[0.5em] bg-current align-middle" />
              <span className="sr-inline"> to </span>
              {item.end === "present" ? "present" : <time dateTime={item.end}>{formatYearMonth(item.end)}</time>}
            </p>
          </div>
          {item.details && (
            <ul className="list-none m-0 mt-2.5 p-0 flex flex-col gap-1.5">
              {item.details.map((detail) => (
                <li key={detail} className="flex gap-3 text-[15.5px] leading-[1.5] text-[var(--muted)]">
                  <span
                    aria-hidden="true"
                    className="flex-none mt-[0.3em] w-[7px] h-[7px] border-l border-b border-[var(--accent)]"
                  />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  );
}
