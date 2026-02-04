import Link from "next/link";
import { Post } from "@/lib/api-client";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="glass-card flex flex-col rounded-lg overflow-hidden group">
      {/* Image Placeholder - We can add real image support later if heroImage is present */}
      <div className="h-40 md:h-48 bg-neutral-800 w-full relative">
        {post.heroImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.heroImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-600 bg-neutral-900">
            <span className="text-3xl md:text-4xl">📝</span>
          </div>
        )}
      </div>

      <div className="p-4 md:p-6 flex flex-col flex-grow">
        <div className="flex gap-2 mb-3 flex-wrap">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] md:text-xs font-medium text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>

        <Link href={`/blog/${post.slug}`} className="group">
          <h2 className="text-lg md:text-xl font-serif font-bold text-neutral-100 mb-2 group-hover:text-yellow-500 transition-colors line-clamp-2">
            {post.title}
          </h2>
        </Link>

        <p className="text-neutral-400 text-sm mb-4 line-clamp-2 md:line-clamp-3 flex-grow">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between text-xs text-neutral-500 mt-auto pt-4 border-t border-neutral-800">
          <time dateTime={post.publishedAt} suppressHydrationWarning>
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </time>
          <div className="flex gap-3">
            <span>{post.readingTime} min read</span>
            <span>♥ {post.likeCount}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
