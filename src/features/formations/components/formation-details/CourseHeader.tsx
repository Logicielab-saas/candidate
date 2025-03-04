/**
 * CourseHeader - Course details header component
 *
 * Displays the course title, description, stats, and progress
 *
 * Props:
 * - course: CourseDetails - The course details to display
 */

import { Progress } from "@/components/ui/progress";
import { Eye, Star } from "lucide-react";

interface CourseHeaderProps {
  title: string;
  review: number;
  viewersNum: number;
  progress?: number;
}

export function CourseHeader({
  title,
  review,
  viewersNum,
  progress,
}: CourseHeaderProps) {
  if (progress === undefined) {
    progress = 0;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{title}</h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{review.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span>{viewersNum.toLocaleString()} viewers</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span>Course Progress</span>
          <span className="text-muted-foreground">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
    </div>
  );
}
