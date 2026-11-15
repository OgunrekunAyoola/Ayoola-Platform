import fs from "node:fs";
import path from "node:path";
import { parse } from "yaml";
import { z } from "zod";
import { getAllWriting, isPublished } from "./content";

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

const meta = z.strictObject({ title: text, description: text });

/** List items that can be hidden from production with `draft: true`. */
const draftable = { draft: z.boolean().optional() };

/** Decorative run-log card: shown beside the AI intro on Services and in the AI section on Home. */
const runLog = z.strictObject({
  file: text,
  status: text,
  lines: z
    .array(
      z.strictObject({
        text,
        tone: z.enum(["muted", "ok", "flag", "gate"]),
        indent: z.boolean().optional(),
      }),
    )
    .min(1),
});

const fact = z.strictObject({ value: text, label: text });

/**
 * An offer card. `featured` renders it as the green card. `price` is display
 * text only (no checkout); offers without one show the "quoted after a call" line.
 */
const offer = z.strictObject({
  title: text,
  body: text,
  includes: z.array(text).optional(),
  featured: z.boolean().optional(),
  price: text.optional(),
  priceNote: text.optional(),
});

/** A case study cited as proof, by slug; the page shows its title and honest status. */
const proof = z.array(z.strictObject({ slug: text, note: text })).min(1);

const principles = heading.extend({
  items: z.array(z.strictObject({ title: text, body: text })).min(1),
});

export const siteSchema = z.strictObject({
  name: text,
  role: text,
  /** Small green tag after the name in the header ("— engineer"). */
  headerTag: text,
  /** Status line in the hero and the mobile menu card. */
  availability: text,
  description: text,
  keywords: z.array(text).min(1),
  location: text,
  timezone: text,
  /** Header, footer and mobile-menu navigation; `desc` shows in the mobile menu. */
  nav: z
    .array(
      z.strictObject({
        label: text,
        href: text,
        desc: text,
        /** Hidden until at least one post is published (Writing). */
        onlyWithPosts: z.boolean().optional(),
      }),
    )
    .min(1),
  menuCard: z.strictObject({ title: text }),
  footer: z.strictObject({
    cta: text,
    tagline: text,
    /** Pages listed in the footer after the nav links. */
    moreLinks: z.array(z.strictObject({ label: text, href: text })),
    basedIn: z.array(text).min(1),
  }),
  /** Share-card (Open Graph) line under the name or case-study title. */
  share: z.strictObject({ subline: text }),
});

export const homeSchema = z.strictObject({
  hero: z.strictObject({
    title: text,
    sub: text,
    primary: link,
    secondary: link,
  }),
  /** Big Syne words scrolling under the hero. */
  marquee: z.array(text).min(2),
  intro: z.strictObject({
    statement: text,
    /** Line under the name on the portrait card. */
    portraitLine: text,
    facts: z.array(fact).min(1),
  }),
  services: heading.extend({
    aside: text,
    items: z.array(z.strictObject({ title: text, body: text, href: text })).min(1),
  }),
  work: heading.extend({ action: link }),
  /** AI systems teaser; the run log comes from the AI section of services.yaml. */
  ai: heading.extend({ body: text, points: z.array(text).min(1), action: link }),
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
  /** Mono tech names scrolling the other way. */
  stack: z.array(text).min(2),
  /** Rescue & security audit, low on the page; its prices come from services.yaml. */
  rescue: heading.extend({ body: text, primary: link, secondary: link }),
  principles,
  writing: heading.extend({ action: link }),
});

/** One of the three sections on /services. `nav` is its on-page link label. */
const serviceSection = z.strictObject({ nav: text, eyebrow: text, title: text, tagline: text, body: text });

/** A small titled list (rendered as a mono subhead over the items). */
const titledList = z.strictObject({ title: text, items: z.array(text).min(1) });

export const servicesSchema = z.strictObject({
  meta,
  intro: z.strictObject({ eyebrow: text, title: text, sub: text }),
  proofTitle: text,
  /** Price line for offers that don't show a price. */
  quoted: text,
  rescue: serviceSection.extend({
    /** The only priced offers on the site. */
    offers: z.array(offer.required({ price: true })).min(1),
    retainer: text,
    checks: titledList,
    proof,
    cta: text,
  }),
  builds: serviceSection.extend({
    offer,
    process: z.strictObject({
      title: text,
      steps: z.array(z.strictObject({ title: text, body: text })).min(1),
    }),
    proof,
  }),
  ai: serviceSection.extend({
    log: runLog,
    offers: z.array(offer).min(1),
    principles: z.strictObject({
      title: text,
      items: z.array(z.strictObject({ title: text, body: text })).min(1),
    }),
    proof,
  }),
});

export const aboutSchema = z.strictObject({
  meta,
  eyebrow: text,
  title: text,
  lead: text,
  /** Pills over the portrait. The last one is green. */
  chips: z.array(text).min(1),
  storyTitle: text,
  story: z.array(text).min(1),
  toolkitTitle: text,
  toolkit: z.array(z.strictObject({ title: text, items: z.array(text).min(1) })).min(1),
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
    /**
     * `key` is what `/contact?type=<key>` preselects; nothing is selected
     * without it. `messageLabel` replaces the message label while selected.
     */
    inquiryTypes: z
      .array(
        z.strictObject({
          key: z.string().regex(/^[a-z-]+$/),
          label: text,
          messageLabel: text.optional(),
        }),
      )
      .min(1)
      .refine((types) => new Set(types.map((t) => t.key)).size === types.length, {
        message: "inquiry type keys must be unique",
      }),
    messageLabel: text,
    messagePlaceholder: text,
    /** Shown when the server can't send: opens the visitor's mail app, prefilled. */
    fallbackCta: text,
    sent: z.strictObject({ title: text, body: text, again: text }),
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
export type ServicesContent = z.infer<typeof servicesSchema>;
export type Offer = z.infer<typeof offer>;
export type AboutContent = z.infer<typeof aboutSchema>;
export type WorkContent = z.infer<typeof workSchema>;
export type ContactContent = z.infer<typeof contactSchema>;
export type NotFoundContent = z.infer<typeof notFoundSchema>;
export type WritingContent = z.infer<typeof writingSchema>;

export const siteFiles = {
  site: siteSchema,
  home: homeSchema,
  services: servicesSchema,
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

/** True once at least one post is published (drafts don't count outside development). */
export const hasPosts = () => getAllWriting().length > 0;

/** Site copy, with Writing left out of the nav until there's a post to read. */
export function getSite(): SiteContent {
  const site = load("site");
  const posts = hasPosts();
  return { ...site, nav: site.nav.filter((item) => posts || !item.onlyWithPosts) };
}

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
export const getServices = () => load("services");
export const getContact = () => load("contact");
export const getWriting = () => load("writing");
export const getNotFound = () => load("not-found");

export const getAbout = () => load("about");

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
