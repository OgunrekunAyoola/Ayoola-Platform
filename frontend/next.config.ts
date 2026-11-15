import type { NextConfig } from "next";

/**
 * Old URLs that were shared before the services restructure (Nov 2026).
 * Permanent (308), so search engines move their ranking to the new page.
 * `/ai` lands on the AI section of /services. A fragment on the old URL
 * (e.g. /work-with-me#roles) never reaches the server, so it can't be mapped.
 */
export const legacyRedirects = [
  { source: "/work-with-me", destination: "/services", permanent: true },
  { source: "/ai", destination: "/services#ai", permanent: true },
] as const;

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [...legacyRedirects];
  },
};

export default nextConfig;
