import { PredefinedQuestion } from "@/features/recruiter/annonces/common/interfaces/questions.interface";

export const PREDEFINED_QUESTIONS: PredefinedQuestion[] = [
  // Experience Questions
  {
    id: "exp-1",
    type: "experience",
    question: "Combien d'années d'expérience avez-vous dans ce domaine ?",
    isRequired: false,
    isMultiple: false,
  },

  // Open Questions
  {
    id: "open-1",
    type: "open",
    question: "Pourquoi souhaitez-vous rejoindre notre entreprise ?",
    isRequired: false,
    isMultiple: false,
  },

  // Multiple Choice Questions
  {
    id: "choice-1",
    type: "choice",
    question: "Quel type d'environnement de travail préférez-vous ?",
    options: ["Remote", "Hybride", "Sur site"],
    isRequired: false,
    isMultiple: false,
  },
  {
    id: "choice-4",
    type: "choice",
    question: "Quel est votre niveau d'anglais ?",
    options: [
      "Débutant",
      "Intermédiaire",
      "Avancé",
      "Bilingue",
      "Langue maternelle"
    ],
    isRequired: false,
    isMultiple: false,
  },

  // Yes/No Questions
  {
    id: "yesno-1",
    type: "yesno",
    question: "Êtes-vous disponible pour commencer immédiatement ?",
    isRequired: false,
    isMultiple: false,
  },
  {
    id: "yesno-2",
    type: "yesno",
    question: "Acceptez-vous de voyager occasionnellement ?",
    isRequired: false,
    isMultiple: false,
  },
];
