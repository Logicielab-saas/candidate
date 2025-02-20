"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useCreateAnnonceStore } from "@/features/recruiter/annonces/store/create-annonce-store";
import { HeaderSectionStepsForm } from "@/components/shared/HeaderSectionStepsForm";
import { JobPostDetails } from "@/components/shared/JobPostDetails";
import { useToast } from "@/hooks/use-toast";
import { FloatingScrollButton } from "./questions/FloatingScrollButton";
import { useState } from "react";
import { SuccessScreen } from "./SuccessScreen";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function VerificationStep() {
  const {
    previousStep,
    baseInformation,
    jobTypeInformation,
    salaryInformation,
    description,
    preferences,
    questions,
  } = useCreateAnnonceStore();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      // TODO: Implement API call to create the job post
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsSubmitted(true);

      toast({
        title: "Annonce créée",
        description: "Votre annonce a été créée avec succès.",
        variant: "success",
      });
    } catch (_error) {
      toast({
        title: "Erreur",
        description:
          "Une erreur est survenue lors de la création de l'annonce.",
        variant: "destructive",
      });
      console.error(_error);
    } finally {
      setIsLoading(false);
    }
  };

  // Show success screen if submitted
  if (isSubmitted) {
    return <SuccessScreen />;
  }

  return (
    <>
      <FloatingScrollButton />
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

        <div className="flex justify-between pt-6">
          <Button onClick={previousStep} variant="outline" disabled={isLoading}>
            Retour
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Publication en cours...
              </>
            ) : (
              "Publier l'annonce"
            )}
          </Button>
        </div>
      </div>
    </>
  );
}
