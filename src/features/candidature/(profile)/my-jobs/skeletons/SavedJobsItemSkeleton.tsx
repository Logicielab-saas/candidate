/**
 * SavedJobsItemSkeleton - Loading skeleton for saved job items
 *
 * This component displays a loading skeleton UI for saved job items
 * while the actual data is being fetched.
 */
"use client";

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { MoreVertical } from "lucide-react";

export function SavedJobsItemSkeleton({
  source = "saved",
}: {
  source?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="py-4 flex items-start justify-between">
        <div className="space-y-3 w-full max-w-[70%]">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-5 w-40" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-36" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-20" />
          {source === "saved" && <Skeleton className="h-9 w-9 rounded-md" />}
          <MoreVertical className="h-5 w-5 opacity-50 animate-pulse" />
        </div>
      </div>
      <Separator />
    </motion.div>
  );
}
