/**
 * SearchInput - Job search input component with debounced search
 *
 * Handles job title and keyword search with URL state management
 * Uses debounced input to optimize performance
 */

"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQueryState } from "nuqs";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

export function SearchInput() {
  // Local state for immediate input
  const [inputText, setInputText] = useState("");
  const [searchText, setSearchText] = useQueryState("q");

  // Debounce the search input
  const [debouncedSearchText] = useDebounce(inputText, 500);

  // Update URL params when debounced value changes
  useEffect(() => {
    if (debouncedSearchText !== searchText) {
      setSearchText(debouncedSearchText || null);
    }
  }, [debouncedSearchText, setSearchText, searchText]);

  return (
    <div className="w-full sm:w-[500px] space-y-1.5">
      <label
        htmlFor="search"
        className={cn(
          "text-sm font-medium",
          "leading-none",
          "peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        )}
      >
        Search Jobs
      </label>
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          id="search"
          placeholder="Search job titles or keywords..."
          className="pl-8"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>
    </div>
  );
}
