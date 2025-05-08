import { SubmissionQuestion } from "../mockData/annonces";

// Base question type with required ID
export type BaseQuestionWithId = SubmissionQuestion & { id: string };

// Specific type for choice questions that must have options
export interface ChoiceQuestionWithId extends BaseQuestionWithId {
  type: "selection";
  options: string[];
  isMultipleChoices?: boolean;
}

// Type guard to check if a question is a choice question with options
export function isChoiceQuestion(
  question: BaseQuestionWithId
): question is ChoiceQuestionWithId {
  return (
    question.type === "selection" &&
    Array.isArray(question.options) &&
    question.options.length > 0
  );
}
