import { CourseVideo } from "./course-video.interface";
import { CourseModule } from "./course-module.interface";

export interface CourseDetails {
  id: string;
  title: string;
  description: string;
  playlist?: CourseVideo[]; // Making this optional as we'll use modules
  modules: CourseModule[]; // New field for course modules
  progress?: number; // Optional property
  startingEpId?: string; // Optional property
  review: number;
  viewersNum: number;
}
