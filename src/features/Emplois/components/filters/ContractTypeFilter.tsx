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
import { useTranslations } from "next-intl";
import { useStaticDataStore } from "@/store/use-static-data-store";

function JobTypesFilterComponent() {
  const tCommon = useTranslations("common");

  // Fetch both contract types and employment types from API

  const { emploi_contracts, emploi_types } = useStaticDataStore();

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
      emploi_contracts?.map((type) => ({
        label: type.name,
        value: `contract-${type.uuid}`,
        group: tCommon("filters.types.contractTypes"),
      })) || [];

    const employmentOptions =
      emploi_types?.map((type) => ({
        label: type.title,
        value: `employment-${type.uuid}`,
        group: tCommon("filters.types.employmentTypes"),
      })) || [];

    return [...contractOptions, ...employmentOptions];
  }, [emploi_contracts, emploi_types, tCommon]);

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

  return (
    <div className="relative">
      <MultiSelect
        options={combinedOptions}
        value={localSelectedTypes}
        modalPopover={true}
        onValueChange={handleValueChange}
        placeholder={tCommon("filters.jobType.placeholder")}
        className={cn(
          "w-[220px] bg-background pl-8",
          "border-dashed",
          localSelectedTypes.length > 0 && "border-primary"
        )}
        contentClassName="w-[220px]"
      />
      <Briefcase className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
    </div>
  );
}

export const JobTypesFilter = memo(JobTypesFilterComponent);
