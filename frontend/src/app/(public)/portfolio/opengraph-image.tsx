import { ogRich, ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { plainText } from "@/components/ui/Rich";
import { getWorkPage, getSite } from "@/lib/site-content";

const site = getSite();
const page = getWorkPage();

export const alt = `${site.name}: ${plainText(page.title)}`;
export const size = ogSize;
export const contentType = ogContentType;

/** Share card in the brand kit's link-preview style. */
export default function Image() {
  return renderOgImage({
    eyebrow: page.eyebrow,
    headline: ogRich(page.title),
    subline: ogRich(site.share.subline),
  });
}
