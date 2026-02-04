export default function About() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-12">
        About Ayoola
      </h1>

      <div className="prose prose-invert prose-lg prose-yellow max-w-none">
        <p className="text-2xl text-neutral-300 leading-relaxed font-light mb-12 border-l-4 border-yellow-500 pl-6">
          I am a writer, software engineer, and entrepreneur focused on building
          meaningful products and exploring the intersection of technology,
          policy, and creativity.
        </p>

        <div className="grid md:grid-cols-12 gap-12 my-16">
          <div className="md:col-span-4">
            <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">
              The Story
            </h3>
          </div>
          <div className="md:col-span-8 space-y-6 text-neutral-400">
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

        <div className="grid md:grid-cols-12 gap-12 my-16 border-t border-neutral-800 pt-16">
          <div className="md:col-span-4">
            <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">
              Philosophy
            </h3>
          </div>
          <div className="md:col-span-8 space-y-6 text-neutral-400">
            <p>[Philosophy Content Placeholder]</p>
            <p>
              I believe that technology is a tool for amplification—it scales
              whatever we feed it. Therefore, the most critical work isn&apos;t
              just in the code we write, but in the values we embed within it.
              Clarity of thought precedes clarity of code.
            </p>
          </div>
        </div>

        <div className="bg-neutral-900/50 p-8 rounded-2xl border border-neutral-800 mt-16">
          <h3 className="text-2xl font-bold text-white mb-6">What I Do Best</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-yellow-500 mb-2">
                Technical Leadership
              </h4>
              <p className="text-sm text-neutral-400">
                Guiding teams through complex architectural decisions and
                product lifecycles.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-yellow-500 mb-2">
                Full-Stack Engineering
              </h4>
              <p className="text-sm text-neutral-400">
                Building end-to-end solutions using modern stacks (Next.js,
                Node, Cloud).
              </p>
            </div>
            <div>
              <h4 className="font-bold text-yellow-500 mb-2">
                Strategic Communication
              </h4>
              <p className="text-sm text-neutral-400">
                Translating technical complexity into clear, actionable business
                insights.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-yellow-500 mb-2">
                Product Innovation
              </h4>
              <p className="text-sm text-neutral-400">
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
