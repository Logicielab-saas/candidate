/**
 * CoursesList - Grid display of course cards
 *
 * Displays a responsive grid of courses with filtering capability
 *
 * Props:
 * - courses: Course[] - Array of courses to display
 */

import type { Course } from "@/core/interfaces/";
import { CourseCard } from "./CourseCard";

interface CoursesListProps {
  courses: Course[];
}

export function CoursesList({ courses }: CoursesListProps) {
  if (courses.length === 0) {
    return (
      <div className="flex min-h-[200px] items-center justify-center text-muted-foreground">
        No courses found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
