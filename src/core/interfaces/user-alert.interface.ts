export interface UserAlert {
  id: string;
  post: string;
  city?: string;
  salaryRange?: string;
  isEnabled: boolean;
}

export interface UserCompanyAlert {
  id: string;
  company: string;
  isEnabled: boolean;
}
