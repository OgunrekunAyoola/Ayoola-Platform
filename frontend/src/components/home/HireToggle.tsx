"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import Rich from "@/components/ui/Rich";
import type { HomeContent } from "@/lib/site-content";

const TONE = { tint: "var(--tint)", "tint-2": "var(--tint-2)" } as const;

/** "Two ways to work together": two tabs swap the card, whose colour eases across. */
export default function HireToggle({ hire }: { hire: HomeContent["hire"] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const tab = hire.tabs[active];

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const next = (active + (e.key === "ArrowRight" ? 1 : -1) + hire.tabs.length) % hire.tabs.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section
      data-reveal
      className="wrap pt-[clamp(72px,9vw,130px)] grid gap-[clamp(32px,5vw,80px)] items-center [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]"
    >
      <div className="flex flex-col items-start">
        <div className="eyebrow mb-[18px]">{hire.eyebrow}</div>
        <h2 className="h-section">
          <Rich text={hire.title} />
        </h2>
        <p className="text-[16.5px] leading-[1.6] text-[var(--muted)] mt-5 mb-7 max-w-[42ch]">{hire.body}</p>
        <div
          role="tablist"
          aria-label={hire.eyebrow}
          onKeyDown={onKeyDown}
          className="inline-flex p-1 rounded-full border border-[var(--hair-strong)] bg-[var(--card)]"
        >
          {hire.tabs.map((t, i) => (
            <button
              key={t.label}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={i === active}
              aria-controls={`${id}-panel`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className={`h-11 px-5 rounded-full border-0 cursor-pointer text-[15px] transition-colors duration-[250ms] ${
                i === active
                  ? "bg-[var(--foreground)] text-[var(--background)]"
                  : "bg-transparent text-[var(--foreground)]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-tab-${active}`}
        className="rounded-[clamp(24px,2.6vw,32px)] p-[clamp(28px,4vw,52px)] min-h-[380px] flex flex-col gap-4"
        style={{ background: TONE[tab.tone], transition: "background .4s ease" }}
      >
        <h3 className="text-[clamp(25px,2.65vw,39px)] leading-[1.05] m-0">{tab.title}</h3>
        <p className="text-[16.5px] leading-[1.6] text-[var(--body)] m-0 max-w-[44ch]">{tab.body}</p>
        <ul className="list-none mt-1.5 mb-0 p-0 flex flex-col gap-2.5">
          {tab.points.map((point) => (
            <li key={point} className="flex gap-3 items-center text-[15.5px]">
              <span aria-hidden="true" className="arrow text-[var(--accent)]">
                ✓
              </span>
              {point}
            </li>
          ))}
        </ul>
        <Link href={tab.cta.href} className="btn btn-ink mt-auto self-start h-[52px] px-[26px] text-[16px]">
          {tab.cta.label}
        </Link>
      </div>
    </section>
  );
}
