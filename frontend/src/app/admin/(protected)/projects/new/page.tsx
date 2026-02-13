"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProject } from "@/lib/api-client";
import Button from "@/components/ui/Button";
import { useToast } from "@/context/ToastContext";

export default function NewProjectPage() {
  const router = useRouter();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    summary: "",
    description: "",
    techStack: "",
    role: "",
    demoUrl: "",
    repoUrl: "",
    isFeatured: false,
    visibility: "public",
    category: "experiments",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createProject({
        ...formData,
        techStack: formData.techStack
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        visibility: formData.visibility as "public" | "email_gated",
        category: formData.category as "systems" | "tools" | "experiments",
        links: {
          demoUrl: formData.demoUrl,
          repoUrl: formData.repoUrl,
        },
      });
      addToast("Project created successfully", "success");
      router.push("/admin/projects");
    } catch (error) {
      console.error(error);
      addToast("Failed to create project", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8 -mx-4 px-4 md:-mx-8 md:px-8 border-b border-[var(--card-border)] pb-4">
        <h1 className="text-3xl font-bold text-[var(--foreground)]">
          New Project
        </h1>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--muted)]">
              Title
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg px-4 py-3 focus:ring-1 focus:ring-[var(--accent)] outline-none text-[var(--foreground)]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--muted)]">
              Slug
            </label>
            <input
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              className="w-full bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg px-4 py-3 focus:ring-1 focus:ring-[var(--accent)] outline-none text-[var(--foreground)]"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--muted)]">
            Summary
          </label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            required
            rows={2}
            className="w-full bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg px-4 py-3 focus:ring-1 focus:ring-[var(--accent)] outline-none text-[var(--foreground)]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--muted)]">
            Description (Markdown)
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={10}
            className="w-full bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg px-4 py-3 focus:ring-1 focus:ring-[var(--accent)] outline-none font-mono text-sm text-[var(--foreground)]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--muted)]">
              Tech Stack (comma separated)
            </label>
            <input
              name="techStack"
              value={formData.techStack}
              onChange={handleChange}
              className="w-full bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg px-4 py-3 focus:ring-1 focus:ring-[var(--accent)] outline-none text-[var(--foreground)]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--muted)]">
              Role
            </label>
            <input
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg px-4 py-3 focus:ring-1 focus:ring-[var(--accent)] outline-none text-[var(--foreground)]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--muted)]">
              Demo URL
            </label>
            <input
              name="demoUrl"
              value={formData.demoUrl}
              onChange={handleChange}
              className="w-full bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg px-4 py-3 focus:ring-1 focus:ring-[var(--accent)] outline-none text-[var(--foreground)]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--muted)]">
              Repo URL
            </label>
            <input
              name="repoUrl"
              value={formData.repoUrl}
              onChange={handleChange}
              className="w-full bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg px-4 py-3 focus:ring-1 focus:ring-[var(--accent)] outline-none text-[var(--foreground)]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--muted)]">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg px-4 py-3 focus:ring-1 focus:ring-[var(--accent)] outline-none text-[var(--foreground)]"
            >
              <option value="experiments">Experiments</option>
              <option value="systems">Systems</option>
              <option value="tools">Tools</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[var(--muted)]">
              Visibility
            </label>
            <select
              name="visibility"
              value={formData.visibility}
              onChange={handleChange}
              className="w-full bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg px-4 py-3 focus:ring-1 focus:ring-[var(--accent)] outline-none text-[var(--foreground)]"
            >
              <option value="public">Public</option>
              <option value="email_gated">Email Gated</option>
            </select>
          </div>

          <div className="flex items-center gap-2 pb-2">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              id="isFeatured"
              className="w-5 h-5 rounded border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--accent)] focus:ring-[var(--accent)]"
            />
            <label
              htmlFor="isFeatured"
              className="text-sm font-medium text-[var(--foreground)]"
            >
              Featured Project
            </label>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            disabled={loading}
            variant="primary"
            className="px-6"
          >
            {loading ? "Creating..." : "Create Project"}
          </Button>
        </div>
      </form>
    </div>
  );
}
