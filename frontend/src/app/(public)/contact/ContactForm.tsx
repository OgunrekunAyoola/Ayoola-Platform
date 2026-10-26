"use client";

import { useState } from "react";
import Rich from "@/components/ui/Rich";
import type { ContactContent } from "@/lib/site-content";

interface FormState {
  name: string;
  email: string;
  message: string;
  typeOfWork: string;
  /** Honeypot — real visitors never see or fill this. */
  company: string;
}

type ContactFormProps = ContactContent["form"] & {
  /** Where the email fallback goes; no fallback when empty. */
  email: string;
};

const emptyState = (typeOfWork: string): FormState => ({
  name: "",
  email: "",
  message: "",
  typeOfWork,
  company: "",
});

/** mailto: link carrying the visitor's message, so a failed send loses nothing. */
function mailtoFallback(to: string, form: FormState): string {
  const subject = `Portfolio enquiry from ${form.name || "a visitor"} (${form.typeOfWork})`;
  const body = `${form.message}\n\n${form.name}${form.email ? ` <${form.email}>` : ""}`;
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function ContactForm({
  title,
  inquiryTypes,
  messagePlaceholder,
  fallbackCta,
  sent,
  email,
}: ContactFormProps) {
  const [formData, setFormData] = useState<FormState>(() => emptyState(inquiryTypes[0]));
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  // The server couldn't send (5xx or network failure), as opposed to a fixable input error.
  const [serverFailed, setServerFailed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    setServerFailed(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setServerFailed(res.status >= 500);
        throw new Error(
          data.message || "Something went wrong. Please try again.",
        );
      }

      setStatus("success");
      setFormData(emptyState(inquiryTypes[0]));
    } catch (err) {
      // Shown inline beside the button (and announced), so no toast on top of it.
      if (!(err instanceof Error) || err.name === "TypeError") setServerFailed(true);
      setStatus("error");
      const msg =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      setErrorMessage(msg);
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
        <span className="w-14 h-14 rounded-full bg-[var(--tint)] text-[var(--accent)] flex items-center justify-center text-2xl">
          ✓
        </span>
        <h2 className="text-[31px] m-0">
          <Rich text={sent.title} />
        </h2>
        <p className="text-[16px] leading-[1.6] text-[var(--muted)] m-0 max-w-[340px]">{sent.body}</p>
        <button onClick={() => setStatus("idle")} className="btn btn-outline h-12 px-6 text-[15px]">
          {sent.again}
        </button>
      </div>
    );
  }

  const label = "flex flex-col gap-2 text-[14px] font-semibold";

  return (
    <>
      <h2 className="text-[28px] m-0 mb-7">
        <Rich text={title} />
      </h2>
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
          <legend className="text-[14px] font-semibold mb-2.5 p-0">Inquiry type</legend>
          <div className="flex flex-wrap gap-2">
            {inquiryTypes.map((type) => (
              <label
                key={type}
                className="inline-flex items-center h-[42px] px-[18px] rounded-full border border-[var(--foreground)] bg-transparent text-[14.5px] cursor-pointer transition-colors duration-200 has-checked:bg-[var(--foreground)] has-checked:text-[var(--background)] has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-[var(--accent)]"
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
            placeholder={messagePlaceholder}
          />
        </label>

        {status === "error" && (
          <div
            role="status"
            aria-live="polite"
            className="text-[15px] text-[#8a2f12] bg-[#f6e7df] px-4 py-3 rounded-[14px]"
          >
            {errorMessage}
          </div>
        )}

        {status === "error" && serverFailed && email && (
          <a href={mailtoFallback(email, formData)} className="btn btn-outline h-12 px-6 text-[15px] self-start">
            {fallbackCta}
          </a>
        )}

        <button
          type="submit"
          className="btn btn-ink w-full h-14 text-[17px] mt-1"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Sending…" : "Send message →"}
        </button>
      </form>
    </>
  );
}
