import Link from "next/link";
import { WorkEntry } from "@/lib/content";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  project: WorkEntry;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group glass glass-i flex flex-col gap-3 rounded-[18px] p-6 h-full"
    >
      <div className="flex items-center justify-between gap-2.5">
        <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-[var(--accent)]">
          {project.client}
        </span>
        <span className="font-mono text-[11px] text-[var(--muted)]">
          {project.year}
        </span>
      </div>

      <h3 className="font-serif font-semibold text-[22px] leading-[1.2] tracking-tight text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
        {project.title}
      </h3>

      <p className="text-[15px] text-[var(--muted)] leading-[1.6] line-clamp-3 flex-1">
        {project.summary}
      </p>

      {project.stack?.length > 0 && (
        <ul className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="font-mono text-[11px] text-[var(--foreground)] border border-[var(--card-border)] rounded-full px-2.5 py-[3px]"
            >
              {tech}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-1 pt-3.5 border-t border-[var(--hair)] flex items-center gap-2 text-[13px] font-semibold text-[var(--accent)]">
        Read case study
        <ArrowUpRight className="w-3.5 h-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300" />
      </div>
    </Link>
  );
}
