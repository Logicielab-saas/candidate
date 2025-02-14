"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import {
  MOCK_ENTRETIENS,
  FILTER_OPTIONS,
  STATUS_CONFIG,
  type Entretien,
  type FilterType,
  type SubFilterType,
  type FilterOption,
} from "@/core/mockData/entretiens-data";

interface EntretiensListProps {
  className?: string;
  onEntretienSelect?: (entretien: Entretien) => void;
  selectedEntretienId?: string;
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  activeSubFilter: SubFilterType | null;
  onSubFilterChange: (subFilter: SubFilterType | null) => void;
}

export function EntretiensList({
  className,
  onEntretienSelect,
  selectedEntretienId,
  activeFilter,
  onFilterChange,
  activeSubFilter,
  onSubFilterChange,
}: EntretiensListProps) {
  const filteredEntretiens = useMemo(() => {
    const baseFiltered = MOCK_ENTRETIENS.filter(
      (entretien) => entretien.status === activeFilter
    );

    if (
      activeSubFilter &&
      (activeFilter === "pending" || activeFilter === "past")
    ) {
      return baseFiltered.filter(
        (entretien) => entretien.subStatus === activeSubFilter
      );
    }

    return baseFiltered;
  }, [activeFilter, activeSubFilter]);

  // Calculate counts for each filter
  const filterCounts = useMemo(
    () =>
      MOCK_ENTRETIENS.reduce(
        (acc, entretien) => {
          acc[entretien.status]++;
          return acc;
        },
        { upcoming: 0, pending: 0, past: 0 } as Record<FilterType, number>
      ),
    []
  );

  // Calculate counts for sub-filters
  const subFilterCounts = useMemo(() => {
    return MOCK_ENTRETIENS.reduce(
      (acc, entretien) => {
        if (entretien.subStatus) {
          acc[entretien.subStatus]++;
        }
        return acc;
      },
      { unique: 0, plusieurs: 0, termine: 0, expire: 0 } as Record<
        SubFilterType,
        number
      >
    );
  }, []);

  // Get current filter option
  const currentFilter = FILTER_OPTIONS.find(
    (f) => f.id === activeFilter
  ) as FilterOption;

  // Helper function to get badge configuration
  const getBadgeConfig = (entretien: Entretien) => {
    if (entretien.status === "past" && entretien.subStatus) {
      if (
        entretien.subStatus === "termine" ||
        entretien.subStatus === "expire"
      ) {
        return STATUS_CONFIG.past.subStatus[entretien.subStatus];
      }
    }
    if (entretien.status === "pending") {
      if (
        entretien.subStatus === "unique" ||
        entretien.subStatus === "plusieurs"
      ) {
        return STATUS_CONFIG.pending.subStatus[entretien.subStatus];
      }
      return STATUS_CONFIG.pending.badge;
    }
    return STATUS_CONFIG.upcoming.badge;
  };

  return (
    <Card className={cn("flex h-fit flex-col", className)}>
      {/* Filters */}
      <div className="w-full border-b">
        <Tabs
          value={activeFilter}
          onValueChange={(v) => {
            onFilterChange(v as FilterType);
          }}
          className="w-full"
        >
          <TabsList className="flex h-12 w-full justify-start bg-transparent px-4">
            {FILTER_OPTIONS.map((filter) => (
              <TabsTrigger
                key={filter.id}
                value={filter.id}
                className="relative h-full rounded-none border-b-2 border-transparent px-4 font-medium text-secondaryHex-600 dark:text-secondaryHex-400 outline-none ring-offset-background transition-colors hover:text-primaryHex-600 dark:hover:text-primaryHex-400 data-[state=active]:border-primaryHex-500 data-[state=active]:text-primaryHex-500 dark:data-[state=active]:border-primaryHex-400 dark:data-[state=active]:text-primaryHex-400"
              >
                <span className="whitespace-nowrap">{filter.label}</span>
                <span
                  className={cn(
                    "ml-2 rounded-full px-2 py-0.5 text-xs",
                    filter.id === activeFilter
                      ? "bg-white text-primaryHex-600 dark:bg-primaryHex-900/20"
                      : "bg-secondaryHex-100 text-secondaryHex-600 dark:bg-secondaryHex-800 dark:text-secondaryHex-400"
                  )}
                >
                  {filterCounts[filter.id]}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Sub-filters */}
      {(activeFilter === "pending" || activeFilter === "past") &&
        "subFilters" in currentFilter && (
          <div className="flex justify-center border-b bg-secondaryHex-50/50 px-4 py-2 dark:bg-secondaryHex-900/10">
            <ToggleGroup
              type="single"
              value={activeSubFilter || ""}
              onValueChange={(value) =>
                onSubFilterChange((value as SubFilterType) || null)
              }
            >
              {currentFilter.subFilters.map((subFilter) => (
                <ToggleGroupItem
                  key={subFilter.id}
                  value={subFilter.id}
                  className={cn(
                    "flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium transition-colors",
                    "data-[state=on]:border-primaryHex-200 data-[state=on]:bg-primaryHex-100 data-[state=on]:text-primaryHex-900",
                    "dark:data-[state=on]:border-primaryHex-800 dark:data-[state=on]:bg-primaryHex-900/20 dark:data-[state=on]:text-primaryHex-400",
                    "hover:bg-secondaryHex-100 dark:hover:bg-secondaryHex-800/50"
                  )}
                  aria-label={subFilter.label}
                >
                  {subFilter.label}
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs",
                      activeSubFilter === subFilter.id
                        ? "bg-white text-primaryHex-600 dark:bg-primaryHex-900/40"
                        : "bg-secondaryHex-100 text-secondaryHex-600 dark:bg-secondaryHex-700"
                    )}
                  >
                    {subFilterCounts[subFilter.id]}
                  </span>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        )}

      {/* Interviews List */}
      <ScrollArea className="h-[500px]">
        <div className="divide-y">
          {filteredEntretiens.map((entretien) => {
            const badgeConfig = getBadgeConfig(entretien);
            return (
              <div
                key={entretien.id}
                className={cn(
                  "flex cursor-pointer flex-col gap-2 p-4 transition-colors",
                  selectedEntretienId === entretien.id
                    ? "bg-primaryHex-50 dark:bg-primaryHex-900/20"
                    : "hover:bg-secondaryHex-50 dark:hover:bg-secondaryHex-900/50"
                )}
                onClick={() => onEntretienSelect?.(entretien)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onEntretienSelect?.(entretien);
                  }
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {entretien.candidatName}
                    </span>
                  </div>
                  <Badge variant={badgeConfig.variant}>
                    {badgeConfig.label}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <span>{entretien.type}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-secondaryHex-600 dark:text-secondaryHex-400">
                  <span className="font-medium">
                    {format(entretien.date, "EEEE d MMMM", { locale: fr })}
                  </span>
                  <span>•</span>
                  <span>
                    {entretien.startTime} - {entretien.endTime}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <span>{entretien.poste}</span>
                  <span className="text-secondaryHex-400">•</span>
                  <span className="text-secondaryHex-600 dark:text-secondaryHex-400">
                    {entretien.city}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </Card>
  );
}
