/**
 * SearchCourses - Course search component
 *
 * Provides a searchable interface for courses using a simple input field
 * Uses nuqs for URL-based search state management with debounce
 *
 * Props:
 * - value: string - Current search value from URL state
 * - onSearch: (search: string) => void - Callback to update URL search state
 */

"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "use-debounce";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import LoaderOne from "@/components/ui/loader-one";
interface SearchCoursesProps {
  value: string | null;
  onSearch: (search: string | null) => void;
}

export function SearchCourses({ value, onSearch }: SearchCoursesProps) {
  const [localValue, setLocalValue] = useState(value);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedValue] = useDebounce(localValue, 500);

  // Update search when debounced value changes
  useEffect(() => {
    if (debouncedValue !== value) {
      if (debouncedValue) {
        onSearch(debouncedValue);
      } else {
        onSearch(null);
      }
      setIsLoading(false);
    }
  }, [debouncedValue, onSearch, value]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
    setIsLoading(true);
  }, []);
  return (
    <div className="relative">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search courses..."
          className="h-12 pl-4 pr-12"
          value={localValue || undefined}
          onChange={handleChange}
        />
        <div className="absolute right-4 top-3 flex h-6 w-6 items-center justify-center">
          {isLoading ? (
            <LoaderOne />
          ) : (
            <Search
              className={cn(
                "h-6 w-6 text-muted-foreground transition-opacity ",
                localValue ? "opacity-100" : "opacity-70"
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
}
