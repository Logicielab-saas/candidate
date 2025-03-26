/**
 * ProfileAboutSkeleton - Loading placeholder for Profile about section
 *
 * Provides a loading skeleton that matches the structure of the Profile about section,
 * including biography and skills with responsive layout.
 */

import { Skeleton } from "@/components/ui/skeleton";

export function ProfileAboutSkeleton() {
  // Define number of skill badges to show based on common use cases
  const skillBadges = 5;

  return (
    <div className="space-y-6">
      {/* Biography section */}
      <div>
        <Skeleton className="h-6 w-28 mb-3" aria-hidden="true" />
        <div className="space-y-2">
          {/* Multiple lines for bio text */}
          <Skeleton className="h-4 w-full" aria-hidden="true" />
          <Skeleton className="h-4 w-full" aria-hidden="true" />
          <Skeleton className="h-4 w-3/4" aria-hidden="true" />
        </div>
      </div>

      {/* Skills section */}
      <div>
        <Skeleton className="h-6 w-28 mb-3" aria-hidden="true" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: skillBadges }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-6 w-16 sm:w-20 rounded-full"
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
