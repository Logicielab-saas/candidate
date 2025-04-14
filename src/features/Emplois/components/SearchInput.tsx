/**
 * SearchInput - Job search input component with autocomplete suggestions
 *
 * Provides real-time search suggestions as user types with debounced queries
 * Uses Command component for accessible autocomplete functionality
 */

"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { useSearchSuggestions } from "../hooks/use-emplois";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { useDebounce } from "use-debounce";
import LoaderOne from "@/components/ui/loader-one";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const [debouncedValue] = useDebounce(localValue, 1000);
  const [isDebouncing, setIsDebouncing] = useState(false);
  const commandRef = useRef<HTMLDivElement>(null);

  const { suggestions, isLoading } = useSearchSuggestions(debouncedValue);

  // Track debouncing state
  useEffect(() => {
    if (localValue !== debouncedValue) {
      setIsDebouncing(true);
    } else {
      setIsDebouncing(false);
    }
  }, [localValue, debouncedValue]);

  // Sync local value with prop value
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Sync debounced value with parent
  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  // Close suggestions on click outside
  useOnClickOutside<HTMLDivElement>(commandRef, () => setIsOpen(false));

  const handleInputChange = (newValue: string) => {
    setLocalValue(newValue);
    setIsOpen(true);
  };

  const isSearching = isLoading || isDebouncing;

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
      <div className="relative" ref={commandRef}>
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          id="search"
          placeholder="Search by job title, company name, or keywords..."
          className="pl-8"
          value={localValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => setIsOpen(true)}
        />

        {isOpen && localValue.length >= 2 && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1">
            <Command className="rounded-lg border shadow-md">
              <CommandList>
                {isSearching ? (
                  <CommandEmpty className="py-6 text-center">
                    <LoaderOne />
                    <p className="text-sm text-muted-foreground mt-2">
                      {isDebouncing ? "Typing..." : "Loading suggestions..."}
                    </p>
                  </CommandEmpty>
                ) : suggestions.length === 0 ? (
                  <CommandEmpty className="py-6">
                    No results found for &ldquo;{localValue}&rdquo;
                  </CommandEmpty>
                ) : (
                  <CommandGroup heading="Suggestions">
                    {suggestions.map((suggestion, index) => (
                      <CommandItem
                        key={`${suggestion.type}-${suggestion.title}-${index}`}
                        onSelect={() => {
                          handleInputChange(suggestion.title);
                          setIsOpen(false);
                        }}
                        className="cursor-pointer"
                      >
                        <Search className="mr-2 h-4 w-4" />
                        <span>{suggestion.title}</span>
                        {/* <span className="ml-2 text-xs text-muted-foreground">
                          {suggestion.type}
                        </span> */}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </CommandList>
            </Command>
          </div>
        )}
      </div>
    </div>
  );
}
