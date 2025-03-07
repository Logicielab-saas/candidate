/**
 * AdvancedFiltersDrawer - Advanced filtering options in a drawer
 *
 * Features:
 * - Multiple filter categories
 * - Salary range filter
 * - Experience level filter
 * - Remote work options
 * - Industry sectors
 */

"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Settings2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useQueryState } from "nuqs";
import { useState } from "react";

// Filter options
const EXPERIENCE_LEVELS = [
  { value: "entry", label: "Entry Level (0-2 years)" },
  { value: "mid", label: "Mid Level (3-5 years)" },
  { value: "senior", label: "Senior Level (5+ years)" },
  { value: "lead", label: "Lead/Manager (8+ years)" },
] as const;

const INDUSTRIES = [
  { value: "tech", label: "Technology" },
  { value: "finance", label: "Finance" },
  { value: "healthcare", label: "Healthcare" },
  { value: "education", label: "Education" },
  { value: "retail", label: "Retail" },
  { value: "manufacturing", label: "Manufacturing" },
] as const;

// Default values
const DEFAULT_MIN_SALARY = 30;
const DEFAULT_MAX_SALARY = 150;

export function AdvancedFiltersDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  // URL state management
  const [experience, setExperience] = useQueryState("experience");
  const [industry, setIndustry] = useQueryState("industry");
  const [isRemote, setIsRemote] = useQueryState("remote", {
    parse: (value) => value === "true",
    serialize: (value) => String(value),
  });
  const [salaryRange, setSalaryRange] = useQueryState("salary", {
    defaultValue: `${DEFAULT_MIN_SALARY},${DEFAULT_MAX_SALARY}`,
  });

  // Parse salary range from URL
  const parsedSalaryRange = salaryRange
    ? salaryRange.split(",").map(Number)
    : [DEFAULT_MIN_SALARY, DEFAULT_MAX_SALARY];

  // Count active filters
  const activeFiltersCount = [
    experience,
    industry,
    isRemote,
    salaryRange &&
      (parsedSalaryRange[0] !== DEFAULT_MIN_SALARY ||
        parsedSalaryRange[1] !== DEFAULT_MAX_SALARY),
  ].filter(Boolean).length;

  // Reset all filters
  const handleReset = () => {
    setExperience(null);
    setIndustry(null);
    setIsRemote(null);
    setSalaryRange(null);
  };

  // Handle salary range changes
  const handleSalaryChange = (value: number[]) => {
    setSalaryRange(value.join(","));
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "relative",
            "border-dashed",
            activeFiltersCount > 0 && "border-primary"
          )}
        >
          <Settings2 className="h-4 w-4" />
          {activeFiltersCount > 0 && (
            <Badge
              variant="secondary"
              className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-xs"
            >
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader className="space-y-2.5">
          <SheetTitle>Advanced Filters</SheetTitle>
          <SheetDescription>
            Refine your job search with advanced filtering options.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-8 space-y-8">
          {/* Salary Range */}
          <div className="space-y-4">
            <Label>Salary Range (K€/year)</Label>
            <Slider
              min={DEFAULT_MIN_SALARY}
              max={DEFAULT_MAX_SALARY}
              step={5}
              value={parsedSalaryRange}
              onValueChange={handleSalaryChange}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{parsedSalaryRange[0]}K€</span>
              <span>{parsedSalaryRange[1]}K€</span>
            </div>
          </div>

          <Separator />

          {/* Experience Level */}
          <div className="space-y-4">
            <Label>Experience Level</Label>
            <RadioGroup value={experience || ""} onValueChange={setExperience}>
              {EXPERIENCE_LEVELS.map((level) => (
                <div key={level.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={level.value} id={level.value} />
                  <Label htmlFor={level.value}>{level.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Separator />

          {/* Remote Work */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Remote Work</Label>
              <p className="text-sm text-muted-foreground">
                Show only remote positions
              </p>
            </div>
            <Switch checked={isRemote || false} onCheckedChange={setIsRemote} />
          </div>

          <Separator />

          {/* Industry */}
          <div className="space-y-4">
            <Label>Industry</Label>
            <RadioGroup value={industry || ""} onValueChange={setIndustry}>
              {INDUSTRIES.map((ind) => (
                <div key={ind.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={ind.value} id={ind.value} />
                  <Label htmlFor={ind.value}>{ind.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        <SheetFooter className="mt-8">
          <Button
            variant="outline"
            onClick={handleReset}
            className="w-full sm:w-auto"
          >
            Reset Filters
          </Button>
          <Button onClick={() => setIsOpen(false)} className="w-full sm:w-auto">
            Apply Filters
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
