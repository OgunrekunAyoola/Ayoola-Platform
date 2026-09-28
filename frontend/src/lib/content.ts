import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface WorkLinks {
  live?: string;
  repo?: string;
}

export interface WorkFrontmatter {
  title: string;
  slug: string;
  summary: string;
  role: string;
  client: string;
  year: number;
  stack: string[];
  featured: boolean;
  order: number;
  links?: WorkLinks;
  /** Drafts render in `next dev` only. */
  draft?: boolean;
}

export interface WorkEntry extends WorkFrontmatter {
  content: string;
}

export interface WritingFrontmatter {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  tags: string[];
  readingTime: number;
  /** Optional hero image path; not part of the required schema. */
  heroImage?: string;
  /** Drafts render in `next dev` only. */
  draft?: boolean;
}

export interface WritingEntry extends WritingFrontmatter {
  content: string;
}

/**
 * Drafts are visible in development and hidden everywhere in production:
 * listings, detail pages, the sitemap and RSS all read through here.
 */
export function isPublished(
  frontmatter: { draft?: unknown },
  nodeEnv: string | undefined = process.env.NODE_ENV,
): boolean {
  return nodeEnv !== "production" || frontmatter.draft !== true;
}

function readMdxEntries<T extends { draft?: boolean }>(
  dirName: string,
): (T & { content: string })[] {
  const dir = path.join(CONTENT_DIR, dirName);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      return { ...(data as T), content: content.trim() };
    })
    .filter((entry) => isPublished(entry));
}

/** Featured case studies first, then by `order`. */
export function getAllWork(): WorkEntry[] {
  return readMdxEntries<WorkFrontmatter>("work").sort(
    (a, b) => Number(b.featured) - Number(a.featured) || a.order - b.order,
  );
}

export function getWorkBySlug(slug: string): WorkEntry | undefined {
  return getAllWork().find((entry) => entry.slug === slug);
}

export function getAllWriting(): WritingEntry[] {
  return readMdxEntries<WritingFrontmatter>("writing").sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getWritingBySlug(slug: string): WritingEntry | undefined {
  return getAllWriting().find((entry) => entry.slug === slug);
}
