import Link from "next/link";
import { Project } from "@/lib/api-client";
import { ArrowUpRight, FolderGit2, Layers } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  // Determine icon based on category (simple heuristic)
  const Icon = project.category === "systems" ? Layers : FolderGit2;

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group block glass-card rounded-xl overflow-hidden h-full flex flex-col"
    >
      {/* Visual Header / Thumbnail Area */}
      <div className="h-48 w-full bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800 relative overflow-hidden flex items-center justify-center group-hover:from-neutral-200 group-hover:to-neutral-300 dark:group-hover:from-neutral-800 dark:group-hover:to-neutral-700 transition-all duration-500">
        {/* Abstract Pattern/Icon Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-700">
          <Icon className="w-24 h-24 text-[var(--foreground)]" />
        </div>

        {/* Title Overlay in Thumbnail (Optional, if no image) */}
        <div className="relative z-10 text-center px-6">
          <h3 className="text-2xl font-bold text-[var(--muted)] group-hover:text-[var(--accent)]/50 transition-colors duration-500 select-none">
            {project.title.substring(0, 2).toUpperCase()}
          </h3>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 dark:group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-2 flex-wrap">
            {project.techStack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="text-xs uppercase tracking-wider font-semibold text-[var(--muted)] bg-[var(--muted)]/10 border border-[var(--card-border)] px-2 py-1 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
          <ArrowUpRight className="w-5 h-5 text-[var(--muted)] group-hover:text-[var(--accent)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300" />
        </div>

        <h3 className="text-xl font-serif font-bold text-[var(--foreground)] mb-3 group-hover:text-[var(--accent)] transition-colors">
          {project.title}
        </h3>

        <p className="text-[var(--muted)] text-sm line-clamp-2 leading-relaxed mb-6 flex-grow">
          {project.summary}
        </p>

        <div className="mt-auto pt-4 border-t border-[var(--card-border)] flex items-center text-xs font-medium text-[var(--accent)]/80 group-hover:text-[var(--accent)] transition-colors">
          View Case Study
        </div>
      </div>
    </Link>
  );
}
