"use client";

import { useEffect, useState } from "react";
import {
  fetchAdminComments,
  approveComment,
  deleteComment,
  Comment,
} from "@/lib/api-client";

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPendingOnly, setShowPendingOnly] = useState(false);

  useEffect(() => {
    const loadComments = () => {
      setLoading(true);
      fetchAdminComments(showPendingOnly)
        .then(setComments)
        .catch((err) => console.error("Failed to load comments", err))
        .finally(() => setLoading(false));
    };
    loadComments();
  }, [showPendingOnly]);

  const handleApprove = async (id: string) => {
    try {
      await approveComment(id);
      // Optimistic update or reload
      setComments((prev) =>
        prev.map((c) => (c._id === id ? { ...c, isApproved: true } : c)),
      );
      // If we are showing pending only, remove it from list
      if (showPendingOnly) {
        setComments((prev) => prev.filter((c) => c._id !== id));
      }
    } catch (error) {
      alert("Failed to approve comment");
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;
    try {
      await deleteComment(id);
      setComments((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      alert("Failed to delete comment");
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">Comments</h1>
        <div className="flex bg-neutral-900 p-1 rounded-lg border border-neutral-800 w-full md:w-auto">
          <button
            onClick={() => setShowPendingOnly(true)}
            className={`flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              showPendingOnly
                ? "bg-neutral-800 text-white"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setShowPendingOnly(false)}
            className={`flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              !showPendingOnly
                ? "bg-neutral-800 text-white"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            All
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div>Loading...</div>
        ) : comments.length === 0 ? (
          <div className="text-neutral-500">No comments found.</div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl flex flex-col md:flex-row justify-between items-start gap-6"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-bold text-white">
                    {comment.authorName}
                  </span>
                  <span className="text-xs text-neutral-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                  {!comment.isApproved && (
                    <span className="bg-yellow-500/10 text-yellow-500 text-xs px-2 py-0.5 rounded">
                      Pending
                    </span>
                  )}
                </div>
                <p className="text-neutral-300">{comment.body}</p>
                <div className="mt-2 text-xs text-neutral-500">
                  Post ID: {comment.postId}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {!comment.isApproved && (
                  <button
                    onClick={() => handleApprove(comment._id)}
                    className="bg-green-600 hover:bg-green-500 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors"
                  >
                    Approve
                  </button>
                )}
                <button
                  onClick={() => handleDelete(comment._id)}
                  className="bg-red-900/20 hover:bg-red-900/40 text-red-500 px-3 py-1.5 rounded text-sm font-medium transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
