"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPost } from "@/lib/api-client";
import PostForm, { PostFormData } from "@/components/admin/PostForm";
import { useToast } from "@/context/ToastContext";

export default function NewPostPage() {
  const router = useRouter();
  const { addToast } = useToast();
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
      addToast("Post created successfully", "success");
      router.push("/admin/posts");
    } catch (error) {
      console.error(error);
      addToast("Failed to create post", "error");
    } finally {
      setLoading(false);
    }
  };

  return <PostForm onSubmit={handleSubmit} loading={loading} mode="create" />;
}
