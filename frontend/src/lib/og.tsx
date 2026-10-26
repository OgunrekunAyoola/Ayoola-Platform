import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { ReactNode } from "react";
import { getSite } from "@/lib/site-content";
import { richParts } from "@/components/ui/Rich";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

// v7 ink and paper (globals.css tokens). ImageResponse can't read CSS vars.
const colors = {
  background: "#13201a",
  foreground: "#eef1ea",
  muted: "rgba(238, 241, 234, 0.72)",
  accent: "#bfe3cf",
  hair: "rgba(238, 241, 234, 0.18)",
};

const FONT_DIR = path.join(process.cwd(), "src/assets/fonts");

export async function loadFonts() {
  // Satori can't read variable woff2, so these are static TTF cuts.
  const [display, mono] = await Promise.all([
    readFile(path.join(FONT_DIR, "Syne-Bold.ttf")),
    readFile(path.join(FONT_DIR, "GeistMono-Regular.ttf")),
  ]);
  return [
    { name: "Display", data: display, weight: 700 as const, style: "normal" as const },
    { name: "Mono", data: mono, weight: 400 as const, style: "normal" as const },
  ];
}

interface OgCardProps {
  /** Small mono label above the headline. */
  eyebrow: string;
  headline: ReactNode;
  /** Line under the accent rule. */
  subline: ReactNode;
  headlineSize?: number;
}

/** Branded 1200×630 card shared by the site-wide and per-case-study OG images. */
export async function renderOgImage({
  eyebrow,
  headline,
  subline,
  headlineSize = 88,
}: OgCardProps) {
  const site = getSite();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: colors.background,
          color: colors.foreground,
          fontFamily: "Display",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontFamily: "Mono",
            fontSize: 24,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: colors.accent,
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: 999, background: colors.accent }} />
          {eyebrow}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: headlineSize,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -3,
              maxWidth: 1040,
            }}
          >
            {headline}
          </div>
          <div style={{ width: 120, height: 5, borderRadius: 3, background: colors.accent, margin: "40px 0 32px" }} />
          <div style={{ display: "flex", flexWrap: "wrap", fontSize: 42, lineHeight: 1.25, letterSpacing: -1, color: colors.muted }}>
            {subline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 28,
            borderTop: `1px solid ${colors.hair}`,
            fontFamily: "Mono",
            fontSize: 22,
            color: colors.muted,
          }}
        >
          <span>{site.name}</span>
          <span>{site.role}</span>
        </div>
      </div>
    ),
    { ...ogSize, fonts: await loadFonts() },
  );
}

/**
 * Content copy for an OG card: `*phrase*` becomes the green run.
 * Satori drops spaces between flex children, so the run carries its own
 * margin on whichever side had a space in the copy.
 */
export function OgRich({ text }: { text: string }) {
  const parts = richParts(text);
  return (
    <>
      {parts.map((part, i) => {
        if (i % 2 === 0) return part.trim() ? <span key={i}>{part.trim()}</span> : null;
        const before = /\s$/.test(parts[i - 1] ?? "");
        const after = /^\s/.test(parts[i + 1] ?? "");
        return (
          <span
            key={i}
            style={{
              color: colors.accent,
              marginLeft: before ? "0.25em" : 0,
              marginRight: after ? "0.25em" : 0,
            }}
          >
            {part}
          </span>
        );
      })}
    </>
  );
}

/**
 * Site mark: Syne "a" on ink.
 * "circle" for the favicon; "square" (full bleed) for apple-touch-icon, which iOS rounds itself.
 */
export async function renderIconImage(px: number, shape: "circle" | "square") {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.background,
          borderRadius: shape === "circle" ? "50%" : 0,
          color: colors.foreground,
          fontFamily: "Display",
          fontWeight: 700,
          fontSize: px * (shape === "circle" ? 0.62 : 0.56),
          lineHeight: 1,
          paddingBottom: px * 0.08,
        }}
      >
        a
      </div>
    ),
    { width: px, height: px, fonts: await loadFonts() },
  );
}
