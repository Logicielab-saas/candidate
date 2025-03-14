import { Skeleton } from "@/components/ui/skeleton";

export function ProfileResumeSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-6 w-16" />
      <div className="space-y-3">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="space-y-1">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-9 w-24" />
          </div>
        ))}
      </div>
    </div>
  );
}
