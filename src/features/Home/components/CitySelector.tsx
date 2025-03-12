/**
 * CitySelector - Searchable city selection component
 *
 * Provides a searchable dropdown for city selection
 * Exposes current city selection to parent component for search button handling
 */

"use client";

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
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQueryState } from "nuqs";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

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

// Define props interface to expose city value and setter
interface CitySelectorProps {
  value: string | null;
  onChange: (value: string | null) => void;
  label?: string;
}

export function CitySelector({
  value,
  onChange,
  label = "City",
}: CitySelectorProps) {
  // Local state
  const [citySearch, setCitySearch] = useState("");
  const [open, setOpen] = useState(false);
  const [urlCity] = useQueryState("city");

  // Sync with URL on initial load and navigation
  useEffect(() => {
    if (urlCity !== value) {
      onChange(urlCity);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlCity]);

  // Debounce the city search
  const [debouncedCitySearch] = useDebounce(citySearch, 300);

  // Filter cities based on debounced search
  const filteredCities = cities.filter((city) =>
    city.label.toLowerCase().includes(debouncedCitySearch.toLowerCase())
  );

  // Get the current city label
  const currentCity = cities.find((city) => city.value === value);

  return (
    <div className="w-full sm:w-[250px] space-y-1.5">
      <label
        htmlFor="city"
        className={cn(
          "text-sm font-medium",
          "leading-none",
          "peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        )}
      >
        {label}
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {currentCity?.label ?? "Toutes les villes..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px] p-0">
          <Command>
            <CommandInput
              placeholder="Rechercher une ville..."
              value={citySearch}
              onValueChange={setCitySearch}
            />
            <CommandList>
              <CommandEmpty>Aucune ville trouvée.</CommandEmpty>
              <CommandGroup>
                {filteredCities.map((city) => (
                  <CommandItem
                    key={city.value}
                    value={city.value}
                    onSelect={(currentValue) => {
                      onChange(currentValue === value ? null : currentValue);
                      setCitySearch("");
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === city.value ? "opacity-100" : "opacity-0"
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
  );
}
