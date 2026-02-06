"use client";

import { useState } from "react";
import { subscribe } from "@/lib/api-client";

interface NewsletterFormProps {
  source?: string;
  className?: string;
  variant?: "default" | "minimal";
}

export default function NewsletterForm({
  source = "newsletter_form",
  className = "",
  variant = "default",
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("");

    try {
      await subscribe(email, source);
      setStatus("success");
      setMessage("Thanks for subscribing!");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {variant === "default" && (
        <div className="mb-4">
          <h4 className="text-sm font-bold text-[var(--foreground)] mb-2 uppercase tracking-wider">
            Newsletter
          </h4>
          <p className="text-[var(--muted)] text-sm">
            Get the latest thoughts on tech, policy, and creativity.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@example.com"
          className="w-full sm:flex-grow bg-[var(--card-bg)] border border-[var(--card-border)] rounded-lg px-4 py-3 sm:py-2 text-sm text-[var(--foreground)] placeholder-[var(--muted)]/50 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all disabled:opacity-50 backdrop-blur-sm"
          disabled={status === "loading" || status === "success"}
          required
        />
        <button
          type="submit"
          className="w-full sm:w-auto bg-[var(--accent)] text-black px-6 py-3 sm:py-2 text-sm font-bold rounded-lg hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shadow-lg shadow-[var(--accent)]/20"
          disabled={status === "loading" || status === "success"}
        >
          {status === "loading"
            ? "Subscribing..."
            : status === "success"
              ? "Subscribed ✓"
              : "Subscribe"}
        </button>
      </form>

      {message && (
        <p
          className={`text-xs mt-3 ${status === "success" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
