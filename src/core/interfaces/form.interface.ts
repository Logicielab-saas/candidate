// Form data structure for questions
export interface QuestionFormData {
  answers: {
    [key: string]: string | string[];
  };
}

// Question answer structure
export interface QuestionAnswer {
  id: string;
  answer: string | string[];
}

// Questions data structure
export interface QuestionsData {
  answers: QuestionAnswer[];
}
