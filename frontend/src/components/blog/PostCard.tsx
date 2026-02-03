import Link from 'next/link';
import { Post } from '@/lib/api-client';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="flex flex-col bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden hover:border-yellow-500 transition-colors duration-300">
      {/* Image Placeholder - We can add real image support later if heroImage is present */}
      <div className="h-48 bg-neutral-800 w-full relative">
        {post.heroImage ? (
           // eslint-disable-next-line @next/next/no-img-element
          <img 
            src={post.heroImage} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-600">
            <span className="text-4xl">📝</span>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex gap-2 mb-3 flex-wrap">
          {post.tags.map(tag => (
            <span key={tag} className="text-xs font-medium text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded">
              #{tag}
            </span>
          ))}
        </div>

        <Link href={`/blog/${post.slug}`} className="group">
          <h2 className="text-xl font-bold text-neutral-100 mb-2 group-hover:text-yellow-500 transition-colors">
            {post.title}
          </h2>
        </Link>

        <p className="text-neutral-400 text-sm mb-4 line-clamp-3 flex-grow">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between text-xs text-neutral-500 mt-auto pt-4 border-t border-neutral-800">
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
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
