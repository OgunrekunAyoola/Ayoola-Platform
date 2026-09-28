import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="max-w-[1200px] mx-auto px-5 sm:px-7 pt-16 sm:pt-20 pb-24 animate-fade-in">
      <Skeleton className="h-3 w-24 mb-6" />
      <Skeleton className="h-14 w-full max-w-[640px] mb-4" />
      <Skeleton className="h-14 w-2/3 max-w-[420px] mb-8" />
      <Skeleton className="h-5 w-full max-w-[560px] mb-16" />
      <div className="grid gap-[22px] [grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr))]">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-[240px] rounded-[22px]" />
        ))}
      </div>
    </div>
  );
}
