export interface Job {
  id: string;
  jobTitle: string;
  city: string;
  companyName: string;
  postedAt: string;
  applications?: number;
  keyWords: string[];
}
