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
  };

  const handleEntretienSelect = (entretien: Entretien) => {
    setSelectedEntretien(entretien);
    setCurrentEntretienId(entretien.id);
  };

  const handleFilterChange = (filter: FilterType) => {
    setCurrentFilter(filter);
    setCurrentSubFilter(null);
  };

  const handleSubFilterChange = (subFilter: SubFilterType | null) => {
    setCurrentSubFilter(subFilter);
  };

  return (
    <div className="">
      <EntretienTabs
        activeTab={currentTab}
        onTabChange={handleTabChange}
        className="mb-6"
      />

      {currentTab === "Entretiens" && (
        <div className="grid grid-cols-1 xl:grid-cols-[400px_1fr] gap-6">
          <EntretiensList
            onEntretienSelect={handleEntretienSelect}
            selectedEntretienId={selectedEntretien?.id}
            activeFilter={currentFilter}
            onFilterChange={handleFilterChange}
            activeSubFilter={currentSubFilter}
            onSubFilterChange={handleSubFilterChange}
          />
          <div className="hidden xl:block">
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
