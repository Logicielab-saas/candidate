export interface Company {
  id: string;
  name: string;
  location: string;
  description?: string;
  avatarUrl?: string;
  industry: string;
  salaryRange: string;
  rating: number;
  reviewsNum: number;
  jobsTotal: number;
}
