import { CourseCategory } from "../types";

export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  author: string;
  progress?: number;
  review: number;
  category: CourseCategory;
  // viewersNum: number;
  duration: number; // in minutes
}
