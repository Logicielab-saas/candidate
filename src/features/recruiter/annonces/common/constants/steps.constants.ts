import { StepConfig } from "../types/store.types";
import { AnnonceCreationStep } from "../types/create-annonce.types";

export const STEPS_CONFIG: StepConfig<AnnonceCreationStep>[] = [
  {
    id: "job-information",
    title: "Informations du poste",
  },
  {
    id: "description-annonce",
    title: "Description",
  },
  {
    id: "preferences",
    title: "Préférences",
  },
  {
    id: "questions",
    title: "Questions",
  },
  {
    id: "preview",
    title: "Aperçu",
  },
] as const;

export const STEPS: AnnonceCreationStep[] = STEPS_CONFIG.map(step => step.id);