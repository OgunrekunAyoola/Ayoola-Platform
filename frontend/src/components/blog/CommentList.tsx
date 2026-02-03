import { Comment } from '@/lib/api-client';

interface CommentListProps {
  comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div className="bg-neutral-900/50 p-6 rounded-lg border border-neutral-800 text-center text-neutral-400">
        <p>No comments yet. Be the first to share your thoughts!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div key={comment._id} className="bg-neutral-900/30 p-6 rounded-lg border border-neutral-800">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="font-bold text-neutral-200">{comment.authorName}</h4>
              <time className="text-xs text-neutral-500">
                {new Date(comment.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
          </div>
          <p className="text-neutral-300 whitespace-pre-wrap">{comment.body}</p>
        </div>
      ))}
    </div>
  );
}
