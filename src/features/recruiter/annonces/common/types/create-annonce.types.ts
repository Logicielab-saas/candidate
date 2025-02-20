import { BaseInformation } from "../interfaces/base-information.interface";
import { JobTypeInformation } from "../interfaces/contract.interface";
import { SalaryInformation } from "../interfaces/salary.interface";
import { StepperState } from "./store.types";
import { PreferencesForm } from "@/features/recruiter/annonces/common";
import { FormattedQuestion, SelectedQuestion, SubmissionQuestion } from "./questions.types";

export type AnnonceCreationStep = "job-information" | "description-annonce" | "preferences" | "questions" | "verification";

export type CreateAnnonceType = "new" | "duplicate" | null;

export interface CreateAnnonceState extends StepperState<AnnonceCreationStep> {
  // Step Management
  annonceType: CreateAnnonceType;

  // Form Data
  baseInformation: BaseInformation;
  jobTypeInformation: JobTypeInformation;
  salaryInformation: SalaryInformation;
  description: string;
  preferences: PreferencesForm | null;
  questions: SelectedQuestion[];

  // Actions
  setAnnonceType: (type: CreateAnnonceType) => void;
  setBaseInformation: (data: BaseInformation) => void;
  setJobTypeInformation: (data: JobTypeInformation) => void;
  setSalaryInformation: (data: SalaryInformation) => void;
  setDescription: (description: string) => void;
  setPreferences: (data: PreferencesForm) => void;
  setQuestions: (questions: SelectedQuestion[]) => void;
  getFormattedQuestions: () => SubmissionQuestion[];
}

export interface StepData {
  step: AnnonceCreationStep;
  data: {
    annonceType?: CreateAnnonceType;
    baseInformation?: BaseInformation;
    jobTypeInformation?: JobTypeInformation;
    salaryInformation?: SalaryInformation;
    description?: string;
    preferences?: PreferencesForm;
    questions?: FormattedQuestion[];
    completeForm?: {
      annonceType: CreateAnnonceType;
      baseInformation: BaseInformation;
      jobTypeInformation: JobTypeInformation;
      salaryInformation: SalaryInformation;
      description: string;
      preferences: PreferencesForm | null;
      questions: FormattedQuestion[];
    };
  };
}