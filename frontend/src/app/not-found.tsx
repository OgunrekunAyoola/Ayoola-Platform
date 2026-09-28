import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow max-w-[1200px] w-full mx-auto px-5 sm:px-7 py-20 sm:py-28 flex flex-col justify-center">
        <div className="eyebrow mb-6">404</div>
        <h1 className="text-[clamp(44px,6vw,84px)] leading-[1.02] tracking-[-0.03em] mb-6 max-w-[14ch]">
          This page <em>doesn&apos;t exist.</em>
        </h1>
        <p className="text-[17.5px] sm:text-[19px] leading-[1.6] text-[var(--muted)] mb-10">
          It may have moved during the rebuild.
        </p>
        <div className="flex flex-wrap gap-3.5">
          <Link href="/" className="btn btn-primary btn-lg">
            Go home
          </Link>
          <Link href="/portfolio" className="btn btn-secondary btn-lg">
            See the work
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
