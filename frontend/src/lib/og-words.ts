import { richParts } from "@/components/ui/Rich";

export interface OgWord {
  word: string;
  /** Inside a `*phrase*`: drawn in the accent colour. */
  accent: boolean;
  /** A space followed this word in the copy (drawn as a margin). */
  spaceAfter: boolean;
}

/**
 * Share-card copy as separate words, so Satori can wrap between them.
 * Splits on ordinary spaces only: a non-breaking space keeps a name together.
 */
export function ogWords(text: string): OgWord[] {
  const words: OgWord[] = [];
  richParts(text).forEach((part, i) => {
    for (const m of part.matchAll(/( +)|([^ ]+)/g)) {
      if (m[1]) {
        if (words.length) words[words.length - 1].spaceAfter = true;
      } else {
        words.push({ word: m[2], accent: i % 2 === 1, spaceAfter: false });
      }
    }
  });
  return words;
}
