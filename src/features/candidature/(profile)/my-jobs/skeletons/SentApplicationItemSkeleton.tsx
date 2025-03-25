/**
 * SentApplicationItemSkeleton - Loading placeholder for SentApplicationItem
 *
 * This component provides a loading skeleton that matches the structure and layout
 * of the SentApplicationItem component, maintaining visual consistency during data fetching.
 */
"use client";

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export function SentApplicationItemSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="py-6 flex items-start justify-between group">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-5 w-[200px]" />
          </div>

          <div className="space-y-1">
            {/* Company name skeleton */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
            {/* Location skeleton */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-[120px]" />
            </div>
            {/* Date skeleton */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-[180px]" />
            </div>
            {/* Status skeleton */}
            <div className="mt-2">
              <Skeleton className="h-6 w-[140px] rounded-full" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-5">
          {/* Update status button skeleton */}
          <Skeleton className="h-9 w-[160px]" />
          {/* Menu button skeleton */}
          <div className="flex flex-col gap-1">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-1 w-1 rounded-full" />
            ))}
          </div>
        </div>
      </div>
      <Separator />
    </motion.div>
  );
}
