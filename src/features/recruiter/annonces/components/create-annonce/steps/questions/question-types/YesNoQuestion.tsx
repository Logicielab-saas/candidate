"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { QuestionSettings } from "./QuestionSettings";

interface YesNoQuestionProps {
  question: string;
  isRequired: boolean;
  onChange?: (value: string) => void;
  value?: string;
  questionId: string;
  onRequiredChange: (required: boolean) => void;
}

export function YesNoQuestion({
  question,
  isRequired,
  questionId,
  onRequiredChange,
}: YesNoQuestionProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <Label className="text-base">{question}</Label>
        <QuestionSettings
          questionId={questionId}
          isRequired={isRequired}
          onRequiredChange={onRequiredChange}
        />
      </div>
      <RadioGroup className="flex gap-4">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="yes" id="yes" />
          <Label htmlFor="yes" className="font-normal">
            Oui
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="no" id="no" />
          <Label htmlFor="no" className="font-normal">
            Non
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}
