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
import { useRouter, useSearchParams } from "next/navigation";
import { MOCK_ENTRETIENS } from "@/core/mockData/entretiens-data";

export default function EntretiensContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get all URL parameters
  const currentEntretienId = searchParams.get("entretien");
  const currentTab =
    (searchParams.get("tab") as "Entretiens" | "Disponibilites") ||
    "Entretiens";
  const currentFilter =
    (searchParams.get("filter") as FilterType) || "upcoming";
  const currentSubFilter = searchParams.get(
    "subFilter"
  ) as SubFilterType | null;

  // States
  const [activeTab, setActiveTab] = useState<"Entretiens" | "Disponibilites">(
    currentTab
  );
  const [selectedEntretien, setSelectedEntretien] = useState<Entretien | null>(
    null
  );
  const [activeFilter, setActiveFilter] = useState<FilterType>(currentFilter);
  const [activeSubFilter, setActiveSubFilter] = useState<SubFilterType | null>(
    currentSubFilter
  );

  // Effect to handle initial load and URL updates
  useEffect(() => {
    if (activeTab !== "Entretiens") return;

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

    // If no ID in URL or ID not found, select first interview and update URL
    if (MOCK_ENTRETIENS.length > 0) {
      const firstEntretien = MOCK_ENTRETIENS[0];
      setSelectedEntretien(firstEntretien);
      const newParams = new URLSearchParams(searchParams);
      newParams.set("entretien", firstEntretien.id);
      router.push(`/recruiter/interviews?${newParams.toString()}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentEntretienId, activeTab]);

  // Handlers for state changes
  const handleTabChange = (tab: "Entretiens" | "Disponibilites") => {
    setActiveTab(tab);
    // Reset all states
    setSelectedEntretien(null);
    setActiveFilter("upcoming");
    setActiveSubFilter(null);
    // Update URL with only the tab parameter
    router.push(`/recruiter/interviews?tab=${tab}`);
  };

  const handleEntretienSelect = (entretien: Entretien) => {
    setSelectedEntretien(entretien);
    // Preserve the current tab when updating entretien
    const newParams = new URLSearchParams(searchParams);
    newParams.set("entretien", entretien.id);
    router.push(`/recruiter/interviews?${newParams.toString()}`);
  };

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    setActiveSubFilter(null);
    // Preserve the current tab when updating filter
    const newParams = new URLSearchParams(searchParams);
    newParams.set("filter", filter);
    newParams.delete("subFilter");
    router.push(`/recruiter/interviews?${newParams.toString()}`);
  };

  const handleSubFilterChange = (subFilter: SubFilterType | null) => {
    setActiveSubFilter(subFilter);
    // Preserve the current tab when updating subFilter
    const newParams = new URLSearchParams(searchParams);
    if (subFilter) {
      newParams.set("subFilter", subFilter);
    } else {
      newParams.delete("subFilter");
    }
    router.push(`/recruiter/interviews?${newParams.toString()}`);
  };

  return (
    <div className="">
      <EntretienTabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
        className="mb-6"
      />

      {activeTab === "Entretiens" && (
        <div className="grid grid-cols-1 xl:grid-cols-[400px_1fr] gap-6">
          <EntretiensList
            onEntretienSelect={handleEntretienSelect}
            selectedEntretienId={selectedEntretien?.id}
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
            activeSubFilter={activeSubFilter}
            onSubFilterChange={handleSubFilterChange}
          />
          <div className="hidden xl:block">
            {selectedEntretien && (
              <EntretienDetails entretien={selectedEntretien} />
            )}
          </div>
        </div>
      )}
      {activeTab === "Disponibilites" && <DisponibilitesSettings />}
    </div>
  );
}
