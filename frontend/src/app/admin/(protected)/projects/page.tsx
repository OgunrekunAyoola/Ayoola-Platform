"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchAdminProjects, deleteProject, Project } from "@/lib/api-client";
import Button from "@/components/ui/Button";
import StatusBadge from "@/components/ui/StatusBadge";
import { useToast } from "@/context/ToastContext";

export default function AdminProjectsPage() {
  const { addToast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = () => {
      fetchAdminProjects()
        .then(setProjects)
        .catch((err) => console.error("Failed to load projects", err))
        .finally(() => setLoading(false));
    };
    loadProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteProject(id);
      setProjects(projects.filter((p) => p._id !== id));
      addToast("Project deleted successfully", "success");
    } catch (error) {
      addToast("Failed to delete project", "error");
      console.error(error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Link href="/admin/projects/new">
          <Button variant="primary">+ New Project</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="glass-card p-6 rounded-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-bold text-[var(--foreground)]">
                  {project.title}
                </h2>
                {project.isFeatured && (
                  <span className="bg-yellow-500/10 text-yellow-500 text-xs px-2 py-0.5 rounded">
                    Featured
                  </span>
                )}
              </div>
              <div className="flex gap-2 mb-3">
                <StatusBadge status={project.category || "experiments"} />
                <StatusBadge status={project.visibility} />
              </div>
              <p className="text-[var(--muted)] text-sm mb-4 line-clamp-2">
                {project.summary}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="bg-[var(--muted)]/10 text-[var(--muted)] px-2 py-1 rounded text-xs"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 3 && (
                  <span className="text-[var(--muted)] text-xs py-1">
                    +{project.techStack.length - 3} more
                  </span>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[var(--card-border)] mt-4">
              <Link
                href={`/admin/projects/${project._id}`}
                className="inline-block"
              >
                <Button variant="secondary" className="px-4 py-2 text-sm">
                  Edit
                </Button>
              </Link>
              <Button
                variant="danger"
                className="px-4 py-2 text-sm"
                onClick={() => handleDelete(project._id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <div className="col-span-2 text-center text-neutral-500 py-12">
            No projects found.
          </div>
        )}
      </div>
    </div>
  );
}
