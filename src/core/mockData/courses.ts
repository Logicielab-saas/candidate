/**
 * Mock data for courses
 *
 * Contains sample course data for development and testing
 */

import { Course } from "@/core/interfaces/course.interface";

export const mockCourses: Course[] = [
  {
    id: "1",
    title: "Laravel PHP Framework Tutorial",
    description: "Learn the basics of Laravel, from routing to eloquent ORM",
    imageUrl: "/courses/laravel.webp",
    author: "The Test Author",
    progress: 45,
    review: 4.3,
    duration: 480, // 8 hours
  },
  {
    id: "2",
    title: "Advanced Flutter Development",
    description:
      "Deep dive into advanced Flutter concepts and state management",
    imageUrl: "/courses/flutter.webp",
    author: "The Test Author",
    review: 4.3,
    duration: 360, // 6 hours
  },
  {
    id: "3",
    title: "Dart Programming Language",
    description:
      "Master Dart programming language fundamentals and advanced concepts",
    imageUrl: "/courses/dart.webp",
    author: "The Test Author",
    progress: 75,
    review: 4.3,
    duration: 300, // 5 hours
  },
  {
    id: "4",
    title: "Next.js 14 Mastery",
    description:
      "Build modern web applications with Next.js 14, featuring App Router, Server Components, and advanced patterns",
    imageUrl: "/courses/nextjs.jpg",
    author: "The Test Author",
    progress: 25,
    review: 4.5,
    duration: 420, // 7 hours
  },
  {
    id: "5",
    title: "Advanced TypeScript Development",
    description:
      "Master TypeScript's type system, advanced features, and best practices for large-scale applications",
    imageUrl: "/courses/typescript.jpg",
    author: "The Test Author",
    review: 4.7,
    duration: 540, // 9 hours
  },
] as const;

// Add this for debugging
console.log("Courses loaded:", mockCourses);
