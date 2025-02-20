export type QuestionType = 'experience' | 'open' | 'choice' | 'yesno';

// Base interface for predefined questions (templates)
interface BaseQuestion {
  id: string;
  type: QuestionType;
  question: string;
  isRequired: boolean;
  isMultiple: boolean; // Only used for template selection, not sent to backend
}

// Interface for custom questions that are not predefined
export interface CustomQuestion {
  type: QuestionType;
  label: string;
  isRequired: boolean;
  isMultipleChoices?: boolean;
  options?: string[];
}

interface ChoiceQuestion extends BaseQuestion {
  type: 'choice';
  options: string[];
}

interface SimpleQuestion extends BaseQuestion {
  type: 'experience' | 'open' | 'yesno';
}

export type PredefinedQuestion = SimpleQuestion | ChoiceQuestion;

// Interface for the final question data to be sent
export interface FinalQuestion {
  id: string;
  type: QuestionType;
  question: string;
  label: string;
  isRequired: boolean;
  isMultiple: boolean;
  isMultipleChoices?: boolean;
  options?: string[];
  answer?: string | string[];
}

// export interface FinalQuestion {
//   // For predefined questions
//   id?: string;
//   isRequired: boolean;
//   isMultipleChoices?: boolean;

//   // For custom questions
//   type?: QuestionType;
//   label?: string;
//   options?: string[];
// }
