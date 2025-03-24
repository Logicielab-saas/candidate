import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function JobCardSkeleton() {
  return (
    <Card className="transition-all duration-200">
      <CardHeader>
        <div className="flex items-start gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex flex-col gap-2 flex-1">
            <div className="flex items-start justify-between">
              <Skeleton className="h-5 w-48" />
              <div className="flex flex-col gap-1">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-1 w-1 rounded-full" />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1">
                <Skeleton className="h-3 w-3" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex items-center gap-1">
                <Skeleton className="h-3 w-3" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {/* Skills
          <div className="flex flex-wrap gap-2">
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} className="h-6 w-16 rounded-full" />
            ))}
          </div>*/}
          {/* Contracts
          <div className="flex flex-wrap gap-2">
            {[...Array(2)].map((_, index) => (
              <Skeleton key={index} className="h-6 w-20 rounded-full" />
            ))}
          </div>*/}
          {/* Stats */}
          <Skeleton className="h-4 w-48" />
        </div>
      </CardContent>
    </Card>
  );
}
