import { QuestionType } from "../interfaces/questions.interface";

export type QuestionAnswer = string | string[];

export interface BaseSelectedQuestion {
  id: string;
  type: QuestionType;
  question: string;
  isRequired: boolean;
  isMultiple: boolean;
  answer?: QuestionAnswer;
}

export interface ChoiceSelectedQuestion extends Omit<BaseSelectedQuestion, 'type'> {
  type: "choice";
  options: string[];
  isMultipleChoices: boolean;
}

export interface SimpleSelectedQuestion extends Omit<BaseSelectedQuestion, 'type'> {
  type: "experience" | "open" | "yesno";
}

export type SelectedQuestion = ChoiceSelectedQuestion | SimpleSelectedQuestion;

// Base interface for submission questions
interface BaseSubmissionQuestion {
  isRequired: boolean;
}

// Interface for predefined questions
interface PredefinedSubmissionQuestion extends BaseSubmissionQuestion {
  id: string;
  isMultipleChoices?: boolean; // Only for choice questions
  label?: string; // Only for experience questions
}

// Interface for custom questions
interface CustomSubmissionQuestion extends BaseSubmissionQuestion {
  type: QuestionType;
  question: string;
  options?: string[]; // Only for choice questions
  isMultipleChoices?: boolean; // Only for choice questions
}

export type SubmissionQuestion = PredefinedSubmissionQuestion | CustomSubmissionQuestion;

export type FormattedQuestion = SubmissionQuestion;