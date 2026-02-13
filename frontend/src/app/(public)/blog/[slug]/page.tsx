import { fetchPost, fetchComments, Comment } from "@/lib/api-client";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
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
    <article className="min-h-screen bg-black text-white py-24 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Back Link */}
        <Link
          href="/blog"
          className="text-yellow-500 hover:text-yellow-400 mb-8 md:mb-12 inline-block transition-colors text-base font-medium"
        >
          ← Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-20 border-b border-neutral-800 pb-16">
          <div className="flex gap-2 mb-8 flex-wrap">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm font-medium text-yellow-500 bg-yellow-500/10 px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-neutral-100 leading-tight tracking-tight">
            {post.title}
          </h1>
          <div className="flex items-center text-neutral-400 text-base gap-6">
            <time dateTime={post.publishedAt} suppressHydrationWarning>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>{post.readingTime} min read</span>
            <div className="flex items-center gap-2">
              <LikeButton postId={post._id} initialLikes={post.likeCount} />
              <ShareButton title={post.title} text={post.excerpt} />
            </div>
          </div>
        </header>

        {/* Hero Image */}
        {post.heroImage && (
          <div className="mb-8 md:mb-12 rounded-xl overflow-hidden border border-neutral-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.heroImage}
              alt={post.title}
              className="w-full h-auto object-cover max-h-[300px] md:max-h-[500px]"
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-invert prose-yellow max-w-none prose-base md:prose-lg prose-headings:font-bold prose-a:text-yellow-500 hover:prose-a:text-yellow-400 prose-img:rounded-xl prose-img:border prose-img:border-neutral-800">
          <ReactMarkdown>{post.content || ""}</ReactMarkdown>
        </div>

        {/* AI Widget */}
        <AskAyoolaWidget postId={post._id} />

        {/* Newsletter Signup */}
        <div className="my-16 p-8 bg-neutral-900/50 border border-neutral-800 rounded-xl">
          <NewsletterForm source="blog_post_footer" />
        </div>

        {/* Footer / Comments Placeholder */}
        <footer className="mt-16 pt-8 border-t border-neutral-800">
          <h3 className="text-2xl font-bold mb-4">
            Comments ({post.commentCount})
          </h3>
          <CommentList comments={comments} />
          <CommentForm postId={post._id} />
        </footer>
      </div>
    </article>
  );
}
