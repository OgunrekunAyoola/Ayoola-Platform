import NewsletterForm from "../newsletter/NewsletterForm";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-900 py-12">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
        <div>
          <h3 className="text-lg font-bold text-white mb-2">
            Ayoola Ogunrekun
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Writer, Software Engineer, Expert, Entrepreneur, Creator.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
            <span className="hidden sm:inline">|</span>
            <Link
              href="/admin/login"
              className="hover:text-yellow-500 transition-colors"
            >
              Admin
            </Link>
          </div>
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
