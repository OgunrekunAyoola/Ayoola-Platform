import { getAllWriting, getWritingBySlug } from "@/lib/content";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import ShareButton from "@/components/ui/ShareButton";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Only pre-built slugs exist; anything else (including drafts in production) is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllWriting().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getWritingBySlug(slug);
  if (!post) {
    return { title: "Post Not Found" };
  }
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: ["Ayoola Ogunrekun"],
      tags: post.tags,
      images: post.heroImage ? [post.heroImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.heroImage ? [post.heroImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getWritingBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-[760px] mx-auto px-5 sm:px-7 pt-14 sm:pt-16 pb-24 sm:pb-[110px]">
      <Link href="/blog" className="btn btn-ghost mb-10">
        ← All writing
      </Link>

      <div className="font-mono text-[12px] tracking-[0.1em] uppercase text-[var(--accent)] mb-[18px]">
        {post.tags?.[0] ?? "Writing"} · {post.readingTime} min read
      </div>
      <h1 className="text-[clamp(36px,5vw,60px)] leading-[1.08] tracking-[-0.02em] mb-7">
        {post.title}
      </h1>

      <div className="flex items-center gap-3.5 pb-7 mb-10 border-b border-[var(--hair)]">
        <span
          aria-hidden="true"
          className="w-10 h-10 shrink-0 rounded-full bg-[var(--btn)] text-[var(--btn-fg)] flex items-center justify-center font-serif italic text-[18px]"
        >
          a
        </span>
        <span className="flex flex-col gap-0.5">
          <span className="text-[15px] font-semibold">Ayoola Ogunrekun</span>
          <span className="font-mono text-[12px] text-[var(--muted)]">
            <time dateTime={post.date} suppressHydrationWarning>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </span>
        </span>
        <ShareButton title={post.title} text={post.excerpt} className="ml-auto" />
      </div>

      {post.heroImage && (
        <div className="relative mb-10 aspect-[16/9] rounded-[22px] overflow-hidden">
          <Image
            src={post.heroImage}
            alt={post.title}
            fill
            sizes="(max-width: 760px) 100vw, 760px"
            className="object-cover"
          />
        </div>
      )}

      <div className="prose prose-tokens prose-lg max-w-none prose-p:leading-[1.75] prose-a:no-underline hover:prose-a:underline prose-img:rounded-[18px]">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}
