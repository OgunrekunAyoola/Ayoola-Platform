'use client';

import { useState } from 'react';
import { likePost } from '@/lib/api-client';

interface LikeButtonProps {
  postId: string;
  initialLikes: number;
}

export default function LikeButton({ postId, initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [loading, setLoading] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);

  const handleLike = async () => {
    if (loading) return;
    
    // Optimistic update
    setLoading(true);
    // If we were tracking "hasLiked" locally without auth, we could prevent multiple likes per session
    // For now, we'll just allow it or rely on the API. 
    // The spec says "No auth" for likes.
    
    try {
      const res = await likePost(postId);
      setLikes(res.likeCount);
      setHasLiked(true);
    } catch (error) {
      console.error('Failed to like post:', error);
      // Revert if needed, but for simple like count, maybe just ignore
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={loading}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300
        ${hasLiked 
          ? 'bg-red-500/20 text-red-500 border-red-500/50' 
          : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-red-400 border border-neutral-700'
        }
      `}
      aria-label="Like this post"
    >
      <span className={`text-lg ${hasLiked ? 'scale-110' : ''} transition-transform`}>
        {hasLiked ? '♥' : '♡'}
      </span>
      <span className="font-medium">{likes}</span>
    </button>
  );
}
