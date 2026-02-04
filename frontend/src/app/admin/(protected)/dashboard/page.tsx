"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchAdminStats } from "@/lib/api-client";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    postCount: 0,
    projectCount: 0,
    commentCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminStats()
      .then(setStats)
      .catch((err) => console.error("Failed to fetch stats", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-neutral-400 mt-2">Welcome back, Admin.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
          <h2 className="text-xl font-bold mb-4">Posts</h2>
          <div className="text-4xl font-bold mb-2">
            {loading ? "-" : stats.postCount}
          </div>
          <p className="text-neutral-400 mb-4">Manage blog posts.</p>
          <Link
            href="/admin/posts"
            className="text-yellow-500 text-sm font-medium hover:text-yellow-400"
          >
            View All →
          </Link>
        </div>

        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
          <h2 className="text-xl font-bold mb-4">Projects</h2>
          <div className="text-4xl font-bold mb-2">
            {loading ? "-" : stats.projectCount}
          </div>
          <p className="text-neutral-400 mb-4">Manage portfolio projects.</p>
          <Link
            href="/admin/projects"
            className="text-yellow-500 text-sm font-medium hover:text-yellow-400"
          >
            View All →
          </Link>
        </div>

        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800">
          <h2 className="text-xl font-bold mb-4">Comments</h2>
          <div className="text-4xl font-bold mb-2">
            {loading ? "-" : stats.commentCount}
          </div>
          <p className="text-neutral-400 mb-4">Moderate user comments.</p>
          <Link
            href="/admin/comments"
            className="text-yellow-500 text-sm font-medium hover:text-yellow-400"
          >
            View All →
          </Link>
        </div>
      </div>
    </div>
  );
}
