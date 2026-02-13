import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import StatusBadge from "./StatusBadge";

describe("StatusBadge", () => {
  it("renders published status correctly", () => {
    render(<StatusBadge status="published" />);
    const badge = screen.getByText("published");
    expect(badge).toBeDefined();
    expect(badge.className).toContain("bg-green-500/10");
    expect(badge.className).toContain("text-green-500");
  });

  it("renders draft status correctly", () => {
    render(<StatusBadge status="draft" />);
    const badge = screen.getByText("draft");
    expect(badge).toBeDefined();
    expect(badge.className).toContain("bg-yellow-500/10");
    expect(badge.className).toContain("text-yellow-500");
  });

  it("renders unknown status with default styling", () => {
    render(<StatusBadge status="unknown" />);
    const badge = screen.getByText("unknown");
    expect(badge).toBeDefined();
    expect(badge.className).toContain("bg-[var(--muted)]/10");
  });
});
