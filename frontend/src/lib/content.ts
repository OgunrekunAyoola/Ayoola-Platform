import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

const CONTENT_DIR = path.join(process.cwd(), "content");

const text = z.string().trim().min(1);

// gray-matter turns unquoted YAML dates into Date objects; normalise to YYYY-MM-DD.
const isoDate = z.union([
  text,
  z.date().transform((d) => d.toISOString().slice(0, 10)),
]);

const workFrontmatterSchema = z.strictObject({
  title: text,
  slug: text,
  summary: text,
  /** Who it was for. Anonymised ("Accounting firm, via a consultancy") until naming is cleared. */
  client: text,
  role: text,
  year: z.number().int(),
  /** Honest state of the system: "Live", "Built, not yet enabled", "Pre-pilot". */
  status: text,
  stack: z.array(text).min(1),
  featured: z.boolean(),
  order: z.number(),
  links: z
    .strictObject({ live: z.url().optional(), repo: z.url().optional() })
    .optional(),
  /** Headline numbers shown under the header. */
  facts: z.array(z.strictObject({ value: text, label: text })).optional(),
  /** Architecture flow in order, drawn top to bottom; `marker` flags where a person or the model sits. */
  diagram: z
    .strictObject({
      caption: text,
      stages: z
        .array(
          z.strictObject({
            label: text,
            nodes: z.array(text).min(1),
            marker: z.enum(["human", "model"]).optional(),
          }),
        )
        .min(2),
    })
    .optional(),
  /** Drafts render in `next dev` only. */
  draft: z.boolean().optional(),
});

const writingFrontmatterSchema = z.strictObject({
  title: text,
  slug: text,
  excerpt: text,
  date: isoDate,
  tags: z.array(text),
  readingTime: z.number().positive(),
  /** Optional hero image path. */
  heroImage: text.optional(),
  /** Drafts render in `next dev` only. */
  draft: z.boolean().optional(),
});

export type WorkFrontmatter = z.infer<typeof workFrontmatterSchema>;
export type WritingFrontmatter = z.infer<typeof writingFrontmatterSchema>;
export type WorkDiagram = NonNullable<WorkFrontmatter["diagram"]>;

export interface WorkEntry extends WorkFrontmatter {
  content: string;
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

/**
 * Every file is validated, drafts included, so a bad field fails the build
 * even while the entry is hidden. `slug` must match the file name.
 */
function readMdxEntries<S extends z.ZodType<{ slug: string; draft?: boolean }>>(
  dirName: string,
  schema: S,
): (z.infer<S> & { content: string })[] {
  const dir = path.join(CONTENT_DIR, dirName);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      const result = schema.safeParse(data);
      if (!result.success) {
        throw new Error(
          `content/${dirName}/${file} has invalid frontmatter:\n${z.prettifyError(result.error)}`,
        );
      }
      const expected = file.replace(/\.mdx$/, "");
      if (result.data.slug !== expected) {
        throw new Error(
          `content/${dirName}/${file}: slug "${result.data.slug}" must match the file name "${expected}".`,
        );
      }
      return { ...result.data, content: content.trim() };
    })
    .filter((entry) => isPublished(entry));
}

/** Featured case studies first, then by `order`. */
export function getAllWork(): WorkEntry[] {
  return readMdxEntries("work", workFrontmatterSchema).sort(
    (a, b) => Number(b.featured) - Number(a.featured) || a.order - b.order,
  );
}

export function getWorkBySlug(slug: string): WorkEntry | undefined {
  return getAllWork().find((entry) => entry.slug === slug);
}

export function getAllWriting(): WritingEntry[] {
  return readMdxEntries("writing", writingFrontmatterSchema).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getWritingBySlug(slug: string): WritingEntry | undefined {
  return getAllWriting().find((entry) => entry.slug === slug);
}
