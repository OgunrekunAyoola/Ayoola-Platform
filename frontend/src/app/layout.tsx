import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import { ToastProvider } from "@/context/ToastContext";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { getSiteUrl } from "@/lib/site-url";
import { site } from "@/config/site";

// Self-hosted (latin, variable weight) so builds never depend on Google Fonts.
const inter = localFont({
  src: "../assets/fonts/Inter-Variable.woff2",
  weight: "100 900",
  variable: "--font-inter",
  display: "swap",
});

const playfair = localFont({
  src: [
    {
      path: "../assets/fonts/PlayfairDisplay-Variable.woff2",
      weight: "400 900",
      style: "normal",
    },
    {
      path: "../assets/fonts/PlayfairDisplay-Italic-Variable.woff2",
      weight: "400 900",
      style: "italic",
    },
  ],
  variable: "--font-playfair",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: "../assets/fonts/JetBrainsMono-Variable.woff2",
  weight: "100 800",
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: "Ayoola Ogunrekun",
    template: "%s | Ayoola Ogunrekun",
  },
  description: site.description,
  keywords: [
    "Ayoola Ogunrekun",
    "AI Systems Engineer",
    "Production AI",
    "Multi-agent systems",
    "LLM pipelines",
    "AWS",
  ],
  authors: [{ name: "Ayoola Ogunrekun" }],
  creator: "Ayoola Ogunrekun",
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
    siteName: "Ayoola Ogunrekun",
    title: "Ayoola Ogunrekun",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayoola Ogunrekun",
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#b45309" },
    { media: "(prefers-color-scheme: dark)", color: "#f59e0b" },
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
      className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased selection:bg-[var(--selection-bg)] selection:text-yellow-200">
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
