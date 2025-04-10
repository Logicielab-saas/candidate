/**
 * KeywordFilter - Component for filtering jobs by keywords
 *
 * Features:
 * - Multi-select dropdown for job keywords
 * - Debounced URL updates
 * - Local state for smooth interaction
 * - Memoized to prevent unnecessary re-renders
 */

"use client";

import { MultiSelect } from "@/components/ui/multi-select";
import { useQueryState } from "nuqs";
import { memo, useState, useEffect, useCallback } from "react";
import { Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDebounce } from "use-debounce";

// Available keywords data
export const KEYWORDS = [
  { value: "javascript", label: "JavaScript" },
  { value: "react", label: "React" },
  { value: "node.js", label: "Node.js" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cdi", label: "CDI" },
  { value: "cdd", label: "CDD" },
  { value: "stage", label: "Stage" },
  { value: "alternance", label: "Alternance" },
  { value: "freelance", label: "Freelance" },
].map((keyword) => ({
  label: keyword.label,
  value: keyword.value.toLowerCase(),
}));

function KeywordFilterComponent() {
  // URL state management
  const [urlKeywords, setUrlKeywords] = useQueryState("keyword", {
    parse: (value) => value.split(","),
    serialize: (value) => value.join(","),
  });

  // Local state for selected keywords
  const [localKeywords, setLocalKeywords] = useState<string[]>(
    urlKeywords || []
  );

  // Debounced keywords
  const [debouncedKeywords] = useDebounce(localKeywords, 1000);

  // Update URL when debounced value changes
  useEffect(() => {
    const currentUrlValue = urlKeywords || [];
    if (JSON.stringify(debouncedKeywords) !== JSON.stringify(currentUrlValue)) {
      setUrlKeywords(debouncedKeywords.length ? debouncedKeywords : null);
    }
  }, [debouncedKeywords, setUrlKeywords, urlKeywords]);

  // Sync local state with URL params on mount and URL changes
  useEffect(() => {
    const urlValues = urlKeywords || [];
    if (JSON.stringify(urlValues) !== JSON.stringify(localKeywords)) {
      setLocalKeywords(urlValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlKeywords]);

  // Handle value changes
  const handleValueChange = useCallback((values: string[]) => {
    setLocalKeywords(values);
  }, []);

  return (
    <div className="relative">
      <MultiSelect
        options={KEYWORDS}
        value={localKeywords}
        onValueChange={handleValueChange}
        placeholder="Filter by keywords"
        modalPopover={true}
        className={cn(
          "w-[220px] bg-background pl-8",
          "border-dashed",
          localKeywords.length > 0 && "border-primary"
        )}
        contentClassName="w-[220px]"
      />
      <Tag className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
    </div>
  );
}

export const KeywordFilter = memo(KeywordFilterComponent);
