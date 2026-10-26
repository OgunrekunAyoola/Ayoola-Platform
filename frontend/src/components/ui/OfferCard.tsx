import type { WorkWithMeContent } from "@/lib/site-content";

type Offer = WorkWithMeContent["builds"]["offers"][number];

/** Offer card: light by default, green when `featured`. No prices, by design. */
export default function OfferCard({ offer }: { offer: Offer }) {
  const green = offer.featured;
  return (
    <div
      className={`rounded-[26px] p-[clamp(28px,3.5vw,44px)] flex flex-col gap-[18px] ${
        green
          ? "bg-[var(--accent)] text-[var(--on-accent)]"
          : "border border-[var(--card-border-2)] bg-[var(--card)]"
      }`}
    >
      <h3 className="text-[clamp(22px,2.18vw,30px)] m-0">{offer.title}</h3>
      <p
        className={`text-[16px] leading-[1.65] m-0 ${
          green ? "text-[var(--on-accent-muted)]" : "text-[var(--muted)]"
        }`}
      >
        {offer.body}
      </p>
      {offer.includes && (
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
      )}
    </div>
  );
}
