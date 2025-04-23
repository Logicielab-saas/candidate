import type { EmploiQuestionType } from "../types/";

export interface Emplois {
  uuid: string;
  title: string;
  city_name: string | null;
  company_name: string | null;
  created_at: string;
  slug: string;
  status: "closed" | "open" | "suspended";
  company_logo: string | null;
  postule: number;
  views: number;
  type: string[];
  skills: string[];
  // contracts: string[];
  saved: boolean;
  applied: boolean;
}

export interface EmploisContracts {
  uuid: string;
  name: string;
}

export interface EmploisTypes {
  uuid: string;
  title: string;
}

export interface EmploisCategories {
  uuid: string;
  title: string;
}

export interface EmploisQuestionOption {
  value: string;
}

export interface EmploisQuestions {
  uuid: string;
  title: string;
  description: string;
  is_required: boolean;
  type: EmploiQuestionType | null;
  is_multiple: boolean;
  options: EmploisQuestionOption[] | null;
}
