/**
 * ProfileHeaderSkeleton - Loading placeholder for Profile header section
 *
 * Provides a loading skeleton that matches the structure of the Profile header,
 * including avatar, name, location, and action buttons (Edit Profile and Generate CV)
 * with responsive layout that stacks vertically on mobile and horizontally on larger screens.
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

      {/* Action buttons placeholders */}
      <div className="flex flex-col gap-2 mt-4 sm:mt-0 shrink-0">
        {/* Edit profile button placeholder */}
        <Skeleton className="h-9 w-full sm:w-32" aria-hidden="true" />

        {/* Generate CV button placeholder */}
        <Skeleton className="h-9 w-full sm:w-32" aria-hidden="true" />
      </div>
    </div>
  );
}
