import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getAllWriting } from "@/lib/content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on software engineering, design, and technology.",
};

export default function BlogPage() {
  const posts = getAllWriting();

  return (
    <section className="max-w-[920px] mx-auto px-5 sm:px-7 pt-20 pb-24">
      <div className="font-mono text-xs tracking-[0.14em] uppercase text-[var(--accent)] mb-3.5">
        Blog
      </div>
      <h1 className="font-serif font-extrabold tracking-tight leading-[1.05] text-[clamp(34px,4.6vw,56px)] text-[var(--foreground)] mb-3.5">
        Writing.
      </h1>
      <p className="text-[18px] text-[var(--muted)] max-w-[540px] mb-11">
        Notes on building systems, the discipline of shipping, and reading code
        you didn&apos;t write.
      </p>

      {posts.length === 0 ? (
        <div className="text-center py-20 glass rounded-2xl">
          <p className="text-[var(--muted)] text-lg">
            No posts published yet. Check back soon!
          </p>
        </div>
      ) : (
        <div className="flex flex-col">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex gap-6 items-start border-t border-[var(--hair)] py-6 px-1.5 transition-[padding] duration-300 hover:pl-3.5"
            >
              <span className="font-mono text-xs text-[var(--muted)] shrink-0 w-[60px] pt-1.5">
                <time dateTime={post.date} suppressHydrationWarning>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </span>
              <span className="flex-1 flex flex-col gap-2">
                <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-[var(--accent)]">
                  {post.tags?.[0] ?? "Writing"}
                </span>
                <h2 className="font-serif font-semibold text-[24px] leading-[1.18] tracking-tight text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                  {post.title}
                </h2>
                <span className="text-[15px] text-[var(--muted)] leading-[1.55] line-clamp-2">
                  {post.excerpt}
                </span>
                <span className="font-mono text-xs text-[var(--muted)]">
                  {post.readingTime} min read
                </span>
              </span>
              <ArrowUpRight className="w-5 h-5 text-[var(--accent)] shrink-0 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
