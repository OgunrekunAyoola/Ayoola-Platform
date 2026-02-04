"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProject } from "@/lib/api-client";

export default function NewProjectPage() {
  const router = useRouter();
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
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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
        techStack: formData.techStack.split(",").map((t) => t.trim()).filter(Boolean),
        visibility: formData.visibility as "public" | "email_gated",
        links: {
          demoUrl: formData.demoUrl,
          repoUrl: formData.repoUrl,
        },
      });
      router.push("/admin/projects");
    } catch (error) {
      console.error(error);
      alert("Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">New Project</h1>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-400">Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 focus:ring-1 focus:ring-yellow-500 outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-400">Slug</label>
            <input
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 focus:ring-1 focus:ring-yellow-500 outline-none"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-400">Summary</label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            required
            rows={2}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 focus:ring-1 focus:ring-yellow-500 outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-400">
            Description (Markdown)
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={10}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 focus:ring-1 focus:ring-yellow-500 outline-none font-mono text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-400">
              Tech Stack (comma separated)
            </label>
            <input
              name="techStack"
              value={formData.techStack}
              onChange={handleChange}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 focus:ring-1 focus:ring-yellow-500 outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-400">Role</label>
            <input
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 focus:ring-1 focus:ring-yellow-500 outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-400">Demo URL</label>
            <input
              name="demoUrl"
              value={formData.demoUrl}
              onChange={handleChange}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 focus:ring-1 focus:ring-yellow-500 outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-400">Repo URL</label>
            <input
              name="repoUrl"
              value={formData.repoUrl}
              onChange={handleChange}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 focus:ring-1 focus:ring-yellow-500 outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-400">Visibility</label>
            <select
              name="visibility"
              value={formData.visibility}
              onChange={handleChange}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 focus:ring-1 focus:ring-yellow-500 outline-none"
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
              className="w-5 h-5 rounded border-neutral-800 bg-neutral-900 text-yellow-500 focus:ring-yellow-500"
            />
            <label htmlFor="isFeatured" className="text-sm font-medium text-white">
              Featured Project
            </label>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-yellow-500 text-black px-6 py-2 rounded-lg font-bold hover:bg-yellow-400 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Project"}
          </button>
        </div>
      </form>
    </div>
  );
}
