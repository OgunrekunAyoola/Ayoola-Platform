import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { getAllWork, getWorkBySlug } from "@/lib/content";
import { site } from "@/config/site";

export const alt = `Case study by ${site.name}`;
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return getAllWork().map((project) => ({ slug: project.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getWorkBySlug(slug);
  const title = project?.title ?? site.name;

  return renderOgImage({
    eyebrow: project?.client ? `Case study · ${project.client}` : "Case study",
    headline: title,
    headlineSize: title.length > 60 ? 64 : 76,
    subline: "AI that holds up in production.",
  });
}
