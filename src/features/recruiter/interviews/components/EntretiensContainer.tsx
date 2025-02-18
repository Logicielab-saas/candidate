"use client";

import { useState, useEffect } from "react";
import { EntretienTabs } from "./EntretienTabs";
import { DisponibilitesSettings } from "./DisponibilitesSettings";
import { EntretiensList } from "./EntretiensList";
import { EntretienDetails } from "./EntretienDetails";
import {
  type Entretien,
  type FilterType,
  type SubFilterType,
} from "@/core/mockData/entretiens-data";
import { MOCK_ENTRETIENS } from "@/core/mockData/entretiens-data";
import { useQueryState, parseAsString } from "nuqs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function EntretiensContainer() {
  // URL state management with nuqs
  const [currentEntretienId, setCurrentEntretienId] = useQueryState(
    "entretien",
    parseAsString
  );
  const [currentTab, setCurrentTab] = useQueryState<
    "Entretiens" | "Disponibilites"
  >("tab", {
    defaultValue: "Entretiens",
    parse: (value: string | null) =>
      value === "Disponibilites" ? "Disponibilites" : "Entretiens",
    serialize: (value: "Entretiens" | "Disponibilites") => value,
  });
  const [currentFilter, setCurrentFilter] = useQueryState<FilterType>(
    "filter",
    {
      defaultValue: "upcoming",
      parse: (value: string | null) => (value as FilterType) || "upcoming",
      serialize: (value: FilterType) => value,
    }
  );
  const [currentSubFilter, setCurrentSubFilter] =
    useQueryState<SubFilterType | null>("subFilter", {
      defaultValue: null,
      parse: (value: string | null) => value as SubFilterType | null,
      serialize: (value: SubFilterType | null) => value || "",
    });

  // States
  const [selectedEntretien, setSelectedEntretien] = useState<Entretien | null>(
    null
  );
  const [isMobileView, setIsMobileView] = useState(false);

  // Effect to handle initial load and URL updates
  useEffect(() => {
    if (currentTab !== "Entretiens") return;

    // If there's an ID in the URL, find that interview
    if (currentEntretienId) {
      const entretien = MOCK_ENTRETIENS.find(
        (e) => e.id === currentEntretienId
      );
      if (entretien) {
        setSelectedEntretien(entretien);
        return;
      }
    }

    // If no ID in URL or ID not found, select first interview
    if (MOCK_ENTRETIENS.length > 0) {
      const firstEntretien = MOCK_ENTRETIENS[0];
      setSelectedEntretien(firstEntretien);
      setCurrentEntretienId(firstEntretien.id);
    }
  }, [currentEntretienId, currentTab, setCurrentEntretienId]);

  // Handlers for state changes
  const handleTabChange = (tab: "Entretiens" | "Disponibilites") => {
    setCurrentTab(tab);
    // Reset all states
    setSelectedEntretien(null);
    setCurrentFilter("upcoming");
    setCurrentSubFilter(null);
    setCurrentEntretienId(null);
    setIsMobileView(false);
  };

  const handleEntretienSelect = (entretien: Entretien) => {
    setSelectedEntretien(entretien);
    setCurrentEntretienId(entretien.id);
    setIsMobileView(true);
  };

  const handleBackToList = () => {
    setIsMobileView(false);
  };

  const handleFilterChange = (filter: FilterType) => {
    setCurrentFilter(filter);
    setCurrentSubFilter(null);
  };

  const handleSubFilterChange = (subFilter: SubFilterType | null) => {
    setCurrentSubFilter(subFilter);
  };

  return (
    <div className="space-y-6">
      <EntretienTabs
        activeTab={currentTab}
        onTabChange={handleTabChange}
        className="mb-6"
      />

      {currentTab === "Entretiens" && (
        <div className="grid grid-cols-1 xl:grid-cols-[400px_1fr] gap-6 relative overflow-hidden">
          {/* Interviews List */}
          <div
            className={cn(
              "transition-[transform,opacity] duration-300 ease-in-out xl:transform-none xl:opacity-100 xl:relative w-full",
              isMobileView &&
                "xl:relative opacity-0 -translate-x-full absolute inset-0",
              !isMobileView && "opacity-100 translate-x-0 relative"
            )}
          >
            <EntretiensList
              onEntretienSelect={handleEntretienSelect}
              selectedEntretienId={selectedEntretien?.id}
              activeFilter={currentFilter}
              onFilterChange={handleFilterChange}
              activeSubFilter={currentSubFilter}
              onSubFilterChange={handleSubFilterChange}
            />
          </div>

          {/* Interview Details */}
          <div
            className={cn(
              "transition-[transform,opacity] duration-300 ease-in-out xl:transform-none xl:opacity-100 xl:relative w-full",
              !isMobileView && "opacity-0 translate-x-full absolute inset-0",
              isMobileView && "opacity-100 translate-x-0 relative"
            )}
          >
            <div className="xl:hidden mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToList}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Retour à la liste
              </Button>
            </div>
            {selectedEntretien && (
              <EntretienDetails entretien={selectedEntretien} />
            )}
          </div>
        </div>
      )}
      {currentTab === "Disponibilites" && <DisponibilitesSettings />}
    </div>
  );
}
