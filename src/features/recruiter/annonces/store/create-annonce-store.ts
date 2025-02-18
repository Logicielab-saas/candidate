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

interface CreateAnnonceState {
  currentStep: AnnonceCreationStep;
  annonceType: "existing" | "new" | null;
  setAnnonceType: (type: "existing" | "new" | null) => void;
  nextStep: () => void;
  previousStep: () => void;
  canProceed: () => boolean;
  reset: () => void;
  getCurrentStepIndex: () => number;
}

const STEPS: AnnonceCreationStep[] = STEPS_CONFIG.map(step => step.id);

export const useCreateAnnonceStore = create<CreateAnnonceState>((set, get) => ({
  currentStep: "type",
  annonceType: null,

  setAnnonceType: (type) => set({ annonceType: type }),

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
    const { currentStep, annonceType } = get();

    switch (currentStep) {
      case "type":
        return annonceType !== null;
      case "details":
        // For now, always allow proceeding from details
        // We'll add proper validation when we implement the form
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
    });
  },
}));