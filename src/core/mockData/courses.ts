/**
 * Mock data for courses
 *
 * Contains sample course data for development and testing
 */

import { Course } from "@/core/interfaces/course.interface";
import { CourseDetails } from "../interfaces/course-details.interface";
import { CourseVideo } from "../interfaces/course-video.interface";

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
    title: "NestJS Enterprise Development",
    description:
      "Master NestJS framework for building scalable and maintainable enterprise Node.js applications",
    imageUrl: "/courses/nestjs.png",
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
];

// Mock videos for courses
const laravelVideos: CourseVideo[] = [
  {
    id: "1-1",
    title: "Introduction to Laravel",
    imageUrl: "/courses/laravel-1.webp",
    videoUrl: "https://example.com/videos/laravel-1",
    timing: "15:30",
    progress: 100,
  },
  {
    id: "1-2",
    title: "Routing and Controllers",
    imageUrl: "/courses/laravel-2.webp",
    videoUrl: "https://example.com/videos/laravel-2",
    timing: "20:45",
    progress: 80,
  },
  {
    id: "1-3",
    title: "Eloquent ORM Basics",
    imageUrl: "/courses/laravel-3.webp",
    videoUrl: "https://example.com/videos/laravel-3",
    timing: "25:15",
    progress: 0,
  },
  {
    id: "1-4",
    title: "Authentication and Authorization",
    imageUrl: "/courses/laravel-4.webp",
    videoUrl: "https://example.com/videos/laravel-4",
    timing: "30:20",
    progress: 0,
  },
];

const nestjsVideos: CourseVideo[] = [
  {
    id: "4-1",
    title: "Introduction to NestJS",
    imageUrl: "/courses/nestjs.png",
    videoUrl: "/formations/lesson1.mp4",
    timing: "25:00",
    progress: 100,
  },
  {
    id: "4-2",
    title: "Controllers and Routing",
    imageUrl: "/courses/nestjs.png",
    videoUrl: "/formations/lesson2.mp4",
    timing: "28:15",
    progress: 45,
  },
  {
    id: "4-3",
    title: "Dependency Injection",
    imageUrl: "/courses/nestjs.png",
    videoUrl: "/formations/lesson3.mp4",
    timing: "30:45",
    progress: 0,
  },
  {
    id: "4-4",
    title: "Modules and Services",
    imageUrl: "/courses/nestjs.png",
    videoUrl: "/formations/lesson4.mp4",
    timing: "27:30",
    progress: 0,
  },
  {
    id: "4-5",
    title: "Database Integration",
    imageUrl: "/courses/nestjs.png",
    videoUrl: "/formations/lesson5.mp4",
    timing: "32:15",
    progress: 0,
  },
  {
    id: "4-6",
    title: "Authentication Strategies",
    imageUrl: "/courses/nestjs.png",
    videoUrl: "/formations/lesson6.mp4",
    timing: "35:00",
    progress: 0,
  },
  {
    id: "4-7",
    title: "Authorization and Guards",
    imageUrl: "/courses/nestjs.png",
    videoUrl: "/formations/lesson7.mp4",
    timing: "29:45",
    progress: 0,
  },
  {
    id: "4-8",
    title: "Error Handling",
    imageUrl: "/courses/nestjs.png",
    videoUrl: "/formations/lesson8.mp4",
    timing: "26:30",
    progress: 0,
  },
  {
    id: "4-9",
    title: "Validation and DTOs",
    imageUrl: "/courses/nestjs.png",
    videoUrl: "/formations/lesson9.mp4",
    timing: "31:15",
    progress: 0,
  },
  {
    id: "4-10",
    title: "File Upload Handling",
    imageUrl: "/courses/nestjs.png",
    videoUrl: "/formations/lesson10.mp4",
    timing: "33:20",
    progress: 0,
  },
  {
    id: "4-11",
    title: "WebSockets Integration",
    imageUrl: "/courses/nestjs.png",
    videoUrl: "/formations/lesson11.mp4",
    timing: "34:45",
    progress: 0,
  },
  {
    id: "4-12",
    title: "Task Scheduling",
    imageUrl: "/courses/nestjs.png",
    videoUrl: "/formations/lesson12.mp4",
    timing: "28:30",
    progress: 0,
  },
  {
    id: "4-13",
    title: "Testing Strategies",
    imageUrl: "/courses/nestjs.png",
    videoUrl: "/formations/lesson13.mp4",
    timing: "36:15",
    progress: 0,
  },
  {
    id: "4-14",
    title: "Deployment Best Practices",
    imageUrl: "/courses/nestjs.png",
    videoUrl: "/formations/lesson14.mp4",
    timing: "30:00",
    progress: 0,
  },
];

export const mockCoursesDetails: CourseDetails[] = [
  {
    id: "1",
    title: "Laravel PHP Framework Tutorial",
    description: `Master Laravel, the most popular PHP framework for modern web development. This comprehensive course covers everything from basic concepts to advanced features.

Key Topics:
- Routing and Controllers
- Eloquent ORM and Database Management
- Authentication and Authorization
- API Development
- Testing and Deployment
    `,
    playlist: laravelVideos,
    progress: 45,
    startingEpId: "1-2",
    review: 4.3,
    viewersNum: 1234,
  },
  {
    id: "4",
    title: "NestJS Enterprise Development",
    description: `Master NestJS, a progressive Node.js framework for building efficient, reliable, and scalable server-side applications. This comprehensive course covers everything from fundamentals to advanced enterprise patterns.

Key Topics:
- Controllers and Dependency Injection
- Database Integration and TypeORM
- Authentication and Authorization
- WebSockets and Real-time Features
- Testing and Deployment Strategies
- Error Handling and Validation
- File Upload and Processing
- Task Scheduling and Background Jobs
    `,
    playlist: nestjsVideos,
    progress: 25,
    startingEpId: "4-2",
    review: 4.5,
    viewersNum: 2345,
  },
];
