import { fetchPost, fetchComments, Comment } from "@/lib/api-client";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import LikeButton from "@/components/blog/LikeButton";
import ShareButton from "@/components/ui/ShareButton";
import CommentList from "@/components/blog/CommentList";
import CommentForm from "@/components/blog/CommentForm";
import NewsletterForm from "@/components/newsletter/NewsletterForm";
import AskAyoolaWidget from "@/components/blog/AskAyoolaWidget";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await fetchPost(slug);
    return {
      title: `${post.title} | Ayoola`,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: "article",
        publishedTime: post.publishedAt,
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
  } catch {
    return {
      title: "Post Not Found | Ayoola",
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  let post;
  let comments: Comment[] = [];

  try {
    post = await fetchPost(slug);
    if (post) {
      comments = await fetchComments(post._id);
    }
  } catch (error) {
    console.error("Error fetching post:", error);
    notFound();
  }

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
        <span className="w-9 h-9 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-serif font-bold text-[15px]">
          A
        </span>
        <span className="flex flex-col leading-[1.3]">
          <span className="text-sm font-semibold text-[var(--foreground)]">
            Ayoola Ogunrekun
          </span>
          <span className="font-mono text-xs text-[var(--muted)]">
            <time dateTime={post.publishedAt} suppressHydrationWarning>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </span>
        </span>
        <div className="flex items-center gap-2 ml-auto">
          <LikeButton postId={post._id} initialLikes={post.likeCount} />
          <ShareButton title={post.title} text={post.excerpt} />
        </div>
      </div>

      {/* Hero Image */}
      {post.heroImage && (
        <div className="mb-10 rounded-2xl overflow-hidden border border-[var(--card-border)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.heroImage}
            alt={post.title}
            className="w-full h-auto object-cover max-h-[500px]"
          />
        </div>
      )}

      {/* Content */}
      <div className="prose dark:prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:tracking-tight prose-a:text-[var(--accent)] prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-blockquote:border-l-[var(--accent)] prose-blockquote:font-serif prose-blockquote:not-italic">
        <ReactMarkdown>{post.content || ""}</ReactMarkdown>
      </div>

      {/* AI Widget */}
      <AskAyoolaWidget postId={post._id} />

      {/* Newsletter Signup */}
      <div className="my-14 glass rounded-2xl p-8">
        <NewsletterForm source="blog_post_footer" />
      </div>

      {/* Comments */}
      <footer className="mt-14 pt-8 border-t border-[var(--hair)]">
        <h3 className="font-serif text-2xl font-bold text-[var(--foreground)] mb-5">
          Comments ({post.commentCount})
        </h3>
        <CommentList comments={comments} />
        <CommentForm postId={post._id} />
      </footer>
    </article>
  );
}
