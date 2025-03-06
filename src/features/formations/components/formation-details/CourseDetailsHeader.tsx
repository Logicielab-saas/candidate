/**
 * CourseDetailsHeader - Course header information component
 *
 * Displays the course title, description, review score, number of viewers,
 * and progress in a header section with an engaging design
 *
 * Props:
 * - id: string - Course id
 * - title: string - Course title
 * - description: string - Course description
 * - review: number - Course review score
 * - viewersNum: number - Number of viewers
 * - progress?: number - Optional course progress percentage
 * - imageUrl: string - Course image URL
 * - duration: number - Course duration in minutes
 */

import {
  BookOpen,
  Clock,
  GraduationCap,
  PlayCircle,
  Users,
} from "lucide-react";
import { CourseProgress } from "./CourseProgress";
import { CourseStats } from "./CourseStats";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface CourseDetailsHeaderProps {
  id: string;
  title: string;
  description: string;
  review: number;
  viewersNum: number;
  progress?: number;
  imageUrl: string;
  duration: number;
}

export function CourseDetailsHeader({
  id,
  title,
  description,
  review,
  viewersNum,
  progress,
  imageUrl,
  duration,
}: CourseDetailsHeaderProps) {
  // Function to format duration from minutes to hours and minutes
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) {
      return `${remainingMinutes}min`;
    }

    return remainingMinutes > 0
      ? `${hours}h ${remainingMinutes}min`
      : `${hours}h`;
  };

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Content Section */}
      <div className="space-y-6 lg:col-span-2">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="rounded-full">
              <BookOpen className="mr-1 h-3 w-3" />
              Course
            </Badge>
            {progress !== undefined && (
              <Badge
                variant="secondary"
                className="rounded-full bg-green-100/80 text-green-700 dark:bg-green-900/80 dark:text-green-300"
              >
                In Progress
              </Badge>
            )}
          </div>
          <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
        </div>

        {/* Stats Section */}
        <Card className="w-fit border-none bg-card/50">
          <div className="flex flex-wrap items-center gap-6 p-4">
            <CourseStats review={review} viewersNum={viewersNum} />
            {progress !== undefined && (
              <>
                <div className="h-4 w-px bg-border" />
                <CourseProgress progress={progress} />
              </>
            )}
          </div>
        </Card>

        {/* Description Section */}
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>

      {/* Course Card Section */}
      <div className="lg:col-span-1">
        <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl">
          <div className="relative aspect-video">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <Badge
              className="absolute left-4 top-4 animate-pulse bg-primary text-primary-foreground"
              variant="default"
            >
              FREE
            </Badge>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="flex items-center gap-3 text-white">
                <GraduationCap className="h-5 w-5" />
                <span className="text-sm font-medium">Self-paced</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {formatDuration(duration)}
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-4 p-6">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{viewersNum.toLocaleString()} enrolled</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{formatDuration(duration)} total</span>
              </div>
            </div>
            <Link href={`/formations/watch/${id}`}>
              <Button className="w-full gap-2 mt-4" size="lg">
                <PlayCircle className="h-5 w-5" />
                {progress ? "Continue Learning" : "Start Learning"}
              </Button>
            </Link>
            <p className="text-center text-sm text-muted-foreground">
              Get instant access to all {progress ? "remaining" : ""} lessons
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
