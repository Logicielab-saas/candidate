"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface YesNoQuestionProps {
  question: string;
  isRequired: boolean;
  onChange?: (value: string) => void;
  value?: string;
}

export function YesNoQuestion({ question, isRequired }: YesNoQuestionProps) {
  return (
    <div className="space-y-3">
      <Label className="text-base">
        {question}
        {isRequired && <span className="text-destructive ml-1">*</span>}
      </Label>
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
