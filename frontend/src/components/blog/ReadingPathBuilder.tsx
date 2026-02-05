"use client";

import { useState } from "react";
import { generateReadingPath, Post } from "@/lib/api-client";
import Link from "next/link";
import {
  SparklesIcon,
  BookOpenIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";

interface ReadingPathBuilderProps {
  postCount: number;
}

interface PathItem {
  _id: string;
  title: string;
  slug: string;
  why: string;
}

interface PathResult {
  intro: string;
  path: PathItem[];
}

export default function ReadingPathBuilder({
  postCount,
}: ReadingPathBuilderProps) {
  const [goal, setGoal] = useState("");
  const [result, setResult] = useState<PathResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Only render if we have enough posts for a meaningful path
  if (postCount < 3) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal.trim() || goal.length < 5) {
      setError(
        "Please enter a specific learning goal (at least 5 characters).",
      );
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await generateReadingPath(goal);
      setResult(data as unknown as PathResult);
    } catch (err: any) {
      setError(
        err.message || "Failed to generate reading path. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-12 md:mb-16 bg-neutral-900/30 border border-yellow-500/20 rounded-xl overflow-hidden">
      <div className="p-6 md:p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 bg-yellow-500/10 rounded-xl hidden sm:block">
            <BookOpenIcon className="w-8 h-8 text-yellow-500" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-neutral-100 flex items-center gap-2">
              <span className="sm:hidden text-yellow-500">
                <BookOpenIcon className="w-6 h-6" />
              </span>
              Curate Your Learning Path
            </h2>
            <p className="text-neutral-400 mt-2 text-sm md:text-base">
              Tell me what you want to learn, and I'll build a custom reading
              list from my articles.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="relative max-w-2xl">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g., I want to master Next.js authentication..."
                className="w-full bg-black border border-neutral-800 rounded-lg py-3 md:py-4 pl-4 pr-12 text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all"
                disabled={loading}
              />
              <SparklesIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-600 pointer-events-none" />
            </div>
            <button
              type="submit"
              disabled={loading || !goal.trim()}
              className="px-6 py-3 md:py-4 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
            >
              {loading ? "Curating..." : "Generate Path"}
            </button>
          </div>
          {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}
        </form>

        {result && (
          <div className="mt-8 animate-fade-in-up">
            <div className="p-4 bg-yellow-500/5 rounded-lg border border-yellow-500/10 mb-6">
              <p className="text-neutral-300 italic">"{result.intro}"</p>
            </div>

            <div className="space-y-4">
              {result.path.map((item, index) => (
                <Link
                  key={item._id}
                  href={`/blog/${item.slug}`}
                  className="block group bg-neutral-900/50 hover:bg-neutral-800 border border-neutral-800 hover:border-yellow-500/30 rounded-lg p-4 transition-all"
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-800 text-yellow-500 flex items-center justify-center font-bold border border-neutral-700 group-hover:border-yellow-500/50 transition-colors">
                      {index + 1}
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-bold text-lg text-neutral-200 group-hover:text-yellow-500 transition-colors flex items-center gap-2">
                        {item.title}
                        <ArrowRightIcon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
                      </h3>
                      <p className="text-sm text-neutral-400 mt-1">
                        {item.why}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
