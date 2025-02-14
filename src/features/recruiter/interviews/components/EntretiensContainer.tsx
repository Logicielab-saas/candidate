"use client";
import { useState } from "react";
import { EntretienTabs } from "./EntretienTabs";
import { DisponibilitesSettings } from "./DisponibilitesSettings";
import { EntretiensList } from "./EntretiensList";

export default function EntretiensContainer() {
  const [activeTab, setActiveTab] = useState<"Entretiens" | "Disponibilites">(
    "Disponibilites"
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
          <EntretiensList />
          <div className="hidden xl:block">
            {/* Right side content - To be implemented */}
          </div>
        </div>
      )}
      {activeTab === "Disponibilites" && <DisponibilitesSettings />}
    </div>
  );
}
