import fs from "node:fs";
import path from "node:path";
import { describe, it, expect, afterEach } from "vitest";
import { bookingCta } from "@/config/site";
import { getAllWork } from "./content";
import { getAbout, getHome, getServices, getSite, servicesSchema } from "./site-content";

const SITE_DIR = path.join(process.cwd(), "content", "site");
const yamlFiles = fs.readdirSync(SITE_DIR).filter((f) => f.endsWith(".yaml"));
const allCopy = yamlFiles.map((f) => [f, fs.readFileSync(path.join(SITE_DIR, f), "utf8")] as const);

/** Routes that exist, with the anchors each one has. */
const routes: Record<string, string[]> = {
  "/": [],
  "/services": ["rescue", "builds", "ai"],
  "/portfolio": [],
  "/about": [],
  "/contact": [],
  "/blog": [],
  ...Object.fromEntries(getAllWork().map((w) => [`/portfolio/${w.slug}`, []])),
};

describe("site structure", () => {
  const prevEnv = process.env.NODE_ENV;
  afterEach(() => {
    (process.env as Record<string, string>).NODE_ENV = prevEnv ?? "test";
  });

  it("navigates Services · Work · About, with Writing hidden until a post is published", () => {
    (process.env as Record<string, string>).NODE_ENV = "production";
    // The only post is a draft, so production has no posts.
    expect(getSite().nav.map((n) => n.href)).toEqual(["/services", "/portfolio", "/about"]);
  });

  it("keeps Writing in the nav config, flagged to appear once there's a post", () => {
    (process.env as Record<string, string>).NODE_ENV = "development";
    expect(getSite().nav.map((n) => n.href)).toContain("/blog");
  });

  it.each(allCopy)("%s links only to routes and anchors that exist", (_file, raw) => {
    // Real `href:` keys only (not mentions in comments).
    const hrefs = [...raw.matchAll(/^\s*href:\s*"?([^\s"]+)"?\s*$/gm)].map((m) => m[1]);
    for (const href of hrefs) {
      if (/^https?:|^mailto:/.test(href)) continue;
      const [pathAndQuery, hash] = href.split("#");
      const route = pathAndQuery.split("?")[0];
      expect(Object.keys(routes), `${href} in ${_file}`).toContain(route);
      if (hash) expect(routes[route], `${href} in ${_file}`).toContain(hash);
    }
  });
});

describe("services copy", () => {
  const services = getServices();

  it("shows exactly two public prices: Quick scan $450 and Audit + fix from $2,500", () => {
    expect(services.rescue.offers.map((o) => [o.title, o.price])).toEqual([
      ["Quick scan", "$450"],
      ["Audit + fix", "From $2,500"],
    ]);
    const unpriced = [services.builds.offer, ...services.ai.offers];
    expect(unpriced.every((o) => o.price === undefined)).toBe(true);
    expect(services.quoted).toBe("Quoted after a call");
  });

  it("puts no other dollar figure anywhere in the site copy", () => {
    for (const [file, raw] of allCopy) {
      const amounts = [...raw.matchAll(/\$\d(?:[\d,]*\d)?/g)].map((m) => m[0]);
      for (const amount of amounts) expect(["$450", "$2,500"], `${amount} in ${file}`).toContain(amount);
    }
  });

  it("rejects a priced rescue offer without a price", () => {
    const broken = structuredClone(services);
    delete (broken.rescue.offers[0] as { price?: string }).price;
    expect(servicesSchema.safeParse(broken).success).toBe(false);
  });

  it("cites only published case studies as proof, and none for the food-safety leak under rescue", () => {
    const published = new Set(getAllWork().map((w) => w.slug));
    const all = [...services.rescue.proof, ...services.builds.proof, ...services.ai.proof];
    for (const p of all) expect(published, p.slug).toContain(p.slug);
    expect(services.rescue.proof.map((p) => p.slug)).toEqual(["live-app-recovery", "tipping-platform"]);
  });

  it("names section 03 \"AI systems\", with Finance automation as its first card", () => {
    expect([services.ai.nav, services.ai.eyebrow, services.ai.title]).toEqual(["AI systems", "03 · AI systems", "AI *systems.*"]);
    expect(services.ai.offers[0].title).toBe("Finance automation");
    expect(getHome().ai.eyebrow).toBe("AI systems");
  });

  it("points the home Rescue section at /services#rescue and the contact preselection", () => {
    const home = getHome();
    expect(home.rescue.secondary.href).toBe("/services#rescue");
    expect(home.rescue.primary.href).toBe("/contact?type=rescue");
  });
});

describe("no employer signals", () => {
  const banned = [
    /full-time/i,
    /roles? (i'm|i am) open to/i,
    /for employers/i,
    /\bcv\b/i,
    /hiring/i,
    /available for roles/i,
    /work-with-me/,
    /work with me/i,
    /what i bring/i,
    /where i'm strongest/i,
    /href: \/ai\b/,
    /(backend|full-stack|platform) engineer\b/i,
  ];

  it.each(allCopy)("%s has no job-seeking copy or old routes", (file, raw) => {
    // Job titles in the About experience list are history, not a job search.
    const copy = file === "about.yaml" ? raw.replace(/^\s+- role: .*$/gm, "") : raw;
    for (const pattern of banned) expect(copy, `${pattern} in ${file}`).not.toMatch(pattern);
  });

  it("keeps \"nobody sees but everybody leans on\" in the testimonial only", () => {
    const hits = allCopy.filter(([, raw]) => /nobody sees/i.test(raw)).map(([f]) => f);
    expect(hits).toEqual(["home.yaml"]);
    expect(getHome().feedback.items.some((i) => /nobody sees but everybody leans on/.test(i.said))).toBe(true);
    expect(JSON.stringify(getHome()).match(/nobody sees/gi)).toHaveLength(1);
  });

  it("has no \"idempotent\" outside the case studies and the hidden Also-built list", () => {
    const hits = allCopy.filter(([f, raw]) => f !== "work.yaml" && /idempotent/i.test(raw)).map(([f]) => f);
    expect(hits).toEqual([]);
  });
});

describe("booking button", () => {
  it("says Get in touch and opens the form when there's no booking link", () => {
    expect(bookingCta("")).toEqual({ href: "/contact", label: "Get in touch", linkProps: {} });
  });

  it("says Book a call and opens the link once one is set", () => {
    expect(bookingCta("https://cal.com/example/30min")).toEqual({
      href: "https://cal.com/example/30min",
      label: "Book a call",
      linkProps: { target: "_blank", rel: "noopener noreferrer" },
    });
  });

  it("never hard-codes \"Book a call\" in a component or page", () => {
    const SRC = path.join(process.cwd(), "src");
    const files = fs
      .readdirSync(SRC, { recursive: true, encoding: "utf8" })
      .filter((f) => /\.tsx?$/.test(f) && !/\.test\.tsx?$/.test(f) && !f.endsWith(path.join("config", "site.ts")));
    const hits = files.filter((f) => fs.readFileSync(path.join(SRC, f), "utf8").includes("Book a call"));
    expect(hits).toEqual([]);
  });
});

describe("about", () => {
  it("lists the four roles exactly, newest first, with the talk on its own line", () => {
    const about = getAbout();
    expect(about.experience.map((e) => [e.role, e.org ?? null, e.start, e.end])).toEqual([
      ["Independent engineer (freelance)", null, "2026-03", "present"],
      ["Founder", "OpsFlow", "2026-02", "present"],
      ["Full-Stack Software Engineer", "Talent Group Services", "2024-08", "2026-03"],
      ["Full-Stack Software Engineer", "Broadcaad, Lagos", "2022-06", "2024-07"],
    ]);
    expect(about.experience[0].details).toEqual([
      "Month-end close platform for an accounting firm, via a consultancy",
      "Lead engineer on 8 client products, via an agency",
    ]);
    expect(about.talk).toEqual({
      label: "Talk",
      title: "Building high-performance APIs with gRPC",
      event: "GDG Lagos DevFest",
      year: 2024,
    });
  });
});

describe("client-first copy", () => {
  /** Engineering stack: allowed in the About toolkit and case-study chips, not on Services. */
  const STACK = [
    "TypeScript", "JavaScript", "Python", "C#", "PHP", "SQL", "Next.js", "React", "NestJS", ".NET",
    "Laravel", "Expo", "Postgres", "PostgreSQL", "Redis", "MongoDB", "Prisma", "AWS", "Lambda",
    "CloudFormation", "Docker", "LangGraph", "Bedrock", "Slack", "Vercel", "GitHub",
  ];
  const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\#]/g, "\\$&");

  it("names no tools or stack on the Services page (the illustrative log aside)", () => {
    const services = getServices();
    // The illustrative log is the one exception (it's a picture of a run).
    const text = JSON.stringify({ ...services, meta: undefined, ai: { ...services.ai, log: undefined } });
    for (const name of STACK) {
      expect(text, name).not.toMatch(new RegExp(`(^|[^\\w.])${escape(name)}(?![\\w])`));
    }
  });

  it("names no tools or stack in Home's What I do list", () => {
    const text = JSON.stringify(getHome().services.items);
    for (const name of STACK) {
      expect(text, name).not.toMatch(new RegExp(`(^|[^\\w.])${escape(name)}(?![\\w])`));
    }
  });

  it("uses the service names in the site keywords", () => {
    const { keywords } = getSite();
    expect(keywords).toContain("AI systems");
    expect(keywords).not.toContain("AI automation");
    expect(keywords).not.toContain("Finance automation");
  });

  /** Visible copy of each page, as sentences. Meta text, the run log and the site chrome are left out. */
  function sentencesOf(value: unknown, skip = new Set(["meta", "log", "href"])): string[] {
    if (typeof value === "string") {
      return value
        .replace(/\*/g, "")
        .split(/(?<=[.!?])\s+/)
        .map((x) => x.trim().toLowerCase().replace(/\s+/g, " "))
        // A sentence: ends like one and has 4+ words, or runs to 6+ words. Short
        // labels (service names, button labels) repeat on purpose.
        .filter((x) => {
          const words = x.split(" ").filter((w) => /\w/.test(w)).length;
          return ((/[.!?]$/.test(x) && words >= 4) || words >= 6) && !x.includes("$");
        })
        .map((x) => x.replace(/[.!?]+$/, ""));
    }
    if (Array.isArray(value)) return value.flatMap((v) => sentencesOf(v, skip));
    if (value && typeof value === "object") {
      return Object.entries(value).flatMap(([k, v]) => (skip.has(k) ? [] : sentencesOf(v, skip)));
    }
    return [];
  }

  it("repeats no sentence word for word across pages (prices aside)", async () => {
    const { parse } = await import("yaml");
    const pages: Record<string, string[]> = {};
    for (const [file, raw] of allCopy) {
      if (file === "site.yaml") continue; // header/footer chrome, on every page by design
      pages[file] = sentencesOf(parse(raw));
    }
    // Case-study bodies are pages too. (Their one-line summaries also show on
    // the Work and Home cards, by design, so they're not part of the body.)
    for (const work of getAllWork()) pages[`work/${work.slug}`] = sentencesOf(work.content);

    const seen = new Map<string, Set<string>>();
    for (const [page, sentences] of Object.entries(pages)) {
      for (const sentence of sentences) seen.set(sentence, (seen.get(sentence) ?? new Set()).add(page));
    }
    const repeats = [...seen].filter(([, where]) => where.size > 1).map(([s, where]) => `${s} (${[...where].join(", ")})`);
    expect(repeats).toEqual([]);
  });
});
