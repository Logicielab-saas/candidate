export interface CourseVideo {
  id: string;
  title: string;
  imageUrl: string;
  videoUrl: string;
  timing: string;
  startAt?: number; // Optional property
  progress?: number; // Optional property
}
