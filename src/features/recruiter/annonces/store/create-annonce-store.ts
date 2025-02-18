import { create } from "zustand";
import { JobTypeInformation } from "../common";
import { SalaryInformation } from "../common/interfaces/salary.interface";

export type AnnonceCreationStep = "type" | "base-information" | "job-type" | "salary" | "description-annonce" | "preview";

export const STEPS_CONFIG = [
  {
    id: "type" as const,
    title: "Type d'annonce",
  },
  {
    id: "base-information" as const,
    title: "Informations de base",
  },
  {
    id: "job-type" as const,
    title: "Type de poste",
  },
  {
    id: "salary" as const,
    title: "Salaire",
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

interface BaseInformation {
  jobTitle: string;
  numberOfPeople: string;
  promotionLocation: string;
}

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
    console.log("Annonce Type Selected:", type);
  },

  setBaseInformation: (data) => {
    set({ baseInformation: data });
    console.log("Base Information Updated:", data);
  },

  setJobTypeInformation: (data) => {
    set({ jobTypeInformation: data });
  },

  setSalaryInformation: (data) => {
    set({ salaryInformation: data });
    console.log("Salary Information Updated:", data);
  },

  setDescription: (description) => {
    set({ description });
    console.log("Description Updated:", description);
  },

  nextStep: () => {
    const currentIndex = STEPS.indexOf(get().currentStep);
    if (currentIndex < STEPS.length - 1) {
      const nextStep = STEPS[currentIndex + 1];
      set({ currentStep: nextStep });
      console.log("Moving to step:", nextStep);

      // Log current state when moving to next step
      const { annonceType, baseInformation, jobTypeInformation, salaryInformation, description } = get();
      console.log("Current Form State:", {
        annonceType,
        baseInformation,
        jobTypeInformation,
        salaryInformation,
        description,
      });
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
      case "base-information":
        if (annonceType === "new") {
          return (
            !!baseInformation.jobTitle?.trim() &&
            !!baseInformation.numberOfPeople?.trim() &&
            !!baseInformation.promotionLocation?.trim()
          );
        }
        return true;
      case "job-type":
        return !!jobTypeInformation.contractType;
      case "salary":
        return true; // Salary is optional
      case "description-annonce":
        return !!description.trim(); // Description is required
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