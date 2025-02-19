"use client";

import { useEffect } from "react";
import { PredefinedQuestion } from "@/features/recruiter/annonces/common/interfaces/questions.interface";
import { QuestionAnswer } from "@/features/recruiter/annonces/common/types/questions.types";
import { YesNoQuestion } from "./question-types/YesNoQuestion";
import { ChoiceQuestion } from "./question-types/ChoiceQuestion";
import { ExperienceQuestion } from "./question-types/ExperienceQuestion";
import { OpenQuestion } from "./question-types/OpenQuestion";
import { QuestionSettings } from "./question-types/QuestionSettings";

interface QuestionFactoryProps {
  question: PredefinedQuestion;
  onChange: (value: QuestionAnswer) => void;
  value?: QuestionAnswer;
  onRequiredChange: (required: boolean) => void;
  onMultipleChoicesChange?: (multiple: boolean) => void;
}

export function QuestionFactory({
  question,
  onChange,
  value,
  onRequiredChange,
  onMultipleChoicesChange,
}: QuestionFactoryProps) {
  // Set initial value for yes/no and open questions
  useEffect(() => {
    if ((question.type === "yesno" || question.type === "open") && !value) {
      onChange(question.question);
    }
  }, [question, onChange, value]);

  const renderQuestion = () => {
    switch (question.type) {
      case "yesno":
        return (
          <YesNoQuestion
            question={question.question}
            isRequired={question.isRequired}
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
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {renderQuestion()}
      <QuestionSettings
        questionId={question.id}
        isRequired={question.isRequired}
        onRequiredChange={onRequiredChange}
        isChoice={question.type === "choice"}
        isMultipleChoices={
          question.type === "choice" ? question.isMultiple : undefined
        }
        onMultipleChoicesChange={onMultipleChoicesChange}
        className="mt-4"
      />
    </div>
  );
}
