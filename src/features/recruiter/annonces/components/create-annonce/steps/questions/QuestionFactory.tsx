"use client";

import { useEffect } from "react";
import { PredefinedQuestion } from "@/features/recruiter/annonces/common/interfaces/questions.interface";
import { QuestionAnswer } from "@/features/recruiter/annonces/common/types/questions.types";
import { YesNoQuestion } from "./question-types/YesNoQuestion";
import { ChoiceQuestion } from "./question-types/ChoiceQuestion";
import { ExperienceQuestion } from "./question-types/ExperienceQuestion";
import { OpenQuestion } from "./question-types/OpenQuestion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface QuestionFactoryProps {
  question: PredefinedQuestion;
  onChange: (value: QuestionAnswer) => void;
  value?: QuestionAnswer;
  onRequiredChange: (required: boolean) => void;
  onMultipleChoicesChange?: (multiple: boolean) => void;
  onRemove: () => void;
}

export function QuestionFactory({
  question,
  onChange,
  value,
  onRequiredChange,
  onMultipleChoicesChange,
  onRemove,
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
            questionId={question.id}
            onRequiredChange={onRequiredChange}
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
            questionId={question.id}
            onRequiredChange={onRequiredChange}
            onMultipleChoicesChange={onMultipleChoicesChange}
          />
        );

      case "experience":
        return (
          <ExperienceQuestion
            question={question.question}
            isRequired={question.isRequired}
            onChange={onChange}
            value={value as string}
            questionId={question.id}
            onRequiredChange={onRequiredChange}
          />
        );

      case "open":
        return (
          <OpenQuestion
            question={question.question}
            isRequired={question.isRequired}
            questionId={question.id}
            onRequiredChange={onRequiredChange}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative space-y-4 bg-background rounded-lg border p-3">
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-0 -top-0 h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive"
        onClick={onRemove}
      >
        <X className="h-4 w-4" />
      </Button>
      {renderQuestion()}
    </div>
  );
}
