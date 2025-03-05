/**
 * FormationsContainer - Main container for the formations page
 *
 * Manages course data, search functionality, and layout of the formations page
 * Uses nuqs for URL-based search and category state management
 */

"use client";

import { SearchCourses } from "./SearchCourses";
import { CoursesList } from "./CoursesList";
import { CategoryFilter } from "./CategoryFilter";
import { mockCourses } from "@/core/mockData/courses";
import { useQueryState } from "nuqs";
import { CourseCategory } from "@/core/types";
import { useMemo } from "react";

export function FormationsContainer() {
  const [searchQuery, setSearchQuery] = useQueryState("q", {
    defaultValue: null,
    parse: (value) => value || null,
  });
  const [categoryFilter, setCategoryFilter] = useQueryState("category");

  // Memoize the courses array initialization
  const courses = useMemo(() => {
    return Array.isArray(mockCourses) ? mockCourses : [];
  }, []);

  // Calculate category counts
  const categoryCounts = useMemo(() => {
    return courses.reduce((acc, course) => {
      if (course.category) {
        acc[course.category] = (acc[course.category] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);
  }, [courses]);

  // Filter courses based on search query and category
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      if (!course) return false;

      const matchesSearch =
        !searchQuery ||
        [course.title, course.description, course.author].some((field) =>
          field?.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCategory =
        !categoryFilter || course.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [courses, searchQuery, categoryFilter]);

  const handleCategoryChange = (category: CourseCategory | null) => {
    setCategoryFilter(category || null);
  };

  return (
    <div className="container mx-auto space-y-8 px-4 py-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Courses</h1>
        <p className="text-muted-foreground">
          Explore our collection of courses to enhance your skills
        </p>
      </div>

      <div className="space-y-6">
        <SearchCourses value={searchQuery || ""} onSearch={setSearchQuery} />
        <CategoryFilter
          selectedCategory={categoryFilter}
          onCategoryChange={handleCategoryChange}
          categoryCounts={categoryCounts}
        />
      </div>

      <CoursesList courses={filteredCourses} />
    </div>
  );
}
