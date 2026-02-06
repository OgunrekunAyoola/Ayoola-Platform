import Link from "next/link";

export default function Services() {
  return (
    <div className="max-w-6xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <header className="mb-24 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-8 text-white tracking-tight">
          Work With Me
        </h1>
        <p className="text-2xl md:text-3xl text-neutral-400 mb-8 leading-relaxed font-light">
          I build{" "}
          <span className="text-yellow-500 font-medium">
            AI-enhanced web systems
          </span>{" "}
          that automate operations for businesses and teams.
        </p>
        <p className="text-neutral-500 mb-12 uppercase tracking-widest text-sm font-semibold">
          Lagos-based · Serving Global Clients · 2–4 Week Delivery
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            href="/contact"
            className="px-8 py-4 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-all text-lg"
          >
            Schedule Discovery Call
          </Link>
          <Link
            href="/portfolio"
            className="px-8 py-4 bg-transparent border border-neutral-700 text-white font-bold rounded-lg hover:border-yellow-500 hover:text-yellow-500 transition-all text-lg"
          >
            View Case Studies
          </Link>
        </div>
      </header>

      {/* Service Tiers */}
      <div className="grid md:grid-cols-3 gap-8 mb-32">
        {/* Tier 1 */}
        <div className="bg-neutral-900/50 p-8 rounded-2xl border border-neutral-800 hover:border-yellow-500/30 transition-all flex flex-col relative group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500/0 via-yellow-500/50 to-yellow-500/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <h2 className="text-2xl font-bold mb-2 text-white">
            Custom Web Platforms
          </h2>
          <div className="text-3xl font-bold text-yellow-500 mb-6">
            From $1,500
          </div>
          <p className="text-neutral-400 mb-8 text-sm uppercase tracking-wide font-semibold">
            Timeline: 2-4 Weeks
          </p>
          <p className="text-neutral-300 mb-8 flex-grow">
            Best for teams drowning in admin work or founders needing a robust
            MVP to validate their idea.
          </p>
          <ul className="space-y-4 text-neutral-400 mb-8 text-sm">
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">✓</span> Full-stack Web
              Applications
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">✓</span> Custom Admin
              Dashboard
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">✓</span> Database & Auth
              Setup
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">✓</span> Deployment &
              Hosting
            </li>
          </ul>
        </div>

        {/* Tier 2 */}
        <div className="bg-neutral-900/50 p-8 rounded-2xl border border-yellow-500/20 hover:border-yellow-500/50 transition-all flex flex-col relative group shadow-2xl shadow-yellow-900/10">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            Most Popular
          </div>
          <h2 className="text-2xl font-bold mb-2 text-white">
            AI-Assisted Features
          </h2>
          <div className="text-3xl font-bold text-yellow-500 mb-6">
            From $800
          </div>
          <p className="text-neutral-400 mb-8 text-sm uppercase tracking-wide font-semibold">
            Timeline: 1-2 Weeks
          </p>
          <p className="text-neutral-300 mb-8 flex-grow">
            Add intelligence to existing platforms. Search, chatbots,
            auto-summaries, and RAG pipelines.
          </p>
          <ul className="space-y-4 text-neutral-400 mb-8 text-sm">
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">✓</span> LLM Integration
              (OpenAI/Gemini)
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">✓</span> RAG Pipelines
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">✓</span> Custom AI Agents
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">✓</span> Vector Database
              Setup
            </li>
          </ul>
        </div>

        {/* Tier 3 */}
        <div className="bg-neutral-900/50 p-8 rounded-2xl border border-neutral-800 hover:border-yellow-500/30 transition-all flex flex-col relative group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500/0 via-yellow-500/50 to-yellow-500/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <h2 className="text-2xl font-bold mb-2 text-white">
            Technical Writing
          </h2>
          <div className="text-3xl font-bold text-yellow-500 mb-6">
            From $300
          </div>
          <p className="text-neutral-400 mb-8 text-sm uppercase tracking-wide font-semibold">
            Timeline: 3-5 Days
          </p>
          <p className="text-neutral-300 mb-8 flex-grow">
            Clear, developer-focused documentation, tutorials, and engineering
            case studies that build authority.
          </p>
          <ul className="space-y-4 text-neutral-400 mb-8 text-sm">
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">✓</span> In-depth Tutorials
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">✓</span> API Documentation
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">✓</span> Engineering Case
              Studies
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">✓</span> Architecture
              Diagrams
            </li>
          </ul>
        </div>
      </div>

      {/* Process Section */}
      <section className="mb-32">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-white">
          How We Work
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              step: "01",
              title: "Discovery",
              desc: "30-min call. No jargon. Just business problems.",
            },
            {
              step: "02",
              title: "Proposal",
              desc: "Fixed-price quote. Clear deliverables. No surprises.",
            },
            {
              step: "03",
              title: "Build",
              desc: "Weekly check-ins. Live progress link from Day 7.",
            },
            {
              step: "04",
              title: "Launch",
              desc: "Deployment, training videos, and full code handoff.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="bg-neutral-900/30 p-6 rounded-xl border border-neutral-800"
            >
              <div className="text-5xl font-bold text-neutral-800 mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-neutral-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Availability Footer */}
      <section className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
          Ready to start?
        </h2>
        <p className="text-neutral-400 mb-8 max-w-2xl mx-auto">
          I am currently available for{" "}
          <span className="text-yellow-500 font-bold">1 new project</span>. I
          typically respond to inquiries within 24 hours.
        </p>
        <a
          href="mailto:hello@ayoola.io"
          className="inline-block px-8 py-4 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-all text-lg"
        >
          Email Me: hello@ayoola.io
        </a>
      </section>
    </div>
  );
}
