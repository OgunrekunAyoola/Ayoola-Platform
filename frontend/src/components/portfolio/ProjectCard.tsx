import Link from "next/link";
import { Project } from "@/lib/api-client";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group block bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300"
    >
      <div className="aspect-video w-full bg-neutral-800 relative overflow-hidden flex items-center justify-center">
        <div className="text-center p-6">
          <h3 className="text-2xl font-bold text-neutral-700 group-hover:text-yellow-500/50 transition-colors">
            {project.title.substring(0, 2).toUpperCase()}
          </h3>
        </div>
        {/* Placeholder for future image support */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent opacity-60"></div>
      </div>

      <div className="p-6">
        <div className="flex gap-2 mb-3 flex-wrap">
          {project.techStack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-xs font-medium text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded"
            >
              {tech}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-500 transition-colors">
          {project.title}
        </h3>

        <p className="text-neutral-400 text-sm line-clamp-2">
          {project.summary}
        </p>

        <div className="mt-4 flex items-center text-sm text-yellow-500 font-medium">
          View Case Study{" "}
          <span className="ml-1 group-hover:translate-x-1 transition-transform">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
