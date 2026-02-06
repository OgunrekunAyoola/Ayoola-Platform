import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/context/ToastContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    default: "Ayoola Ogunrekun",
    template: "%s | Ayoola Ogunrekun",
  },
  description: "Writer, Software Engineer, Expert, Entrepreneur, Creator",
  keywords: [
    "Ayoola Ogunrekun",
    "Software Engineer",
    "Writer",
    "Entrepreneur",
    "Blog",
    "Portfolio",
  ],
  authors: [{ name: "Ayoola Ogunrekun" }],
  creator: "Ayoola Ogunrekun",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Ayoola Ogunrekun",
    title: "Ayoola Ogunrekun",
    description: "Writer, Software Engineer, Expert, Entrepreneur, Creator",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ayoola Ogunrekun",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayoola Ogunrekun",
    description: "Writer, Software Engineer, Expert, Entrepreneur, Creator",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans bg-black text-gray-100 antialiased selection:bg-yellow-500/30 selection:text-yellow-200">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
