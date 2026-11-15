import type { Metadata } from "next";
import { getSite, hasPosts } from "./site-content";

interface PageMetaInput {
  /** Page title; the root template adds " | Ayoola Ogunrekun". Omit for the home page. */
  title?: string;
  description: string;
  /** Path of the page, e.g. "/services". Resolved against NEXT_PUBLIC_SITE_URL (metadataBase). */
  path: string;
}

/**
 * Per-page metadata: canonical URL plus Open Graph and Twitter text. Next
 * replaces (doesn't merge) these objects from the root layout, so every page
 * sets all of them. Share images come from each route's opengraph-image file.
 */
export function pageMetadata({ title, description, path }: PageMetaInput): Metadata {
  const site = getSite();
  const shareTitle = title ? `${title} | ${site.name}` : site.name;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical: path,
      ...(hasPosts() ? { types: { "application/rss+xml": "/feed.xml" } } : {}),
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: site.name,
      url: path,
      title: shareTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
    },
  };
}
