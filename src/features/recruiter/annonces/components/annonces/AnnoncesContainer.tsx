"use client";

import { useState } from "react";
import { AnnonceTabs } from "./AnnonceTabs";
import { AnnonceSelectFilter } from "./AnnonceSelectFilter";
import { AnnonceDataTable } from "./AnnonceDataTable";
import { PublierAnnonceLink } from "@/components/shared/PublierAnnonceLink";
import { mockAnnonceData } from "@/core/mockData/annonces-real-data";

type TabValue = "active" | "closed";

export function AnnoncesContainer() {
  const [activeTab, setActiveTab] = useState<TabValue>("active");

  const filteredData =
    activeTab === "active"
      ? mockAnnonceData.filter((annonce) =>
          ["Ouverte", "Suspendue"].includes(annonce.statutDeLAnnonce)
        )
      : mockAnnonceData.filter(
          (annonce) => annonce.statutDeLAnnonce === "Fermée"
        );

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
