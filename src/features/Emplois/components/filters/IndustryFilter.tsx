/**
 * IndustryFilter - Industry selection with radio options
 */

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { memo } from "react";

// Industry options
export const INDUSTRIES = [
  { value: "tech", label: "Technology" },
  { value: "finance", label: "Finance" },
  { value: "healthcare", label: "Healthcare" },
  { value: "education", label: "Education" },
  { value: "retail", label: "Retail" },
  { value: "manufacturing", label: "Manufacturing" },
] as const;

interface IndustryFilterProps {
  value: string;
  onChange: (value: string) => void;
}

function IndustryFilterComponent({ value, onChange }: IndustryFilterProps) {
  return (
    <div className="space-y-4">
      <Label>Industry</Label>
      <RadioGroup value={value} onValueChange={onChange}>
        {INDUSTRIES.map((industry) => (
          <div key={industry.value} className="flex items-center space-x-2">
            <RadioGroupItem value={industry.value} id={industry.value} />
            <Label htmlFor={industry.value}>{industry.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

export const IndustryFilter = memo(IndustryFilterComponent);
