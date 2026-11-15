import { describe, it, expect } from "vitest";
import { NO_INQUIRY_TYPE, inquiryLabel, messageLabelFor, preselectedInquiry } from "./inquiry";
import { getContact } from "./site-content";

const { inquiryTypes: types, messageLabel } = getContact().form;

describe("contact inquiry types", () => {
  it("offers the three services plus something else, with no job enquiries", () => {
    expect(types.map((t) => t.label)).toEqual([
      "Rescue & security audit",
      "Product build",
      "AI systems",
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

  it.each([null, undefined, "", "full-time", "roles"])("preselects nothing for %s", (requested) => {
    expect(preselectedInquiry(types, requested)).toBeNull();
  });

  it("sends the label, not the key, and says so when nothing was picked", () => {
    expect(inquiryLabel(types, "rescue")).toBe("Rescue & security audit");
    expect(inquiryLabel(types, "")).toBe(NO_INQUIRY_TYPE);
  });

  it("asks what's worrying them when rescue is selected", () => {
    expect(messageLabelFor(types, "rescue", messageLabel)).toBe("What's worrying you about the app?");
    expect(messageLabelFor(types, "build", messageLabel)).toBe("What are you building?");
    expect(messageLabelFor(types, "", messageLabel)).toBe("What are you building?");
  });
});
