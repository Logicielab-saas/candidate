export interface CourseVideo {
  id: string;
  title: string;
  imageUrl: string;
  videoUrl: string;
  duration: string;
  startAt?: number; // Optional property
  progress?: number; // Optional property
}
