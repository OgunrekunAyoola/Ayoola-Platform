export default function About() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl md:text-6xl font-serif font-bold text-[var(--foreground)] mb-12">
        About Ayoola
      </h1>

      <div className="prose prose-invert prose-lg prose-yellow max-w-none">
        <div className="mb-12 border-l-4 border-[var(--accent)] pl-6 space-y-6">
          <p className="text-2xl text-[var(--muted)] leading-relaxed font-light">
            Ayoola Platform is my umbrella for everything I build: client
            systems, personal tools, and experiments at the edge of AI and the
            web.
          </p>
          <p className="text-2xl text-[var(--muted)] leading-relaxed font-light">
            I’m interested in how software, AI, and writing can change
            operations, storytelling, and even policy—not only business metrics.
          </p>
          <p className="text-lg text-[var(--muted)]/80">
            I also collaborate with separate studios and ventures focused on AI
            automation for businesses.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-12 my-16">
          <div className="md:col-span-4">
            <h3 className="text-xl font-bold text-[var(--foreground)] mb-4 uppercase tracking-wider">
              The Story
            </h3>
          </div>
          <div className="md:col-span-8 space-y-6 text-[var(--muted)]">
            <p>[Narrative Content Placeholder]</p>
            <p>
              My journey started with a curiosity for how things work—first
              machines, then code, then systems of people and governance. This
              path has led me through various roles: from writing code that
              powers businesses to writing words that shape opinions.
            </p>
            <p>
              Today, I operate at the convergence of these fields, helping
              organizations build robust technology while understanding the
              broader societal context in which it operates.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-12 my-16 border-t border-[var(--card-border)] pt-16">
          <div className="md:col-span-4">
            <h3 className="text-xl font-bold text-[var(--foreground)] mb-4 uppercase tracking-wider">
              Philosophy
            </h3>
          </div>
          <div className="md:col-span-8 space-y-6 text-[var(--muted)]">
            <p>[Philosophy Content Placeholder]</p>
            <p>
              I believe that technology is a tool for amplification—it scales
              whatever we feed it. Therefore, the most critical work isn&apos;t
              just in the code we write, but in the values we embed within it.
              Clarity of thought precedes clarity of code.
            </p>
          </div>
        </div>

        <div className="glass-card p-8 rounded-2xl mt-16">
          <h3 className="text-2xl font-serif font-bold text-[var(--foreground)] mb-6">What I Do Best</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-[var(--accent)] mb-2">
                Technical Leadership
              </h4>
              <p className="text-sm text-[var(--muted)]">
                Guiding teams through complex architectural decisions and
                product lifecycles.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-[var(--accent)] mb-2">
                Full-Stack Engineering
              </h4>
              <p className="text-sm text-[var(--muted)]">
                Building end-to-end solutions using modern stacks (Web, Mobile,
                Node).
              </p>
            </div>
            <div>
              <h4 className="font-bold text-[var(--accent)] mb-2">
                Strategic Communication
              </h4>
              <p className="text-sm text-[var(--muted)]">
                Translating technical complexity into clear, actionable business
                insights.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-[var(--accent)] mb-2">
                Product Innovation
              </h4>
              <p className="text-sm text-[var(--muted)]">
                Identifying opportunities and rapidly prototyping viable
                solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
