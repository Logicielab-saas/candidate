export interface CompanyReview {
  id: string;
  companySlug: string;
  userId: string;
  rating: number;
  summary: string;
  comment: string;
  positivePoints?: string[];
  negativePoints?: string[];
}
