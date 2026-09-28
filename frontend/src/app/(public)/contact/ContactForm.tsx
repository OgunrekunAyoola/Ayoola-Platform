"use client";

import { useState } from "react";
import { useToast } from "@/context/ToastContext";
import { Check, Send } from "lucide-react";

interface FormState {
  name: string;
  email: string;
  message: string;
  typeOfWork: string;
  /** Honeypot — real visitors never see or fill this. */
  company: string;
}

const INQUIRY_TYPES = [
  "Full-time role",
  "AI Readiness Review",
  "Production AI Build",
  "Something else",
] as const;

const INITIAL_STATE: FormState = {
  name: "",
  email: "",
  message: "",
  typeOfWork: INQUIRY_TYPES[0],
  company: "",
};

export default function ContactForm() {
  const { addToast } = useToast();
  const [formData, setFormData] = useState<FormState>(INITIAL_STATE);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data.message || "Something went wrong. Please try again.",
        );
      }

      setStatus("success");
      setFormData(INITIAL_STATE);
    } catch (err) {
      console.error("Contact submission error:", err);
      setStatus("error");
      const msg =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      setErrorMessage(msg);
      addToast(msg, "error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center text-center gap-3.5 py-9 px-3">
        <span className="w-[58px] h-[58px] rounded-full bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center">
          <Check className="w-7 h-7" />
        </span>
        <h2 className="font-serif font-semibold text-2xl text-[var(--foreground)]">
          Message sent.
        </h2>
        <p className="text-sm text-[var(--muted)] max-w-[320px]">
          Thanks for reaching out — I&apos;ll get back to you within two
          business days.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="btn btn-secondary mt-1"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Honeypot field — hidden from sighted users, catches bots that fill every input */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          type="text"
          id="company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={formData.company}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="name"
          className="text-[13px] font-semibold text-[var(--foreground)]"
        >
          Name
        </label>
        <input
          className="field"
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Your name"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="email"
          className="text-[13px] font-semibold text-[var(--foreground)]"
        >
          Email
        </label>
        <input
          className="field"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="you@company.com"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="typeOfWork"
          className="text-[13px] font-semibold text-[var(--foreground)]"
        >
          Inquiry type
        </label>
        <select
          className="field appearance-none"
          id="typeOfWork"
          name="typeOfWork"
          value={formData.typeOfWork}
          onChange={handleChange}
        >
          {INQUIRY_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="message"
          className="text-[13px] font-semibold text-[var(--foreground)]"
        >
          What are you building?
        </label>
        <textarea
          className="field resize-y"
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          required
          placeholder="A few sentences about the system, the timeline, and where you're stuck…"
        />
      </div>

      {status === "error" && (
        <div
          role="status"
          aria-live="polite"
          className="text-red-500 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20"
        >
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        className="btn btn-primary w-full mt-1"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? (
          "Sending..."
        ) : (
          <>
            Send message
            <Send className="w-[17px] h-[17px]" />
          </>
        )}
      </button>
    </form>
  );
}
