'use client';

import { useState } from 'react';
import { createComment } from '@/lib/api-client';

interface CommentFormProps {
  postId: string;
}

export default function CommentForm({ postId }: CommentFormProps) {
  const [formData, setFormData] = useState({
    authorName: '',
    authorEmail: '',
    body: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await createComment(postId, formData);
      setSuccess(true);
      setFormData({ authorName: '', authorEmail: '', body: '' });
    } catch (err) {
      console.error('Failed to submit comment:', err);
      setError('Failed to submit comment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-neutral-900/30 p-6 rounded-lg border border-neutral-800 mt-12">
      <h3 className="text-xl font-bold mb-6">Leave a Comment</h3>
      
      {success && (
        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 text-green-500 rounded-lg">
          Comment submitted for review! It will appear once approved.
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="authorName" className="block text-sm font-medium text-neutral-400 mb-1">
              Name
            </label>
            <input
              type="text"
              id="authorName"
              name="authorName"
              value={formData.authorName}
              onChange={handleChange}
              required
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-500 transition-colors"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label htmlFor="authorEmail" className="block text-sm font-medium text-neutral-400 mb-1">
              Email (not published)
            </label>
            <input
              type="email"
              id="authorEmail"
              name="authorEmail"
              value={formData.authorEmail}
              onChange={handleChange}
              required
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-500 transition-colors"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="body" className="block text-sm font-medium text-neutral-400 mb-1">
            Comment
          </label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            required
            rows={4}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-500 transition-colors resize-none"
            placeholder="Share your thoughts..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-yellow-500 text-black font-bold py-2 px-6 rounded-lg hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Submitting...' : 'Post Comment'}
        </button>
      </form>
    </div>
  );
}
