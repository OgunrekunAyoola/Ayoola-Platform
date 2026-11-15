import { ogRich, ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { plainText } from "@/components/ui/Rich";
import { getContact, getSite } from "@/lib/site-content";

const site = getSite();
const page = getContact();

export const alt = `${site.name}: ${plainText(page.title)}`;
export const size = ogSize;
export const contentType = ogContentType;

/** Share card in the brand kit's link-preview style. */
export default function Image() {
  return renderOgImage({
    eyebrow: page.eyebrow,
    headline: ogRich(page.title),
    subline: ogRich("Tell me what you’re building and *where it’s stuck.*"),
  });
}
