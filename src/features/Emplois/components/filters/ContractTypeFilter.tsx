/**
 * ContractTypeFilter - Contract type selection with multi-select
 *
 * Features:
 * - Debounced URL updates
 * - Local state for smooth interaction
 * - Memoized to prevent unnecessary re-renders
 */

import { MultiSelect } from "@/components/ui/multi-select";
import { cn } from "@/lib/utils";
import { Briefcase } from "lucide-react";
import { memo, useState, useEffect, useCallback } from "react";
import { useDebounce } from "use-debounce";
import { useQueryState } from "nuqs";

// Contract type options
export const CONTRACT_TYPES = [
  { value: "cdi", label: "CDI" },
  { value: "cdd", label: "CDD" },
  { value: "stage", label: "Stage" },
  { value: "alternance", label: "Alternance" },
  { value: "freelance", label: "Freelance" },
].map((type) => ({
  label: type.label,
  value: type.value.toLowerCase(),
}));

function ContractTypeFilterComponent() {
  // URL state
  const [contractTypes, setContractTypes] = useQueryState("contracts", {
    parse: (value) => value.split(","),
    serialize: (value) => value.join(","),
  });

  // Local state
  const [localContractTypes, setLocalContractTypes] = useState<string[]>(
    contractTypes || []
  );

  // Debounced contract types
  const [debouncedContractTypes] = useDebounce(localContractTypes, 1000);

  // Update URL when debounced value changes
  useEffect(() => {
    const currentUrlValue = contractTypes || [];
    if (
      JSON.stringify(debouncedContractTypes) !== JSON.stringify(currentUrlValue)
    ) {
      setContractTypes(
        debouncedContractTypes.length ? debouncedContractTypes : null
      );
    }
  }, [debouncedContractTypes, setContractTypes, contractTypes]);

  // Sync local state with URL params on mount and URL changes
  useEffect(() => {
    const urlTypes = contractTypes || [];
    if (JSON.stringify(urlTypes) !== JSON.stringify(localContractTypes)) {
      setLocalContractTypes(urlTypes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contractTypes]);

  // Handle value changes
  const handleValueChange = useCallback((values: string[]) => {
    setLocalContractTypes(values);
  }, []);

  return (
    <div className="relative">
      <MultiSelect
        options={CONTRACT_TYPES}
        value={localContractTypes}
        modalPopover={true}
        onValueChange={handleValueChange}
        placeholder="Filter by contract type"
        className={cn(
          "w-[220px] bg-background pl-8",
          "border-dashed",
          localContractTypes.length > 0 && "border-primary"
        )}
        contentClassName="w-[220px]"
      />
      <Briefcase className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
    </div>
  );
}

export const ContractTypeFilter = memo(ContractTypeFilterComponent);
