import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { ReactNode } from "react";
import { site } from "@/config/site";

const PORTRAIT_SRC = "/ayoola-portrait.jpg";

// Resolved at build time, so there's no flash between placeholder and photo.
const hasPortrait = fs.existsSync(
  path.join(process.cwd(), "public", PORTRAIT_SRC),
);

interface PortraitProps {
  /** "hero": three bands with an arched photo; "about": two bands, photo fills. */
  variant: "hero" | "about";
  /** Overlay (e.g. the run-log card), positioned by the caller. */
  children?: ReactNode;
  priority?: boolean;
  className?: string;
}

/** Colour-banded portrait panel from the redesign; hatched placeholder until the photo exists. */
export default function Portrait({
  variant,
  children,
  priority = false,
  className = "",
}: PortraitProps) {
  const hero = variant === "hero";

  const photo = hasPortrait ? (
    <Image
      src={PORTRAIT_SRC}
      alt={site.name}
      fill
      priority={priority}
      sizes={hero ? "(max-width: 1024px) 70vw, 420px" : "(max-width: 1024px) 86vw, 480px"}
      className="object-cover object-top"
    />
  ) : (
    <div className="hatch absolute inset-0" aria-hidden="true" />
  );

  return (
    <div
      className={`relative overflow-hidden rounded-[28px] grid bg-[var(--surface)] ${
        hero
          ? "aspect-[1/1.02] [grid-template-columns:10%_18%_1fr]"
          : "aspect-[4/5] [grid-template-columns:14%_1fr] bg-[var(--tint-green)]"
      } ${className}`}
    >
      {hero && <div className="bg-[var(--surface)]" />}
      <div className="bg-[var(--tint-blue)]" />
      <div className="relative bg-[var(--tint-green)]">
        {hero ? (
          <div className="absolute inset-[14%_10%_0_6%] overflow-hidden rounded-t-[200px]">
            {photo}
          </div>
        ) : (
          photo
        )}
      </div>
      {children}
    </div>
  );
}
