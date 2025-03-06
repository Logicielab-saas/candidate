/**
 * CourseProgress - Course progress indicator component
 *
 * Displays course progress as a progress bar and percentage
 * with animated progress and visual feedback
 *
 * Props:
 * - progress: number - Progress percentage (0-100)
 */

"use client";

import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Trophy } from "lucide-react";

interface CourseProgressProps {
  progress: number;
}

export function CourseProgress({ progress }: CourseProgressProps) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setValue(progress), 500);
    return () => clearTimeout(timeout);
  }, [progress]);

  return (
    <div className="group flex items-center gap-4">
      <div className="relative min-w-[120px]">
        <Progress
          value={value}
          className={cn(
            "h-2 transition-all duration-300",
            value >= 100 && "bg-green-100 dark:bg-green-900",
            "group-hover:h-3"
          )}
        />
        {value >= 100 && (
          <Trophy className="absolute -right-2 -top-2 h-4 w-4 text-green-500 animate-bounce" />
        )}
      </div>
      <div className="flex items-baseline gap-1">
        <span
          className={cn(
            "text-sm font-medium tabular-nums transition-colors",
            value >= 100 && "text-green-500"
          )}
        >
          {value}%
        </span>
        <span className="text-xs text-muted-foreground">completed</span>
      </div>
    </div>
  );
}
