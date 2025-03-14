import { Skeleton } from "@/components/ui/skeleton";

export function ProfileAboutSkeleton() {
  return (
    <div className="space-y-4">
      <div>
        <Skeleton className="h-6 w-24 mb-2" />
        <Skeleton className="h-20 w-full" />
      </div>

      <div>
        <Skeleton className="h-6 w-24 mb-2" />
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-6 w-20" />
          ))}
        </div>
      </div>
    </div>
  );
}
