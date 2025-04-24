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
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQueryState } from "nuqs";
import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

import LoaderOne from "@/components/ui/loader-one";
import { useTranslations } from "next-intl";
import { useSearchSuggestions } from "../hooks/use-emplois";

// Define props interface to expose city value and setter
interface CitySelectorProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

export function CitySelector({ value, onChange }: CitySelectorProps) {
  const t = useTranslations("common.selectorsSearch.citySelector");
  // Local state
  const [citySearch, setCitySearch] = useState("");
  const [open, setOpen] = useState(false);
  const [urlCity] = useQueryState("city");

  // Debounce the city search
  const [debouncedCitySearch] = useDebounce(citySearch, 300);
  // Fetch cities using the hook
  const { suggestions: cities, isLoading } = useSearchSuggestions({
    city: debouncedCitySearch,
  });

  // Sync with URL on initial load and navigation
  useEffect(() => {
    if (urlCity !== value) {
      onChange(urlCity);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlCity]);

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
        {t("label")}
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value ?? t("allCities")}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px] p-0">
          <Command>
            <CommandInput
              placeholder={t("searchPlaceholder")}
              value={citySearch}
              onValueChange={setCitySearch}
            />
            <CommandList>
              {isLoading ? (
                <div className="flex items-center justify-center py-6">
                  <LoaderOne />
                </div>
              ) : !debouncedCitySearch ? (
                <CommandEmpty>{t("searchPlaceholder")}</CommandEmpty>
              ) : cities?.length === 0 ? (
                <CommandEmpty>{t("noCitiesFound")}</CommandEmpty>
              ) : (
                <CommandGroup>
                  {cities?.map((city, index) => (
                    <CommandItem
                      key={index + city.title}
                      value={city.title}
                      onSelect={(currentValue) => {
                        onChange(currentValue === value ? null : currentValue);
                        setCitySearch("");
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === city.title ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {city.title}
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
