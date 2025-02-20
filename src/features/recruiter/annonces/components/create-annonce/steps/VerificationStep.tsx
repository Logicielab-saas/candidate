"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useCreateAnnonceStore } from "../../../store/create-annonce-store";
import { HeaderSectionStepsForm } from "@/components/shared/HeaderSectionStepsForm";
import { FormStepsNavigation } from "@/components/shared/FormStepsNavigation";
import { JobPostDetails } from "../../shared/JobPostDetails";
import { useToast } from "@/hooks/use-toast";

export function VerificationStep() {
  const {
    previousStep,
    nextStep,
    baseInformation,
    jobTypeInformation,
    salaryInformation,
    description,
    preferences,
    questions,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    currentStep,
  } = useCreateAnnonceStore();

  const { toast } = useToast();

  const handleEdit = (
    section:
      | "job-information"
      | "description-annonce"
      | "preferences"
      | "questions"
  ) => {
    // Navigate to the selected section
    useCreateAnnonceStore.setState({ currentStep: section });
  };

  const handleSubmit = () => {
    // TODO: Implement API call to create the job post
    toast({
      title: "Annonce créée",
      description: "Votre annonce a été créée avec succès.",
      variant: "success",
    });
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
          <JobPostDetails
            data={{
              baseInformation,
              jobTypeInformation,
              salaryInformation,
              description,
              preferences,
              questions,
            }}
            onEdit={handleEdit}
          />
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
