"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { fetchAdminPost, updatePost } from "@/lib/api-client";
import PostForm, { PostFormData } from "@/components/admin/PostForm";

export default function EditPostPage() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [initialData, setInitialData] = useState<any>(null);

  useEffect(() => {
    if (id) {
      fetchAdminPost(id)
        .then((post) => {
          setInitialData({
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            content: post.content || "",
            tags: post.tags.join(", "),
            status: post.status,
            heroImage: post.heroImage || "",
            readingTime: post.readingTime,
            publishedAt: new Date(post.publishedAt).toISOString().slice(0, 16),
          });
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to load post");
          router.push("/admin/posts");
        })
        .finally(() => setLoading(false));
    }
  }, [id, router]);

  const handleSubmit = async (data: PostFormData) => {
    setSaving(true);
    try {
      await updatePost(id, {
        ...data,
        tags: data.tags
          .split(",")
          .map((t: string) => t.trim())
          .filter(Boolean),
        status: data.status as "draft" | "published",
        readingTime: Number(data.readingTime),
      });
      alert("Post updated successfully");
      router.push("/admin/posts");
    } catch (error) {
      console.error(error);
      alert("Failed to update post");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <PostForm
      initialData={initialData}
      onSubmit={handleSubmit}
      loading={saving}
      mode="edit"
    />
  );
}
