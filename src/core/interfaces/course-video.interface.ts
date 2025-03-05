export interface CourseVideo {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
  duration: string;
  startAt?: number; // Optional property
  progress?: number; // Optional property
}
