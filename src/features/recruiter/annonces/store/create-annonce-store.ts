import { create } from "zustand";
import {
  INITIAL_BASE_INFORMATION,
  INITIAL_JOB_TYPE_INFORMATION,
  INITIAL_SALARY_INFORMATION,
} from "../common/constants/initial-state.constants";
import { STEPS } from "../common/constants/steps.constants";
import { formatStepData } from "../common/utils/step-formatter.utils";
import { CreateAnnonceState } from "../common/types/create-annonce.types";
import { SelectedQuestion } from "../common/types/questions.types";
import { formatQuestionsForSubmission } from "@/core/utils";
// TODO: add step verification At the steps constants and adapt the store and relevant components
export const useCreateAnnonceStore = create<CreateAnnonceState>((set, get) => ({
  // Initial State
  currentStep: "verification",
  annonceType: null,
  baseInformation: INITIAL_BASE_INFORMATION,
  jobTypeInformation: INITIAL_JOB_TYPE_INFORMATION,
  salaryInformation: INITIAL_SALARY_INFORMATION,
  description: "",
  preferences: null,
  questions: [],

  // Actions
  setAnnonceType: (type) => {
    set({ annonceType: type });
  },

  setBaseInformation: (data) => {
    set({ baseInformation: data });
  },

  setJobTypeInformation: (data) => {
    set({ jobTypeInformation: data });
  },

  setSalaryInformation: (data) => {
    set({ salaryInformation: data });
  },

  setDescription: (description) => {
    set({ description });
  },

  setPreferences: (data) => {
    set({ preferences: data });
  },

  setQuestions: (questions: SelectedQuestion[]) => {
    set({ questions });
  },

  getFormattedQuestions: () => {
    const { questions, currentStep } = get();

    // Only format questions in verification step
    if (currentStep === "verification") {
      return formatQuestionsForSubmission(questions);
    }

    // During form steps, return all question data
    return questions.map((q) => ({
      id: q.id,
      type: q.type,
      question: q.question,
      isRequired: q.isRequired,
      isMultiple: q.isMultiple,
      isMultipleChoices: q.type === 'choice' ? q.isMultiple : undefined,
      options: q.type === 'choice' ? q.options : undefined,
      answer: q.answer,
    }));
  },

  nextStep: () => {
    const state = get();
    const currentIndex = STEPS.indexOf(state.currentStep);
    if (currentIndex < STEPS.length - 1) {
      // Log the current step's data before moving to the next step
      const stepData = formatStepData(state);

      console.group(`✨ Step Completed: ${stepData.step}`);
      console.log("Step Data:", stepData.data);

      // If we're moving to verification, log the complete form
      if (STEPS[currentIndex + 1] === "verification") {
        console.log("\n📋 Complete Form Data:", {
          annonceType: state.annonceType,
          baseInformation: state.baseInformation,
          jobTypeInformation: state.jobTypeInformation,
          salaryInformation: state.salaryInformation,
          description: state.description,
          preferences: state.preferences,
          questions: state.getFormattedQuestions(),
        });
      }

      console.groupEnd();

      set({ currentStep: STEPS[currentIndex + 1] });
    } else if (currentIndex === STEPS.length - 1) {
      // We're at the verification step (last step)
      console.group("📤 Final Submission Data");
      console.log("Form Data:", {
        annonceType: state.annonceType,
        baseInformation: state.baseInformation,
        jobTypeInformation: state.jobTypeInformation,
        salaryInformation: state.salaryInformation,
        description: state.description,
        preferences: state.preferences,
        questions: formatQuestionsForSubmission(state.questions), // Use the formatting function directly
      });
      console.groupEnd();

      // Here you would typically make your API call
      // For now, we just log the data
    }
  },

  previousStep: () => {
    const state = get();
    const currentIndex = STEPS.indexOf(state.currentStep);

    // If we're at the first step (job-information), allow going back to type selection
    if (currentIndex === 0) {
      set({
        annonceType: null,
        currentStep: "job-information"
      });
    } else if (currentIndex > 0) {
      set({ currentStep: STEPS[currentIndex - 1] });
    }
  },

  getCurrentStepIndex: () => {
    const state = get();
    return STEPS.indexOf(state.currentStep);
  },

  canProceed: () => {
    const { currentStep, annonceType, baseInformation, jobTypeInformation, description, questions } = get();

    switch (currentStep) {
      case "job-information":
        if (annonceType === "new") {
          return (
            !!baseInformation.jobTitle?.trim() &&
            !!baseInformation.numberOfPeople?.trim() &&
            !!baseInformation.promotionLocation?.trim() &&
            !!jobTypeInformation.contractTypes?.length
          );
        }
        return true;
      case "description-annonce":
        return !!description.trim();
      case "preferences":
        return true; // Validation is handled by the form
      case "questions":
        // At least one question must be added
        // Experience questions must always be filled
        // Choice questions don't need an answer
        // Other questions need answers only if required
        return questions.length > 0 && questions.every(q => {
          if (q.type === 'experience') {
            return !!q.answer; // Experience questions must be filled
          }
          if (q.type === 'choice') {
            return true; // Choice questions don't need answers
          }
          return !q.isRequired || !!q.answer; // Other questions based on isRequired
        });
      case "verification":
        return true;
      default:
        return false;
    }
  },

  reset: () => {
    set({
      currentStep: "job-information",
      annonceType: null,
      baseInformation: INITIAL_BASE_INFORMATION,
      jobTypeInformation: INITIAL_JOB_TYPE_INFORMATION,
      salaryInformation: INITIAL_SALARY_INFORMATION,
      description: "",
      preferences: null,
      questions: [],
    });
  },
}));