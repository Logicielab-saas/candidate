import { Skeleton } from "@/components/ui/skeleton";

export function ProfileContactSkeleton() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div>
        <Skeleton className="h-6 w-40 mb-2" />
        <div className="mt-2 space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-5 w-36" />
          ))}
        </div>
      </div>
    </div>
  );
}
