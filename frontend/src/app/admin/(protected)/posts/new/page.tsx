"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPost } from "@/lib/api-client";

export default function NewPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    tags: "",
    status: "draft",
    heroImage: "",
    readingTime: 5,
    publishedAt: new Date().toISOString().slice(0, 16), // YYYY-MM-DDTHH:mm
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createPost({
        ...formData,
        tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
        status: formData.status as "draft" | "published",
        readingTime: Number(formData.readingTime),
      });
      router.push("/admin/posts");
    } catch (error) {
      console.error(error);
      alert("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">New Post</h1>
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
          <label className="text-sm font-medium text-neutral-400">Excerpt</label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            required
            rows={3}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 focus:ring-1 focus:ring-yellow-500 outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-400">
            Content (Markdown)
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={15}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 focus:ring-1 focus:ring-yellow-500 outline-none font-mono text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-400">
              Tags (comma separated)
            </label>
            <input
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 focus:ring-1 focus:ring-yellow-500 outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-400">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 focus:ring-1 focus:ring-yellow-500 outline-none"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-400">
              Reading Time (mins)
            </label>
            <input
              type="number"
              name="readingTime"
              value={formData.readingTime}
              onChange={handleChange}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 focus:ring-1 focus:ring-yellow-500 outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-400">
              Published At
            </label>
            <input
              type="datetime-local"
              name="publishedAt"
              value={formData.publishedAt}
              onChange={handleChange}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 focus:ring-1 focus:ring-yellow-500 outline-none"
            />
          </div>
        </div>
        
         <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-400">Hero Image URL</label>
            <input
              name="heroImage"
              value={formData.heroImage}
              onChange={handleChange}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 focus:ring-1 focus:ring-yellow-500 outline-none"
            />
          </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-yellow-500 text-black px-6 py-2 rounded-lg font-bold hover:bg-yellow-400 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
