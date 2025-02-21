import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { specialCheckboxStyle } from "@/core/styles/special-checkbox.style";
import { specialLabelStyle } from "@/core/styles/special-label.style";
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
    <div className={cn("flex items-center gap-6 mr-8", className)}>
      <div className="flex items-center gap-2.5">
        <Checkbox
          id={requiredId}
          checked={isRequired}
          onCheckedChange={(checked) => onRequiredChange(checked as boolean)}
          className={cn(
            specialCheckboxStyle,
            "border-red-300 dark:border-red-700",
            "data-[state=checked]:border-red-500 dark:data-[state=checked]:border-red-400",
            "data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-red-400 data-[state=checked]:to-red-500",
            "dark:data-[state=checked]:from-red-500 dark:data-[state=checked]:to-red-600",
            "focus-visible:ring-red-400"
          )}
        />
        <Label
          htmlFor={requiredId}
          className={cn(
            specialLabelStyle,
            isRequired
              ? "text-red-600 dark:text-red-400"
              : "text-zinc-500 dark:text-zinc-400"
          )}
        >
          Obligatoire
        </Label>
      </div>

      {isChoice && onMultipleChoicesChange && (
        <div className="flex items-center gap-2.5">
          <Checkbox
            id={multipleId}
            checked={isMultipleChoices}
            onCheckedChange={(checked) =>
              onMultipleChoicesChange(checked as boolean)
            }
            className={cn(
              specialCheckboxStyle,
              "border-emerald-300 dark:border-emerald-700",
              "data-[state=checked]:border-emerald-500 dark:data-[state=checked]:border-emerald-400",
              "data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-emerald-400 data-[state=checked]:to-emerald-500",
              "dark:data-[state=checked]:from-emerald-500 dark:data-[state=checked]:to-emerald-600",
              "focus-visible:ring-emerald-400"
            )}
          />
          <Label
            htmlFor={multipleId}
            className={cn(
              specialLabelStyle,
              isMultipleChoices
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-zinc-500 dark:text-zinc-400"
            )}
          >
            Choix multiples
          </Label>
        </div>
      )}
    </div>
  );
}
