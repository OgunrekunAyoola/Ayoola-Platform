import { plainText, richParts } from "@/components/ui/Rich";

interface Word {
  text: string;
  green: boolean;
}

/**
 * Splits content copy into words, keeping `*emphasis*` as green words.
 * Punctuation that touches the previous run ("*run on*.") stays with that
 * word, so it rises with it and takes its colour.
 */
export function heroWords(title: string): Word[] {
  const words: Word[] = [];
  const parts = richParts(title);
  parts.forEach((part, i) => {
    const green = i % 2 === 1;
    // Touches the previous run when neither side of the boundary has a space.
    const touching = i > 0 && !/\s$/.test(parts[i - 1]) && !/^\s/.test(part);
    part.split(/\s+/).forEach((token, j) => {
      if (!token) return;
      if (j === 0 && touching && words.length > 0) words[words.length - 1].text += token;
      else words.push({ text: token, green });
    });
  });
  return words;
}

/**
 * The hero h1: each word masked in its own box and lifted into place, 45ms
 * apart, on first paint. Pure CSS, so it doesn't wait for JavaScript.
 */
export default function HeroTitle({ title, className = "" }: { title: string; className?: string }) {
  return (
    <h1 aria-label={plainText(title)} className={className}>
      {heroWords(title).map((word, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="inline-block overflow-hidden align-top pb-[0.08em] -mb-[0.08em]"
        >
          <span
            className={`mask-up inline-block ${word.green ? "text-[var(--accent)]" : "text-[var(--foreground)]"}`}
            style={{ "--delay": `${(0.1 + i * 0.045).toFixed(3)}s` } as React.CSSProperties}
          >
            {word.text}
          </span>
        </span>
      ))}
    </h1>
  );
}
