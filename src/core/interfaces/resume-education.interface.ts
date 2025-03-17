export interface ResumeEducation {
  uuid: string;
  title: string;
  degree: string;
  date_start: string;
  date_end: string | null;
  description: string | null;
  is_current: boolean;
}
