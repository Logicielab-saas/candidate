/**
 * CountryCodeSelect - A searchable combobox component for country codes with flags
 *
 * A reusable component that shows a searchable dropdown with country flags
 * and their respective dialing codes.
 */

"use client";

import * as React from "react";
import Image from "next/image";
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
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Country {
  code: string;
  dialCode: string;
  flag: string;
  name: string;
}

const COUNTRIES: Country[] = [
  {
    code: "MA",
    dialCode: "+212",
    flag: "/flags/ma.svg",
    name: "Maroc",
  },
  {
    code: "GB",
    dialCode: "+44",
    flag: "/flags/gb-eng.svg",
    name: "Royaume-Uni",
  },
];

interface CountryCodeSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function CountryCodeSelect({
  value,
  onValueChange,
}: CountryCodeSelectProps) {
  const [open, setOpen] = React.useState(false);
  const selectedCountry =
    COUNTRIES.find((c) => c.dialCode === value) || COUNTRIES[0];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[150px] justify-between rounded-r-none bg-muted px-3 font-normal"
        >
          <div className="flex items-center gap-2 truncate">
            <Image
              src={selectedCountry.flag}
              alt={`${selectedCountry.name} flag`}
              width={20}
              height={15}
              className="rounded-sm"
            />
            <span className="text-sm font-medium">
              {selectedCountry.dialCode}
            </span>
          </div>
          {open ? (
            <ChevronUp className="h-4 w-4 shrink-0 opacity-50" />
          ) : (
            <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Rechercher un pays..." />
          <CommandList>
            <CommandEmpty>Aucun pays trouvé.</CommandEmpty>
            <CommandGroup>
              {COUNTRIES.map((country) => (
                <CommandItem
                  key={country.code}
                  value={`${country.name} ${country.dialCode}`}
                  onSelect={() => {
                    onValueChange(country.dialCode);
                    setOpen(false);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={country.flag}
                      alt={`${country.name} flag`}
                      width={20}
                      height={15}
                      className="rounded-sm"
                    />
                    <span className="text-sm font-medium">
                      {country.dialCode}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {country.name}
                    </span>
                  </div>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedCountry.code === country.code
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
