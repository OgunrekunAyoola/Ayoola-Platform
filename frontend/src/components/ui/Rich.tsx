/** Splits copy on `*phrase*`; odd indices are the emphasised runs. */
export function richParts(text: string): string[] {
  return text.split(/\*([^*]+)\*/g);
}

/** Copy with the emphasis markers removed, for metadata and alt text. */
export function plainText(text: string): string {
  return text.replace(/\*([^*]+)\*/g, "$1");
}

/** Renders content copy, turning `*phrase*` into the italic serif <em>. */
export default function Rich({ text }: { text: string }) {
  return (
    <>
      {richParts(text).map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part))}
    </>
  );
}
