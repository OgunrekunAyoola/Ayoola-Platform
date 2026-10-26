import { describe, it, expect } from "vitest";
import { heroWords } from "./HeroTitle";

describe("heroWords", () => {
  it("keeps a space between plain and emphasised words", () => {
    expect(heroWords("I build the software businesses *run on*.")).toEqual([
      { text: "I", green: false },
      { text: "build", green: false },
      { text: "the", green: false },
      { text: "software", green: false },
      { text: "businesses", green: false },
      { text: "run", green: true },
      { text: "on.", green: true },
    ]);
  });

  it("glues text that touches an emphasised run", () => {
    expect(heroWords("Ship *fast*, safely")).toEqual([
      { text: "Ship", green: false },
      { text: "fast,", green: true },
      { text: "safely", green: false },
    ]);
  });
});
