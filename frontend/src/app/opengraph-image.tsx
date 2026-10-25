import { OgRich, ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { plainText } from "@/components/ui/Rich";
import { getSite } from "@/lib/site-content";

const site = getSite();

export const alt = `${site.name}: ${plainText(site.share.subline)}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: site.role,
    headline: site.name,
    subline: <OgRich text={site.share.subline} />,
  });
}
