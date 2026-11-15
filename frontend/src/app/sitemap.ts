import { MetadataRoute } from "next";
import { getAllWork, getAllWriting } from "@/lib/content";
import { hasPosts } from "@/lib/site-content";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "yearly", priority: 1 },
    { url: `${baseUrl}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/portfolio`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/about`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/contact`, changeFrequency: "yearly", priority: 0.5 },
    // Writing stays out until the first post is published.
    ...(hasPosts() ? [{ url: `${baseUrl}/blog`, changeFrequency: "weekly" as const, priority: 0.6 }] : []),
  ];

  const workEntries: MetadataRoute.Sitemap = getAllWork().map((project) => ({
    url: `${baseUrl}/portfolio/${project.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const writingEntries: MetadataRoute.Sitemap = getAllWriting().map(
    (post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "weekly",
      priority: 0.7,
    }),
  );

  return [...staticEntries, ...workEntries, ...writingEntries];
}
