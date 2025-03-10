/**
 * useJobApplyStore - Job application multi-step form state management
 *
 * Manages the state for the job application process including:
 * - Current step tracking
 * - Form data for each step
 * - Navigation between steps
 * - Form submission status
 */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { MOCK_USER } from "@/core/mockData/user";

export type JobApplyStep = "resume" | "personal-info" | "questions" | "review";

export interface ResumeData {
  resumePath: string;
  isUploaded: boolean;
  postulyCVPath?: string;
  userCVPath?: string;
  skipped?: boolean;
  selectedCVType?: "postuly" | "user";
}

interface PersonalInfoData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}

interface QuestionAnswer {
  id: string;
  answer: string | string[];
}

interface QuestionsData {
  answers: QuestionAnswer[];
}

export interface JobApplyState {
  // Current step in the application process
  currentStep: JobApplyStep;

  // Form data for each step
  resumeData: ResumeData;
  personalInfo: PersonalInfoData;
  questionsData: QuestionsData;

  // Form status
  isSubmitting: boolean;
  isSubmitted: boolean;

  // Actions
  setCurrentStep: (step: JobApplyStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  setResumeData: (data: Partial<ResumeData>) => void;
  setPersonalInfo: (data: Partial<PersonalInfoData>) => void;
  setQuestionsData: (data: Partial<QuestionsData>) => void;
  resetForm: () => void;
}

// Define the step order for navigation
const stepOrder: JobApplyStep[] = [
  "resume",
  "personal-info",
  "questions",
  "review",
];

export const useJobApplyStore = create<JobApplyState>()(
  devtools((set, get) => ({
    // Initial state
    currentStep: "resume",
    resumeData: {
      resumePath:
        MOCK_USER.resumePath || MOCK_USER.postulyCVPath || "/cvs/mycv.pdf",
      isUploaded: !!MOCK_USER.resumePath,
      postulyCVPath: MOCK_USER.postulyCVPath || "/cvs/mycv.pdf",
      userCVPath: MOCK_USER.resumePath || undefined,
      selectedCVType: MOCK_USER.resumePath ? "user" : "postuly",
    },
    personalInfo: {
      firstName: MOCK_USER.name.split(" ")[0] || "",
      lastName: MOCK_USER.name.split(" ")[1] || "",
      email: MOCK_USER.email || "",
      phone: MOCK_USER.phone || "",
      address: MOCK_USER.address || "",
    },
    questionsData: {
      answers: [],
    },
    experienceData: {
      positions: [],
    },
    isSubmitting: false,
    isSubmitted: false,

    // Actions
    setCurrentStep: (step) => set({ currentStep: step }),

    nextStep: () => {
      const { currentStep } = get();
      const currentIndex = stepOrder.indexOf(currentStep);

      if (currentIndex < stepOrder.length - 1) {
        set({ currentStep: stepOrder[currentIndex + 1] });
      }
    },

    prevStep: () => {
      const { currentStep } = get();
      const currentIndex = stepOrder.indexOf(currentStep);

      if (currentIndex > 0) {
        set({ currentStep: stepOrder[currentIndex - 1] });
      }
    },

    setResumeData: (data) =>
      set((state) => ({
        resumeData: { ...state.resumeData, ...data },
      })),

    setPersonalInfo: (data) =>
      set((state) => ({
        personalInfo: { ...state.personalInfo, ...data },
      })),

    setQuestionsData: (data) =>
      set((state) => ({
        questionsData: { ...state.questionsData, ...data },
      })),

    resetForm: () =>
      set({
        currentStep: "resume",
        resumeData: {
          resumePath:
            MOCK_USER.resumePath || MOCK_USER.postulyCVPath || "/cvs/mycv.pdf",
          isUploaded: !!MOCK_USER.resumePath,
          postulyCVPath: MOCK_USER.postulyCVPath || "/cvs/mycv.pdf",
          userCVPath: MOCK_USER.resumePath || undefined,
          selectedCVType: MOCK_USER.resumePath ? "user" : "postuly",
        },
        personalInfo: {
          firstName: MOCK_USER.name.split(" ")[0] || "",
          lastName: MOCK_USER.name.split(" ")[1] || "",
          email: MOCK_USER.email || "",
          phone: MOCK_USER.phone || "",
          address: MOCK_USER.address || "",
        },
        questionsData: {
          answers: [],
        },
        isSubmitting: false,
        isSubmitted: false,
      }),
  }))
);
