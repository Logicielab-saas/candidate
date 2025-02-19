import { PredefinedQuestion, QuestionCategory } from "@/features/recruiter/annonces/common/interfaces/questions.interface";

export const PREDEFINED_QUESTIONS: PredefinedQuestion[] = [
  // Experience Questions
  {
    id: "exp-1",
    type: "experience",
    question: "Combien d'années d'expérience avez-vous dans ce domaine ?",
    isRequired: true,
    isMultiple: false,
  },
  {
    id: "exp-2",
    type: "experience",
    question: "Avez-vous déjà travaillé dans une entreprise similaire ?",
    isRequired: false,
    isMultiple: false,
  },
  {
    id: "exp-3",
    type: "experience",
    question: "Quelle est votre expérience avec les méthodologies agiles ?",
    isRequired: true,
    isMultiple: false,
  },

  // Open Questions
  {
    id: "open-1",
    type: "open",
    question: "Pourquoi souhaitez-vous rejoindre notre entreprise ?",
    isRequired: true,
    isMultiple: false,
  },
  {
    id: "open-2",
    type: "open",
    question: "Quels sont vos objectifs professionnels à long terme ?",
    isRequired: false,
    isMultiple: false,
  },
  {
    id: "open-3",
    type: "open",
    question: "Décrivez un projet dont vous êtes particulièrement fier",
    isRequired: true,
    isMultiple: false,
  },

  // Multiple Choice Questions
  {
    id: "choice-1",
    type: "choice",
    question: "Quel type d'environnement de travail préférez-vous ?",
    options: ["Remote", "Hybride", "Sur site"],
    isRequired: true,
    isMultiple: false,
  },
  {
    id: "choice-2",
    type: "choice",
    question: "Quelles sont vos compétences techniques principales ?",
    options: ["Frontend", "Backend", "DevOps", "UI/UX", "Mobile"],
    isRequired: true,
    isMultiple: true,
  },
  {
    id: "choice-3",
    type: "choice",
    question: "Quels langages de programmation maîtrisez-vous ?",
    options: ["JavaScript/TypeScript", "Python", "Java", "C#", "Go", "Ruby"],
    isRequired: true,
    isMultiple: true,
  },

  // Yes/No Questions
  {
    id: "yesno-1",
    type: "yesno",
    question: "Êtes-vous disponible pour commencer immédiatement ?",
    isRequired: true,
    isMultiple: false,
  },
  {
    id: "yesno-2",
    type: "yesno",
    question: "Acceptez-vous de voyager occasionnellement ?",
    isRequired: false,
    isMultiple: false,
  },
  {
    id: "yesno-3",
    type: "yesno",
    question: "Avez-vous déjà travaillé en remote ?",
    isRequired: true,
    isMultiple: false,
  }
];

// Question categories for better organization in the UI
export const QUESTION_CATEGORIES: QuestionCategory[] = [
  {
    id: "experience",
    label: "Questions d'expérience",
    description: "Questions sur l'expérience professionnelle du candidat",
  },
  {
    id: "open",
    label: "Questions ouvertes",
    description: "Questions nécessitant une réponse détaillée",
  },
  {
    id: "choice",
    label: "Choix multiples",
    description: "Questions à choix multiples ou unique",
  },
  {
    id: "yesno",
    label: "Oui/Non",
    description: "Questions simples nécessitant une réponse par oui ou non",
  }
];

// Helper function to get questions by category
export const getQuestionsByCategory = (categoryId: QuestionCategory['id']) => {
  return PREDEFINED_QUESTIONS.filter(q => q.type === categoryId);
};
