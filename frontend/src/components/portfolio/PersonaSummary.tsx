"use client";

import { useState } from "react";
import { getPersonaSummary } from "@/lib/api-client";
import { UserGroupIcon, SparklesIcon } from "@heroicons/react/24/solid";

interface PersonaSummaryProps {
  projectId: string;
}

const PERSONAS = [
  { id: "founder", label: "Founder", icon: "🚀" },
  { id: "investor", label: "Investor", icon: "💰" },
  { id: "engineer", label: "Engineer", icon: "⚙️" },
  { id: "policymaker", label: "Policymaker", icon: "🏛️" },
  { id: "child", label: "ELI5", icon: "👶" },
];

export default function PersonaSummary({ projectId }: PersonaSummaryProps) {
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Cache summaries to avoid re-fetching
  const [cache, setCache] = useState<Record<string, string>>({});

  const handlePersonaClick = async (personaId: string) => {
    if (selectedPersona === personaId) return;

    setSelectedPersona(personaId);
    setError("");

    // Check cache first
    if (cache[personaId]) {
      setSummary(cache[personaId]);
      return;
    }

    setLoading(true);
    setSummary("");

    try {
      const result = await getPersonaSummary(projectId, personaId);
      setSummary(result.summary);
      setCache((prev) => ({ ...prev, [personaId]: result.summary }));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      if (msg.includes("503") || msg.includes("overloaded")) {
        setError(
          "I'm currently overloaded with requests. Please give me a moment and try again.",
        );
      } else if (msg.includes("429") || msg.includes("Rate Limit")) {
        setError(
          "I've received too many requests recently. Please wait a moment.",
        );
      } else if (msg.includes("500") || msg.includes("Internal Server Error")) {
        setError(
          "I encountered a temporary glitch. Please try asking again in a few seconds.",
        );
      } else {
        setError("Failed to generate summary. Please try again.");
      }
      // Reset selection on error so they can try again
      setSelectedPersona(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass rounded-[18px] p-6 md:p-7 mb-11 relative overflow-hidden">
      <div
        className="absolute -top-10 -right-8 w-[200px] h-[200px] anim-glow pointer-events-none opacity-60"
        style={{
          background: "radial-gradient(circle, var(--glow), transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative flex items-center gap-3 mb-4">
        <SparklesIcon className="w-5 h-5 text-[var(--accent)]" />
        <span className="font-mono text-xs tracking-[0.1em] uppercase text-[var(--foreground)]">
          AI summary
        </span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[var(--accent)] border border-[var(--accent-line)] rounded-full px-2.5 py-[3px]">
          <UserGroupIcon className="w-3 h-3" />
          tailored
        </span>
      </div>

      <p className="relative text-[var(--muted)] mb-5 text-sm md:text-base">
        Short on time? Get a summary of this work tailored to your role.
      </p>

      <div className="relative flex flex-wrap gap-2.5 mb-5">
        {PERSONAS.map((persona) => (
          <button
            key={persona.id}
            onClick={() => handlePersonaClick(persona.id)}
            disabled={loading}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedPersona === persona.id
                ? "bg-[var(--accent)] text-white shadow-[0_8px_20px_-8px_var(--glow)]"
                : "bg-[var(--card-bg)] text-[var(--foreground)] hover:border-[var(--accent)] border border-[var(--card-border)]"
            } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <span>{persona.icon}</span>
            {persona.label}
          </button>
        ))}
      </div>

      {error && (
        <div className="relative p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="relative flex items-center justify-center py-8 text-[var(--accent)]">
          <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin mr-3" />
          <span className="animate-pulse">Generating tailored summary...</span>
        </div>
      ) : summary ? (
        <div className="relative animate-fade-in-up">
          <div className="bg-[var(--accent-soft)] rounded-xl p-5 border border-[var(--accent-line)]">
            <h3 className="text-[var(--accent)] font-bold mb-2 text-xs uppercase tracking-wider font-mono">
              For {PERSONAS.find((p) => p.id === selectedPersona)?.label}
            </h3>
            <p className="text-[var(--foreground)] leading-relaxed font-serif text-[17px]">
              {summary}
            </p>
            <div className="mt-4 flex items-center justify-end">
              <span className="text-xs text-[var(--muted)] font-mono">
                Generated by Ayoola AI
              </span>
            </div>
          </div>
        </div>
      ) : (
        !selectedPersona && (
          <div className="relative text-center py-8 text-[var(--muted)] border border-dashed border-[var(--card-border)] rounded-lg">
            Select a role above to see a customized summary.
          </div>
        )
      )}
    </div>
  );
}
