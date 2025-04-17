/**
 * IndustryFilter - Industry selection with radio options
 */

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { memo } from "react";
import { useTranslations } from "next-intl";

// Industry options
export const INDUSTRIES = [
  { value: "tech", label: "tech" },
  { value: "finance", label: "finance" },
  { value: "healthcare", label: "healthcare" },
  { value: "education", label: "education" },
  { value: "retail", label: "retail" },
  { value: "manufacturing", label: "manufacturing" },
] as const;

interface IndustryFilterProps {
  value: string;
  onChange: (value: string) => void;
}

function IndustryFilterComponent({ value, onChange }: IndustryFilterProps) {
  const tCommon = useTranslations("common.filters.advanced.sections.industry");

  return (
    <div className="space-y-4">
      <Label>{tCommon("title")}</Label>
      <RadioGroup value={value} onValueChange={onChange}>
        {INDUSTRIES.map((industry) => (
          <div key={industry.value} className="flex items-center space-x-2">
            <RadioGroupItem value={industry.value} id={industry.value} />
            <Label htmlFor={industry.value}>
              {tCommon(`types.${industry.label}`)}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

export const IndustryFilter = memo(IndustryFilterComponent);
