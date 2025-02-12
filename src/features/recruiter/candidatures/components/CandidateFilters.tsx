"use client";

import { MultiSelect } from "@/components/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const orderByOptions = [
  { value: "newest", label: "les plus récents en premier" },
  { value: "oldest", label: "les plus anciens en premier" },
  { value: "name-asc", label: "Nom (de A à Z)" },
  { value: "name-desc", label: "Nom (de Z à A)" },
] as const;

const locationOptions = [
  { value: "tanger", label: "Tanger" },
  { value: "meknes", label: "Meknes" },
  { value: "rabat", label: "Rabat" },
  { value: "casablanca", label: "Casablanca" },
  { value: "fes", label: "Fes" },
  { value: "marrakech", label: "Marrakech" },
  { value: "agadir", label: "Agadir" },
  { value: "oujda", label: "Oujda" },
  { value: "tétouan", label: "Tétouan" },
  { value: "taounate", label: "taounate" },
  { value: "ifrane", label: "ifrane" },
];

export function CandidateFilters() {
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  return (
    <div className="flex items-center justify-start w-full gap-4">
      <Select defaultValue="newest">
        <SelectTrigger className="w-[350px]">
          <div className="flex items-center gap-2">
            <span className="text-foreground font-medium">Trier par:</span>
            <SelectValue />
          </div>
        </SelectTrigger>
        <SelectContent>
          {orderByOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <MultiSelect
        options={locationOptions}
        placeholder="Villes"
        value={selectedLocations}
        onValueChange={setSelectedLocations}
        className="h-8 w-[120px]"
      />
    </div>
  );
}
