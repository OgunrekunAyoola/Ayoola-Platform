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
    } catch (err: any) {
      const msg = err.message || "";
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
    <div className="mb-16 bg-neutral-900/30 border border-yellow-500/20 rounded-xl overflow-hidden">
      <div className="p-6 md:p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 bg-yellow-500/10 rounded-xl hidden sm:block">
            <UserGroupIcon className="w-8 h-8 text-yellow-500" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-neutral-100 flex items-center gap-2">
              <span className="sm:hidden text-yellow-500">
                <UserGroupIcon className="w-6 h-6" />
              </span>
              AI Project Summary
            </h2>
            <p className="text-neutral-400 mt-2 text-sm md:text-base">
              Short on time? Get a tailored summary based on your role.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          {PERSONAS.map((persona) => (
            <button
              key={persona.id}
              onClick={() => handlePersonaClick(persona.id)}
              disabled={loading}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all
                ${
                  selectedPersona === persona.id
                    ? "bg-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.3)]"
                    : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white border border-neutral-700"
                }
                ${loading ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              <span>{persona.icon}</span>
              {persona.label}
            </button>
          ))}
        </div>

        {error && (
          <div className="p-4 bg-red-900/20 border border-red-900/50 rounded-lg text-red-400 text-sm mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-8 text-yellow-500">
            <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin mr-3" />
            <span className="animate-pulse">
              Generating tailored summary...
            </span>
          </div>
        ) : summary ? (
          <div className="animate-fade-in-up">
            <div className="bg-yellow-500/5 rounded-lg p-5 border border-yellow-500/10 relative">
              <SparklesIcon className="absolute top-4 right-4 w-5 h-5 text-yellow-500/20" />
              <h3 className="text-yellow-500 font-bold mb-2 text-sm uppercase tracking-wider">
                For {PERSONAS.find((p) => p.id === selectedPersona)?.label}
              </h3>
              <p className="text-neutral-200 leading-relaxed">{summary}</p>
              <div className="mt-4 flex items-center justify-end">
                <span className="text-xs text-neutral-500 font-mono">
                  Generated by Ayoola AI
                </span>
              </div>
            </div>
          </div>
        ) : (
          !selectedPersona && (
            <div className="text-center py-8 text-neutral-500 border border-dashed border-neutral-800 rounded-lg bg-neutral-900/20">
              Select a role above to see a customized summary.
            </div>
          )
        )}
      </div>
    </div>
  );
}
