import { AnnonceQuestion } from "../types/annonce.types";
import { SelectedQuestion, SubmissionQuestion } from "../types/questions.types";

export const convertAnnonceToSelectedQuestions = (questions: AnnonceQuestion[]): SelectedQuestion[] => {
  return questions.map(q => {
    const baseQuestion = {
      id: q.id,
      question: q.question,
      isRequired: q.isRequired,
      isMultiple: q.isMultiple,
      answer: q.answer,
    };

    if (q.type === "choice") {
      return {
        ...baseQuestion,
        type: "choice" as const,
        options: q.options || [],
        isMultipleChoices: q.isMultiple,
      };
    }

    return {
      ...baseQuestion,
      type: q.type as "experience" | "open" | "yesno",
    };
  });
};

export const formatQuestionsForSubmission = (questions: SelectedQuestion[]): SubmissionQuestion[] => {
  return questions.map(q => {
    // Check if it's a predefined question (has numeric id or id starting with specific prefixes)
    const isPredefined = /^\d+$/.test(q.id) || /^(open|choice|exp|yesno)-\d+$/.test(q.id);

    if (isPredefined) {
      // For predefined questions
      const baseSubmission: SubmissionQuestion = {
        id: q.id,
        isRequired: q.isRequired,
      };

      if (q.type === "experience") {
        return {
          ...baseSubmission,
          label: q.answer as string, // For experience questions, answer is used as label
        };
      }

      if (q.type === "choice") {
        return {
          ...baseSubmission,
          isMultipleChoices: q.isMultipleChoices,
        };
      }

      return baseSubmission;
    } else {
      // For custom questions
      const baseSubmission: SubmissionQuestion = {
        type: q.type,
        question: q.question,
        isRequired: q.isRequired,
      };

      if (q.type === "choice") {
        return {
          ...baseSubmission,
          options: q.options,
          isMultipleChoices: q.isMultipleChoices,
        };
      }

      return baseSubmission;
    }
  });
};