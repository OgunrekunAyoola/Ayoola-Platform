import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow max-w-[720px] mx-auto px-5 sm:px-7 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="font-mono text-xs tracking-[0.14em] uppercase text-[var(--accent)] mb-3.5">
          404
        </div>
        <h1 className="font-serif font-extrabold tracking-tight text-[clamp(32px,4.4vw,48px)] text-[var(--foreground)] mb-4">
          Not found.
        </h1>
        <p className="text-[var(--muted)] mb-8">
          Could not find the requested resource.
        </p>
        <Link href="/" className="btn btn-primary">
          Return Home
        </Link>
      </main>
      <Footer />
    </div>
  );
}
