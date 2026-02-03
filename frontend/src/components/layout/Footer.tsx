import NewsletterForm from '../newsletter/NewsletterForm';

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
            <NewsletterForm source="footer" />
          </div>
        </div>
      </div>
    </footer>
  );
}
