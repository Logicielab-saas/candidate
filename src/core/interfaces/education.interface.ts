export interface Education {
  id: string;
  degree: string;
  school: string;
  field: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
}
