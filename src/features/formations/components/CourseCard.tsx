/**
 * CourseCard - Individual course display component
 *
 * Displays course information in a card format with image, title, author, and progress
 *
 * Props:
 * - course: Course - The course data to display
 */

import { Course } from "@/core/interfaces/course.interface";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { Star } from "lucide-react";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-48 w-full">
        <Image
          src={course.imageUrl}
          alt={course.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="line-clamp-1 text-lg font-semibold">{course.title}</h3>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{course.review.toFixed(1)}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">by {course.author}</p>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {course.description}
        </p>
        {course.progress !== undefined && (
          <div className="space-y-1">
            <Progress value={course.progress} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {course.progress}% complete
            </p>
          </div>
        )}
        <div className="text-xs text-muted-foreground">
          Duration: {Math.floor(course.duration / 60)}h {course.duration % 60}m
        </div>
      </CardContent>
    </Card>
  );
}
