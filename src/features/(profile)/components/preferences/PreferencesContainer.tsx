"use client";

import { Metadata } from "next";
import { JobTitleSection } from "./JobTitleSection";
import { MinSalarySection } from "./MinSalarySection";
import { JobTypesSection } from "./JobTypesSection";
import { RelocationSection } from "./RelocationSection";
import { PreferenceSection } from "./PreferenceSection";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Préférences d'emploi | Mon Profil",
  description:
    "Gérez vos préférences d'emploi, types de postes et critères de recherche.",
  keywords: [
    "préférences d'emploi",
    "salaire minimum",
    "types de postes",
    "relocalisation",
    "critères de recherche",
  ],
  openGraph: {
    title: "Préférences d'emploi | Mon Profil",
    description:
      "Gérez vos préférences d'emploi, types de postes et critères de recherche.",
    type: "profile",
  },
};

export function PreferencesContainer() {
  const [hasRelocation, setHasRelocation] = useState(false);
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={handleBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour
      </Button>
      <PreferenceSection title="Intitulés de poste">
        <JobTitleSection />
      </PreferenceSection>

      <PreferenceSection title="Salaire de base minimum">
        <MinSalarySection />
      </PreferenceSection>

      <PreferenceSection title="Types de postes">
        <JobTypesSection />
      </PreferenceSection>

      <PreferenceSection title="Relocalisation" showAddButton={!hasRelocation}>
        <RelocationSection onDataChange={setHasRelocation} />
      </PreferenceSection>
    </div>
  );
}
