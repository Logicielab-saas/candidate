import { CustomQuestion, PredefinedQuestion, SubmissionQuestion } from "@/features/recruiter/annonces/common/interfaces/questions.interface";
import { SelectedQuestion } from "@/features/recruiter/annonces/common/types/questions.types";

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

/**
 * Formats questions for final submission by removing unnecessary fields
 * and structuring the data according to question type
 */
export const formatQuestionsForSubmission = (questions: SelectedQuestion[]): SubmissionQuestion[] => {
  return questions.map((q) => {
    // For custom questions, send all the data
    if (q.id.startsWith('custom-')) {
      return {
        type: q.type,
        label: q.question,
        isRequired: q.isRequired,
        ...(q.type === "choice" && {
          isMultipleChoices: q.isMultiple,
          options: q.options,
        }),
      };
    }

    // For predefined questions
    const base = {
      id: q.id,
      isRequired: q.isRequired,
    };

    // For experience questions, we need to keep the label (answer)
    if (q.type === "experience") {
      return {
        ...base,
        label: q.answer as string,
      };
    }

    // For choice questions with multiple choices
    if (q.type === "choice" && q.isMultiple) {
      return {
        ...base,
        isMultipleChoices: true,
      };
    }

    // For other predefined questions (open, yesno), we only need id and isRequired
    return base;
  });
};