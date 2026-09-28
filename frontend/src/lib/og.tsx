import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { ReactNode } from "react";
import { site } from "@/config/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

// Ink-band token values from globals.css (--inverse etc.). ImageResponse can't read CSS vars.
const colors = {
  background: "#14212b",
  foreground: "#ffffff",
  muted: "rgba(255, 255, 255, 0.72)",
  accent: "#8fd19e",
  hair: "rgba(255, 255, 255, 0.18)",
  tintBlue: "#dff0f3",
  tintGreen: "#dcefd9",
};

const FONT_DIR = path.join(process.cwd(), "src/assets/fonts");

export async function loadFonts() {
  // Satori can't read variable woff2, so these are static 600-weight cuts.
  const [serif, serifItalic, mono] = await Promise.all([
    readFile(path.join(FONT_DIR, "SourceSerif4-SemiBold.woff")),
    readFile(path.join(FONT_DIR, "SourceSerif4-SemiBoldItalic.woff")),
    readFile(path.join(FONT_DIR, "JetBrainsMono-Regular.woff")),
  ]);
  return [
    { name: "Serif", data: serif, weight: 600 as const, style: "normal" as const },
    { name: "Serif", data: serifItalic, weight: 600 as const, style: "italic" as const },
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
          fontFamily: "Serif",
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
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 1040,
            }}
          >
            {headline}
          </div>
          <div style={{ width: 120, height: 5, borderRadius: 3, background: colors.accent, margin: "40px 0 32px" }} />
          <div style={{ display: "flex", flexWrap: "wrap", fontSize: 44, lineHeight: 1.25, color: colors.muted }}>
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
          <span>{site.tagline}</span>
        </div>
      </div>
    ),
    { ...ogSize, fonts: await loadFonts() },
  );
}

/** Italic green run inside an OG headline or subline (e.g. "holds up"). */
export function OgAccent({ children }: { children: ReactNode }) {
  return (
    <span style={{ fontStyle: "italic", color: colors.accent, margin: "0 0.25em" }}>
      {children}
    </span>
  );
}

/**
 * Site mark from the header: italic serif "a" on ink.
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
          fontFamily: "Serif",
          fontStyle: "italic",
          fontWeight: 600,
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
