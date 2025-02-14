"use client";
import { useState } from "react";
import { EntretienTabs } from "./EntretienTabs";
import { DisponibilitesSettings } from "./DisponibilitesSettings";

export default function EntretiensContainer() {
  const [activeTab, setActiveTab] = useState<"active" | "closed">("closed");

  return (
    <div className="">
      <EntretienTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        className="mb-6"
      />

      {activeTab === "closed" && <DisponibilitesSettings />}
    </div>
  );
}
