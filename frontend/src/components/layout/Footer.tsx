import NewsletterForm from "../newsletter/NewsletterForm";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--card-border)] bg-[var(--background)]/50 backdrop-blur-xl py-16 relative overflow-hidden">
      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[var(--accent)]/5 blur-[100px] pointer-events-none rounded-full" />
      
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-start relative z-10">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-serif font-bold text-[var(--foreground)] mb-2">
              Ayoola Ogunrekun
            </h3>
            <p className="text-[var(--muted)] text-sm max-w-xs leading-relaxed">
              Writer, Software Engineer, Expert, Entrepreneur, Creator.
              Building at the intersection of AI, design, and storytelling.
            </p>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-[var(--muted)] font-medium">
            <p>&copy; {new Date().getFullYear()}</p>
            <Link
              href="/admin/login"
              className="hover:text-[var(--accent)] transition-colors"
            >
              Admin
            </Link>
             <Link
              href="/feed.xml"
              className="hover:text-[var(--accent)] transition-colors"
            >
              RSS
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:items-end">
          <div className="w-full max-w-md bg-[var(--card-bg)] border border-[var(--card-border)] p-6 rounded-2xl backdrop-blur-sm">
            <NewsletterForm source="footer" />
          </div>
        </div>
      </div>
    </footer>
  );
}
