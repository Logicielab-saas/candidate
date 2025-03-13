export interface CompanyReview {
  id: string;
  companyId: string;
  userId: string;
  rating: number;
  comment: string;
  positivePoints: string[];
  negativePoints: string[];
}
