"use client";

import { Check, ChevronsUpDown, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";
import { useState } from "react";
import { mockAnnonces } from "@/core/mockData/annonces-data";

interface CandidateFiltersAnnonceMenuProps {
  selectedAnnonceId: string | null;
  onAnnonceChange: (id: string | null) => void;
}

interface FilterOption {
  value: string;
  label: string;
}

const statusOptions: FilterOption[] = [
  { value: "active", label: "Ouverte" },
  { value: "pending", label: "Suspendueeeeeeeeee" },
  { value: "rejected", label: "Fermée" },
];

const locationOptions: FilterOption[] = [
  { value: "tanger", label: "Tanger" },
  { value: "meknes", label: "Meknes" },
  { value: "rabat", label: "Rabat" },
];

const dateOptions: FilterOption[] = [
  { value: "all", label: "Date" },
  { value: "today", label: "Aujourd'hui" },
  { value: "yesterday", label: "Hier" },
  { value: "last7", label: "7 jours" },
  { value: "last30", label: "30 jours" },
  { value: "last90", label: "90 jours" },
];

export function CandidateFiltersAnnonceMenu({
  selectedAnnonceId,
  onAnnonceChange,
}: CandidateFiltersAnnonceMenuProps) {
  const [open, setOpen] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState("all");

  const selectedAnnonce = mockAnnonces.find((a) => a.id === selectedAnnonceId);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between p-0 font-normal hover:bg-transparent hover:no-underline focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          {selectedAnnonce ? (
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium">
                {selectedAnnonce.label}
              </span>
              <span className="text-xs text-muted-foreground">
                {selectedAnnonce.city}
              </span>
            </div>
          ) : (
            "Sélectionner une annonce..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[520px] p-0" align="start">
        <Command>
          <CommandInput
            placeholder="Rechercher une annonce..."
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>Aucune annonce trouvée.</CommandEmpty>
            <div className="flex p-2 gap-2 items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-[120px]">
                  <MultiSelect
                    options={statusOptions}
                    placeholder="Statuts"
                    value={selectedStatuses}
                    onValueChange={setSelectedStatuses}
                    className="h-8"
                  />
                </div>
                <div className="w-[120px]">
                  <MultiSelect
                    options={locationOptions}
                    placeholder="Villes"
                    value={selectedLocations}
                    onValueChange={setSelectedLocations}
                    className="h-8"
                  />
                </div>
                {(selectedStatuses.length > 0 ||
                  selectedLocations.length > 0 ||
                  selectedDate !== "all") && (
                  <Button
                    variant="ghost"
                    className="h-8 px-2 text-xs"
                    onClick={() => {
                      setSelectedStatuses([]);
                      setSelectedLocations([]);
                      setSelectedDate("all");
                    }}
                  >
                    Réinitialiser
                  </Button>
                )}
              </div>
              <div className="w-[120px]">
                <Select value={selectedDate} onValueChange={setSelectedDate}>
                  <SelectTrigger className="w-full h-8">
                    <div className="flex items-center w-full">
                      <Calendar className="w-4 h-4 opacity-50 mr-2 flex-shrink-0" />
                      <div className="max-w-[50px] overflow-hidden">
                        <p className="truncate text-sm">
                          {selectedDate === "all"
                            ? "Date"
                            : dateOptions.find(
                                (date) => date.value === selectedDate
                              )?.label}
                        </p>
                      </div>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {dateOptions.map((date) => (
                      <SelectItem
                        key={date.value}
                        value={date.value}
                        className="truncate"
                      >
                        {date.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <CommandSeparator />
            <CommandGroup heading={`Annonces (${mockAnnonces.length})`}>
              {mockAnnonces.map((annonce) => (
                <CommandItem
                  key={annonce.value}
                  value={annonce.value}
                  onSelect={() => {
                    onAnnonceChange(
                      selectedAnnonceId === annonce.id ? null : annonce.id
                    );
                    setOpen(false);
                  }}
                  className="flex flex-col items-start py-3"
                >
                  <div className="flex w-full justify-between">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        {annonce.label}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {annonce.city}
                      </span>
                    </div>
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedAnnonceId === annonce.id
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
