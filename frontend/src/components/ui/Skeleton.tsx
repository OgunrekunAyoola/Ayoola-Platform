export default function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-[var(--muted)]/10 rounded ${className}`} />
  );
}
