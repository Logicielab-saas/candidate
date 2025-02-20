"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useCreateAnnonceStore } from "../../../store/create-annonce-store";
import { HeaderSectionStepsForm } from "@/components/shared/HeaderSectionStepsForm";
import { FormStepsNavigation } from "@/components/shared/FormStepsNavigation";

export function VerificationStep() {
  const { previousStep, nextStep } = useCreateAnnonceStore();

  const handleSubmit = () => {
    // TODO: Implement verification logic
    nextStep();
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      <HeaderSectionStepsForm
        title="Vérification"
        description="Vérifiez les informations de votre annonce avant la publication"
      />

      <Card>
        <CardContent className="pt-6">
          {/* TODO: Add verification content */}
        </CardContent>
      </Card>

      <FormStepsNavigation
        onPrevious={previousStep}
        onNext={handleSubmit}
        canProceed={true}
        nextLabel="Publier l'annonce"
      />
    </div>
  );
}
