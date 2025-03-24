import { UseFormReturn } from "react-hook-form";

export interface QuestionFormData {
  answers: Record<string, string | string[]>;
}

export interface BaseQuestionProps {
  id: string;
  title: string;
  description?: string;
  isRequired: boolean;
}

export interface QuestionProps {
  question: BaseQuestionProps;
  form: UseFormReturn<QuestionFormData>;
}

export interface ChoiceQuestionProps extends QuestionProps {
  question: BaseQuestionProps & {
    isMultipleChoices: boolean;
    options: { value: string }[];
  };
}
