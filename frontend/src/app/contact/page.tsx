export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-yellow-500">Contact</h1>
      <p className="text-gray-400 mb-8">
        Interested in working together? Fill out the form below or send an email directly.
      </p>

      <form className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
          <input 
            type="text" 
            id="name" 
            className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-yellow-500 transition"
            placeholder="Your name"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
          <input 
            type="email" 
            id="email" 
            className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-yellow-500 transition"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
          <textarea 
            id="message" 
            rows={5}
            className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-yellow-500 transition"
            placeholder="How can I help you?"
          ></textarea>
        </div>

        <button 
          type="button" 
          className="w-full bg-yellow-500 text-black font-bold py-3 rounded hover:bg-yellow-400 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
