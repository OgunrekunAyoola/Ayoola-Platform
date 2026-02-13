import Link from "next/link";
import { Post } from "@/lib/api-client";
import { Calendar, Clock, Heart, FileText } from "lucide-react";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="glass-card flex flex-col rounded-xl overflow-hidden group h-full">
      {/* Image Container */}
      <div className="h-48 bg-[var(--muted)]/10 w-full relative overflow-hidden">
        {post.heroImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.heroImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800 group-hover:from-neutral-200 group-hover:to-neutral-300 dark:group-hover:from-neutral-800 dark:group-hover:to-neutral-700 transition-colors duration-500">
            <FileText className="w-12 h-12 text-[var(--muted)]/50 group-hover:text-[var(--muted)]/70 transition-colors duration-500" />
          </div>
        )}

        {/* Overlay gradient for text readability if needed, though mostly for image feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="p-6 flex flex-col flex-grow relative">
        {/* Tags */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium tracking-wide text-[var(--accent)] bg-[var(--accent)]/5 border border-[var(--accent)]/10 px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <Link
          href={`/blog/${post.slug}`}
          className="block group-hover:translate-x-1 transition-transform duration-300"
        >
          <h2 className="text-xl font-serif font-bold text-[var(--foreground)] mb-3 group-hover:text-[var(--accent)] transition-colors leading-tight">
            {post.title}
          </h2>
        </Link>

        {/* Excerpt */}
        <p className="text-[var(--muted)] text-sm mb-6 line-clamp-2 leading-relaxed flex-grow">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-[var(--muted)]/80 pt-4 border-t border-[var(--card-border)]">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <time dateTime={post.publishedAt} suppressHydrationWarning>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readingTime} min</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 group-hover:text-red-400 transition-colors duration-300">
            <Heart className="w-3.5 h-3.5" />
            <span>{post.likeCount}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
