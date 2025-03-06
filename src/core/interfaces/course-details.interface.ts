import { CourseVideo } from "./course-video.interface";
import { CourseModule } from "./course-module.interface";

export interface CourseDetails {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  playlist?: CourseVideo[]; // Making this optional as we'll use modules
  modules: CourseModule[]; // New field for course modules
  progress?: number; // Optional property
  startingEpId?: string; // Optional property
  review: number;
  viewersNum: number;
  duration: number; // Total duration in minutes can be string if needed to set weeks or days & hours
}
