export interface EmploisApplied {
  uuid: string;
  title: string;
  city_name: string;
  company_name: string;
  created_at: string;
  slug: string;
  status: string;
  company_logo: string;
  postule: number;
  views: number;
  type: Array<string>;
  skills: Array<string>;
  saved: boolean;
  apply: boolean;
  // status_employee: string;
  // status_recruiter: string;
}
