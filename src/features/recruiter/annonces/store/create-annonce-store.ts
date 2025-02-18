import { create } from "zustand";
import { JobTypeInformation } from "../common";
import { SalaryInformation } from "../common/interfaces/salary.interface";
import { BaseInformation } from "../common/interfaces/base-information.interface";

export type AnnonceCreationStep = "type" | "job-information" | "description-annonce" | "preview";

export const STEPS_CONFIG = [
  {
    id: "type" as const,
    title: "Type d'annonce",
  },
  {
    id: "job-information" as const,
    title: "Informations du poste",
  },
  {
    id: "description-annonce" as const,
    title: "Description",
  },
  {
    id: "preview" as const,
    title: "Aperçu",
  },
] as const;

interface CreateAnnonceState {
  // Step Management
  currentStep: AnnonceCreationStep;
  annonceType: "existing" | "new" | null;

  // Form Data
  baseInformation: BaseInformation;
  jobTypeInformation: JobTypeInformation;
  salaryInformation: SalaryInformation;
  description: string;

  // Actions
  setAnnonceType: (type: "existing" | "new" | null) => void;
  setBaseInformation: (data: BaseInformation) => void;
  setJobTypeInformation: (data: JobTypeInformation) => void;
  setSalaryInformation: (data: SalaryInformation) => void;
  setDescription: (description: string) => void;
  nextStep: () => void;
  previousStep: () => void;
  canProceed: () => boolean;
  reset: () => void;
  getCurrentStepIndex: () => number;
}

const STEPS: AnnonceCreationStep[] = STEPS_CONFIG.map(step => step.id);

const INITIAL_BASE_INFORMATION: BaseInformation = {
  jobTitle: "",
  numberOfPeople: "",
  promotionLocation: "",
};

const INITIAL_JOB_TYPE_INFORMATION: JobTypeInformation = {
  contractType: "",
};

const INITIAL_SALARY_INFORMATION: SalaryInformation = {};

export const useCreateAnnonceStore = create<CreateAnnonceState>((set, get) => ({
  // Initial State
  currentStep: "type",
  annonceType: null,
  baseInformation: INITIAL_BASE_INFORMATION,
  jobTypeInformation: INITIAL_JOB_TYPE_INFORMATION,
  salaryInformation: INITIAL_SALARY_INFORMATION,
  description: "",

  // Actions
  setAnnonceType: (type) => {
    set({ annonceType: type });
  },

  setBaseInformation: (data) => {
    set({ baseInformation: data });
  },

  setJobTypeInformation: (data) => {
    set({ jobTypeInformation: data });
  },

  setSalaryInformation: (data) => {
    set({ salaryInformation: data });
  },

  setDescription: (description) => {
    set({ description });
  },

  nextStep: () => {
    const currentIndex = STEPS.indexOf(get().currentStep);
    if (currentIndex < STEPS.length - 1) {
      set({ currentStep: STEPS[currentIndex + 1] });
    }
  },

  previousStep: () => {
    const currentIndex = STEPS.indexOf(get().currentStep);
    if (currentIndex > 0) {
      set({ currentStep: STEPS[currentIndex - 1] });
    }
  },

  getCurrentStepIndex: () => {
    return STEPS.indexOf(get().currentStep);
  },

  canProceed: () => {
    const { currentStep, annonceType, baseInformation, jobTypeInformation, description } = get();

    switch (currentStep) {
      case "type":
        return annonceType !== null;
      case "job-information":
        if (annonceType === "new") {
          return (
            !!baseInformation.jobTitle?.trim() &&
            !!baseInformation.numberOfPeople?.trim() &&
            !!baseInformation.promotionLocation?.trim() &&
            !!jobTypeInformation.contractType
          );
        }
        return true;
      case "description-annonce":
        return !!description.trim();
      case "preview":
        return true;
      default:
        return false;
    }
  },

  reset: () => {
    set({
      currentStep: "type",
      annonceType: null,
      baseInformation: INITIAL_BASE_INFORMATION,
      jobTypeInformation: INITIAL_JOB_TYPE_INFORMATION,
      salaryInformation: INITIAL_SALARY_INFORMATION,
      description: "",
    });
  },
}));