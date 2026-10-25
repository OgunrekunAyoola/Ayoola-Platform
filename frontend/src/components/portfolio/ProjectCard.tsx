import Link from "next/link";
import { WorkEntry } from "@/lib/content";

interface ProjectCardProps {
  project: WorkEntry;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group flex flex-col gap-3.5 h-full rounded-[22px] border border-[var(--hair)] bg-[var(--card)] p-7 transition-colors hover:border-[var(--foreground)]"
    >
      <div className="flex items-center justify-between gap-2.5 font-mono text-[11.5px]">
        <span className="tracking-[0.08em] uppercase text-[var(--accent)]">
          {project.client}
        </span>
        <span className="text-[var(--muted)]">{project.year}</span>
      </div>

      <h3 className="text-[25px] leading-[1.2]">{project.title}</h3>

      <p className="text-[15.5px] leading-[1.55] text-[var(--muted)] line-clamp-3 flex-1">
        {project.summary}
      </p>

      {project.stack?.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="font-mono text-[12px] rounded-full bg-[var(--surface)] px-3 py-1.5"
            >
              {tech}
            </li>
          ))}
        </ul>
      )}

      <span className="mt-1 pt-4 border-t border-[var(--hair)] text-[15px] group-hover:text-[var(--accent)] transition-colors">
        Read case study →
      </span>
    </Link>
  );
}
