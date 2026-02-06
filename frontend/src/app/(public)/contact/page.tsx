"use client";

import { useState } from "react";
import { submitContact } from "@/lib/api-client";
import Button from "@/components/ui/Button";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    typeOfWork: "consulting", // default
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
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Contact Info */}
        <div className="space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Let&apos;s build something meaningful.
          </h1>
          <p className="text-xl text-neutral-400 leading-relaxed">
            Whether you&apos;re looking for strategic advice, technical
            execution, or just want to connect, I&apos;m always open to
            interesting conversations.
          </p>

          <div className="space-y-4 pt-4 border-t border-neutral-800">
            <div>
              <h3 className="text-yellow-500 font-bold mb-1 uppercase text-sm tracking-wider">
                Email
              </h3>
              <a
                href="mailto:hello@ayoola.io"
                className="text-white hover:text-yellow-500 transition-colors text-lg"
              >
                hello@ayoola.io
              </a>
            </div>
            <div>
              <h3 className="text-yellow-500 font-bold mb-1 uppercase text-sm tracking-wider">
                Socials
              </h3>
              <div className="flex gap-4">
                <a
                  href="https://twitter.com/ayoola"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Twitter / X
                </a>
                <a
                  href="https://linkedin.com/in/ayoola"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/ayoola"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-neutral-900/50 p-8 rounded-2xl border border-neutral-800">
          <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>

          {status === "success" ? (
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500/20 text-green-500 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Message Sent!
              </h3>
              <p className="text-neutral-400">
                Thanks for reaching out. I&apos;ll get back to you as soon as
                possible.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-6 text-yellow-500 font-medium hover:text-yellow-400"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-neutral-300 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-neutral-700 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-neutral-300 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-neutral-700 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="typeOfWork"
                  className="block text-sm font-medium text-neutral-300 mb-2"
                >
                  Inquiry Type
                </label>
                <select
                  id="typeOfWork"
                  name="typeOfWork"
                  value={formData.typeOfWork}
                  onChange={handleChange}
                  className="w-full bg-black border border-neutral-700 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition appearance-none"
                >
                  <option value="consulting">Consulting / Strategy</option>
                  <option value="engineering">Engineering / Development</option>
                  <option value="speaking">Speaking / Writing</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-neutral-300 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-black border border-neutral-700 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition"
                  placeholder="How can I help you?"
                ></textarea>
              </div>

              {status === "error" && (
                <div className="text-red-500 text-sm bg-red-500/10 p-3 rounded border border-red-500/20">
                  {errorMessage}
                </div>
              )}

              <Button
                variant="primary"
                className="w-full py-3"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Sending..." : "Send Message"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
