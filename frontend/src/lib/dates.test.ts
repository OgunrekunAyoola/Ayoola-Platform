import { describe, it, expect } from "vitest";
import { formatYearMonth } from "./dates";

describe("formatYearMonth", () => {
  it.each([
    ["2026-03", "Mar 2026"],
    ["2022-06", "Jun 2022"],
    ["2024-12", "Dec 2024"],
    ["2024-01", "Jan 2024"],
  ])("%s → %s", (input, out) => {
    expect(formatYearMonth(input)).toBe(out);
  });
});
