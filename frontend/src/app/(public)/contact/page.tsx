"use client";

import { useState } from "react";
import { submitContact } from "@/lib/api-client";
import { useToast } from "@/context/ToastContext";
import { Mail, MapPin, Check, Send, Github, Linkedin } from "lucide-react";

export default function Contact() {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    typeOfWork: "consulting",
  });

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      await submitContact(formData);
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        message: "",
        typeOfWork: "consulting",
      });
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

  return (
    <section className="max-w-[980px] mx-auto px-5 sm:px-7 pt-20 pb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Info */}
        <div>
          <div className="font-mono text-xs tracking-[0.14em] uppercase text-[var(--accent)] mb-3.5">
            Contact
          </div>
          <h1 className="font-serif font-extrabold tracking-tight leading-[1.05] text-[clamp(34px,4.6vw,52px)] text-[var(--foreground)] mb-5">
            Let&apos;s build something durable.
          </h1>
          <p className="text-[18px] text-[var(--muted)] leading-[1.65] mb-7">
            Tell me about the system you&apos;re trying to ship. I read every
            message and reply within two business days.
          </p>

          <div className="flex flex-col gap-4">
            <a
              href="mailto:hello@ayoola.io"
              className="flex items-center gap-3 text-[var(--foreground)] text-[15.5px] hover:text-[var(--accent)] transition-colors"
            >
              <span className="w-10 h-10 rounded-[11px] bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center shrink-0">
                <Mail className="w-[18px] h-[18px]" />
              </span>
              hello@ayoola.io
            </a>
            <div className="flex items-center gap-3 text-[var(--muted)] text-[15.5px]">
              <span className="w-10 h-10 rounded-[11px] bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center shrink-0">
                <MapPin className="w-[18px] h-[18px]" />
              </span>
              Lagos, Nigeria · remote-friendly
            </div>
            <div className="flex gap-2.5 mt-2">
              {[
                {
                  href: "https://github.com/ayoola",
                  Icon: Github,
                  label: "GitHub",
                },
                {
                  href: "https://linkedin.com/in/ayoola",
                  Icon: Linkedin,
                  label: "LinkedIn",
                },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-[11px] border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--foreground)] flex items-center justify-center transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  <Icon className="w-[18px] h-[18px]" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="glass rounded-[18px] p-7">
          {status === "success" ? (
            <div className="flex flex-col items-center text-center gap-3.5 py-9 px-3">
              <span className="w-[58px] h-[58px] rounded-full bg-[var(--accent-soft)] text-[var(--accent)] flex items-center justify-center">
                <Check className="w-7 h-7" />
              </span>
              <h3 className="font-serif font-semibold text-2xl text-[var(--foreground)]">
                Message sent.
              </h3>
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
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                  <option value="consulting">Consulting / Strategy</option>
                  <option value="engineering">Engineering / Development</option>
                  <option value="speaking">Speaking / Writing</option>
                  <option value="other">Other</option>
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
                <div className="text-red-500 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
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
          )}
        </div>
      </div>
    </section>
  );
}
