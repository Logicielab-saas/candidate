"use client";

import { useState, useEffect } from "react";
import { EntretienTabs } from "./EntretienTabs";
import { DisponibilitesSettings } from "./DisponibilitesSettings";
import { EntretiensList } from "./EntretiensList";
import { EntretienDetails } from "./EntretienDetails";
import { type Entretien } from "@/core/mockData/entretiens-data";
import { useRouter, useSearchParams } from "next/navigation";
import { MOCK_ENTRETIENS } from "@/core/mockData/entretiens-data";

export default function EntretiensContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"Entretiens" | "Disponibilites">(
    "Entretiens"
  );

  // Get the current selected interview from URL
  const currentEntretienId = searchParams.get("entretien");
  const [selectedEntretien, setSelectedEntretien] = useState<Entretien | null>(
    null
  );

  // Effect to handle initial load and URL updates
  useEffect(() => {
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
      router.push(`/recruiter/interviews?entretien=${firstEntretien.id}`);
    }
  }, [currentEntretienId, router]);

  // Handler for interview selection
  const handleEntretienSelect = (entretien: Entretien) => {
    setSelectedEntretien(entretien);
    router.push(`/recruiter/interviews?entretien=${entretien.id}`);
  };

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
            onEntretienSelect={handleEntretienSelect}
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
