/**
 * JobFilters - Modern filter controls for job search results
 *
 * Features:
 * - Clean, modern design with icons
 * - Optimized rendering with memoized components
 * - Multi-select capability for contract types and keywords
 * - Advanced filters drawer for additional options
 * - Save search alerts functionality
 */

"use client";

import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryState } from "nuqs";
import { Calendar } from "lucide-react";
import { AdvancedFiltersDrawer } from "./AdvancedFiltersDrawer";
import { SaveSearchAlert } from "./SaveSearchAlert";
import { JobTypesFilter } from "./filters/ContractTypeFilter";

// Filter options
const DATE_FILTERS = [
  { value: "24h", label: "Last 24 hours" },
  { value: "week", label: "Last week" },
  { value: "month", label: "Last month" },
  { value: "all", label: "All time" },
] as const;

export function JobFilters() {
  const [dateFilter, setDateFilter] = useQueryState("date");
  // const [contractTypes] = useQueryState("contracts");
  // const [urlKeywords] = useQueryState("keyword");

  // Count active filters
  // const activeFiltersCount = [
  //   dateFilter && dateFilter !== "all",
  //   contractTypes,
  //   urlKeywords,
  // ].filter(Boolean).length;

  return (
    <div className="space-y-4">
      {/* Active Filters Count */}
      {/* {activeFiltersCount > 0 && (
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="h-6">
            {activeFiltersCount} active filter
            {activeFiltersCount > 1 ? "s" : ""}
          </Badge>
        </div>
      )} */}

      {/* Filters Row */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Date Filter */}
        <Select
          value={dateFilter || "all"}
          onValueChange={(value) =>
            setDateFilter(value === "all" ? null : value)
          }
        >
          <SelectTrigger
            className={cn(
              "w-[180px] bg-background",
              "border-dashed",
              dateFilter && dateFilter !== "all" && "border-primary"
            )}
          >
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder="Filter by date" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {DATE_FILTERS.map((filter) => (
              <SelectItem key={filter.value} value={filter.value}>
                {filter.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Keywords Filter */}
        {/* <KeywordFilter /> */}

        {/* Contract Type Filter */}
        <JobTypesFilter />

        {/* Advanced Filters Drawer */}
        <AdvancedFiltersDrawer />

        {/* Save Search Alert */}
        <div className="ml-auto">
          <SaveSearchAlert />
        </div>
      </div>
    </div>
  );
}
