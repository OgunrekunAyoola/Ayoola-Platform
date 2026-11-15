import type { NextConfig } from "next";

/**
 * Old URLs that were shared before the services restructure (Nov 2026).
 * Permanent (308), so search engines move their ranking to the new page.
 * `/ai` lands on the AI section of /services. Browsers keep a fragment from
 * the old URL, so /work-with-me#builds still lands on the Builds section.
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
