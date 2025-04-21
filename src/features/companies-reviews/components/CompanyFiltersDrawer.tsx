/**
 * CompanyFiltersDrawer - Advanced filtering options for company reviews
 *
 * Features:
 * - Location filter using CitySelector
 * - Industry filter using IndustrySelector
 * - Salary range filter
 * - Filters only apply when clicking "Appliquer"
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
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { CitySelector } from "@/features/Emplois/components/CitySelector";
import { IndustrySelector } from "./IndustrySelector";
// TODO : adjust city selector label maybe
// Default values
const DEFAULT_MIN_SALARY = 30;
const DEFAULT_MAX_SALARY = 150;

export function CompanyFiltersDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  // URL state management
  const [location, setLocation] = useQueryState("location");
  const [industry, setIndustry] = useQueryState("industry");
  const [salaryRange, setSalaryRange] = useQueryState("salary", {
    defaultValue: `${DEFAULT_MIN_SALARY},${DEFAULT_MAX_SALARY}`,
  });

  // Local state for filter values
  const [localLocation, setLocalLocation] = useState<string | null>(location);
  const [localIndustry, setLocalIndustry] = useState<string | null>(industry);
  const [localSalaryRange, setLocalSalaryRange] = useState<number[]>(
    salaryRange
      ? salaryRange.split(",").map(Number)
      : [DEFAULT_MIN_SALARY, DEFAULT_MAX_SALARY]
  );

  // Count active filters (using URL state for badge display)
  const activeFiltersCount = [
    location,
    industry,
    salaryRange &&
      (localSalaryRange[0] !== DEFAULT_MIN_SALARY ||
        localSalaryRange[1] !== DEFAULT_MAX_SALARY),
  ].filter(Boolean).length;

  // Reset all filters
  const handleReset = () => {
    setLocalLocation(null);
    setLocalIndustry(null);
    setLocalSalaryRange([DEFAULT_MIN_SALARY, DEFAULT_MAX_SALARY]);
  };

  // Apply filters to URL state
  const handleApply = async () => {
    await Promise.all([
      setLocation(localLocation),
      setIndustry(localIndustry),
      setSalaryRange(localSalaryRange.join(",")),
    ]);
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "relative h-11 px-8 border-dashed",
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
          <SheetTitle>Filtres Avancés</SheetTitle>
          <SheetDescription>
            Affinez votre recherche d&apos;entreprises avec des options de
            filtrage avancées.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 sm:mt-8 space-y-6 sm:space-y-8">
          {/* Location */}
          <div className="space-y-4">
            <CitySelector value={localLocation} onChange={setLocalLocation} />
          </div>

          <Separator />

          {/* Industry */}
          <div className="space-y-4">
            <Label>Secteur d&apos;Activité</Label>
            <IndustrySelector
              value={localIndustry}
              onChange={setLocalIndustry}
            />
          </div>

          <Separator />

          {/* Salary Range */}
          <div className="space-y-4">
            <Label>Fourchette de Salaire (K€/an)</Label>
            <Slider
              min={DEFAULT_MIN_SALARY}
              max={DEFAULT_MAX_SALARY}
              step={5}
              value={localSalaryRange}
              onValueChange={setLocalSalaryRange}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{localSalaryRange[0]}K€</span>
              <span>{localSalaryRange[1]}K€</span>
            </div>
          </div>
        </div>

        <SheetFooter className="flex-row gap-2 mt-6 sm:mt-8">
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex-1 sm:flex-none"
          >
            Réinitialiser
          </Button>
          <Button onClick={handleApply} className="flex-1 sm:flex-none">
            Appliquer
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
