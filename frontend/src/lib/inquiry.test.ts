import { describe, it, expect } from "vitest";
import { inquiryLabel, preselectedInquiry } from "./inquiry";
import { getContact } from "./site-content";

const types = getContact().form.inquiryTypes;

describe("contact inquiry types", () => {
  it("offers the three services plus something else, with no job enquiries", () => {
    expect(types.map((t) => t.label)).toEqual([
      "Rescue & security audit",
      "Product build",
      "AI & finance automation",
      "Something else",
    ]);
  });

  it.each([
    ["rescue", "rescue"],
    ["build", "build"],
    ["ai", "ai"],
    ["other", "other"],
    ["RESCUE", "rescue"],
    [" ai ", "ai"],
  ])("?type=%s preselects %s", (requested, key) => {
    expect(preselectedInquiry(types, requested)).toBe(key);
  });

  it.each([null, undefined, "", "full-time", "roles"])("falls back to the first type for %s", (requested) => {
    expect(preselectedInquiry(types, requested)).toBe(types[0].key);
  });

  it("sends the label, not the key", () => {
    expect(inquiryLabel(types, "rescue")).toBe("Rescue & security audit");
  });
});
