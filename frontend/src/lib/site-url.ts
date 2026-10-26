let warned = false;

function warnOnce(message: string) {
  if (warned) return;
  warned = true;
  console.warn(`[build] ${message}`);
}

/**
 * NEXT_PUBLIC_SITE_URL as a bare origin ("https://example.com"), or "" if
 * unset or unusable. Forgiving on purpose: it's typed by hand into Netlify,
 * and a value like "example.com" or "https://example.com/ " must not fail the
 * build (metadataBase does `new URL(...)`) or produce "//about" in the sitemap.
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) {
    warnOnce(
      "NEXT_PUBLIC_SITE_URL is not set — canonical URLs, the sitemap, the RSS feed, and Open Graph/Twitter images will fall back to relative paths instead of absolute URLs.",
    );
    return "";
  }
  try {
    return new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`).origin;
  } catch {
    warnOnce(`NEXT_PUBLIC_SITE_URL ("${raw}") is not a valid URL — falling back to relative paths.`);
    return "";
  }
}
