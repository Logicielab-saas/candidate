/**
 * SkillsSkeleton - Loading state component for the skills list
 *
 * Displays a placeholder animation while the skills data is being loaded,
 * matching the exact layout and styling of the SkillsList component
 */

import { Skeleton } from "@/components/ui/skeleton";
import { SectionHeader } from "../SectionHeader";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { getSkillBadgeStyle } from "@/core/styles/skill-badge.style";

export function SkillsSkeleton() {
  return (
    <div className="border p-4 rounded-lg shadow-sm">
      <SectionHeader
        title="Skills"
        icon={<Zap className="w-6 h-6 text-primaryHex-400 mr-2" />}
      />
      <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 p-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={cn(getSkillBadgeStyle())}>
            <div className="flex flex-col gap-1 min-w-0">
              {/* Skill name skeleton */}
              <Skeleton className="h-5 w-[120px]" />
              {/* Level badge skeleton */}
              <Skeleton className="h-5 w-[80px] rounded-full" />
            </div>
            {/* Action buttons skeleton */}
            <div className="flex gap-1">
              <Skeleton className="h-7 w-7 rounded-md" />
              <Skeleton className="h-7 w-7 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
