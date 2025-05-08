import type { EmploiQuestionType } from "../types";

export interface SubmissionQuestion {
  isRequired: boolean;
  id?: string;
  isMultipleChoices?: boolean;
  label?: string;
  type?: EmploiQuestionType;
  options?: string[];
  answer?: string | string[];
  question?: string;
}

export interface JobDetails {
  questions: SubmissionQuestion[];
}
