/**
 * ApplicationDetailsHeaderSkeleton - Loading placeholder for ApplicationDetailsHeader
 *
 * This component provides a loading skeleton that matches the structure and layout
 * of the ApplicationDetailsHeader component, maintaining visual consistency during data fetching.
 */
"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function ApplicationDetailsHeaderSkeleton() {
  return (
    <Card className="p-0">
      <CardContent className="p-0">
        <div className="p-4 flex items-start gap-4">
          {/* Avatar skeleton */}
          <Skeleton className="h-12 w-12 rounded-full" />

          <div className="flex-1 space-y-2">
            {/* Job title skeleton */}
            <Skeleton className="h-7 w-[400px]" />

            {/* Company name skeleton */}
            <Skeleton className="h-5 w-[200px]" />

            {/* City skeleton */}
            <Skeleton className="h-4 w-[150px]" />

            {/* Date skeleton */}
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
