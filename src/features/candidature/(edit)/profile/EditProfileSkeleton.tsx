/**
 * EditProfileSkeleton - Loading placeholder for EditProfileForm
 *
 * Provides a loading skeleton that matches the exact structure of the EditProfileForm,
 * including avatar upload, personal details, contact information, address fields,
 * biography, and resume description with responsive layout.
 */

import { Skeleton } from "@/components/ui/skeleton";

export function EditProfileSkeleton() {
  return (
    <div className="space-y-8">
      {/* Image Upload Section */}
      <div className="flex justify-center">
        <div className="relative">
          <Skeleton className="h-24 w-24 rounded-full" aria-hidden="true" />
          <Skeleton
            className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Name Fields - First Name & Last Name */}
      <div className="grid gap-4 md:grid-cols-2">
        {["First Name", "Last Name"].map((label, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-24" aria-hidden="true" />
            <Skeleton className="h-10 w-full" aria-hidden="true" />
            <Skeleton className="h-3 w-0" aria-hidden="true" />{" "}
            {/* Space for potential error message */}
          </div>
        ))}
      </div>

      {/* Phone Field */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-28" aria-hidden="true" />
        <Skeleton
          className="h-10 w-full md:w-2/3 lg:w-1/2"
          aria-hidden="true"
        />
        <Skeleton className="h-3 w-0" aria-hidden="true" />
      </div>

      {/* Birth Date Field */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" aria-hidden="true" />
        <Skeleton className="h-10 w-full md:w-40" aria-hidden="true" />
        <Skeleton className="h-3 w-0" aria-hidden="true" />
      </div>

      {/* Gender Field - Radio Buttons */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-16" aria-hidden="true" />
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" aria-hidden="true" />
            <Skeleton className="h-4 w-10" aria-hidden="true" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" aria-hidden="true" />
            <Skeleton className="h-4 w-16" aria-hidden="true" />
          </div>
        </div>
        <Skeleton className="h-3 w-0" aria-hidden="true" />
      </div>

      {/* Address Field */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" aria-hidden="true" />
        <Skeleton className="h-10 w-full" aria-hidden="true" />
        <Skeleton className="h-3 w-0" aria-hidden="true" />
      </div>

      {/* City, Country, Postal Code Fields */}
      <div className="grid gap-4 md:grid-cols-3">
        {["City", "Country", "Postal Code"].map((label, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-20" aria-hidden="true" />
            {i === 0 ? (
              // City dropdown
              <Skeleton className="h-10 w-full" aria-hidden="true" />
            ) : (
              // Input fields
              <Skeleton className="h-10 w-full" aria-hidden="true" />
            )}
            <Skeleton className="h-3 w-0" aria-hidden="true" />
          </div>
        ))}
      </div>

      {/* Bio Field */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-12" aria-hidden="true" />
        <Skeleton className="h-28 w-full" aria-hidden="true" />
        <Skeleton className="h-3 w-0" aria-hidden="true" />
      </div>

      {/* Resume Description Field */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-40" aria-hidden="true" />
        <Skeleton className="h-36 w-full" aria-hidden="true" />
        <Skeleton className="h-3 w-0" aria-hidden="true" />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-2">
        <Skeleton className="h-10 w-24" aria-hidden="true" />
        <Skeleton className="h-10 w-32" aria-hidden="true" />
      </div>
    </div>
  );
}
