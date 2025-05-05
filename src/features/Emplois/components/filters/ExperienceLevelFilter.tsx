/**
 * ExperienceLevelFilter - Experience level selection with radio options
 */

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { memo } from "react";
import { useTranslations } from "next-intl";

// Experience level options
export const EXPERIENCE_LEVELS = [
  { value: "entry", label: "entry" },
  { value: "mid", label: "mid" },
  { value: "senior", label: "senior" },
  { value: "lead", label: "lead" },
] as const;

interface ExperienceLevelFilterProps {
  value: string;
  onChange: (value: string) => void;
}

function ExperienceLevelFilterComponent({
  value,
  onChange,
}: ExperienceLevelFilterProps) {
  const tCommon = useTranslations(
    "common.filters.advanced.sections.experience"
  );

  return (
    <div className="space-y-4">
      <Label>{tCommon("title")}</Label>
      <RadioGroup value={value} onValueChange={onChange}>
        {EXPERIENCE_LEVELS.map((level) => (
          <div key={level.value} className="flex items-center space-x-2">
            <RadioGroupItem value={level.value} id={level.value} />
            <Label htmlFor={level.value}>
              {tCommon(`levels.${level.label}`)}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

export const ExperienceLevelFilter = memo(ExperienceLevelFilterComponent);
