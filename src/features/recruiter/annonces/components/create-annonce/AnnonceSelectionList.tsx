"use client";

import { useState } from "react";
import { Search, Check, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { mockAnnonceData } from "@/core/mockData/annonces-real-data";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface AnnonceSelectionListProps {
  selectedAnnonceId: string | null;
  onAnnonceChange: (id: string | null) => void;
}

const statusOptions = [
  { value: "Ouverte", label: "Ouverte" },
  { value: "Suspendue", label: "Suspendue" },
  { value: "Fermée", label: "Fermée" },
];

const locationOptions = [
  { value: "tanger", label: "Tanger" },
  { value: "meknes", label: "Meknes" },
  { value: "rabat", label: "Rabat" },
];

const dateOptions = [
  { value: "all", label: "Date" },
  { value: "today", label: "Aujourd'hui" },
  { value: "yesterday", label: "Hier" },
  { value: "last7", label: "7 jours" },
  { value: "last30", label: "30 jours" },
  { value: "last90", label: "90 jours" },
];

export function AnnonceSelectionList({
  selectedAnnonceId,
  onAnnonceChange,
}: AnnonceSelectionListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState("all");

  // Filter annonces based on all filters
  const filteredAnnonces = mockAnnonceData.filter((annonce) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      annonce.intitule.toLowerCase().includes(searchLower) ||
      annonce.city.toLowerCase().includes(searchLower);

    const matchesStatus =
      selectedStatuses.length === 0 ||
      selectedStatuses.includes(annonce.statutDeLAnnonce);

    const matchesLocation =
      selectedLocations.length === 0 ||
      selectedLocations.includes(annonce.city.toLowerCase());

    // TODO: Implement date filtering based on selectedDate
    const matchesDate = true; // For now, we'll skip date filtering

    return matchesSearch && matchesStatus && matchesLocation && matchesDate;
  });

  // const getStatusVariant = (status: string) => {
  //   switch (status) {
  //     case "Ouverte":
  //       return "default";
  //     case "Suspendue":
  //       return "secondary";
  //     default:
  //       return "outline";
  //   }
  // };

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher une annonce..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 justify-between">
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
              <SelectTrigger className="h-8">
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
      </div>

      {/* Annonces List */}
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-2">
          {filteredAnnonces.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-4">
              Aucune annonce trouvée.
            </p>
          ) : (
            filteredAnnonces.map((annonce) => (
              <button
                key={annonce.id}
                onClick={() => onAnnonceChange(annonce.id)}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-lg border transition-all",
                  "hover:border-primaryHex-500 hover:shadow-sm",
                  selectedAnnonceId === annonce.id
                    ? "border-primaryHex-500 bg-primaryHex-50/50 dark:bg-primaryHex-900/20"
                    : "border-border bg-background"
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{annonce.intitule}</span>
                      {/* <Badge
                        variant={getStatusVariant(annonce.statutDeLAnnonce)}
                      >
                        {annonce.statutDeLAnnonce}
                      </Badge> */}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{annonce.city}</span>
                      <span>•</span>
                      <span>{annonce.dateDePublication}</span>
                      <span>•</span>
                      <span>
                        {annonce.candidatures.tous} candidature
                        {annonce.candidatures.tous > 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                  <Check
                    className={cn(
                      "h-5 w-5 flex-shrink-0 text-primaryHex-500",
                      selectedAnnonceId === annonce.id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </div>
              </button>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
