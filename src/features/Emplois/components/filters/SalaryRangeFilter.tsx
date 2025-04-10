/**
 * SalaryRangeFilter - Handles salary range selection with local state
 *
 * Features:
 * - Local state management for smooth slider interaction
 * - Min/max range validation
 * - Minimum gap between values
 */

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { memo } from "react";

// Default values
export const DEFAULT_MIN_SALARY = 30;
export const DEFAULT_MAX_SALARY = 150;

interface SalaryRangeFilterProps {
  value: number[];
  onChange: (value: number[]) => void;
}

function SalaryRangeFilterComponent({
  value,
  onChange,
}: SalaryRangeFilterProps) {
  return (
    <div className="space-y-4">
      <Label>Salary Range (K€/year)</Label>
      <Slider
        min={DEFAULT_MIN_SALARY}
        max={DEFAULT_MAX_SALARY}
        step={5}
        value={value}
        onValueChange={onChange}
        className="w-full"
        minStepsBetweenThumbs={2}
      />
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{value[0]}K€</span>
        <span>{value[1]}K€</span>
      </div>
    </div>
  );
}

export const SalaryRangeFilter = memo(SalaryRangeFilterComponent);
