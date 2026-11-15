import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { getAbout } from "@/lib/site-content";
import ExperienceList from "./ExperienceList";

const renderList = () => render(<ExperienceList items={getAbout().experience} />).container;

describe("ExperienceList", () => {
  it("reads as clean words in the page text, with no separator characters", () => {
    const container = renderList();
    const lines = [...container.querySelectorAll("li > div > p")].map((p) => p.textContent);
    expect(lines).toEqual([
      "Independent engineer (freelance)",
      "Mar 2026 to present",
      "Founder, OpsFlow",
      "Feb 2026 to present",
      "Full-Stack Software Engineer, Talent Group Services",
      "Aug 2024 to Mar 2026",
      "Full-Stack Software Engineer, Broadcaad, Lagos",
      "Jun 2022 to Jul 2024",
    ]);
    expect(container.textContent).not.toMatch(/[·–└]/);
  });

  it("marks every date up as a <time>", () => {
    const times = [...renderList().querySelectorAll("time")].map((t) => [t.getAttribute("datetime"), t.textContent]);
    expect(times).toEqual([
      ["2026-03", "Mar 2026"],
      ["2026-02", "Feb 2026"],
      ["2024-08", "Aug 2024"],
      ["2026-03", "Mar 2026"],
      ["2022-06", "Jun 2022"],
      ["2024-07", "Jul 2024"],
    ]);
  });

  it("keeps the screen-reader words in the text flow (.sr-inline, not .sr-only)", () => {
    const container = renderList();
    expect(container.querySelectorAll(".sr-only")).toHaveLength(0);
    expect([...container.querySelectorAll(".sr-inline")].map((el) => el.textContent)).toContain(", ");
  });

  it("hides the drawn separators from screen readers, and they carry no text", () => {
    const hidden = [...renderList().querySelectorAll('[aria-hidden="true"]')];
    expect(hidden.length).toBeGreaterThan(0);
    expect(hidden.every((el) => el.textContent === "")).toBe(true);
  });
});
