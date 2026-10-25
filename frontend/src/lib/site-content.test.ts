import fs from "node:fs";
import path from "node:path";
import { describe, it, expect } from "vitest";
import {
  notFoundSchema,
  parseSiteFile,
  siteFiles,
  getAbout,
  getWorkPage,
} from "./site-content";
import { getAllWork, getAllWriting } from "./content";
import { plainText, richParts } from "@/components/ui/Rich";

const SITE_DIR = path.join(process.cwd(), "content", "site");

describe("content/site", () => {
  it("has exactly one YAML file per schema", () => {
    const files = fs
      .readdirSync(SITE_DIR)
      .filter((f) => f.endsWith(".yaml"))
      .map((f) => f.replace(/\.yaml$/, ""))
      .sort();
    expect(files).toEqual(Object.keys(siteFiles).sort());
  });

  it.each(Object.entries(siteFiles))("%s.yaml matches its schema", (name, schema) => {
    const raw = fs.readFileSync(path.join(SITE_DIR, `${name}.yaml`), "utf8");
    expect(() => parseSiteFile(name, schema, raw)).not.toThrow();
  });

  it("names the file and field when a field is misspelled", () => {
    const raw = fs
      .readFileSync(path.join(SITE_DIR, "not-found.yaml"), "utf8")
      .replace(/^body:/m, "bdoy:");
    expect(() => parseSiteFile("not-found", notFoundSchema, raw)).toThrow(
      /not-found\.yaml is invalid[\s\S]*bdoy[\s\S]*body/,
    );
  });

  it("rejects an empty string where copy is required", () => {
    const raw = fs
      .readFileSync(path.join(SITE_DIR, "not-found.yaml"), "utf8")
      .replace(/^body:.*$/m, 'body: ""');
    expect(() => parseSiteFile("not-found", notFoundSchema, raw)).toThrow(/body/);
  });

  it("filters draft list items outside development", () => {
    const prev = process.env.NODE_ENV;
    try {
      (process.env as Record<string, string>).NODE_ENV = "production";
      const hidden = getWorkPage().alsoBuilt.items.length;
      (process.env as Record<string, string>).NODE_ENV = "development";
      const all = getWorkPage().alsoBuilt.items.length;
      expect(hidden).toBeLessThanOrEqual(all);
      expect(getAbout().experience.length).toBeGreaterThan(0);
    } finally {
      (process.env as Record<string, string>).NODE_ENV = prev ?? "test";
    }
  });
});

describe("content/work and content/writing", () => {
  it("every entry, drafts included, has valid frontmatter", () => {
    expect(() => getAllWork()).not.toThrow();
    expect(() => getAllWriting()).not.toThrow();
  });
});

describe("rich copy", () => {
  it("splits emphasis into odd-indexed runs", () => {
    expect(richParts("I build the software businesses *run on*.")).toEqual([
      "I build the software businesses ",
      "run on",
      ".",
    ]);
  });

  it("strips markers for plain text", () => {
    expect(plainText("The work, *in detail.*")).toBe("The work, in detail.");
  });
});
