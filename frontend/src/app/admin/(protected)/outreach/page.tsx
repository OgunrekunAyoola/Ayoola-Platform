"use client";

import { useEffect, useState } from "react";
import {
  fetchOutreachTargets,
  createOutreachTarget,
  updateOutreachTarget,
  deleteOutreachTarget,
  OutreachTarget,
} from "@/lib/api-client";

const SEGMENTS = [
  "UK Service Businesses",
  "Design & Brand Agencies",
  "AI-Adjacent Founders",
  "Other",
];

const STATUSES = ["Pending", "Sent", "Replied", "Converted", "Rejected"];

// Simple Templates (Hardcoded for MVP)
const TEMPLATES: Record<string, string> = {
  "UK Service Businesses": `Subject: reducing your admin time by 70%

Hi [Name],

I noticed [Company] is handling a lot of manual processes.

I’m a software engineer who builds custom systems for UK service businesses. I recently helped a talent agency reduce their operations time by 70% by replacing their PDF decks with a live, automated platform.

I’m not an agency—I’m a solo builder looking for one or two select partners to build for this month.

Would you be open to a 10-minute call to see if we can automate your workflow?

Best,
Ayoola`,
  "Design & Brand Agencies": `Subject: dev partner for [Company]

Hi [Name],

I’ve been following [Company]’s work—love the design quality.

I’m a full-stack engineer specializing in building high-performance web systems (Next.js/Node). I recently launched a custom platform that went from zero to 200+ monthly users in just 4 weeks.

I know agencies often struggle to find reliable technical partners who can deliver complex functionality without compromising the design vision.

Are you looking for a technical partner for any upcoming builds? I’d love to show you some of my recent "Systems" work.

Best,
Ayoola`,
  "AI-Adjacent Founders": `Subject: AI integration for [Company]

Hi [Name],

I saw you’re building [Company]—the approach is really smart.

I’m an engineer building AI-enhanced web systems. I’ve been shipping tools that integrate AI for real business outcomes (not just hype), helping companies automate complex workflows.

I have some capacity this month to help ship a feature or MVP.

If you’re looking for someone who can move fast (I ship full platforms in ~4 weeks), I’d love to chat.

Best,
Ayoola`,
};

export default function AdminOutreachPage() {
  const [targets, setTargets] = useState<OutreachTarget[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    segment: SEGMENTS[0],
    notes: "",
  });

  useEffect(() => {
    loadTargets();
  }, []);

  const loadTargets = () => {
    setLoading(true);
    fetchOutreachTargets()
      .then(setTargets)
      .catch((err) => console.error("Failed to load targets", err))
      .finally(() => setLoading(false));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createOutreachTarget(formData);
      setIsModalOpen(false);
      setFormData({
        name: "",
        email: "",
        company: "",
        segment: SEGMENTS[0],
        notes: "",
      });
      loadTargets();
    } catch (error) {
      alert("Failed to create target");
      console.error(error);
    }
  };

  const handleStatusChange = async (id: string, newStatus: any) => {
    try {
      await updateOutreachTarget(id, { status: newStatus });
      setTargets(
        targets.map((t) => (t._id === id ? { ...t, status: newStatus } : t))
      );
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this target?")) return;
    try {
      await deleteOutreachTarget(id);
      setTargets(targets.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Failed to delete", error);
    }
  };

  const copyTemplate = (target: OutreachTarget) => {
    const template = TEMPLATES[target.segment] || "No template found";
    const personalized = template
      .replace("[Name]", target.name)
      .replace("[Company]", target.company);
    navigator.clipboard.writeText(personalized);
    alert("Template copied to clipboard!");
  };

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Outreach</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-400"
        >
          + New Target
        </button>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden overflow-x-auto">
        <table className="w-full text-left min-w-[800px]">
          <thead className="bg-neutral-800 text-neutral-400 text-sm uppercase">
            <tr>
              <th className="px-6 py-4 font-medium">Name / Company</th>
              <th className="px-6 py-4 font-medium">Segment</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {targets.map((target) => (
              <tr key={target._id} className="hover:bg-neutral-800/50">
                <td className="px-6 py-4 font-medium text-white">
                  <div>{target.name}</div>
                  <div className="text-sm text-neutral-500">{target.company}</div>
                  <div className="text-xs text-neutral-600">{target.email}</div>
                </td>
                <td className="px-6 py-4 text-neutral-300">{target.segment}</td>
                <td className="px-6 py-4">
                  <select
                    value={target.status}
                    onChange={(e) => handleStatusChange(target._id, e.target.value)}
                    className="bg-neutral-800 border-none text-xs rounded p-1 focus:ring-1 focus:ring-yellow-500"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4 text-right space-x-4">
                  <button
                    onClick={() => copyTemplate(target)}
                    className="text-yellow-500 hover:text-yellow-400 text-sm font-medium"
                  >
                    Copy Msg
                  </button>
                  <button
                    onClick={() => handleDelete(target._id)}
                    className="text-red-500 hover:text-red-400 text-sm font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {targets.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-neutral-500">
                  No outreach targets found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-xl max-w-md w-full">
            <h2 className="text-xl font-bold mb-6">Add New Target</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                placeholder="Name"
                className="w-full bg-neutral-800 border-none rounded p-3 text-white"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <input
                placeholder="Email"
                type="email"
                className="w-full bg-neutral-800 border-none rounded p-3 text-white"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <input
                placeholder="Company"
                className="w-full bg-neutral-800 border-none rounded p-3 text-white"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                required
              />
              <select
                className="w-full bg-neutral-800 border-none rounded p-3 text-white"
                value={formData.segment}
                onChange={(e) =>
                  setFormData({ ...formData, segment: e.target.value })
                }
              >
                {SEGMENTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <textarea
                placeholder="Notes"
                className="w-full bg-neutral-800 border-none rounded p-3 text-white"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
              />
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-yellow-500 text-black px-6 py-2 rounded-lg font-bold hover:bg-yellow-400"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
