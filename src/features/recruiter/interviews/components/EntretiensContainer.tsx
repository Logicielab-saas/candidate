"use client";
import { useState } from "react";
import { EntretienTabs } from "./EntretienTabs";
import { DisponibilitesSettings } from "./DisponibilitesSettings";
import { EntretiensList } from "./EntretiensList";
import { EntretienDetails } from "./EntretienDetails";
import { type Entretien } from "@/core/mockData/entretiens-data";

export default function EntretiensContainer() {
  const [activeTab, setActiveTab] = useState<"Entretiens" | "Disponibilites">(
    "Entretiens"
  );
  const [selectedEntretien, setSelectedEntretien] = useState<Entretien | null>(
    null
  );

  return (
    <div className="">
      <EntretienTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        className="mb-6"
      />

      {activeTab === "Entretiens" && (
        <div className="grid grid-cols-1 xl:grid-cols-[400px_1fr] gap-6">
          <EntretiensList
            onEntretienSelect={setSelectedEntretien}
            selectedEntretienId={selectedEntretien?.id}
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
