import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { getContact } from "@/lib/site-content";
import ContactForm from "./ContactForm";
import ContactFormFromQuery from "./ContactFormFromQuery";

let search = "";
vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(search),
}));

const form = getContact().form;

describe("ContactForm inquiry type", () => {
  beforeEach(() => {
    search = "";
  });

  it("labels every field and selects the first type by default", () => {
    render(<ContactForm {...form} email="me@example.com" />);
    expect(screen.getByLabelText("Name")).toBeRequired();
    expect(screen.getByLabelText("Email")).toBeRequired();
    expect(screen.getByLabelText("What are you building?")).toBeRequired();
    expect(screen.getByRole("radio", { name: form.inquiryTypes[0].label })).toBeChecked();
  });

  it("preselects the type from ?type=rescue", () => {
    search = "?type=rescue";
    render(<ContactFormFromQuery {...form} email="me@example.com" />);
    expect(screen.getByRole("radio", { name: "Rescue & security audit" })).toBeChecked();
  });

  it("preselects AI & finance automation from ?type=ai", () => {
    search = "?type=ai";
    render(<ContactFormFromQuery {...form} email="me@example.com" />);
    expect(screen.getByRole("radio", { name: "AI & finance automation" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Rescue & security audit" })).not.toBeChecked();
  });

  it("ignores an unknown ?type=", () => {
    search = "?type=full-time";
    render(<ContactFormFromQuery {...form} email="me@example.com" />);
    expect(screen.getByRole("radio", { name: form.inquiryTypes[0].label })).toBeChecked();
  });
});
