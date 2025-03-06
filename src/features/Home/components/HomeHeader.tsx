/**
 * HomeHeader - Job search header component with text and city search functionality
 *
 * A server component that renders the main search interface for the job dashboard.
 * Includes a search input for job titles/keywords and a searchable city selector.
 *
 * State Management:
 * - Uses nuqs for URL-based state management
 * - Maintains search text and selected city in URL parameters
 */

"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQueryState } from "nuqs";
import { useCallback, useState } from "react";
import { Separator } from "@/components/ui/separator";

// Available cities data
const cities = [
  { value: "paris", label: "Paris" },
  { value: "london", label: "London" },
  { value: "berlin", label: "Berlin" },
  { value: "madrid", label: "Madrid" },
  { value: "rome", label: "Rome" },
  { value: "amsterdam", label: "Amsterdam" },
  { value: "barcelona", label: "Barcelona" },
  { value: "munich", label: "Munich" },
  { value: "vienna", label: "Vienna" },
  { value: "prague", label: "Prague" },
] as const;

export function HomeHeader() {
  // URL state management
  const [searchText, setSearchText] = useQueryState("q");
  const [selectedCity, setSelectedCity] = useQueryState("city");
  const [open, setOpen] = useState(false);

  // Handle search text changes
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value || null);
    },
    [setSearchText]
  );

  // Get the current city label
  const currentCity = cities.find((city) => city.value === selectedCity);

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
              value={searchText || ""}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="w-full sm:w-[250px] space-y-1.5">
          <label
            htmlFor="city"
            className={cn(
              "text-sm font-medium",
              "leading-none",
              "peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            )}
          >
            City
          </label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                {currentCity?.label ?? "Select city..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] p-0">
              <Command>
                <CommandInput placeholder="Search city..." />
                <CommandList>
                  <CommandEmpty>No city found.</CommandEmpty>
                  <CommandGroup>
                    {cities.map((city) => (
                      <CommandItem
                        key={city.value}
                        value={city.value}
                        onSelect={(currentValue) => {
                          setSelectedCity(
                            currentValue === selectedCity ? null : currentValue
                          );
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedCity === city.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {city.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <Button type="submit" size="lg" className="sm:w-[120px]">
          Search
        </Button>
      </div>
      <Separator className="my-8" />
    </div>
  );
}
