"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { QuestionSettings } from "./QuestionSettings";

interface ChoiceQuestionProps {
  question: string;
  options: string[];
  isRequired: boolean;
  isMultiple: boolean;
  onChange: (value: string | string[]) => void;
  value?: string | string[];
  questionId: string;
  onRequiredChange: (required: boolean) => void;
  onMultipleChoicesChange?: (multiple: boolean) => void;
}

export function ChoiceQuestion({
  question,
  options,
  isRequired,
  isMultiple,
  onChange,
  value = isMultiple ? [] : undefined,
  questionId,
  onRequiredChange,
  onMultipleChoicesChange,
}: ChoiceQuestionProps) {
  const handleMultipleChange = (checked: boolean, option: string) => {
    const currentValue = (value as string[]) || [];
    if (checked) {
      onChange([...currentValue, option]);
    } else {
      onChange(currentValue.filter((item) => item !== option));
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <Label className="text-base">{question}</Label>
        <QuestionSettings
          questionId={questionId}
          isRequired={isRequired}
          onRequiredChange={onRequiredChange}
          isChoice={true}
          isMultipleChoices={isMultiple}
          onMultipleChoicesChange={onMultipleChoicesChange}
        />
      </div>
      {isMultiple ? (
        <div className="grid grid-cols-1 gap-3">
          {options.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={option}
                checked={(value as string[])?.includes(option)}
                onCheckedChange={(checked) =>
                  handleMultipleChange(checked as boolean, option)
                }
              />
              <Label htmlFor={option} className="font-normal">
                {option}
              </Label>
            </div>
          ))}
        </div>
      ) : (
        <RadioGroup
          value={value as string}
          onValueChange={onChange}
          className="grid grid-cols-1 gap-3"
        >
          {options.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={option} />
              <Label htmlFor={option} className="font-normal">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      )}
    </div>
  );
}
