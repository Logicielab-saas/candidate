import { BaseInformation } from "../interfaces/base-information.interface";
import { JobTypeInformation } from "../interfaces/contract.interface";
import { SalaryInformation } from "../interfaces/salary.interface";
import { StepperState } from "./store.types";
import { PreferencesForm } from "@/features/recruiter/annonces/common";
import { FormattedQuestion, SelectedQuestion } from "./questions.types";

export type AnnonceCreationStep = "job-information" | "description-annonce" | "preferences" | "questions" | "preview";

export type AnnonceType = "existing" | "new" | null;

export interface CreateAnnonceState extends StepperState<AnnonceCreationStep> {
  // Step Management
  annonceType: AnnonceType;

  // Form Data
  baseInformation: BaseInformation;
  jobTypeInformation: JobTypeInformation;
  salaryInformation: SalaryInformation;
  description: string;
  preferences: PreferencesForm | null;
  questions: SelectedQuestion[];

  // Actions
  setAnnonceType: (type: AnnonceType) => void;
  setBaseInformation: (data: BaseInformation) => void;
  setJobTypeInformation: (data: JobTypeInformation) => void;
  setSalaryInformation: (data: SalaryInformation) => void;
  setDescription: (description: string) => void;
  setPreferences: (data: PreferencesForm) => void;
  setQuestions: (questions: SelectedQuestion[]) => void;
  getFormattedQuestions: () => FormattedQuestion[];
}

export interface StepData {
  step: AnnonceCreationStep;
  data: {
    annonceType?: AnnonceType;
    baseInformation?: BaseInformation;
    jobTypeInformation?: JobTypeInformation;
    salaryInformation?: SalaryInformation;
    description?: string;
    preferences?: PreferencesForm;
    completeForm?: {
      annonceType: AnnonceType;
      baseInformation: BaseInformation;
      jobTypeInformation: JobTypeInformation;
      salaryInformation: SalaryInformation;
      description: string;
      preferences: PreferencesForm | null;
      questions: FormattedQuestion[];
    };
  };
}