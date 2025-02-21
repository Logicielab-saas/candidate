import { CustomQuestion, PredefinedQuestion } from "../interfaces/questions.interface";
import { AnnonceQuestion } from "../types/annonce.types";
import { SelectedQuestion, SubmissionQuestion } from "../types/questions.types";


type CustomQuestionType = Exclude<CustomQuestion["type"], "experience">;

/**
 * Creates a predefined question from a custom question input
 * @param customQuestion The custom question input
 * @returns A properly typed PredefinedQuestion
 */
export const createPredefinedFromCustom = (
  customQuestion: Omit<CustomQuestion, "type"> & { type: CustomQuestionType }
): PredefinedQuestion => {
  const baseQuestion = {
    id: `custom-${Date.now()}`,
    question: customQuestion.label,
    isRequired: customQuestion.isRequired,
    isMultiple: customQuestion.isMultipleChoices || false,
  };

  // Handle each type explicitly to satisfy TypeScript
  switch (customQuestion.type) {
    case "choice":
      return {
        ...baseQuestion,
        type: "choice",
        options: customQuestion.options || [],
      } as PredefinedQuestion;
    case "open":
      return {
        ...baseQuestion,
        type: "open",
      } as PredefinedQuestion;
    case "yesno":
      return {
        ...baseQuestion,
        type: "yesno",
      } as PredefinedQuestion;
    default: {
      const exhaustiveCheck: never = customQuestion.type;
      throw new Error(`Unhandled question type: ${exhaustiveCheck}`);
    }
  }
};


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
          type: "experience",
          question: q.answer as string, // Use answer as the question for experience type
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
        question: q.type === "experience" ? (q.answer as string) : q.question,
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