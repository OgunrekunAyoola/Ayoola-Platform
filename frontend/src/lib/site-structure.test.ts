import fs from "node:fs";
import path from "node:path";
import { describe, it, expect, afterEach } from "vitest";
import { getAllWork } from "./content";
import { getHome, getServices, getSite, servicesSchema } from "./site-content";

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
    /href: \/ai\b/,
    /(backend|full-stack|platform) engineer\b/i,
  ];

  it.each(allCopy)("%s has no job-seeking copy or old routes", (file, raw) => {
    // Job titles in the About experience list are history, not a job search.
    const copy = file === "about.yaml" ? raw.replace(/^\s+- role: .*$/gm, "") : raw;
    for (const pattern of banned) expect(copy, `${pattern} in ${file}`).not.toMatch(pattern);
  });
});
