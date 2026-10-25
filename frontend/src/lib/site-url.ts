let warned = false;

/**
 * Returns NEXT_PUBLIC_SITE_URL, or "" if unset. No localhost fallback —
 * callers get a relative path instead, and this warns once per build so
 * a missing env var in CI/Netlify is impossible to miss.
 */
export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL;
  if (!url && !warned) {
    warned = true;
    console.warn(
      "[build] NEXT_PUBLIC_SITE_URL is not set — canonical URLs, the sitemap, the RSS feed, and Open Graph/Twitter images will fall back to relative paths instead of absolute URLs.",
    );
  }
  return url ?? "";
}
