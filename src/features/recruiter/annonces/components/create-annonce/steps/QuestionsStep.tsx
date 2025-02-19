"use client";

import { HeaderSectionStepsForm } from "@/components/shared/HeaderSectionStepsForm";
import { FormStepsNavigation } from "@/components/shared/FormStepsNavigation";
import { useCreateAnnonceStore } from "@/features/recruiter/annonces/store/create-annonce-store";

export function QuestionsStep() {
  const { nextStep, previousStep, canProceed } = useCreateAnnonceStore();

  return (
    <div className="container max-w-4xl mx-auto py-8 space-y-8">
      <HeaderSectionStepsForm
        title="Questions pour les candidats"
        description="Ajoutez des questions pour mieux évaluer les candidats"
      />

      <div className="space-y-6">{/* Questions form will go here */}</div>

      <FormStepsNavigation
        onPrevious={previousStep}
        onNext={nextStep}
        canProceed={canProceed()}
      />
    </div>
  );
}
