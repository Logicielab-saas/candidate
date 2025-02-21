"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

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
    <div className={cn("flex items-center gap-4 mr-8", className)}>
      <div className="flex items-center gap-2">
        <Checkbox
          id={requiredId}
          checked={isRequired}
          onCheckedChange={(checked) => onRequiredChange(checked as boolean)}
        />
        <Label htmlFor={requiredId} className="text-sm font-normal">
          Obligatoire
        </Label>
      </div>

      {isChoice && onMultipleChoicesChange && (
        <div className="flex items-center gap-2">
          <Checkbox
            id={multipleId}
            checked={isMultipleChoices}
            onCheckedChange={(checked) =>
              onMultipleChoicesChange(checked as boolean)
            }
          />
          <Label htmlFor={multipleId} className="text-sm font-normal">
            Choix multiples
          </Label>
        </div>
      )}
    </div>
  );
}
