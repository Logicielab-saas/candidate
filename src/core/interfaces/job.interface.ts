export interface Job {
  id: string;
  jobTitle: string;
  city: string;
  description: string;
  companyName: string;
  postedAt: string;
  applications?: number;
  keyWords: string[];
}
