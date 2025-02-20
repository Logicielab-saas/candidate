"use client";

import { CandidateFiltersAnnonceMenu } from "./CandidateFiltersAnnonceMenu";
import { CandidateFilterTabs } from "./CandidateFilterTabs";
import { CandidateFilters } from "./CandidateFilters";
import { CandidateDataTable } from "./CandidateDataTable";
import { mockCandidates } from "@/core/mockData/candidates-data";
import { useQueryState, parseAsString, parseAsArrayOf } from "nuqs";
import { useMemo } from "react";

export function CandidatesContainer() {
  // URL state management with nuqs
  const [tab, setTab] = useQueryState("tab", {
    defaultValue: "all",
    parse: (value: string | null) => value || "all",
    serialize: (value: string) => value,
  });

  const [sortBy, setSortBy] = useQueryState("sort", {
    defaultValue: "newest",
    parse: (value: string | null) => value || "newest",
    serialize: (value: string) => value,
  });

  const [locations, setLocations] = useQueryState(
    "locations",
    parseAsArrayOf(parseAsString)
  );
  const [annonceId, setAnnonceId] = useQueryState("annonce", parseAsString);
  const [searchQuery, _setSearchQuery] = useQueryState("q", parseAsString);

  // Filter candidates based on URL state
  const filteredCandidates = useMemo(() => {
    let filtered = [...mockCandidates];

    // Filter by annonce ID
    if (annonceId) {
      filtered = filtered.filter(
        (candidate) => candidate.annonceId === annonceId
      );
    }

    // Filter by tab
    if (tab && tab !== "all") {
      filtered = filtered.filter((candidate) => {
        switch (tab) {
          case "new":
            return candidate.statut === "nouveau";
          case "encours":
            return candidate.statut === "en-cours-examen";
          case "contacted":
            return candidate.statut === "contacte";
          case "interview":
            return candidate.statut === "en-cours-entretien";
          case "hired":
            return candidate.statut === "embauche";
          case "rejected":
            return candidate.statut === "ecarte";
          default:
            return true;
        }
      });
    }

    // Filter by locations
    if (locations && locations.length > 0) {
      filtered = filtered.filter((candidate) =>
        locations.some((loc) =>
          candidate.ville.toLowerCase().includes(loc.toLowerCase())
        )
      );
    }

    // Sort candidates
    if (sortBy) {
      filtered.sort((a, b) => {
        switch (sortBy) {
          case "newest":
            return (
              new Date(b.datePostule).getTime() -
              new Date(a.datePostule).getTime()
            );
          case "oldest":
            return (
              new Date(a.datePostule).getTime() -
              new Date(b.datePostule).getTime()
            );
          case "name-asc":
            return a.nom.localeCompare(b.nom);
          case "name-desc":
            return b.nom.localeCompare(a.nom);
          default:
            return 0;
        }
      });
    }

    return filtered;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, locations, sortBy, annonceId, searchQuery]);

  return (
    <>
      <CandidateFiltersAnnonceMenu
        selectedAnnonceId={annonceId}
        onAnnonceChange={setAnnonceId}
      />
      <CandidateFilterTabs currentTab={tab} onTabChange={setTab} />
      <CandidateFilters
        selectedLocations={locations || []}
        onLocationsChange={setLocations}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      <CandidateDataTable data={filteredCandidates} />
    </>
  );
}
