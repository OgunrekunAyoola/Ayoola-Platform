import Link from "next/link";
import { getAllWriting } from "@/lib/content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Notes on building systems, the discipline of shipping, and reading code you didn't write.",
};

export default function BlogPage() {
  const posts = getAllWriting();

  return (
    <section className="max-w-[1000px] mx-auto px-5 sm:px-7 pt-16 sm:pt-20 pb-24 sm:pb-[110px]">
      <div className="eyebrow mb-6">Blog</div>
      <h1 className="text-[clamp(44px,6vw,84px)] leading-[1.02] tracking-[-0.03em] mb-6">
        <em>Writing.</em>
      </h1>
      <p className="text-[17.5px] sm:text-[19px] leading-[1.6] text-[var(--muted)] max-w-[540px] mb-12 sm:mb-16">
        Notes on building systems, the discipline of shipping, and reading code
        you didn&apos;t write.
      </p>

      {posts.length === 0 ? (
        <div className="rounded-[28px] bg-[var(--surface)] grid [grid-template-columns:10%_1fr] overflow-hidden min-h-[220px]">
          <div className="bg-[var(--tint-green)]" />
          <div className="flex flex-col items-start justify-center gap-[18px] p-7 sm:p-14">
            <span className="font-mono text-[12.5px] text-[var(--muted)]">{"// in progress"}</span>
            <p className="font-serif font-medium text-[26px] sm:text-[32px] leading-[1.2] max-w-[22ch]">
              No posts published yet. Check back soon.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col border-b border-[var(--hair)]">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group grid [grid-template-columns:1fr_auto] sm:[grid-template-columns:90px_1fr_auto] gap-x-7 gap-y-2 items-start py-8 sm:py-[34px] border-t border-[var(--hair)] transition-[padding] duration-300 sm:hover:pl-3"
            >
              <span className="col-span-2 sm:col-span-1 font-mono text-[12.5px] text-[var(--muted)] sm:pt-2">
                <time dateTime={post.date} suppressHydrationWarning>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </span>
              <span className="flex flex-col gap-2.5 min-w-0">
                <span className="font-mono text-[11.5px] tracking-[0.08em] uppercase text-[var(--accent)]">
                  {post.tags?.[0] ?? "Writing"}
                </span>
                <h2 className="text-[26px] sm:text-[32px] leading-[1.15] tracking-[-0.01em]">
                  {post.title}
                </h2>
                <span className="text-[16px] leading-[1.55] text-[var(--muted)] line-clamp-2">
                  {post.excerpt}
                </span>
                <span className="font-mono text-[12px] text-[var(--muted)]">
                  {post.readingTime} min read
                </span>
              </span>
              <span
                aria-hidden="true"
                className="w-[46px] h-[46px] rounded-full border-[1.5px] border-[var(--foreground)] flex items-center justify-center text-[18px] transition-colors group-hover:bg-[var(--foreground)] group-hover:text-[var(--background)]"
              >
                ↗
              </span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
