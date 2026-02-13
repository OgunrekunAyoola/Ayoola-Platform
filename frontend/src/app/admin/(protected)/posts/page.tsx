"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchAdminPosts, deletePost, Post } from "@/lib/api-client";
import Button from "@/components/ui/Button";
import StatusBadge from "@/components/ui/StatusBadge";
import { useToast } from "@/context/ToastContext";

export default function AdminPostsPage() {
  const { addToast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = () => {
      setLoading(true);
      fetchAdminPosts()
        .then(setPosts)
        .catch((err) => console.error("Failed to load posts", err))
        .finally(() => setLoading(false));
    };
    loadPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      await deletePost(id);
      setPosts(posts.filter((p) => p._id !== id));
      addToast("Post deleted successfully", "success");
    } catch (error) {
      addToast("Failed to delete post", "error");
      console.error(error);
    }
  };

  if (loading) return <div className="text-[var(--muted)]">Loading...</div>;

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Posts</h1>
        <Link href="/admin/posts/new">
          <Button variant="primary" className="w-full md:w-auto">
            + New Post
          </Button>
        </Link>
      </div>

      {/* Mobile View (Cards) */}
      <div className="md:hidden space-y-4">
        {posts.map((post) => (
          <div key={post._id} className="glass-card p-4 rounded-xl space-y-3">
            <div className="flex justify-between items-start gap-4">
              <h2 className="font-bold text-lg text-[var(--foreground)] line-clamp-2">
                {post.title}
              </h2>
              <StatusBadge status={post.status} className="shrink-0" />
            </div>

            <div className="text-sm text-[var(--muted)]">
              {new Date(post.publishedAt).toLocaleDateString()}
            </div>

            <div className="pt-4 border-t border-[var(--card-border)] flex justify-end gap-4">
              <Link
                href={`/admin/posts/${post._id}`}
                className="text-[var(--accent)] hover:opacity-80 text-sm font-medium transition-colors"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(post._id)}
                className="text-red-500 hover:text-red-400 text-sm font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {posts.length === 0 && (
          <div className="text-center text-[var(--muted)] py-8 glass-card rounded-xl">
            No posts found. Create one to get started.
          </div>
        )}
      </div>

      {/* Desktop View (Table) */}
      <div className="hidden md:block glass-card rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[var(--card-bg)] text-[var(--muted)] text-sm uppercase">
            <tr>
              <th className="px-6 py-4 font-medium">Title</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Published</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--card-border)]">
            {posts.map((post) => (
              <tr
                key={post._id}
                className="hover:bg-[var(--card-bg)]/50 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-[var(--foreground)]">
                  {post.title}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={post.status} />
                </td>
                <td className="px-6 py-5 text-[var(--muted)]">
                  {new Date(post.publishedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-5 text-right space-x-4">
                  <Link
                    href={`/admin/posts/${post._id}`}
                    className="inline-block"
                  >
                    <Button variant="secondary" className="px-4 py-2 text-sm">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    className="px-4 py-2 text-sm"
                    onClick={() => handleDelete(post._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-12 text-center text-[var(--muted)]"
                >
                  No posts found. Create one to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
