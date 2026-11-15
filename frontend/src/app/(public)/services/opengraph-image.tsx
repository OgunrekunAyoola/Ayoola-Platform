import { OgRich, ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { plainText } from "@/components/ui/Rich";
import { getServices, getSite } from "@/lib/site-content";

const site = getSite();
const page = getServices();

export const alt = `${site.name}: ${plainText(page.intro.title)}`;
export const size = ogSize;
export const contentType = ogContentType;

/** Share card in the brand kit's link-preview style. */
export default function Image() {
  return renderOgImage({
    eyebrow: page.intro.eyebrow,
    headline: <OgRich text={page.intro.title} />,
    subline: <OgRich text={"Rescue & security audit · Product builds · AI systems"} />,
  });
}
