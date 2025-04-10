/**
 * AdvancedFiltersDrawer - Advanced filtering options in a drawer
 *
 * Features:
 * - Multiple filter categories with memoized components
 * - Local state management for smooth interactions
 * - Batch updates to URL parameters
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
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useQueryState } from "nuqs";
import { useState, useEffect } from "react";
import {
  SalaryRangeFilter,
  DEFAULT_MIN_SALARY,
  DEFAULT_MAX_SALARY,
} from "./filters/SalaryRangeFilter";
import { ExperienceLevelFilter } from "./filters/ExperienceLevelFilter";
import { IndustryFilter } from "./filters/IndustryFilter";
import { RemoteWorkFilter } from "./filters/RemoteWorkFilter";

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

  // Local state for form values
  const [localExperience, setLocalExperience] = useState(experience || "");
  const [localIndustry, setLocalIndustry] = useState(industry || "");
  const [localIsRemote, setLocalIsRemote] = useState(isRemote || false);
  const [localSalaryRange, setLocalSalaryRange] = useState<number[]>(
    salaryRange
      ? salaryRange.split(",").map(Number)
      : [DEFAULT_MIN_SALARY, DEFAULT_MAX_SALARY]
  );

  // Sync local state with URL params on initial load
  useEffect(() => {
    setLocalExperience(experience || "");
    setLocalIndustry(industry || "");
    setLocalIsRemote(isRemote || false);
    setLocalSalaryRange(
      salaryRange
        ? salaryRange.split(",").map(Number)
        : [DEFAULT_MIN_SALARY, DEFAULT_MAX_SALARY]
    );
  }, [experience, industry, isRemote, salaryRange]);

  // Count active filters
  const activeFiltersCount = [
    experience,
    industry,
    isRemote,
    salaryRange &&
      (localSalaryRange[0] !== DEFAULT_MIN_SALARY ||
        localSalaryRange[1] !== DEFAULT_MAX_SALARY),
  ].filter(Boolean).length;

  // Reset all filters
  const handleReset = () => {
    setLocalExperience("");
    setLocalIndustry("");
    setLocalIsRemote(false);
    setLocalSalaryRange([DEFAULT_MIN_SALARY, DEFAULT_MAX_SALARY]);

    // Reset URL params
    setExperience(null);
    setIndustry(null);
    setIsRemote(null);
    setSalaryRange(null);
  };

  // Apply filters
  const handleApply = () => {
    setExperience(localExperience || null);
    setIndustry(localIndustry || null);
    setIsRemote(localIsRemote || null);
    setSalaryRange(
      localSalaryRange[0] === DEFAULT_MIN_SALARY &&
        localSalaryRange[1] === DEFAULT_MAX_SALARY
        ? null
        : localSalaryRange.join(",")
    );
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "relative h-10 px-8 border-dashed",
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
      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-4 sm:p-6 overflow-y-auto"
      >
        <SheetHeader className="space-y-2.5">
          <SheetTitle>Advanced Filters</SheetTitle>
          <SheetDescription>
            Refine your job search with advanced filtering options.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 sm:mt-8 space-y-6 sm:space-y-8">
          {/* Salary Range */}
          <SalaryRangeFilter
            value={localSalaryRange}
            onChange={setLocalSalaryRange}
          />

          <Separator />

          {/* Experience Level */}
          <ExperienceLevelFilter
            value={localExperience}
            onChange={setLocalExperience}
          />

          <Separator />

          {/* Remote Work */}
          <RemoteWorkFilter value={localIsRemote} onChange={setLocalIsRemote} />

          <Separator />

          {/* Industry */}
          <IndustryFilter value={localIndustry} onChange={setLocalIndustry} />
        </div>

        <SheetFooter className="flex-row gap-2 mt-6 sm:mt-8">
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex-1 sm:flex-none"
          >
            Reset Filters
          </Button>
          <Button onClick={handleApply} className="flex-1 sm:flex-none">
            Apply Filters
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
