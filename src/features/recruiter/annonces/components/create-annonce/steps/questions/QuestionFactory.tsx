"use client";

import { PredefinedQuestion } from "@/features/recruiter/annonces/common/interfaces/questions.interface";
import { QuestionAnswer } from "@/features/recruiter/annonces/common/types/questions.types";
import { YesNoQuestion } from "./question-types/YesNoQuestion";
import { ChoiceQuestion } from "./question-types/ChoiceQuestion";
import { ExperienceQuestion } from "./question-types/ExperienceQuestion";
import { OpenQuestion } from "./question-types/OpenQuestion";

interface QuestionFactoryProps {
  question: PredefinedQuestion;
  onChange: (value: QuestionAnswer) => void;
  value?: QuestionAnswer;
}

export function QuestionFactory({
  question,
  onChange,
  value,
}: QuestionFactoryProps) {
  switch (question.type) {
    case "yesno":
      return (
        <YesNoQuestion
          question={question.question}
          isRequired={question.isRequired}
          onChange={onChange}
          value={value as string}
        />
      );

    case "choice":
      return (
        <ChoiceQuestion
          question={question.question}
          options={question.options}
          isRequired={question.isRequired}
          isMultiple={question.isMultiple}
          onChange={onChange}
          value={value}
        />
      );

    case "experience":
      return (
        <ExperienceQuestion
          question={question.question}
          isRequired={question.isRequired}
          onChange={onChange}
          value={value as string}
        />
      );

    case "open":
      return (
        <OpenQuestion
          question={question.question}
          isRequired={question.isRequired}
          onChange={onChange}
          value={value as string}
        />
      );

    default:
      return null;
  }
}
