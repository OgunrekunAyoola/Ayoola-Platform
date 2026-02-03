export default function BlogIndex() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-yellow-500">Blog</h1>
      <div className="space-y-6">
        {[1, 2, 3].map((item) => (
          <article key={item} className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-yellow-500 transition cursor-pointer">
            <h2 className="text-2xl font-bold mb-2">Blog Post Title Placeholder {item}</h2>
            <div className="text-sm text-gray-500 mb-4">October 24, 2023 • 5 min read</div>
            <p className="text-gray-400">
              This is a short excerpt for the blog post. It gives a quick summary of what the article is about to entice the reader to click through.
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
