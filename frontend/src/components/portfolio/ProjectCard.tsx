import Link from "next/link";
import { WorkEntry } from "@/lib/content";
import { ArrowUpRight, Layers } from "lucide-react";

interface ProjectCardProps {
  project: WorkEntry;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group glass glass-i flex flex-col rounded-[18px] overflow-hidden h-full"
    >
      {/* Visual header */}
      <div className="h-40 relative border-b border-[var(--hair)] overflow-hidden bg-[linear-gradient(150deg,var(--accent-soft),transparent)]">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(var(--hair) 1px, transparent 1px), linear-gradient(90deg, var(--hair) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <Layers className="absolute left-[22px] top-[22px] w-[26px] h-[26px] text-[var(--accent)]" />
        <span className="absolute right-[18px] bottom-4 font-mono text-[11px] text-[var(--muted)]">
          {project.stack?.slice(0, 3).join(" · ")}
        </span>
        <ArrowUpRight className="absolute right-4 top-4 w-5 h-5 text-[var(--muted)] group-hover:text-[var(--accent)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300" />
      </div>

      <div className="p-6 flex flex-col gap-3 flex-1">
        <div className="flex items-center justify-between gap-2.5">
          <h3 className="font-serif font-semibold text-[22px] tracking-tight text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
            {project.title}
          </h3>
          <span className="font-mono text-[11px] text-[var(--accent)] border border-[var(--accent-line)] rounded-full px-2.5 py-[3px] shrink-0">
            {project.year}
          </span>
        </div>

        <p className="text-[15px] text-[var(--muted)] leading-[1.6] line-clamp-3 flex-1">
          {project.summary}
        </p>

        <div className="mt-1 pt-3.5 border-t border-[var(--hair)] flex items-center gap-2 text-xs font-medium text-[var(--accent)]/80 group-hover:text-[var(--accent)] transition-colors">
          View case study
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}
