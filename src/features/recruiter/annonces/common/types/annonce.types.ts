import { BaseInformation } from "../interfaces/base-information.interface";
import { JobTypeInformation } from "../interfaces/contract.interface";
import { SalaryInformation } from "../interfaces/salary.interface";
import { PreferencesInformation } from "../interfaces/preferences.interface";

export type AnnonceStatus = "Ouverte" | "Suspendue" | "Fermée";
export type AnnonceType = "new" | "duplicate";
export type QuestionType = "open" | "choice" | "experience" | "yesno";

export interface AnnonceQuestion {
  id: string;
  type: QuestionType;
  question: string;
  isRequired: boolean;
  isMultiple: boolean;
  isMultipleChoices?: boolean;
  options?: string[];
  answer?: string;
}

export interface AnnonceCandidatures {
  tous: number;
  nouveaux: number;
}

export interface AnnonceData {
  id: string;
  intitule: string;
  city: string;
  candidatures: AnnonceCandidatures;
  statutDeSponsorisation: string;
  dateDePublication: string;
  statutDeLAnnonce: AnnonceStatus;
  annonceType: AnnonceType;
  baseInformation: BaseInformation;
  jobTypeInformation: JobTypeInformation;
  salaryInformation: SalaryInformation;
  description: string;
  preferences: PreferencesInformation;
  questions: AnnonceQuestion[];
}