/**
 * ProfileContactSkeleton - Loading placeholder for Profile contact section
 *
 * Provides a loading skeleton that matches the structure of the Profile contact section,
 * including phone, address, birthdate, and gender information with consistent styling.
 * The skeleton maintains the exact layout of the actual content including icons in circles.
 */

import { Skeleton } from "@/components/ui/skeleton";
import { Phone, MapPin, Calendar, User } from "lucide-react";

export function ProfileContactSkeleton() {
  return (
    <div>
      <Skeleton className="h-7 w-48 mb-4" aria-hidden="true" /> {/* Heading */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Phone Section */}
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-full p-2 bg-primaryHex-100 shrink-0">
            <Phone className="h-4 w-4 text-primaryHex-500" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <Skeleton className="h-4 w-24 mb-1" aria-hidden="true" />{" "}
            {/* Label */}
            <Skeleton className="h-4 w-36" aria-hidden="true" /> {/* Value */}
          </div>
        </div>

        {/* Address Section */}
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-full p-2 bg-primaryHex-100 shrink-0">
            <MapPin
              className="h-4 w-4 text-primaryHex-500"
              aria-hidden="true"
            />
          </div>
          <div className="min-w-0">
            <Skeleton className="h-4 w-24 mb-1" aria-hidden="true" />{" "}
            {/* Label */}
            <Skeleton
              className="h-4 w-full max-w-[12rem]"
              aria-hidden="true"
            />{" "}
            {/* Value */}
          </div>
        </div>

        {/* Birth Date Section */}
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-full p-2 bg-primaryHex-100 shrink-0">
            <Calendar
              className="h-4 w-4 text-primaryHex-500"
              aria-hidden="true"
            />
          </div>
          <div className="min-w-0">
            <Skeleton className="h-4 w-24 mb-1" aria-hidden="true" />{" "}
            {/* Label */}
            <Skeleton
              className="h-4 w-full max-w-[10rem]"
              aria-hidden="true"
            />{" "}
            {/* Value */}
          </div>
        </div>

        {/* Gender Section */}
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-full p-2 bg-primaryHex-100 shrink-0">
            <User className="h-4 w-4 text-primaryHex-500" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <Skeleton className="h-4 w-24 mb-1" aria-hidden="true" />{" "}
            {/* Label */}
            <Skeleton className="h-4 w-28" aria-hidden="true" /> {/* Value */}
          </div>
        </div>
      </div>
    </div>
  );
}
