import type {
  EmploisCategories,
  EmploisContracts,
  EmploisQuestions,
  EmploisTypes,
} from "./emplois.interface";

interface Requirement {
  uuid: string;
  requirement: string;
}

export interface EmploisDetails {
  uuid: string;
  title: string;
  description: string | null;
  city_uuid: string | null;
  city_name: string | null;
  html_description: string;
  company_uuid: string | null;
  company_name: string | null;
  company_logo: string | null;
  slug: string;
  employeesNum: number | null;
  salaryType: string | null;
  startPrice: string | null;
  endPrice: string | null;
  normalPrice: string | null;
  expireDate: string | null;
  workingDuration: number | null;
  workingHours: number | null;
  minWorkingHours: number | null;
  maxWorkingHours: number | null;
  durationType: string | null;
  emploi_uuid: string;
  saved: boolean;
  applied: boolean;
  emploi_categories: EmploisCategories[];
  emploi_contracts: EmploisContracts[];
  emploi_types: EmploisTypes[];
  emploi_requirements: Requirement[];
  emploi_skills: { uuid: string; resumeskill_name: string }[];
  emploi_questions: EmploisQuestions[];
}
