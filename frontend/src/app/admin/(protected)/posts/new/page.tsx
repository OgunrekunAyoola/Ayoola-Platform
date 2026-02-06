"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPost } from "@/lib/api-client";
import PostForm, { PostFormData } from "@/components/admin/PostForm";

export default function NewPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: PostFormData) => {
    setLoading(true);
    try {
      await createPost({
        ...data,
        tags: data.tags
          .split(",")
          .map((t: string) => t.trim())
          .filter(Boolean),
        status: data.status as "draft" | "published",
        readingTime: Number(data.readingTime),
      });
      router.push("/admin/posts");
    } catch (error) {
      console.error(error);
      alert("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return <PostForm onSubmit={handleSubmit} loading={loading} mode="create" />;
}
