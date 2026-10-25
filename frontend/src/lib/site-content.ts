import fs from "node:fs";
import path from "node:path";
import { parse } from "yaml";
import { z } from "zod";
import { isPublished } from "./content";

/**
 * Page copy lives in `content/site/*.yaml`, one file per page. Every file is
 * validated here, so a missing or misspelled field fails the build instead of
 * quietly rendering an empty section.
 *
 * Copy may wrap a phrase in single asterisks (`*run on*`) for the italic serif
 * emphasis; <Rich> renders it.
 */

const SITE_DIR = path.join(process.cwd(), "content", "site");

const text = z.string().trim().min(1);

const link = z.strictObject({ label: text, href: text });

const heading = z.strictObject({ eyebrow: text, title: text });

const closing = z.strictObject({ title: text, body: text.optional() });

const meta = z.strictObject({ title: text, description: text });

/** List items that can be hidden from production with `draft: true`. */
const draftable = { draft: z.boolean().optional() };

export const siteSchema = z.strictObject({
  name: text,
  role: text,
  description: text,
  keywords: z.array(text).min(1),
  location: text,
  timezone: text,
  banner: z
    .strictObject({ text, detail: text, cta: link })
    .nullable(),
  nav: z.array(link).min(1),
  footer: z.strictObject({ blurb: text }),
  /** Share-card (Open Graph) line under the name or case-study title. */
  share: z.strictObject({ subline: text }),
});

export const homeSchema = z.strictObject({
  hero: z.strictObject({
    eyebrow: text,
    title: text,
    sub: text,
    primary: link,
    secondary: link,
    footnote: text,
  }),
  runLog: z.strictObject({
    file: text,
    status: text,
    caption: text,
    lines: z
      .array(
        z.strictObject({
          text,
          tone: z.enum(["muted", "ok", "flag", "gate"]),
          indent: z.boolean().optional(),
        }),
      )
      .min(1),
  }),
  proof: z.strictObject({
    items: z.array(text).min(1),
    stack: z.array(text).min(1),
  }),
  principles: heading.extend({
    items: z.array(z.strictObject({ title: text, body: text })).min(1),
  }),
  work: heading.extend({ action: link }),
  /**
   * Real feedback, paraphrased in reported speech (never a fabricated quote)
   * and attributed by role only. Each item traces to a source in the claims ledger.
   */
  feedback: heading.extend({
    note: text,
    items: z.array(
      z.strictObject({ said: text, who: text, where: text, ...draftable }),
    ),
  }),
  ways: heading.extend({
    items: z
      .array(
        z.strictObject({
          key: text,
          title: text,
          body: text,
          href: text,
          tint: z.enum(["blue", "green"]),
        }),
      )
      .min(1),
    action: text,
  }),
  writing: heading.extend({ action: link }),
  closing,
});

export const workWithMeSchema = z.strictObject({
  meta,
  intro: z.strictObject({ eyebrow: text, title: text, sub: text }),
  anchors: z.strictObject({ roles: text, builds: text }),
  roles: z.strictObject({
    title: text,
    body: text,
    bringTitle: text,
    bring: z.array(text).min(1),
  }),
  builds: z.strictObject({
    title: text,
    tagline: text,
    body: text,
    offers: z
      .array(
        z.strictObject({
          title: text,
          body: text,
          includes: z.array(text).optional(),
          /** Rendered as the dark card. */
          featured: z.boolean().optional(),
        }),
      )
      .min(1),
  }),
  process: z.strictObject({
    title: text,
    steps: z.array(z.strictObject({ title: text, body: text })).min(1),
  }),
  closing,
});

export const aboutSchema = z.strictObject({
  meta,
  eyebrow: text,
  title: text,
  lead: text,
  story: z.array(text).min(1),
  experienceTitle: text,
  experience: z
    .array(
      z.strictObject({ role: text, org: text, dates: text, ...draftable }),
    )
    .min(1),
});

export const workSchema = z.strictObject({
  meta,
  eyebrow: text,
  title: text,
  sub: text,
  empty: z.strictObject({ label: text, body: text }),
  alsoBuilt: z.strictObject({
    title: text,
    items: z.array(
      z.strictObject({
        title: text,
        descriptor: text,
        body: text,
        year: z.number().int(),
        href: text.optional(),
        ...draftable,
      }),
    ),
  }),
  caseStudy: z.strictObject({
    eyebrow: text,
    back: text,
    diagramTitle: text,
    /** Badges on diagram stages marked `human` or `model`. */
    markers: z.strictObject({ human: text, model: text }),
    closing,
  }),
});

export const contactSchema = z.strictObject({
  meta,
  eyebrow: text,
  title: text,
  sub: text,
  bookLabel: text,
  form: z.strictObject({
    title: text,
    inquiryTypes: z.array(text).min(1),
    messagePlaceholder: text,
  }),
});

export const writingSchema = z.strictObject({
  meta,
  eyebrow: text,
  title: text,
  sub: text,
  empty: z.strictObject({ label: text, body: text }),
});

export const notFoundSchema = z.strictObject({
  eyebrow: text,
  title: text,
  body: text,
  primary: link,
  secondary: link,
});

export type SiteContent = z.infer<typeof siteSchema>;
export type HomeContent = z.infer<typeof homeSchema>;
export type WorkWithMeContent = z.infer<typeof workWithMeSchema>;
export type AboutContent = z.infer<typeof aboutSchema>;
export type WorkContent = z.infer<typeof workSchema>;
export type ContactContent = z.infer<typeof contactSchema>;
export type NotFoundContent = z.infer<typeof notFoundSchema>;
export type WritingContent = z.infer<typeof writingSchema>;

export const siteFiles = {
  site: siteSchema,
  home: homeSchema,
  "work-with-me": workWithMeSchema,
  about: aboutSchema,
  work: workSchema,
  contact: contactSchema,
  writing: writingSchema,
  "not-found": notFoundSchema,
} as const;

/** Parse and validate one YAML file; the error names the file and the field. */
export function parseSiteFile<S extends z.ZodType>(
  name: string,
  schema: S,
  raw: string,
): z.infer<S> {
  const result = schema.safeParse(parse(raw));
  if (!result.success) {
    throw new Error(
      `content/site/${name}.yaml is invalid:\n${z.prettifyError(result.error)}`,
    );
  }
  return result.data;
}

// Read on every call (no memo) so edits show up in `next dev` without a restart.
function load<K extends keyof typeof siteFiles>(
  name: K,
): z.infer<(typeof siteFiles)[K]> {
  const raw = fs.readFileSync(path.join(SITE_DIR, `${name}.yaml`), "utf8");
  // TS can't narrow the indexed schema through the generic; the parse is still checked.
  return parseSiteFile(name, siteFiles[name], raw) as z.infer<(typeof siteFiles)[K]>;
}

export const getSite = () => load("site");

export function getHome(): HomeContent {
  const home = load("home");
  return {
    ...home,
    feedback: {
      ...home.feedback,
      items: home.feedback.items.filter((i) => isPublished(i)),
    },
  };
}
export const getWorkWithMe = () => load("work-with-me");
export const getContact = () => load("contact");
export const getWriting = () => load("writing");
export const getNotFound = () => load("not-found");

export function getAbout(): AboutContent {
  const about = load("about");
  return { ...about, experience: about.experience.filter((e) => isPublished(e)) };
}

export function getWorkPage(): WorkContent {
  const work = load("work");
  return {
    ...work,
    alsoBuilt: {
      ...work.alsoBuilt,
      items: work.alsoBuilt.items.filter((i) => isPublished(i)),
    },
  };
}
