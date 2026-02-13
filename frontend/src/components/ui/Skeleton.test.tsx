import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Skeleton from "./Skeleton";

describe("Skeleton", () => {
  it("renders correctly", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveClass("animate-pulse");
    expect(container.firstChild).toHaveClass("bg-[var(--muted)]/10");
  });

  it("applies custom classes", () => {
    const { container } = render(<Skeleton className="w-10 h-10" />);
    expect(container.firstChild).toHaveClass("w-10");
    expect(container.firstChild).toHaveClass("h-10");
  });
});
