"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface QuestionSettingsProps {
  questionId: string;
  isRequired: boolean;
  onRequiredChange: (required: boolean) => void;
  isChoice?: boolean;
  isMultipleChoices?: boolean;
  onMultipleChoicesChange?: (multiple: boolean) => void;
  className?: string;
}

export function QuestionSettings({
  questionId,
  isRequired,
  onRequiredChange,
  isChoice,
  isMultipleChoices,
  onMultipleChoicesChange,
  className,
}: QuestionSettingsProps) {
  const requiredId = `required-${questionId}`;
  const multipleId = `multiple-${questionId}`;

  return (
    <div className={className}>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={requiredId}
          checked={isRequired}
          onCheckedChange={onRequiredChange}
        />
        <Label htmlFor={requiredId} className="text-sm font-normal">
          Question obligatoire
        </Label>
      </div>

      {isChoice && onMultipleChoicesChange && (
        <div className="flex items-center space-x-2 mt-2">
          <Checkbox
            id={multipleId}
            checked={isMultipleChoices}
            onCheckedChange={onMultipleChoicesChange}
          />
          <Label htmlFor={multipleId} className="text-sm font-normal">
            Choix multiples
          </Label>
        </div>
      )}
    </div>
  );
}
