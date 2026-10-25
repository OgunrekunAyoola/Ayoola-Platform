import RSS from "rss";
import { getAllWriting } from "@/lib/content";
import { getSiteUrl } from "@/lib/site-url";
import { getSite } from "@/lib/site-content";

export async function GET() {
  const baseUrl = getSiteUrl();
  const site = getSite();

  const feed = new RSS({
    title: site.name,
    description: site.description,
    site_url: baseUrl,
    feed_url: `${baseUrl}/feed.xml`,
    copyright: `${new Date().getFullYear()} ${site.name}`,
    language: "en",
    pubDate: new Date(),
  });

  for (const post of getAllWriting()) {
    feed.item({
      title: post.title,
      description: post.excerpt,
      url: `${baseUrl}/blog/${post.slug}`,
      date: post.date,
      author: "Ayoola Ogunrekun",
      categories: post.tags,
    });
  }

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
