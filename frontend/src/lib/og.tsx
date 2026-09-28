import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { ReactNode } from "react";
import { site } from "@/config/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

// Dark-theme token values from globals.css (.dark). ImageResponse can't read CSS vars.
const colors = {
  background: "#0a0a0a",
  foreground: "#ededed",
  muted: "#a3a3a3",
  accent: "#f59e0b",
  hair: "rgba(255, 255, 255, 0.08)",
};

const FONT_DIR = path.join(process.cwd(), "src/assets/fonts");

async function loadFonts() {
  const [playfair, playfairItalic, mono] = await Promise.all([
    readFile(path.join(FONT_DIR, "PlayfairDisplay-Bold.woff")),
    readFile(path.join(FONT_DIR, "PlayfairDisplay-BoldItalic.woff")),
    readFile(path.join(FONT_DIR, "JetBrainsMono-Regular.woff")),
  ]);
  return [
    { name: "Playfair", data: playfair, weight: 700 as const, style: "normal" as const },
    { name: "Playfair", data: playfairItalic, weight: 700 as const, style: "italic" as const },
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
          backgroundImage:
            "radial-gradient(900px 520px at 85% -10%, rgba(245, 158, 11, 0.16), transparent 70%)",
          color: colors.foreground,
          fontFamily: "Playfair",
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
              lineHeight: 1.08,
              letterSpacing: -1.5,
              maxWidth: 1040,
            }}
          >
            {headline}
          </div>
          <div style={{ width: 120, height: 6, borderRadius: 3, background: colors.accent, margin: "40px 0 32px" }} />
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

/** Amber italic run inside an OG headline or subline (e.g. "holds up"). */
export function OgAccent({ children }: { children: ReactNode }) {
  return (
    <span style={{ fontStyle: "italic", color: colors.accent, margin: "0 0.25em" }}>
      {children}
    </span>
  );
}
