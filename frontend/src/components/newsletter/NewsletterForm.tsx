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
          <h4 className="text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wider">
            Newsletter
          </h4>
          <p className="text-gray-400 text-sm">
            Get the latest thoughts on tech, policy, and creativity.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@example.com"
          className="flex-grow bg-gray-800 border border-gray-700 rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-yellow-500 transition disabled:opacity-50"
          disabled={status === "loading" || status === "success"}
          required
        />
        <button
          type="submit"
          className="bg-yellow-500 text-black px-4 py-2 text-sm font-bold rounded hover:bg-yellow-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={status === "loading" || status === "success"}
        >
          {status === "loading"
            ? "..."
            : status === "success"
              ? "✓"
              : "Subscribe"}
        </button>
      </form>

      {message && (
        <p
          className={`text-xs mt-2 ${status === "success" ? "text-green-500" : "text-red-500"}`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
