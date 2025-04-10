/**
 * ExperienceLevelFilter - Experience level selection with radio options
 */

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { memo } from "react";

// Experience level options
export const EXPERIENCE_LEVELS = [
  { value: "entry", label: "Entry Level (0-2 years)" },
  { value: "mid", label: "Mid Level (3-5 years)" },
  { value: "senior", label: "Senior Level (5+ years)" },
  { value: "lead", label: "Lead/Manager (8+ years)" },
] as const;

interface ExperienceLevelFilterProps {
  value: string;
  onChange: (value: string) => void;
}

function ExperienceLevelFilterComponent({
  value,
  onChange,
}: ExperienceLevelFilterProps) {
  return (
    <div className="space-y-4">
      <Label>Experience Level</Label>
      <RadioGroup value={value} onValueChange={onChange}>
        {EXPERIENCE_LEVELS.map((level) => (
          <div key={level.value} className="flex items-center space-x-2">
            <RadioGroupItem value={level.value} id={level.value} />
            <Label htmlFor={level.value}>{level.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

export const ExperienceLevelFilter = memo(ExperienceLevelFilterComponent);
