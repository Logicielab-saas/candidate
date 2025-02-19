export type QuestionType = 'experience' | 'open' | 'choice' | 'yesno';

interface BaseQuestion {
  id: string;
  type: QuestionType;
  question: string;
  isRequired: boolean;
  isMultiple: boolean;
}

interface ChoiceQuestion extends BaseQuestion {
  type: 'choice';
  options: string[];
}

interface SimpleQuestion extends BaseQuestion {
  type: 'experience' | 'open' | 'yesno';
}

export type PredefinedQuestion = SimpleQuestion | ChoiceQuestion;

export interface QuestionCategory {
  id: QuestionType;
  label: string;
  description: string;
}
