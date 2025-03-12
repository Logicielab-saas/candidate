/**
 * IndustrySelector - Searchable industry selection component
 *
 * Provides a searchable dropdown for industry selection
 * Based on the CitySelector pattern for consistency
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
import { useState } from "react";
import { useDebounce } from "use-debounce";

// Available industries data
const industries = [
  { value: "tech", label: "Technologie" },
  { value: "finance", label: "Finance" },
  { value: "healthcare", label: "Santé" },
  { value: "education", label: "Éducation" },
  { value: "retail", label: "Commerce" },
  { value: "manufacturing", label: "Industrie" },
  { value: "consulting", label: "Conseil" },
  { value: "media", label: "Médias & Communication" },
  { value: "transport", label: "Transport & Logistique" },
  { value: "energy", label: "Énergie" },
] as const;

interface IndustrySelectorProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

export function IndustrySelector({ value, onChange }: IndustrySelectorProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Debounce the search
  const [debouncedSearch] = useDebounce(search, 300);

  // Filter industries based on debounced search
  const filteredIndustries = industries.filter((industry) =>
    industry.label.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  // Get the current industry label
  const currentIndustry = industries.find(
    (industry) => industry.value === value
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {currentIndustry?.label ?? "Tous les secteurs..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[330px] p-0">
        <Command>
          <CommandInput
            placeholder="Rechercher un secteur..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>Aucun secteur trouvé.</CommandEmpty>
            <CommandGroup>
              {filteredIndustries.map((industry) => (
                <CommandItem
                  key={industry.value}
                  value={industry.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? null : currentValue);
                    setSearch("");
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === industry.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {industry.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
