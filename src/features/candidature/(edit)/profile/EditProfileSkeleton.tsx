import { Skeleton } from "@/components/ui/skeleton";

export function EditProfileSkeleton() {
  return (
    <div className="space-y-8">
      {/* Image Upload */}
      <div className="flex justify-center">
        <div className="relative">
          <Skeleton className="h-24 w-24 rounded-full" />
          <Skeleton className="absolute bottom-0 right-0 h-8 w-8 rounded-full" />
        </div>
      </div>

      {/* Name Fields */}
      <div className="grid gap-4 md:grid-cols-2">
        {[1, 2].map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>

      {/* Phone Field */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full md:w-1/2" />
      </div>

      {/* Birth Date Field */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full md:w-1/3" />
      </div>

      {/* Gender Field */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-16" />
        <div className="flex gap-4">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-20" />
        </div>
      </div>

      {/* Address Field */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* City, Country, Postal Code Fields */}
      <div className="grid gap-4 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>

      {/* Bio Field */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-32 w-full" />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
}
