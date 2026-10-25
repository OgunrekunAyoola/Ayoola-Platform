"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { HomeContent } from "@/lib/site-content";

type RunLogContent = HomeContent["runLog"];
type Tone = RunLogContent["lines"][number]["tone"];

const toneClass: Record<Tone, string> = {
  muted: "text-[var(--muted)]",
  ok: "text-[var(--accent)]",
  flag: "text-[var(--warn)]",
  gate: "text-[var(--foreground)] font-medium bg-[var(--gate)] rounded-md -mx-2 px-2 py-1",
};

/** Illustrative run log card for the home hero. Purely decorative copy. */
export default function RunLog({
  log,
  className = "",
}: {
  log: RunLogContent;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={`font-mono rounded-[18px] px-5 py-[18px] bg-[color-mix(in_srgb,var(--card)_90%,transparent)] backdrop-blur-[10px] shadow-[0_20px_50px_-24px_var(--shadow)] ${className}`}
    >
      <div className="flex items-center justify-between mb-3.5 text-[11.5px] text-[var(--muted)]">
        <span>{log.file}</span>
        <span className="inline-flex items-center gap-1.5 tracking-[0.08em] uppercase text-[var(--accent)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] anim-blink" />
          {log.status}
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
        {log.lines.map((line) => (
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
