/**
 * JobTypesFilter - Combined filter for contract types and employment types
 *
 * Features:
 * - Fetches both contract types and employment types from API
 * - Combines them into a single multi-select filter
 * - Debounced URL updates
 * - Local state for smooth interaction
 * - Memoized to prevent unnecessary re-renders
 */

import { MultiSelect } from "@/components/ui/multi-select";
import { cn } from "@/lib/utils";
import { Briefcase } from "lucide-react";
import { memo, useState, useEffect, useCallback, useMemo } from "react";
import { useDebounce } from "use-debounce";
import { useQueryState } from "nuqs";
import { useEmploiContracts } from "@/hooks/use-emploi-contracts";
import { useEmploiTypes } from "@/hooks/use-emploi-types";

function JobTypesFilterComponent() {
  // Fetch both contract types and employment types from API
  const { data: contractTypesData, isLoading: isLoadingContracts } =
    useEmploiContracts();
  const { data: employmentTypesData, isLoading: isLoadingTypes } =
    useEmploiTypes();

  // URL state
  const [selectedTypes, setSelectedTypes] = useQueryState("types", {
    parse: (value) => value.split(","),
    serialize: (value) => value.join(","),
  });

  // Local state
  const [localSelectedTypes, setLocalSelectedTypes] = useState<string[]>(
    selectedTypes || []
  );

  // Debounced types
  const [debouncedSelectedTypes] = useDebounce(localSelectedTypes, 1000);

  // Combine and memoize options
  const combinedOptions = useMemo(() => {
    const contractOptions =
      contractTypesData?.map((type) => ({
        label: type.name,
        value: `contract-${type.uuid}`,
        group: "Contract Types",
      })) || [];

    const employmentOptions =
      employmentTypesData?.map((type) => ({
        label: type.title,
        value: `employment-${type.uuid}`,
        group: "Employment Types",
      })) || [];

    return [...contractOptions, ...employmentOptions];
  }, [contractTypesData, employmentTypesData]);

  // Update URL when debounced value changes
  useEffect(() => {
    const currentUrlValue = selectedTypes || [];
    if (
      JSON.stringify(debouncedSelectedTypes) !== JSON.stringify(currentUrlValue)
    ) {
      setSelectedTypes(
        debouncedSelectedTypes.length ? debouncedSelectedTypes : null
      );
    }
  }, [debouncedSelectedTypes, setSelectedTypes, selectedTypes]);

  // Sync local state with URL params on mount and URL changes
  useEffect(() => {
    const urlTypes = selectedTypes || [];
    if (JSON.stringify(urlTypes) !== JSON.stringify(localSelectedTypes)) {
      setLocalSelectedTypes(urlTypes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTypes]);

  // Handle value changes
  const handleValueChange = useCallback((values: string[]) => {
    setLocalSelectedTypes(values);
  }, []);

  const isLoading = isLoadingContracts || isLoadingTypes;

  return (
    <div className="relative">
      <MultiSelect
        options={combinedOptions}
        value={localSelectedTypes}
        modalPopover={true}
        onValueChange={handleValueChange}
        placeholder="Filter by job type"
        className={cn(
          "w-[220px] bg-background pl-8",
          "border-dashed",
          localSelectedTypes.length > 0 && "border-primary"
        )}
        contentClassName="w-[220px]"
        isLoading={isLoading}
      />
      <Briefcase className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
    </div>
  );
}

export const JobTypesFilter = memo(JobTypesFilterComponent);
