/**
 * JobFilters - Modern filter controls for job search results
 *
 * Features:
 * - Clean, modern design with icons
 * - Date and contract type filtering
 * - Multi-select capability for contract types
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
import { MultiSelect } from "@/components/ui/multi-select";
import { useQueryState } from "nuqs";
import { Calendar, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Filter options
const DATE_FILTERS = [
  { value: "24h", label: "Last 24 hours" },
  { value: "week", label: "Last week" },
  { value: "month", label: "Last month" },
  { value: "all", label: "All time" },
] as const;

const CONTRACT_TYPES = [
  { value: "cdi", label: "CDI" },
  { value: "cdd", label: "CDD" },
  { value: "stage", label: "Stage" },
  { value: "alternance", label: "Alternance" },
  { value: "freelance", label: "Freelance" },
].map((type) => ({
  label: type.label,
  value: type.value.toLowerCase(),
}));

export function JobFilters() {
  const [dateFilter, setDateFilter] = useQueryState("date");
  const [contractTypes, setContractTypes] = useQueryState("contracts", {
    parse: (value) => value.split(","),
    serialize: (value) => value.join(","),
    defaultValue: [],
  });

  // Count active filters
  const activeFiltersCount = [
    dateFilter && dateFilter !== "all",
    contractTypes && contractTypes.length > 0,
  ].filter(Boolean).length;

  return (
    <div className="space-y-4">
      {/* Active Filters Count */}
      {activeFiltersCount > 0 && (
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="h-6">
            {activeFiltersCount} active filter
            {activeFiltersCount > 1 ? "s" : ""}
          </Badge>
        </div>
      )}

      {/* Filters Row */}
      <div className={cn("flex flex-wrap items-center gap-3")}>
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

        {/* Contract Type Multi-Select Filter */}
        <div className="relative">
          <MultiSelect
            options={CONTRACT_TYPES}
            value={contractTypes}
            modalPopover={true}
            onValueChange={(values) =>
              setContractTypes(values.length ? values : null)
            }
            placeholder="Filter by contract type"
            className={cn(
              "w-[220px] bg-background pl-5",
              "border-dashed",
              contractTypes?.length && "border-primary"
            )}
            contentClassName="w-[220px]"
          />
          <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
