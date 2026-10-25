import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import { ToastProvider } from "@/context/ToastContext";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { getSiteUrl } from "@/lib/site-url";
import { getSite } from "@/lib/site-content";

// Self-hosted (latin, variable) so builds never depend on Google Fonts.
const hanken = localFont({
  src: "../assets/fonts/HankenGrotesk-Variable.woff2",
  weight: "100 900",
  variable: "--font-hanken",
  display: "swap",
  // The subset has no arrows (→ ↓ ↗); match the design's system-ui fallback rather than Arial.
  adjustFontFallback: false,
  fallback: ["system-ui", "sans-serif"],
});

// Source Serif 4 carries an optical-size axis; browsers apply it automatically.
const sourceSerif = localFont({
  src: [
    {
      path: "../assets/fonts/SourceSerif4-Variable.woff2",
      weight: "200 900",
      style: "normal",
    },
    {
      path: "../assets/fonts/SourceSerif4-Italic-Variable.woff2",
      weight: "200 900",
      style: "italic",
    },
  ],
  variable: "--font-source-serif",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["Georgia", "serif"],
});

const jetbrainsMono = localFont({
  src: "../assets/fonts/JetBrainsMono-Variable.woff2",
  weight: "100 800",
  variable: "--font-jetbrains-mono",
  display: "swap",
  adjustFontFallback: false,
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fcfcfa" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1920" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${hanken.variable} ${sourceSerif.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MotionConfig reducedMotion="user">
            <ToastProvider>{children}</ToastProvider>
          </MotionConfig>
        </ThemeProvider>
      </body>
    </html>
  );
}
