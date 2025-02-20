import { CustomQuestion, PredefinedQuestion } from "@/features/recruiter/annonces/common/interfaces/questions.interface";

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