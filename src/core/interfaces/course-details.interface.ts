import { CourseVideo } from "./course-video.interface";

export interface CourseDetails {
  id: string;
  title: string;
  description: string;
  playlist: CourseVideo[]; // Assuming CourseVideo is defined elsewhere
  progress?: number; // Optional property
  startingEpId?: string; // Optional property
  review: number;
  viewersNum: number;
}
