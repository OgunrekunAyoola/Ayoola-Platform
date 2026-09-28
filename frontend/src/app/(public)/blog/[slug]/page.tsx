import { getAllWriting, getWritingBySlug } from "@/lib/content";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import ShareButton from "@/components/ui/ShareButton";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

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
    <article className="max-w-[720px] mx-auto px-5 sm:px-7 pt-16 pb-24">
      <Link href="/blog" className="btn btn-ghost !pl-0 mb-7">
        <ArrowLeft className="w-4 h-4" />
        All writing
      </Link>

      {/* Header */}
      <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-[var(--accent)] mb-3.5">
        {post.tags?.[0] ?? "Writing"} · {post.readingTime} min read
      </div>
      <h1 className="font-serif font-extrabold tracking-tight leading-[1.08] text-[clamp(32px,4.4vw,48px)] text-[var(--foreground)] mb-5">
        {post.title}
      </h1>

      <div className="flex items-center gap-3 pb-7 mb-9 border-b border-[var(--hair)]">
        <span className="w-9 h-9 rounded-full bg-[var(--accent)] text-[var(--accent-contrast)] flex items-center justify-center font-serif font-bold text-[15px]">
          A
        </span>
        <span className="flex flex-col leading-[1.3]">
          <span className="text-sm font-semibold text-[var(--foreground)]">
            Ayoola Ogunrekun
          </span>
          <span className="font-mono text-xs text-[var(--muted)]">
            <time dateTime={post.date} suppressHydrationWarning>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </span>
        </span>
        <div className="flex items-center gap-2 ml-auto">
          <ShareButton title={post.title} text={post.excerpt} />
        </div>
      </div>

      {/* Hero Image */}
      {post.heroImage && (
        <div className="relative mb-10 aspect-[16/9] rounded-2xl overflow-hidden border border-[var(--card-border)]">
          <Image
            src={post.heroImage}
            alt={post.title}
            fill
            sizes="(max-width: 720px) 100vw, 720px"
            className="object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="prose dark:prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:tracking-tight prose-a:text-[var(--accent)] prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-blockquote:border-l-[var(--accent)] prose-blockquote:font-serif prose-blockquote:not-italic">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}
