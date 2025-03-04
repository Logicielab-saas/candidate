/**
 * FormationsContainer - Main container for the formations page
 *
 * Manages course data, search functionality, and layout of the formations page
 */

"use client";

import { useState } from "react";
import { SearchCourses } from "./SearchCourses";
import { CoursesList } from "./CoursesList";
import { mockCourses } from "@/core/mockData/courses";

export function FormationsContainer() {
  const [searchQuery, setSearchQuery] = useState("");

  // Ensure mockCourses exists and is an array before filtering
  const courses = Array.isArray(mockCourses) ? mockCourses : [];

  // Filter courses based on search query
  const filteredCourses = courses.filter((course) => {
    if (!course) return false;

    const searchLower = searchQuery.toLowerCase();
    return (
      course.title?.toLowerCase().includes(searchLower) ||
      course.description?.toLowerCase().includes(searchLower) ||
      course.author?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="container mx-auto space-y-8 px-4 py-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Courses</h1>
        <p className="text-muted-foreground">
          Explore our collection of courses to enhance your skills
        </p>
      </div>

      <SearchCourses onSearch={setSearchQuery} />

      <CoursesList courses={filteredCourses} />
    </div>
  );
}
