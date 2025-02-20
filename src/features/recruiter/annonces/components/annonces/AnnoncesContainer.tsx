"use client";

import { useState } from "react";
import { AnnonceTabs } from "./AnnonceTabs";
import { AnnonceSelectFilter } from "./AnnonceSelectFilter";
import { AnnonceDataTable } from "./AnnonceDataTable";
import { PublierAnnonceLink } from "@/components/shared/PublierAnnonceLink";

// TODO: Move this to a proper data fetching solution
const data = [
  {
    intitule: "Social media manager",
    city: "Tanger",
    candidatures: { tous: 10, nouveaux: 5 },
    statutDeSponsorisation: "Annonce gratuite",
    dateDePublication: "10/02/2025",
    statutDeLAnnonce: "Ouverte",
  },
  {
    intitule: "assistante commerciale",
    city: "Meknes",
    candidatures: { tous: 10, nouveaux: 3 },
    statutDeSponsorisation: "Annonce sponsorisée",
    dateDePublication: "02/02/2025",
    statutDeLAnnonce: "Suspendue",
  },
  {
    intitule: "infographiste",
    city: "Rabat",
    candidatures: { tous: 30, nouveaux: 2 },
    statutDeSponsorisation: "Annonce gratuite",
    dateDePublication: "01/02/2025",
    statutDeLAnnonce: "Fermée",
  },
];

type TabValue = "active" | "closed";

export function AnnoncesContainer() {
  const [activeTab, setActiveTab] = useState<TabValue>("active");

  const filteredData =
    activeTab === "active"
      ? data.filter((annonce) =>
          ["Ouverte", "Suspendue"].includes(annonce.statutDeLAnnonce)
        )
      : data.filter((annonce) => annonce.statutDeLAnnonce === "Fermée");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between w-full">
        <div className="flex-1">
          <AnnonceTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
        <PublierAnnonceLink />
      </div>

      <AnnonceSelectFilter />

      <AnnonceDataTable data={filteredData} />
    </div>
  );
}
