/**
 * AccountInfoSkeleton - Loading state placeholder for account information
 *
 * Displays a skeleton loading state for the account information card
 * matching the exact structure of AccountInfo component:
 * - First item (Type de compte): no button
 * - Remaining items: with buttons
 */

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function AccountInfoSkeleton() {
  return (
    <Card className="p-6">
      {/* Title */}
      <Skeleton className="h-7 w-48 mb-4" />

      <div className="divide-y">
        {/* Type de compte - no button */}
        <div className="flex items-center justify-between py-4">
          <div className="space-y-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>

        {/* Email, Phone, Password - with buttons */}
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex items-center justify-between py-4">
            <div className="space-y-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-9 w-[70px]" /> {/* Button skeleton */}
          </div>
        ))}
      </div>
    </Card>
  );
}
