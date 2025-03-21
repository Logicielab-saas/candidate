/**
 * SearchInput - Job search input component
 *
 * Handles job title, company name, and keyword search with controlled input
 * Exposes current input value to parent component for search button handling
 */

"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQueryState } from "nuqs";
import { useEffect } from "react";

// Define props interface to expose input value and setter
interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  const [searchText] = useQueryState("q");

  // Sync local input state with URL query parameter on initial load and navigation
  useEffect(() => {
    if (searchText && searchText !== value) {
      onChange(searchText);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  useEffect(() => {
    const handlePopState = () => {
      // Get the current URL search params
      const params = new URLSearchParams(window.location.search);
      const currentSearchText = params.get("q") || "";

      // Update the input text to match the URL
      onChange(currentSearchText);
    };

    // Add event listener for popstate (browser back/forward)
    window.addEventListener("popstate", handlePopState);

    // Clean up
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [onChange]);

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
          placeholder="Search by job title, company name, or keywords..."
          className="pl-8"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
