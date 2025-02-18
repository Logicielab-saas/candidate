import { create } from "zustand";

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

interface JobTypeInformation {
  contractType: string;
}

interface CreateAnnonceState {
  // Step Management
  currentStep: AnnonceCreationStep;
  annonceType: "existing" | "new" | null;

  // Form Data
  baseInformation: BaseInformation;
  jobTypeInformation: JobTypeInformation;

  // Actions
  setAnnonceType: (type: "existing" | "new" | null) => void;
  setBaseInformation: (data: BaseInformation) => void;
  setJobTypeInformation: (data: JobTypeInformation) => void;
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

export const useCreateAnnonceStore = create<CreateAnnonceState>((set, get) => ({
  // Initial State
  currentStep: "type",
  annonceType: null,
  baseInformation: INITIAL_BASE_INFORMATION,
  jobTypeInformation: INITIAL_JOB_TYPE_INFORMATION,

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

  nextStep: () => {
    const currentIndex = STEPS.indexOf(get().currentStep);
    if (currentIndex < STEPS.length - 1) {
      const nextStep = STEPS[currentIndex + 1];
      set({ currentStep: nextStep });
      console.log("Moving to step:", nextStep);

      // Log current state when moving to next step
      const { annonceType, baseInformation } = get();
      console.log("Current Form State:", {
        annonceType,
        baseInformation,
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
    const { currentStep, annonceType, baseInformation, jobTypeInformation } = get();

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
        return true; // Will be implemented later
      case "description-annonce":
        return true; // Will be implemented later
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
    });
  },
}));