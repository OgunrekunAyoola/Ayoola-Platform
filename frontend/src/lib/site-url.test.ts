import { afterEach, describe, expect, it } from "vitest";
import { getSiteUrl } from "./site-url";

const original = process.env.NEXT_PUBLIC_SITE_URL;
afterEach(() => {
  process.env.NEXT_PUBLIC_SITE_URL = original;
});

describe("getSiteUrl", () => {
  it.each([
    ["https://ayoolaogunrekunn.netlify.app", "https://ayoolaogunrekunn.netlify.app"],
    ["ayoolaogunrekunn.netlify.app", "https://ayoolaogunrekunn.netlify.app"],
    ["  https://ayoolaogunrekunn.netlify.app/  ", "https://ayoolaogunrekunn.netlify.app"],
    ["https://ayoolaogunrekunn.netlify.app/about", "https://ayoolaogunrekunn.netlify.app"],
    ["http://localhost:3000", "http://localhost:3000"],
  ])("normalises %j to %j", (value, expected) => {
    process.env.NEXT_PUBLIC_SITE_URL = value;
    expect(getSiteUrl()).toBe(expected);
  });

  it("returns an empty string, never throws, for unset or unusable values", () => {
    for (const value of ["", "   ", "https://"]) {
      process.env.NEXT_PUBLIC_SITE_URL = value;
      expect(getSiteUrl()).toBe("");
    }
  });
});
