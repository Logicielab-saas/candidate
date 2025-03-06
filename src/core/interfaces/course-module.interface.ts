/**
 * CourseModule - Interface for course module structure
 *
 * Represents a module within a course containing multiple videos
 */

import { CourseVideo } from "./course-video.interface";

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  duration: number; // Total duration in minutes
  videos: CourseVideo[];
}
