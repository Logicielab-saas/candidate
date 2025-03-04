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
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Bookmark, Star } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-48 w-full">
        <Link
          href={`/formations/${course.id}`}
          className="relative block h-full w-full"
          target="_blank"
        >
          <Image
            src={course.imageUrl}
            alt={course.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            loading="lazy"
          />
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 z-10 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90"
          onClick={handleBookmarkClick}
        >
          <Bookmark
            className={cn(
              "h-5 w-5 transition-colors",
              isBookmarked
                ? "fill-primaryHex-500 text-primaryHex-500"
                : "text-gray-500"
            )}
          />
        </Button>
      </div>

      <Link href={`/formations/${course.id}`} className="block" target="_blank">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="line-clamp-1 text-lg font-semibold">
              {course.title}
            </h3>
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
            Duration: {Math.floor(course.duration / 60)}h {course.duration % 60}
            m
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
