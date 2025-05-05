/**
 * useJobApplyStore - Job application state management
 *
 * Manages the state for the job application process including:
 * - Current step tracking (personal info, questions if present, then review)
 * - Personal information and selected resume
 * - Questions answers if job has questions
 * - Form submission status
 */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { PersonalInfoFormData } from "../components/steps/PersonalInfoStep";

export type JobApplyStep = "personal-info" | "questions" | "review";

export interface QuestionAnswer {
  id: string;
  answer: string | string[];
}

interface QuestionsData {
  answers: QuestionAnswer[];
}

export interface JobApplyState {
  // Current step in the application process
  currentStep: JobApplyStep;

  // Personal information
  personalInfo: PersonalInfoFormData | null;

  // Form data
  questionsData: QuestionsData;

  // Form status
  isSubmitting: boolean;
  isSubmitted: boolean;

  // Actions
  setCurrentStep: (step: JobApplyStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  setPersonalInfo: (data: PersonalInfoFormData) => void;
  setQuestionsData: (data: Partial<QuestionsData>) => void;
  resetForm: () => void;
}

// Define the step order for navigation
const stepOrder: JobApplyStep[] = ["personal-info", "questions", "review"];

export const useJobApplyStore = create<JobApplyState>()(
  devtools((set, get) => ({
    // Initial state
    currentStep: "personal-info",
    personalInfo: null,
    questionsData: {
      answers: [],
    },
    isSubmitting: false,
    isSubmitted: false,

    // Actions
    setCurrentStep: (step) => set({ currentStep: step }),

    nextStep: () => {
      const { currentStep, questionsData } = get();
      const currentIndex = stepOrder.indexOf(currentStep);

      if (currentIndex < stepOrder.length - 1) {
        // Skip questions step if no answers
        if (
          currentStep === "personal-info" &&
          questionsData.answers.length === 0
        ) {
          set({ currentStep: "review" });
        } else {
          set({ currentStep: stepOrder[currentIndex + 1] });
        }
      }
    },

    prevStep: () => {
      const { currentStep, questionsData } = get();
      const currentIndex = stepOrder.indexOf(currentStep);

      if (currentIndex > 0) {
        // If we're in review step and there are no questions, go directly to personal info
        if (currentStep === "review" && questionsData.answers.length === 0) {
          set({ currentStep: "personal-info" });
        } else {
          set({ currentStep: stepOrder[currentIndex - 1] });
        }
      }
    },

    setPersonalInfo: (data) => set({ personalInfo: data }),

    setQuestionsData: (data) =>
      set((state) => ({
        questionsData: { ...state.questionsData, ...data },
      })),

    resetForm: () =>
      set({
        currentStep: "personal-info",
        personalInfo: null,
        questionsData: {
          answers: [],
        },
        isSubmitting: false,
        isSubmitted: false,
      }),
  }))
);
