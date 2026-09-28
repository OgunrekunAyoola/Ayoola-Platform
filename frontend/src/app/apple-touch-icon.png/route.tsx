import { renderIconImage } from "@/lib/og";

// Served at the literal /apple-touch-icon.png path iOS requests by default.
export const dynamic = "force-static";

export function GET() {
  return renderIconImage(180);
}
