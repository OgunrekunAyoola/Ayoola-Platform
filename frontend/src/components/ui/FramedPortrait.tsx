"use client";

import { useState } from "react";
import Image from "next/image";

interface FramedPortraitProps {
  /** Public path to the portrait image. Defaults to /ayoola-portrait.jpg */
  src?: string;
  alt?: string;
  /** Tailwind sizing for the frame (e.g. "w-[min(420px,82vw)] aspect-[4/5]") */
  className?: string;
  /** image sizes attr for next/image */
  sizes?: string;
  priority?: boolean;
  float?: boolean;
}

/**
 * Signature glass-framed portrait with an accent gradient ring.
 * Renders the real photo when present; otherwise shows an elegant abstract
 * silhouette so the layout always looks intentional.
 */
export default function FramedPortrait({
  src = "/ayoola-portrait.jpg",
  alt = "Ayoola Ogunrekun",
  className = "w-[min(420px,82vw)] aspect-[4/5]",
  sizes = "(max-width: 1024px) 82vw, 420px",
  priority = false,
  float = false,
}: FramedPortraitProps) {
  const [showPhoto, setShowPhoto] = useState(true);

  return (
    <div className={`relative ${className} ${float ? "anim-floaty" : ""}`}>
      <div
        className="absolute inset-0 rounded-[26px] p-[1.5px]"
        style={{
          background:
            "linear-gradient(150deg, var(--accent-line), transparent 55%)",
        }}
      >
        <div
          className="glass w-full h-full rounded-[25px] overflow-hidden relative"
          style={{
            background:
              "linear-gradient(160deg, var(--card-bg), var(--accent-soft))",
          }}
        >
          {/* abstract fallback treatment */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120px 120px at 50% 34%, var(--accent-soft), transparent 70%)",
            }}
          />
          <div
            className="absolute left-1/2 top-[26%] -translate-x-1/2 w-2/5 aspect-square rounded-full opacity-[0.16]"
            style={{
              background:
                "linear-gradient(160deg, var(--foreground), transparent)",
            }}
          />
          <div
            className="absolute left-1/2 -bottom-[6%] -translate-x-1/2 w-[74%] h-[46%] opacity-[0.16]"
            style={{
              borderRadius: "50% 50% 0 0",
              background:
                "linear-gradient(160deg, var(--foreground), transparent)",
            }}
          />
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                "linear-gradient(var(--hair) 1px, transparent 1px), linear-gradient(90deg, var(--hair) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
            }}
          />
          {!showPhoto && (
            <div className="absolute left-4 bottom-4 font-mono text-[11px] text-[var(--muted)] tracking-[0.04em]">
              {"// add your portrait"}
            </div>
          )}

          {showPhoto && (
            <Image
              src={src}
              alt={alt}
              fill
              priority={priority}
              sizes={sizes}
              className="object-cover"
              onError={() => setShowPhoto(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
