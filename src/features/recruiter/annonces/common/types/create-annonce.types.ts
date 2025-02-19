import { BaseInformation } from "../interfaces/base-information.interface";
import { JobTypeInformation } from "../interfaces/contract.interface";
import { SalaryInformation } from "../interfaces/salary.interface";
import { StepperState } from "./store.types";

export type AnnonceCreationStep = "job-information" | "description-annonce" | "preview";

export type AnnonceType = "existing" | "new" | null;

export interface CreateAnnonceState extends StepperState<AnnonceCreationStep> {
  // Step Management
  annonceType: AnnonceType;

  // Form Data
  baseInformation: BaseInformation;
  jobTypeInformation: JobTypeInformation;
  salaryInformation: SalaryInformation;
  description: string;

  // Actions
  setAnnonceType: (type: AnnonceType) => void;
  setBaseInformation: (data: BaseInformation) => void;
  setJobTypeInformation: (data: JobTypeInformation) => void;
  setSalaryInformation: (data: SalaryInformation) => void;
  setDescription: (description: string) => void;
}

export interface StepData {
  step: AnnonceCreationStep;
  data: {
    annonceType?: AnnonceType;
    baseInformation?: BaseInformation;
    jobTypeInformation?: JobTypeInformation;
    salaryInformation?: SalaryInformation;
    description?: string;
    completeForm?: {
      annonceType: AnnonceType;
      baseInformation: BaseInformation;
      jobTypeInformation: JobTypeInformation;
      salaryInformation: SalaryInformation;
      description: string;
    };
  };
}