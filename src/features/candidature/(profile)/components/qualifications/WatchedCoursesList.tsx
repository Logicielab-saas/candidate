import React, { useState } from "react";
import { BookOpen, Plus } from "lucide-react";
import { mockQualifications } from "@/core/mockData/qualifications";
import { Course } from "@/core/types/course";
import CircleLineWrapper from "./CircleLineWrapper";
import Link from "next/link";
import { LinkStyle } from "@/core/styles/links";
import { cn } from "@/lib/utils";

export function WatchedCoursesList() {
  const [courses, _setCourses] = useState<Course[]>(mockQualifications.course);
  return (
    <div className="border p-4 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4 flex items-center justify-between">
        <span className="flex items-center">
          <BookOpen className="w-6 h-6 text-primaryHex-400 mr-2" />
          Cours suivis
        </span>
        <span
          className="text-primaryHex-600 font-bold rounded-full p-2 bg-primaryHex-100 hover:bg-primaryHex-200 cursor-pointer"
          onClick={() => {}}
        >
          <Plus className="w-5 h-5" />
        </span>
      </h2>
      <div className="space-y-0">
        {courses.map((course) => (
          <CircleLineWrapper key={course.id}>
            <Link
              href={`/formations/${course.id}`}
              className={cn(LinkStyle, "text-base font-bold underline")}
            >
              {course.name}
            </Link>
            <p className="text-gray-600">{course.completion}</p>
            <p className="text-gray-500">{course.startDate}</p>
          </CircleLineWrapper>
        ))}
      </div>
    </div>
  );
}
