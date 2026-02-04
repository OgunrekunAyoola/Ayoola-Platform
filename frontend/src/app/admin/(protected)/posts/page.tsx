"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchAdminPosts, deletePost, Post } from "@/lib/api-client";

export default function AdminPostsPage() {
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
    } catch (error) {
      alert("Failed to delete post");
      console.error(error);
    }
  };

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Posts</h1>
        <Link
          href="/admin/posts/new"
          className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-400"
        >
          + New Post
        </Link>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden overflow-x-auto">
        <table className="w-full text-left min-w-[600px]">
          <thead className="bg-neutral-800 text-neutral-400 text-sm uppercase">
            <tr>
              <th className="px-6 py-4 font-medium">Title</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Published</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {posts.map((post) => (
              <tr key={post._id} className="hover:bg-neutral-800/50">
                <td className="px-6 py-4 font-medium text-white">
                  {post.title}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      post.status === "published"
                        ? "bg-green-500/10 text-green-500"
                        : "bg-yellow-500/10 text-yellow-500"
                    }`}
                  >
                    {post.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-neutral-400">
                  {new Date(post.publishedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right space-x-4">
                  <Link
                    href={`/admin/posts/${post._id}`}
                    className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="text-red-500 hover:text-red-400 text-sm font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-8 text-center text-neutral-500"
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
