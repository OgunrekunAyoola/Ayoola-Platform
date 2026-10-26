import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Rich from "@/components/ui/Rich";
import { getNotFound, getSite } from "@/lib/site-content";
import { site as settings } from "@/config/site";

export default function NotFound() {
  const site = getSite();
  const page = getNotFound();

  return (
    <div className="min-h-screen flex flex-col">
      <Header site={site} email={settings.email} githubUrl={settings.githubUrl} />
      <main id="main" className="flex-1 wrap w-full py-[clamp(80px,10vw,140px)] flex flex-col justify-center">
        <div className="eyebrow mb-6">{page.eyebrow}</div>
        <h1 className="text-[clamp(39px,5.3vw,90px)] leading-none m-0 mb-6 max-w-[14ch]">
          <Rich text={page.title} />
        </h1>
        <p className="text-[18px] leading-[1.6] text-[var(--muted)] m-0 mb-10">{page.body}</p>
        <div className="flex flex-wrap gap-4 items-center">
          <Link href={page.primary.href} className="btn btn-ink h-14 px-7 text-[17px]">
            {page.primary.label}
          </Link>
          <Link href={page.secondary.href} className="link-u text-[16px] font-medium">
            {page.secondary.label}
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
