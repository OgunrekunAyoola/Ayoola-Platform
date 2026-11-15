import { describe, it, expect } from "vitest";
import { ogWords } from "./og-words";

describe("share-card words", () => {
  it("splits copy into words, marking the emphasised run", () => {
    expect(ogWords("Three ways to *work together.*")).toEqual([
      { word: "Three", accent: false, spaceAfter: true },
      { word: "ways", accent: false, spaceAfter: true },
      { word: "to", accent: false, spaceAfter: true },
      { word: "work", accent: true, spaceAfter: true },
      { word: "together.", accent: true, spaceAfter: false },
    ]);
  });

  it("keeps punctuation that follows an emphasised run attached to it", () => {
    expect(ogWords("businesses *run on*.").map((w) => [w.word, w.spaceAfter])).toEqual([
      ["businesses", true],
      ["run", true],
      ["on", false],
      [".", false],
    ]);
  });

  it("never splits at a non-breaking space", () => {
    expect(ogWords("Product builds · AI systems").map((w) => w.word)).toEqual([
      "Product",
      "builds",
      "·",
      "AI systems",
    ]);
  });
});
