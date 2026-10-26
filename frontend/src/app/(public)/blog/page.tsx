import Link from "next/link";
import { getAllWriting } from "@/lib/content";
import { Metadata } from "next";
import Rich from "@/components/ui/Rich";
import { getWriting } from "@/lib/site-content";

export const generateMetadata = (): Metadata => getWriting().meta;

export default function BlogPage() {
  const page = getWriting();
  const posts = getAllWriting();

  return (
    <section className="max-w-[1000px] mx-auto px-7 pt-[clamp(56px,7vw,96px)] pb-[clamp(72px,9vw,120px)]">
      <div className="eyebrow mb-6">{page.eyebrow}</div>
      <h1 className="text-[clamp(37px,5.15vw,81px)] leading-[1.02] m-0 mb-6">
        <Rich text={page.title} />
      </h1>
      <p className="text-[18px] leading-[1.6] text-[var(--muted)] max-w-[540px] m-0 mb-16">{page.sub}</p>

      {posts.length === 0 ? (
        <div className="rounded-[24px] border border-dashed border-[var(--placeholder)] bg-[var(--card)] flex flex-col items-start justify-center gap-[18px] p-[clamp(32px,5vw,64px)] min-h-[240px]">
          <span className="font-mono text-[12.5px] text-[var(--muted)]">{page.empty.label}</span>
          <p className="display text-[clamp(20px,2.34vw,31px)] leading-[1.2] m-0 max-w-[24ch]">{page.empty.body}</p>
        </div>
      ) : (
        <div className="flex flex-col border-b border-[var(--hair)]">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="no-underline text-[var(--foreground)] grid [grid-template-columns:1fr_auto] sm:[grid-template-columns:90px_1fr_auto] gap-x-7 gap-y-2 items-start py-[34px] border-t border-[var(--hair)] transition-transform duration-[350ms] ease-[cubic-bezier(.2,.8,.2,1)] hover:translate-x-1.5"
            >
              <span className="col-span-2 sm:col-span-1 font-mono text-[12.5px] text-[var(--muted)] sm:pt-2.5">
                {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
              </span>
              <span className="flex flex-col gap-2.5 min-w-0">
                <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-[var(--accent)]">
                  {post.tags[0] ?? page.eyebrow}
                </span>
                <h2 className="text-[28px] leading-[1.12] m-0">{post.title}</h2>
                <span className="text-[16px] leading-[1.55] text-[var(--muted)]">{post.excerpt}</span>
                <span className="font-mono text-[12px] text-[var(--muted)]">{post.readingTime} min read</span>
              </span>
              <span aria-hidden="true" className="arrow text-[20px] text-[var(--accent)] flex-none">
                →
              </span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
