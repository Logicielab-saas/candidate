/**
 * SearchCourses - Course search component
 *
 * Provides a searchable interface for courses using a simple input field
 *
 * Props:
 * - onSearch: (search: string) => void - Callback when search value changes
 */

"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "use-debounce";
import { useEffect, useState } from "react";

interface SearchCoursesProps {
  onSearch: (search: string) => void;
}

export function SearchCourses({ onSearch }: SearchCoursesProps) {
  const [value, setValue] = useState("");
  const [debouncedValue] = useDebounce(value, 300);

  // Update search when debounced value changes
  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  return (
    <div className="relative">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search courses..."
          className="h-12 pl-4 pr-12"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Search className="absolute right-4 top-3 h-6 w-6 text-muted-foreground pointer-events-none" />
      </div>
    </div>
  );
}
