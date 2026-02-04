export default function Services() {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <header className="mb-20 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
          Services
        </h1>
        <p className="text-xl text-neutral-400 leading-relaxed">
          High-value consulting and execution for founders, policymakers, and
          tech leaders. I bridge the gap between complex technology and
          strategic vision.
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Consulting */}
        <div className="bg-neutral-900/50 p-8 rounded-2xl border border-neutral-800 hover:border-yellow-500/30 transition-all flex flex-col">
          <div className="h-12 w-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-6 text-yellow-500">
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
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-white">Consulting</h2>
          <p className="text-neutral-400 mb-8 flex-grow">
            Strategic advice on product development, technical architecture, and
            team building.
          </p>
          <ul className="space-y-3 text-neutral-300 mb-8">
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">•</span> Tech Strategy &
              Roadmap
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">•</span> Digital
              Transformation
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">•</span> Team Scaling &
              Culture
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">•</span> Technical Audits
            </li>
          </ul>
        </div>

        {/* Engineering */}
        <div className="bg-neutral-900/50 p-8 rounded-2xl border border-neutral-800 hover:border-yellow-500/30 transition-all flex flex-col">
          <div className="h-12 w-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-6 text-yellow-500">
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
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-white">Engineering</h2>
          <p className="text-neutral-400 mb-8 flex-grow">
            Hands-on development of MVPs, prototypes, and complex web
            applications.
          </p>
          <ul className="space-y-3 text-neutral-300 mb-8">
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">•</span> Full Stack
              Development
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">•</span> MVP Prototyping
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">•</span> Performance
              Optimization
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">•</span> API Design &
              Integration
            </li>
          </ul>
        </div>

        {/* Writing */}
        <div className="bg-neutral-900/50 p-8 rounded-2xl border border-neutral-800 hover:border-yellow-500/30 transition-all flex flex-col">
          <div className="h-12 w-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-6 text-yellow-500">
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
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-white">Writing</h2>
          <p className="text-neutral-400 mb-8 flex-grow">
            Clear, compelling technical and strategic writing that communicates
            value.
          </p>
          <ul className="space-y-3 text-neutral-300 mb-8">
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">•</span> Technical
              Documentation
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">•</span> Thought Leadership
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">•</span> Policy Analysis
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">•</span> Content Strategy
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
