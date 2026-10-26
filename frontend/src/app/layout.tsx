import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ToastProvider } from "@/context/ToastContext";
import PageTransition from "@/components/motion/PageTransition";
import RevealObserver from "@/components/motion/RevealObserver";
import { hostCommentCleanup, revealBootScript } from "@/lib/boot-scripts";
import { getSiteUrl } from "@/lib/site-url";
import { getSite } from "@/lib/site-content";

// Self-hosted (variable) so builds never depend on Google Fonts. Geist and
// Geist Mono are subset to Latin plus the arrows and symbols the copy uses.
const syne = localFont({
  src: "../assets/fonts/Syne-Variable.woff2",
  weight: "400 800",
  variable: "--font-syne",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const geist = localFont({
  src: "../assets/fonts/Geist-Variable.woff2",
  weight: "100 900",
  variable: "--font-geist",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const geistMono = localFont({
  src: "../assets/fonts/GeistMono-Variable.woff2",
  weight: "100 900",
  variable: "--font-geist-mono",
  display: "swap",
  // Only small labels use it, so keep it off the critical path.
  preload: false,
  fallback: ["ui-monospace", "monospace"],
});

const siteUrl = getSiteUrl();

export function generateMetadata(): Metadata {
  const site = getSite();
  return {
    metadataBase: siteUrl ? new URL(siteUrl) : undefined,
    title: {
      default: site.name,
      template: `%s | ${site.name}`,
    },
    description: site.description,
    keywords: site.keywords,
    authors: [{ name: site.name }],
    creator: site.name,
    // Listing icons here overrides Next's auto-injected link for app/icon.tsx,
    // so both generated icons are declared explicitly.
    icons: {
      icon: [{ url: "/icon", type: "image/png", sizes: "64x64" }],
      apple: "/apple-touch-icon.png",
    },
    alternates: {
      types: {
        "application/rss+xml": "/feed.xml",
      },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "/",
      siteName: site.name,
      title: site.name,
      description: site.description,
    },
    twitter: {
      card: "summary_large_image",
      title: site.name,
      description: site.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#eef1ea",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${geist.variable} ${geistMono.variable}`}
      // The boot script adds the `reveal` class before React hydrates.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: hostCommentCleanup + revealBootScript }} />
      </head>
      <body className="font-sans antialiased">
        <ToastProvider>{children}</ToastProvider>
        <PageTransition />
        <RevealObserver />
      </body>
    </html>
  );
}
