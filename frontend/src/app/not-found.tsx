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
          This page doesn&apos;t exist.
        </h1>
        <p className="text-[var(--muted)] mb-8">
          It may have moved during the rebuild.
        </p>
        <div className="flex flex-wrap gap-3.5 justify-center">
          <Link href="/" className="btn btn-primary">
            Go home
          </Link>
          <Link href="/portfolio" className="btn btn-secondary">
            See the work
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
