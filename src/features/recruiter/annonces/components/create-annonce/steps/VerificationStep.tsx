"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCreateAnnonceStore } from "@/features/recruiter/annonces/store/create-annonce-store";
import { HeaderSectionStepsForm } from "@/components/shared/HeaderSectionStepsForm";
import { JobPostDetails } from "@/components/shared/JobPostDetails";
import { useToast } from "@/hooks/use-toast";
import { FloatingScrollButton } from "./questions/FloatingScrollButton";
import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function VerificationStep() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const {
    baseInformation,
    jobTypeInformation,
    salaryInformation,
    description,
    preferences,
    questions,
    previousStep,
    reset,
    getFormattedQuestions,
  } = useCreateAnnonceStore();

  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      // TODO: Implement API call to create the job post
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Get formatted questions for submission
      const formattedQuestions = getFormattedQuestions();

      // Store the form data somewhere (e.g., in an API or localStorage) if needed
      const formData = {
        baseInformation,
        jobTypeInformation,
        salaryInformation,
        description,
        preferences,
        questions: formattedQuestions,
      };
      console.log("Form data to be submitted:", formData);

      // Use startTransition to batch the state updates
      startTransition(() => {
        // Navigate and reset store in the same transition
        router.push("/recruiter/annonces/create-annonce/success");
        reset();
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description:
          "Une erreur est survenue lors de la création de l'annonce.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

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
              showEditButtons={true}
            />
          </CardContent>
        </Card>

        <div className="flex justify-between pt-6">
          <Button
            onClick={previousStep}
            variant="outline"
            disabled={isLoading || isPending}
          >
            Retour
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading || isPending}>
            {isLoading || isPending ? (
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
