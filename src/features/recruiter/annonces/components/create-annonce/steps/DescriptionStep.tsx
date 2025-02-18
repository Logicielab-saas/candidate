"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useCreateAnnonceStore } from "../../../store/create-annonce-store";
import { HeaderSectionStepsForm } from "@/components/shared/HeaderSectionStepsForm";
import { FormStepsNavigation } from "@/components/shared/FormStepsNavigation";

export function DescriptionStep() {
  const { previousStep, nextStep, canProceed } = useCreateAnnonceStore();

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      <HeaderSectionStepsForm
        title="Description du poste"
        description="Décrivez le poste et les compétences requises"
      />

      <Card>
        <CardContent className="pt-6">
          {/* Content will be implemented later */}
          <div className="min-h-[300px] flex items-center justify-center text-muted-foreground">
            Contenu à venir
          </div>
        </CardContent>
      </Card>

      <FormStepsNavigation
        onPrevious={previousStep}
        onNext={nextStep}
        canProceed={canProceed()}
      />
    </div>
  );
}
