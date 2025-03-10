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

export type JobApplyStep = "resume" | "personal-info" | "experience" | "review";

interface ResumeData {
  resumePath: string;
  isUploaded: boolean;
  postulyCVPath?: string;
  userCVPath?: string;
  skipped?: boolean;
}

interface PersonalInfoData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface ExperienceData {
  // Will be implemented in future steps
  positions: string[]; // Placeholder property to avoid empty interface error
}

export interface JobApplyState {
  // Current step in the application process
  currentStep: JobApplyStep;

  // Form data for each step
  resumeData: ResumeData;
  personalInfo: PersonalInfoData;
  experienceData: ExperienceData;

  // Form status
  isSubmitting: boolean;
  isSubmitted: boolean;

  // Actions
  setCurrentStep: (step: JobApplyStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  setResumeData: (data: Partial<ResumeData>) => void;
  setPersonalInfo: (data: Partial<PersonalInfoData>) => void;
  setExperienceData: (data: Partial<ExperienceData>) => void;
  resetForm: () => void;
}

// Define the step order for navigation
const stepOrder: JobApplyStep[] = [
  "resume",
  "personal-info",
  "experience",
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
    },
    personalInfo: {
      firstName: MOCK_USER.name.split(" ")[0] || "",
      lastName: MOCK_USER.name.split(" ")[1] || "",
      email: MOCK_USER.email || "",
      phone: MOCK_USER.phone || "",
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

    setExperienceData: (data) =>
      set((state) => ({
        experienceData: { ...state.experienceData, ...data },
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
        },
        personalInfo: {
          firstName: MOCK_USER.name.split(" ")[0] || "",
          lastName: MOCK_USER.name.split(" ")[1] || "",
          email: MOCK_USER.email || "",
          phone: MOCK_USER.phone || "",
        },
        experienceData: {
          positions: [],
        },
        isSubmitting: false,
        isSubmitted: false,
      }),
  }))
);
