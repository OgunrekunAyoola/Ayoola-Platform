import type { AiContent } from "@/lib/site-content";

type RunLogContent = AiContent["practice"]["log"];
type Tone = RunLogContent["lines"][number]["tone"];

const toneClass: Record<Tone, string> = {
  muted: "text-[var(--muted)]",
  ok: "text-[var(--log-ok)]",
  flag: "text-[var(--accent-hover)]",
  gate: "text-[var(--foreground)] font-medium bg-[var(--gate)] rounded-md -mx-2 px-2 py-1",
};

/** Illustrative run-log card. Purely decorative copy, labelled as such by the caller. */
export default function RunLog({ log }: { log: RunLogContent }) {
  return (
    <div className="font-mono rounded-[18px] px-[22px] py-5 bg-[var(--card)] shadow-[0_20px_50px_-24px_rgba(19,32,26,0.35)]">
      <div className="flex items-center justify-between mb-[14px] text-[11.5px] text-[var(--muted)]">
        <span>{log.file}</span>
        <span className="flex items-center gap-1.5 tracking-[0.08em] uppercase text-[var(--accent)]">
          <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
          {log.status}
        </span>
      </div>
      <ol className="list-none m-0 p-0 flex flex-col gap-2 text-[11.5px] min-[480px]:text-[12.5px] leading-[1.45]">
        {log.lines.map((line) => (
          <li key={line.text} className={`${toneClass[line.tone]} ${line.indent ? "pl-[14px]" : ""}`}>
            {/* Hanging indent: on narrow cards a wrapped line continues under its text, not under the └ or ✓. */}
            <span className="block pl-[2ch] -indent-[2ch]">{line.text}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
