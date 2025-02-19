export type QuestionType = 'experience' | 'open' | 'choice' | 'yesno';

// Base interface for predefined questions (templates)
interface BaseQuestion {
  id: string;
  type: QuestionType;
  question: string;
  isRequired: boolean;
  isMultiple: boolean; // Only used for template selection, not sent to backend
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
  isRequired: boolean;
  isMultipleChoices?: boolean; // Only for choice questions
}
