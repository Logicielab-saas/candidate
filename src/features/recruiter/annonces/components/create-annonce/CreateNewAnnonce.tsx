"use client";

import { useCreateAnnonceStore } from "../../store/create-annonce-store";
import { HeaderSectionStepsForm } from "@/components/shared/HeaderSectionStepsForm";
import { BaseInformationStep } from "./steps/BaseInformationStep";
import { FormStepsNavigation } from "@/components/shared/FormStepsNavigation";

export function CreateNewAnnonce() {
  const { previousStep, nextStep, canProceed } = useCreateAnnonceStore();

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      <HeaderSectionStepsForm
        title="Nouvelle annonce"
        description="Remplissez les informations de base de votre annonce"
      />

      <BaseInformationStep />

      <FormStepsNavigation
        onPrevious={previousStep}
        onNext={nextStep}
        canProceed={canProceed()}
      />
    </div>
  );
}
