import { describe, it, expect } from "vitest";
import { isPublished } from "./content";

describe("isPublished", () => {
  it("hides drafts in production", () => {
    expect(isPublished({ draft: true }, "production")).toBe(false);
  });

  it("shows drafts outside production", () => {
    expect(isPublished({ draft: true }, "development")).toBe(true);
    expect(isPublished({ draft: true }, "test")).toBe(true);
  });

  it("shows non-drafts everywhere", () => {
    expect(isPublished({}, "production")).toBe(true);
    expect(isPublished({ draft: false }, "production")).toBe(true);
  });
});
