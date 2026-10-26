import Link from "next/link";
import type { WorkEntry } from "@/lib/content";

interface WorkCardProps {
  project: WorkEntry;
  index: number;
}

/** Full-width case-study row card: number + title, summary, status and stack. */
export default function WorkCard({ project, index }: WorkCardProps) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group no-underline text-[var(--foreground)] bg-[var(--card)] rounded-[22px] border border-[var(--card-border)] px-[clamp(22px,2.6vw,40px)] py-[clamp(22px,2.6vw,36px)] grid gap-x-10 gap-y-[14px] items-center [grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))] transition-[border-color,transform,box-shadow] duration-300 ease-[cubic-bezier(.2,.8,.2,1)] hover:border-[var(--accent)] hover:-translate-y-[3px] hover:shadow-[0_26px_48px_-30px_rgba(19,32,26,0.4)]"
    >
      <span className="flex gap-[18px] items-baseline">
        <span className="font-mono text-[12px] text-[var(--accent)]">{String(index + 1).padStart(2, "0")}</span>
        <span className="flex flex-col gap-1.5">
          <span className="display text-[clamp(20px,1.87vw,28px)] leading-[1.1]">{project.title}</span>
          <span className="text-[14px] text-[var(--muted)]">
            {project.client} · {project.role}
          </span>
        </span>
      </span>
      <span className="text-[16px] leading-[1.6] text-[var(--body)] text-pretty">{project.summary}</span>
      <span className="flex gap-2.5 items-center justify-between">
        <span className="flex flex-wrap gap-1.5 min-w-0 flex-1">
          <span className="font-mono text-[11.5px] text-[var(--accent)] border border-[var(--accent)] rounded-full px-[11px] py-1.5">
            {project.status}
          </span>
          {project.stack.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="font-mono text-[11.5px] text-[var(--body)] border border-[var(--chip-border)] rounded-full px-[11px] py-1.5"
            >
              {tag}
            </span>
          ))}
        </span>
        <span aria-hidden="true" className="arrow flex-none text-[20px] text-[var(--accent)]">
          →
        </span>
      </span>
    </Link>
  );
}
