export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-900 py-12">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
        <div>
          <h3 className="text-lg font-bold text-white mb-2">Ayoola Ogunrekun</h3>
          <p className="text-gray-400 text-sm mb-4">
            Writer, Software Engineer, Expert, Entrepreneur, Creator.
          </p>
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        <div className="flex flex-col md:items-end">
          <div className="w-full max-w-sm">
            <h4 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">
              Get the latest thoughts on tech, policy, and creativity.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="email@example.com" 
                className="flex-grow bg-gray-800 border border-gray-700 rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-yellow-500 transition"
                disabled
              />
              <button 
                className="bg-yellow-500 text-black px-4 py-2 text-sm font-bold rounded opacity-50 cursor-not-allowed"
                disabled
              >
                Subscribe
              </button>
            </div>
            <p className="text-xs text-gray-600 mt-2">Coming soon.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
