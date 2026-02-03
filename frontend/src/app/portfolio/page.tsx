export default function PortfolioIndex() {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-yellow-500">Portfolio</h1>
      <p className="text-xl text-gray-400 mb-12 max-w-2xl">
        A selection of projects that demonstrate technical depth and product thinking.
      </p>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((item) => (
          <div key={item} className="group bg-gray-900 rounded-lg border border-gray-800 overflow-hidden hover:border-yellow-500 transition">
            <div className="h-48 bg-gray-800 flex items-center justify-center text-gray-600">
              [Project Image]
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2 group-hover:text-yellow-500 transition">Project Name {item}</h2>
              <p className="text-gray-400 text-sm mb-4">
                Brief description of the project, the problem it solved, and the technologies used.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-gray-800 px-2 py-1 rounded text-gray-300">Next.js</span>
                <span className="text-xs bg-gray-800 px-2 py-1 rounded text-gray-300">TypeScript</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
