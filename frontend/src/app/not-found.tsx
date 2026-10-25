import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Rich from "@/components/ui/Rich";
import { getNotFound, getSite } from "@/lib/site-content";

export default function NotFound() {
  const { name, banner, nav } = getSite();
  const page = getNotFound();

  return (
    <div className="min-h-screen flex flex-col">
      <Header name={name} banner={banner} nav={nav} />
      <main className="flex-grow max-w-[1200px] w-full mx-auto px-5 sm:px-7 py-20 sm:py-28 flex flex-col justify-center">
        <div className="eyebrow mb-6">{page.eyebrow}</div>
        <h1 className="text-[clamp(44px,6vw,84px)] leading-[1.02] tracking-[-0.03em] mb-6 max-w-[14ch]">
          <Rich text={page.title} />
        </h1>
        <p className="text-[17.5px] sm:text-[19px] leading-[1.6] text-[var(--muted)] mb-10">
          {page.body}
        </p>
        <div className="flex flex-wrap gap-3.5">
          <Link href={page.primary.href} className="btn btn-primary btn-lg">
            {page.primary.label}
          </Link>
          <Link href={page.secondary.href} className="btn btn-secondary btn-lg">
            {page.secondary.label}
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
