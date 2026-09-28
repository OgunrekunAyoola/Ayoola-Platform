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
  ok: "text-[var(--accent)]",
  flag: "text-[var(--warn)]",
  gate: "text-[var(--foreground)] font-medium bg-[var(--gate)] rounded-md -mx-2 px-2 py-1",
};

/** Illustrative agent run log card for the home hero. Purely decorative copy. */
export default function RunLog({ className = "" }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={`font-mono rounded-[18px] px-5 py-[18px] bg-[color-mix(in_srgb,var(--card)_90%,transparent)] backdrop-blur-[10px] shadow-[0_20px_50px_-24px_var(--shadow)] ${className}`}
    >
      <div className="flex items-center justify-between mb-3.5 text-[11.5px] text-[var(--muted)]">
        <span>agent-run.log</span>
        <span className="inline-flex items-center gap-1.5 tracking-[0.08em] uppercase text-[var(--accent)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] anim-blink" />
          live
        </span>
      </div>

      <motion.ol
        className="flex flex-col gap-2 text-[11.5px] sm:text-[12.5px] leading-[1.45]"
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
            className={`${toneClass[line.tone]} ${line.indent ? "pl-3.5" : ""}`}
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
  );
}
