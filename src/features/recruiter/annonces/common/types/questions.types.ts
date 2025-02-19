import { PredefinedQuestion } from "../interfaces/questions.interface";

export type QuestionAnswer = string | string[];

export type SelectedQuestion = PredefinedQuestion & {
  answer?: QuestionAnswer;
};