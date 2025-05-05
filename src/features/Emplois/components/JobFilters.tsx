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
import { useTranslations } from "next-intl";

// Filter options
const DATE_FILTERS = [
  { value: "24h", label: "last24h" },
  { value: "week", label: "lastWeek" },
  { value: "month", label: "lastMonth" },
  { value: "all", label: "allTime" },
] as const;

export function JobFilters() {
  const [dateFilter, setDateFilter] = useQueryState("date");
  const t = useTranslations("emplois.jobsContainer.filters");
  const tCommon = useTranslations("common");

  return (
    <div className="space-y-4">
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
              <SelectValue placeholder={tCommon("filters.filterByDate")} />
            </div>
          </SelectTrigger>
          <SelectContent>
            {DATE_FILTERS.map((filter) => (
              <SelectItem key={filter.value} value={filter.value}>
                {t(`date.${filter.label}`)}
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
