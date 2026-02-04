"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

interface PostFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string;
  status: "draft" | "published";
  heroImage: string;
  readingTime: number;
  publishedAt: string;
}

interface PostFormProps {
  initialData?: PostFormData;
  onSubmit: (data: PostFormData) => Promise<void>;
  loading: boolean;
  mode: "create" | "edit";
}

export default function PostForm({
  initialData,
  onSubmit,
  loading,
  mode,
}: PostFormProps) {
  const [formData, setFormData] = useState<PostFormData>(
    initialData || {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      tags: "",
      status: "draft",
      heroImage: "",
      readingTime: 5,
      publishedAt: new Date().toISOString().slice(0, 16),
    }
  );

  const [previewMode, setPreviewMode] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pb-20">
      {/* Sticky Header for Mobile Actions */}
      <header className="sticky top-0 z-20 bg-black/80 backdrop-blur-md py-4 mb-8 -mx-4 px-4 flex justify-between items-center border-b border-neutral-800">
        <h1 className="text-2xl md:text-3xl font-bold">
          {mode === "create" ? "New Post" : "Edit Post"}
        </h1>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-400 disabled:opacity-50 text-sm md:text-base"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-400">Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 focus:ring-1 focus:ring-yellow-500 outline-none text-base"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-400">Slug</label>
            <input
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 focus:ring-1 focus:ring-yellow-500 outline-none text-base"
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
            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 focus:ring-1 focus:ring-yellow-500 outline-none text-base"
          />
        </div>

        {/* Content Editor with Preview Toggle */}
        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <label className="text-sm font-medium text-neutral-400">
              Content (Markdown)
            </label>
            <div className="flex bg-neutral-900 rounded-lg p-1 border border-neutral-800">
              <button
                type="button"
                onClick={() => setPreviewMode(false)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  !previewMode
                    ? "bg-neutral-800 text-white"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                Write
              </button>
              <button
                type="button"
                onClick={() => setPreviewMode(true)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  previewMode
                    ? "bg-neutral-800 text-white"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                Preview
              </button>
            </div>
          </div>

          {previewMode ? (
            <div className="w-full min-h-[400px] bg-neutral-900 border border-neutral-800 rounded-lg px-6 py-6 prose prose-invert max-w-none prose-yellow">
              <ReactMarkdown>{formData.content || "*No content yet*"}</ReactMarkdown>
            </div>
          ) : (
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={15}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 focus:ring-1 focus:ring-yellow-500 outline-none font-mono text-sm leading-relaxed min-h-[400px]"
              placeholder="# Write your post here..."
            />
          )}
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
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 focus:ring-1 focus:ring-yellow-500 outline-none text-base"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-400">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 focus:ring-1 focus:ring-yellow-500 outline-none text-base"
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
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 focus:ring-1 focus:ring-yellow-500 outline-none text-base"
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
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 focus:ring-1 focus:ring-yellow-500 outline-none text-base"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-400">
            Hero Image URL
          </label>
          <input
            name="heroImage"
            value={formData.heroImage}
            onChange={handleChange}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 focus:ring-1 focus:ring-yellow-500 outline-none text-base"
          />
          {formData.heroImage && (
            <div className="mt-2 relative h-40 w-full rounded-lg overflow-hidden border border-neutral-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={formData.heroImage}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
