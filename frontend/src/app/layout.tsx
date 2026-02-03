import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Ayoola Ogunrekun",
  description: "Writer, Software Engineer, Expert, Entrepreneur, Creator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col font-sans bg-black text-gray-100">
        <Header />

        <main className="flex-grow container mx-auto p-4 py-8">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
