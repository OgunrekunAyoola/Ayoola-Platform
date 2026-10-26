import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getSite } from "@/lib/site-content";
import { site as settings } from "@/config/site";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = getSite();

  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header site={site} email={settings.email} githubUrl={settings.githubUrl} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
