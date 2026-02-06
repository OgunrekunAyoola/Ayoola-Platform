import RSS from "rss";
import { Post } from "@/lib/api-client";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

  const feed = new RSS({
    title: "Ayoola Ogunrekun",
    description: "Writer, Software Engineer, Expert, Entrepreneur, Creator",
    site_url: baseUrl,
    feed_url: `${baseUrl}/feed.xml`,
    copyright: `${new Date().getFullYear()} Ayoola Ogunrekun`,
    language: "en",
    pubDate: new Date(),
  });

  try {
    const res = await fetch(`${apiUrl}/posts?limit=20`);
    const data = await res.json();
    const posts = data.data || [];

    posts.forEach((post: Post) => {
      feed.item({
        title: post.title,
        description: post.excerpt,
        url: `${baseUrl}/blog/${post.slug}`,
        date: post.publishedAt || post.createdAt || new Date().toISOString(),
        author: "Ayoola Ogunrekun",
        categories: post.tags,
      });
    });
  } catch (error) {
    console.error("RSS: Error fetching posts", error);
  }

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
