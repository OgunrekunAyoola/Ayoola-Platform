import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { getSite } from "@/lib/site-content";

const PORTRAIT_SRC = "/ayoola-portrait.jpg";

// Resolved at build time, so there's no flash between placeholder and photo.
const hasPortrait = fs.existsSync(path.join(process.cwd(), "public", PORTRAIT_SRC));

interface PortraitProps {
  priority?: boolean;
  sizes: string;
}

/**
 * Fills its (positioned) parent with the portrait, or a quiet hatch until
 * public/ayoola-portrait.jpg exists.
 */
export default function Portrait({ priority = false, sizes }: PortraitProps) {
  return hasPortrait ? (
    <Image
      src={PORTRAIT_SRC}
      alt={getSite().name}
      fill
      priority={priority}
      sizes={sizes}
      className="object-cover object-top"
    />
  ) : (
    <div className="hatch absolute inset-0" aria-hidden="true" />
  );
}
