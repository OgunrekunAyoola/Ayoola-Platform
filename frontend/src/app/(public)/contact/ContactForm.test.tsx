import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { getContact } from "@/lib/site-content";
import ContactForm from "./ContactForm";
import ContactFormFromQuery from "./ContactFormFromQuery";

let search = "";
vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(search),
}));

const form = getContact().form;
const checked = () => screen.queryAllByRole("radio").filter((r) => (r as HTMLInputElement).checked);

describe("ContactForm inquiry type", () => {
  beforeEach(() => {
    search = "";
  });

  it("labels every field and selects nothing by default", () => {
    render(<ContactForm {...form} email="me@example.com" />);
    expect(screen.getByLabelText("Name")).toBeRequired();
    expect(screen.getByLabelText("Email")).toBeRequired();
    expect(screen.getByLabelText("What are you building?")).toBeRequired();
    expect(checked()).toHaveLength(0);
  });

  it("selects nothing on /contact with no ?type=", () => {
    render(<ContactFormFromQuery {...form} email="me@example.com" />);
    expect(checked()).toHaveLength(0);
  });

  it("preselects rescue from ?type=rescue and asks what's worrying them", () => {
    search = "?type=rescue";
    render(<ContactFormFromQuery {...form} email="me@example.com" />);
    expect(screen.getByRole("radio", { name: "Rescue & security audit" })).toBeChecked();
    expect(screen.getByLabelText("What's worrying you about the app?")).toBeRequired();
  });

  it("preselects AI & finance automation from ?type=ai", () => {
    search = "?type=ai";
    render(<ContactFormFromQuery {...form} email="me@example.com" />);
    expect(screen.getByRole("radio", { name: "AI & finance automation" })).toBeChecked();
    expect(checked()).toHaveLength(1);
    expect(screen.getByLabelText("What are you building?")).toBeInTheDocument();
  });

  it("ignores an unknown ?type=", () => {
    search = "?type=full-time";
    render(<ContactFormFromQuery {...form} email="me@example.com" />);
    expect(checked()).toHaveLength(0);
  });

  it("switches the message label when the visitor picks rescue, and back", () => {
    render(<ContactForm {...form} email="me@example.com" />);
    fireEvent.click(screen.getByRole("radio", { name: "Rescue & security audit" }));
    expect(screen.getByLabelText("What's worrying you about the app?")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("radio", { name: "Product build" }));
    expect(screen.getByLabelText("What are you building?")).toBeInTheDocument();
  });
});
