import { fetchPosts, Post } from "@/lib/api-client";
import PostCard from "@/components/blog/PostCard";
import { Metadata } from "next";

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
    <div className="min-h-screen bg-black text-white py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
            <span className="text-yellow-500">Blog</span> & Thoughts
          </h1>
          <p className="text-neutral-400 max-w-2xl mx-auto text-sm md:text-base">
            Technical deep dives, tutorials, and updates on my latest projects.
          </p>
        </div>

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
