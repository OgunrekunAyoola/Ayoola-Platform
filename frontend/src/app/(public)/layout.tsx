import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getSite } from "@/lib/site-content";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { name, banner, nav } = getSite();

  return (
    <div className="min-h-screen flex flex-col">
      <Header name={name} banner={banner} nav={nav} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
