"use client";

import { useState } from "react";
import { useToast } from "@/context/ToastContext";

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 py-10">
        <span className="w-14 h-14 rounded-full bg-[var(--tint-green)] text-[var(--accent)] flex items-center justify-center text-2xl">
          ✓
        </span>
        <h2 className="text-[36px]">Message sent.</h2>
        <p className="text-[16.5px] leading-[1.6] text-[var(--muted)] max-w-[340px]">
          Thanks for reaching out — I&apos;ll get back to you within two
          business days.
        </p>
        <button onClick={() => setStatus("idle")} className="btn btn-secondary">
          Send another
        </button>
      </div>
    );
  }

  const label = "flex flex-col gap-2 text-[14px] font-semibold";

  return (
    <>
      <h2 className="text-[28px] sm:text-[32px] mb-7">Or send a message</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]">
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

        <label className={label}>
          Name
          <input
            className="field font-normal"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            autoComplete="name"
            placeholder="Your name"
          />
        </label>

        <label className={label}>
          Email
          <input
            className="field font-normal"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
            placeholder="you@company.com"
          />
        </label>

        <fieldset className="flex flex-col gap-2.5">
          <legend className="text-[14px] font-semibold mb-2.5">Inquiry type</legend>
          <div className="flex flex-wrap gap-2">
            {INQUIRY_TYPES.map((type) => (
              <label
                key={type}
                className="inline-flex items-center h-[42px] px-[18px] rounded-full border-[1.5px] border-[var(--foreground)] bg-[var(--card)] text-[14.5px] cursor-pointer transition-colors has-checked:bg-[var(--btn)] has-checked:border-[var(--btn)] has-checked:text-[var(--btn-fg)] has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-[var(--accent)]"
              >
                <input
                  type="radio"
                  name="typeOfWork"
                  value={type}
                  checked={formData.typeOfWork === type}
                  onChange={handleChange}
                  className="sr-only"
                />
                {type}
              </label>
            ))}
          </div>
        </fieldset>

        <label className={label}>
          What are you building?
          <textarea
            className="field font-normal resize-y"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="A few sentences about the system, the timeline, and where you're stuck…"
          />
        </label>

        {status === "error" && (
          <div
            role="status"
            aria-live="polite"
            className="text-[15px] text-[var(--warn)] bg-[var(--gate)] px-4 py-3 rounded-[14px]"
          >
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary btn-lg w-full mt-1"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Sending…" : "Send message →"}
        </button>
      </form>
    </>
  );
}
