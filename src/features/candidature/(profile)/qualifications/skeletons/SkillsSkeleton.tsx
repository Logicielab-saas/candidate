/**
 * SkillsSkeleton - Loading state component for the skills list
 *
 * Displays a placeholder animation while the skills data is being loaded
 */

import { Skeleton } from "@/components/ui/skeleton";
import { SectionHeader } from "../SectionHeader";
import { Zap } from "lucide-react";

export function SkillsSkeleton() {
  return (
    <div className="border p-4 rounded-lg shadow-sm">
      <SectionHeader
        title="Skills"
        icon={<Zap className="w-6 h-6 text-primaryHex-400 mr-2" />}
      />
      <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 p-2">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div
            key={i}
            className="group flex items-center justify-between px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg"
          >
            <div className="flex flex-col gap-1">
              {/* Skill name skeleton */}
              <Skeleton className="h-5 w-24" />
              {/* Level badge skeleton */}
              <Skeleton className="h-5 w-16" />
            </div>
            {/* Action buttons skeleton */}
            <div className="flex gap-1">
              <Skeleton className="h-7 w-7" />
              <Skeleton className="h-7 w-7" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
