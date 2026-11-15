import type { Offer } from "@/lib/site-content";

interface OfferCardProps {
  offer: Offer;
  /** Price line for an offer without a `price` ("Quoted after a call"). */
  quoted?: string;
  /** A lone offer spanning the row: details on the left, the ✓ list on the right (from 900px). */
  wide?: boolean;
}

/**
 * Offer card: light by default, green when `featured`. Only the rescue offers
 * carry a price; it's display text, not a checkout.
 */
export default function OfferCard({ offer, quoted, wide = false }: OfferCardProps) {
  const green = offer.featured;
  const priceLine = offer.price ?? quoted;

  const details = (
    <>
      <h3 className="text-[clamp(22px,2.18vw,30px)] m-0">{offer.title}</h3>
      {priceLine && (
        <p className="m-0 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span
            className={
              offer.price
                ? "display text-[clamp(30px,2.8vw,40px)] leading-none"
                : `font-mono text-[12.5px] tracking-[0.08em] uppercase ${
                    green ? "text-[var(--on-accent-soft)]" : "text-[var(--accent)]"
                  }`
            }
          >
            {priceLine}
          </span>
          {offer.price && offer.priceNote && (
            <span
              className={`font-mono text-[12px] tracking-[0.08em] uppercase ${
                green ? "text-[var(--on-accent-muted)]" : "text-[var(--muted)]"
              }`}
            >
              {offer.priceNote}
            </span>
          )}
        </p>
      )}
      <p
        className={`text-[16px] leading-[1.65] m-0 ${
          green ? "text-[var(--on-accent-muted)]" : "text-[var(--muted)]"
        }`}
      >
        {offer.body}
      </p>
    </>
  );

  const includes = offer.includes && (
    <ul className="list-none m-0 p-0 flex flex-col gap-2.5">
      {offer.includes.map((item) => (
        <li key={item} className="flex gap-3 text-[15px] leading-[1.5]">
          <span
            aria-hidden="true"
            className={`arrow ${green ? "text-[var(--on-accent-soft)]" : "text-[var(--accent)]"}`}
          >
            ✓
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );

  const surface = green
    ? "bg-[var(--accent)] text-[var(--on-accent)]"
    : "border border-[var(--card-border-2)] bg-[var(--card)]";

  if (wide) {
    return (
      <div
        className={`rounded-[26px] p-[clamp(28px,3.5vw,44px)] grid gap-x-[clamp(32px,4vw,64px)] gap-y-[22px] items-start min-[900px]:grid-cols-2 ${surface}`}
      >
        <div className="flex flex-col gap-[18px]">{details}</div>
        {includes}
      </div>
    );
  }

  return (
    <div className={`rounded-[26px] p-[clamp(28px,3.5vw,44px)] flex flex-col gap-[18px] ${surface}`}>
      {details}
      {includes}
    </div>
  );
}
