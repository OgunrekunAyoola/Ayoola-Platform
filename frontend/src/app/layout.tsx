import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import { ToastProvider } from "@/context/ToastContext";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { getSiteUrl } from "@/lib/site-url";
import { site } from "@/config/site";

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

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
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
  icons: {
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
    description: site.description,
    images: ["/og-image.jpg"],
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
