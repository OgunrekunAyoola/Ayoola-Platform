import { fetchPosts, Post } from "@/lib/api-client";
import PostCard from "@/components/blog/PostCard";
import ReadingPathBuilder from "@/components/blog/ReadingPathBuilder";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | Ayoola",
  description: "Thoughts on software engineering, design, and technology.",
};

export default async function BlogPage() {
  let posts: Post[] = [];
  let error: string | null = null;

  try {
    const response = await fetchPosts(1, 100); // Fetch first 100 posts for now
    posts = response.data;
  } catch (err) {
    console.error("Failed to fetch posts:", err);
    error = "Failed to load posts. Please try again later.";
  }

  return (
    <div className="min-h-screen py-24 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto animate-fade-in-up">
        <div className="text-center mb-20 md:mb-24">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            <span className="text-yellow-500">Blog</span> & Thoughts
          </h1>
          <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto leading-relaxed font-light">
            Technical deep dives, tutorials, and updates on my latest projects.
          </p>
        </div>

        <ReadingPathBuilder postCount={posts.length} />

        {error ? (
          <div className="text-center py-20 bg-neutral-900/50 rounded-lg border border-red-500/20">
            <p className="text-red-400">{error}</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 bg-neutral-900/50 rounded-lg border border-neutral-800">
            <p className="text-neutral-400 text-lg">
              No posts published yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
