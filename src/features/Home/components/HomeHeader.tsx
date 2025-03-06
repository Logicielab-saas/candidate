/**
 * HomeHeader - Job search header component with text and city search functionality
 *
 * A server component that renders the main search interface for the job dashboard.
 * Includes a search input for job titles/keywords and a searchable city selector.
 *
 * State Management:
 * - Uses nuqs for URL-based state management
 * - Maintains search text and selected city in URL parameters
 * - Uses debounced search to optimize performance
 */

"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SearchInput } from "./SearchInput";
import { CitySelector } from "./CitySelector";

export function HomeHeader() {
  return (
    <div className={cn("w-full", "space-y-4")}>
      <div className="text-center space-y-3 mb-6">
        <h1
          className={cn(
            "text-4xl md:text-5xl font-bold",
            "tracking-tight",
            "bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text",
            "animate-in fade-in duration-1000"
          )}
        >
          Discover Your Dream Career
        </h1>
        <p
          className={cn(
            "text-lg text-muted-foreground",
            "max-w-2xl mx-auto",
            "animate-in fade-in duration-1000 delay-200"
          )}
        >
          Explore thousands of job opportunities and find the perfect role that
          matches your skills and aspirations
        </p>
      </div>

      <div
        className={cn(
          "max-w-5xl mx-auto",
          "flex flex-col sm:flex-row",
          "gap-4",
          "items-end",
          "justify-center"
        )}
      >
        <SearchInput />
        <CitySelector />
        <Button type="submit" size="lg" className="sm:w-[120px]">
          Search
        </Button>
      </div>
    </div>
  );
}
