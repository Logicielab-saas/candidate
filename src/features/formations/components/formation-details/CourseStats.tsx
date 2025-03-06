/**
 * CourseStats - Course statistics component
 *
 * Displays course review score and number of viewers with animated hover effects
 *
 * Props:
 * - review: number - Course review score
 * - viewersNum: number - Number of viewers
 */

import { Star, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseStatsProps {
  review: number;
  viewersNum: number;
}

export function CourseStats({ review, viewersNum }: CourseStatsProps) {
  const reviewStars = 5;
  const filledStars = Math.round(review);

  return (
    <div className="flex items-center gap-6">
      <div className="group flex items-center gap-2">
        <div className="flex">
          {[...Array(reviewStars)].map((_, index) => (
            <Star
              key={index}
              className={cn(
                "h-4 w-4 transition-all duration-300 ease-out",
                index < filledStars
                  ? "fill-primary text-primary"
                  : "fill-muted/20 text-muted",
                "group-hover:scale-110"
              )}
            />
          ))}
        </div>
        <span className="text-sm font-medium">{review.toFixed(1)}</span>
      </div>
      <div className="group flex items-center gap-2 transition-all duration-300 ease-out hover:text-primary">
        <Users className="h-4 w-4 transition-all duration-300 group-hover:scale-110" />
        <span className="text-sm">{viewersNum.toLocaleString()} viewers</span>
      </div>
    </div>
  );
}
