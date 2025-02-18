import { create } from "zustand";

export type AnnonceCreationStep = "type" | "details" | "preview";

export const STEPS_CONFIG = [
  {
    id: "type" as const,
    title: "Type d'annonce",
  },
  {
    id: "details" as const,
    title: "Détails",
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

  // Actions
  setAnnonceType: (type: "existing" | "new" | null) => void;
  setBaseInformation: (data: BaseInformation) => void;
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

export const useCreateAnnonceStore = create<CreateAnnonceState>((set, get) => ({
  // Initial State
  currentStep: "type",
  annonceType: null,
  baseInformation: INITIAL_BASE_INFORMATION,

  // Actions
  setAnnonceType: (type) => {
    set({ annonceType: type });
    console.log("Annonce Type Selected:", type);
  },

  setBaseInformation: (data) => {
    set({ baseInformation: data });
    console.log("Base Information Updated:", data);
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
    const { currentStep, annonceType, baseInformation } = get();

    switch (currentStep) {
      case "type":
        return annonceType !== null;
      case "details":
        if (annonceType === "new") {
          // Validate base information is complete and not empty
          return (
            !!baseInformation.jobTitle?.trim() &&
            !!baseInformation.numberOfPeople?.trim() &&
            !!baseInformation.promotionLocation?.trim()
          );
        }
        return true;
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
    });
  },
}));