export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  author: string;
  progress?: number;
  review: number;
  // viewersNum: number;
  duration: number; // in minutes
}
