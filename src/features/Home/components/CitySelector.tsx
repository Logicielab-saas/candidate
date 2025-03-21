/**
 * CitySelector - Searchable city selection component
 *
 * Provides a searchable dropdown for city selection with data from the API
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
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQueryState } from "nuqs";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { useCities } from "@/hooks/use-cities";

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

  // Fetch cities using the hook
  const { data: cities, isLoading } = useCities();

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
  const filteredCities =
    cities?.filter((city) =>
      city.name.toLowerCase().includes(debouncedCitySearch.toLowerCase())
    ) || [];

  // Get the current city
  const currentCity = cities?.find((city) => city.uuid === value);

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
            {currentCity?.name ?? "Toutes les villes..."}
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
              {isLoading ? (
                <div className="flex items-center justify-center py-6">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              ) : filteredCities.length === 0 ? (
                <CommandEmpty>Aucune ville trouvée.</CommandEmpty>
              ) : (
                <CommandGroup>
                  {filteredCities.map((city) => (
                    <CommandItem
                      key={city.uuid}
                      value={city.uuid}
                      onSelect={(currentValue) => {
                        onChange(currentValue === value ? null : currentValue);
                        setCitySearch("");
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === city.uuid ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {city.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
