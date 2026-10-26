/**
 * The two scrolling bands on the home page. Each track holds the sequence
 * twice and slides by -50%, so the loop is seamless. Decorative: the second
 * copy is hidden from screen readers.
 */

function Band({ children, tight = false }: { children: React.ReactNode; tight?: boolean }) {
  return (
    <section
      className={`border-y border-[var(--hair)] overflow-hidden ${
        tight ? "py-[clamp(10px,1.2vw,16px)]" : "py-[clamp(14px,1.6vw,22px)]"
      }`}
    >
      <div className="marquee-mask">{children}</div>
    </section>
  );
}

export function WordMarquee({ words }: { words: string[] }) {
  const row = (copy: number) => (
    <div key={copy} aria-hidden={copy > 0} className="flex flex-none items-baseline gap-[0.9em] pr-[0.9em]">
      {words.map((word, i) => (
        <span key={word} className="inline-flex items-baseline gap-[0.45em] whitespace-nowrap">
          <span
            className={`display text-[clamp(40px,5.5vw,84px)] leading-[1.1] tracking-[-0.03em] ${
              i % 2 ? "font-medium text-[var(--accent)]" : "text-[var(--foreground)]"
            }`}
          >
            {word}
          </span>
          <span aria-hidden="true" className="display font-normal text-[clamp(24px,3vw,44px)] text-[var(--placeholder)]">
            ✳
          </span>
        </span>
      ))}
    </div>
  );
  return (
    <Band>
      <div className="marquee-track" style={{ "--marquee-duration": "30s" } as React.CSSProperties}>
        {[row(0), row(1)]}
      </div>
    </Band>
  );
}

export function StackMarquee({ items }: { items: string[] }) {
  const row = (copy: number) => (
    <div key={copy} aria-hidden={copy > 0} className="flex flex-none items-center gap-[14px] pr-[14px]">
      {items.map((item) => (
        <span key={item} className="inline-flex items-center gap-[14px] whitespace-nowrap">
          <span className="font-mono text-[13px] tracking-[0.08em] uppercase text-[var(--muted)]">{item}</span>
          <span aria-hidden="true" className="text-[11px] text-[var(--accent)]">
            ✳
          </span>
        </span>
      ))}
    </div>
  );
  return (
    <Band tight>
      <div
        className="marquee-track"
        style={{ "--marquee-duration": "36s", "--marquee-direction": "reverse" } as React.CSSProperties}
      >
        {[row(0), row(1)]}
      </div>
    </Band>
  );
}
