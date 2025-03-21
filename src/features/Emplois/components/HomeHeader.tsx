/**
 * HomeHeader - Job search input controls component
 *
 * A client component that renders the search interface for the job dashboard.
 * Includes a search input for job titles/keywords and a searchable city selector.
 * Search is only triggered when the search button is clicked.
 *
 * State Management:
 * - Uses nuqs for URL-based state management
 * - Maintains search text and selected city in URL parameters
 * - Only updates URL parameters when search button is clicked
 * - Clears any selected job (jobId) when a new search is performed
 */

"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SearchInput } from "./SearchInput";
import { CitySelector } from "./CitySelector";
import { useState } from "react";
import { useQueryState } from "nuqs";

export function HomeHeader() {
  // Local state for form inputs
  const [inputText, setInputText] = useState("");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  // URL state setters
  const [, setSearchText] = useQueryState("q", {
    history: "push",
  });
  const [, setUrlCity] = useQueryState("city", {
    history: "push",
  });
  const [, setJobId] = useQueryState("job");

  // Handle search button click
  const handleSearch = () => {
    // Update URL parameters
    setSearchText(inputText || null);
    setUrlCity(selectedCity);

    // Clear any selected job when performing a new search
    setJobId(null);
  };

  return (
    <div
      className={cn(
        "max-w-5xl mx-auto",
        "flex flex-col sm:flex-row",
        "gap-4",
        "items-end",
        "justify-center"
      )}
    >
      <SearchInput value={inputText} onChange={setInputText} />
      <CitySelector value={selectedCity} onChange={setSelectedCity} />
      <Button
        type="button"
        size="lg"
        className="sm:w-[120px]"
        onClick={handleSearch}
      >
        Search
      </Button>
    </div>
  );
}
