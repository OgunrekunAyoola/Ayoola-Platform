import { OgAccent, ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { site } from "@/config/site";

export const alt = `${site.name}: AI that holds up in production.`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: site.jobTitle,
    headline: site.name,
    subline: (
      <>
        AI that<OgAccent>holds up</OgAccent>in production.
      </>
    ),
  });
}
