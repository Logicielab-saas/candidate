/**
 * KeywordFilter - Component for filtering jobs by keywords
 *
 * Features:
 * - Multi-select dropdown for job keywords
 * - URL state management with nuqs
 * - Synchronization with URL parameters
 */

"use client";

import { MultiSelect } from "@/components/ui/multi-select";
import { useQueryState } from "nuqs";
import { useState, useEffect } from "react";
import { Tag } from "lucide-react";
import { cn } from "@/lib/utils";

// Available keywords data
const KEYWORDS = [
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

export function KeywordFilter() {
  // URL state management
  const [urlKeywords, setUrlKeywords] = useQueryState("keyword", {
    parse: (value) => value.split(","),
    serialize: (value) => value.join(","),
    defaultValue: [],
  });

  // Local state for selected keywords
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>(
    urlKeywords || []
  );

  // Sync with URL on initial load and navigation
  useEffect(() => {
    if (urlKeywords?.join(",") !== selectedKeywords.join(",")) {
      setSelectedKeywords(urlKeywords || []);
    }
  }, [selectedKeywords, urlKeywords]);

  // Update URL when selection changes
  const handleValueChange = (values: string[]) => {
    setSelectedKeywords(values);
    setUrlKeywords(values.length ? values : null);
  };

  return (
    <div className="relative">
      <MultiSelect
        options={KEYWORDS}
        value={selectedKeywords}
        onValueChange={handleValueChange}
        placeholder="Filter by keywords"
        modalPopover={true}
        className={cn(
          "w-[220px] bg-background pl-8",
          "border-dashed",
          selectedKeywords.length > 0 && "border-primary"
        )}
        contentClassName="w-[220px]"
      />
      <Tag className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
    </div>
  );
}
