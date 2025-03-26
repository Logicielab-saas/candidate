/**
 * ProfileHeaderSkeleton - Loading placeholder for Profile header section
 *
 * Provides a loading skeleton that matches the structure of the Profile header,
 * including avatar, name, location, and edit button with responsive layout.
 */

import { Skeleton } from "@/components/ui/skeleton";

export function ProfileHeaderSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-6">
      {/* Avatar and user info */}
      <div className="flex items-center gap-6 flex-1">
        {/* Avatar placeholder */}
        <Skeleton className="h-20 w-20 sm:h-24 sm:w-24 rounded-full shrink-0" />

        {/* Name and location placeholders */}
        <div className="space-y-2 min-w-0">
          <Skeleton className="h-8 w-full max-w-[12rem]" aria-hidden="true" />
          <Skeleton className="h-4 w-full max-w-[8rem]" aria-hidden="true" />
        </div>
      </div>

      {/* Edit button placeholder */}
      <div className="mt-4 sm:mt-0 shrink-0">
        <Skeleton className="h-9 w-full sm:w-32" aria-hidden="true" />
      </div>
    </div>
  );
}
