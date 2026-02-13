import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import ShareButton from "./ShareButton";
import { ToastProvider } from "@/context/ToastContext";

// Mock ToastContext
const mockAddToast = vi.fn();
vi.mock("@/context/ToastContext", () => ({
  useToast: () => ({
    addToast: mockAddToast,
  }),
  ToastProvider: ({ children }: { children: React.ReactNode }) => children,
}));

describe("ShareButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset navigator mocks
    Object.assign(navigator, {
      share: undefined,
      clipboard: {
        writeText: vi.fn(),
      },
    });
  });

  it("renders correctly", () => {
    render(<ShareButton title="Test Title" />);
    expect(screen.getByLabelText("Share")).toBeInTheDocument();
  });

  it("uses navigator.share when available", async () => {
    const mockShare = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { share: mockShare });

    render(<ShareButton title="Test Title" text="Test Text" url="http://example.com" />);
    
    const button = screen.getByLabelText("Share");
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockShare).toHaveBeenCalledWith({
        title: "Test Title",
        text: "Test Text",
        url: "http://example.com",
      });
    });
  });

  it("falls back to clipboard when navigator.share is missing", async () => {
    Object.assign(navigator, { share: undefined });
    const mockWriteText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: mockWriteText,
      },
    });

    // Mock window.location.href
    Object.defineProperty(window, "location", {
      value: { href: "http://current-url.com" },
      writable: true,
    });

    render(<ShareButton title="Test Title" />);
    
    const button = screen.getByLabelText("Share");
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockWriteText).toHaveBeenCalledWith("http://current-url.com");
      expect(mockAddToast).toHaveBeenCalledWith("Link copied to clipboard", "success");
    });
  });
});
