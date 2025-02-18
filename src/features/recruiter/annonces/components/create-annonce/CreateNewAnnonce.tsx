"use client";

import { Button } from "@/components/ui/button";
import { useCreateAnnonceStore } from "../../store/create-annonce-store";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { HeaderSectionStepsForm } from "@/components/shared/HeaderSectionStepsForm";
import { BaseInformationStep } from "./steps/BaseInformationStep";

export function CreateNewAnnonce() {
  const { previousStep, nextStep, canProceed } = useCreateAnnonceStore();

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      <HeaderSectionStepsForm
        title="Nouvelle annonce"
        description="Remplissez les informations de base de votre annonce"
      />

      <BaseInformationStep />

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <Button onClick={previousStep} variant="outline" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Retour
        </Button>
        <Button onClick={nextStep} disabled={!canProceed()} className="gap-2">
          Continuer
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
