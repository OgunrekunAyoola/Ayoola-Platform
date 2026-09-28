"use client";

import { motion, useReducedMotion } from "framer-motion";

type Tone = "muted" | "ok" | "flag" | "gate";

interface LogLine {
  text: string;
  tone: Tone;
  indent?: boolean;
}

const LINES: LogLine[] = [
  { text: "run 4821 · parent · started", tone: "muted" },
  { text: "└ child · classify_transaction · confidence 0.94 · auto", tone: "ok", indent: true },
  { text: "└ child · classify_transaction · confidence 0.41 · flagged", tone: "flag", indent: true },
  { text: "⏸ HUMAN GATE · awaiting approval", tone: "gate" },
  { text: "✓ approved · reviewer · logged", tone: "ok" },
  { text: "run 4821 · complete", tone: "muted" },
];

const toneClass: Record<Tone, string> = {
  muted: "text-[var(--muted)]",
  ok: "text-[var(--ok)]",
  flag: "text-[var(--accent)]",
  gate: "text-[var(--accent)] font-semibold bg-[var(--accent-soft)] rounded-md -mx-2 px-2",
};

/** Illustrative agent run log for the home hero. Purely decorative copy. */
export default function RunLog() {
  const reduceMotion = useReducedMotion();

  return (
    <figure className="w-full max-w-[520px]">
      <div className="glass rounded-2xl overflow-hidden font-mono shadow-xl">
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-[var(--hair)]">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--hair)] border border-[var(--card-border)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--hair)] border border-[var(--card-border)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--hair)] border border-[var(--card-border)]" />
          </div>
          <span className="text-[11.5px] text-[var(--muted)]">agent-run.log</span>
          <span className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.08em] uppercase text-[var(--accent)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] anim-blink" />
            live
          </span>
        </div>

        <motion.ol
          className="px-5 py-5 flex flex-col gap-2.5 text-[12.5px] leading-[1.5]"
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.55, delayChildren: 0.5 } },
          }}
        >
          {LINES.map((line) => (
            <motion.li
              key={line.text}
              className={`${toneClass[line.tone]} ${line.indent ? "pl-4" : ""} whitespace-pre-wrap`}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.25 } },
              }}
            >
              {line.text}
            </motion.li>
          ))}
        </motion.ol>
      </div>
      <figcaption className="mt-3 text-right font-mono text-[11.5px] text-[var(--muted)]">
        Illustrative
      </figcaption>
    </figure>
  );
}
