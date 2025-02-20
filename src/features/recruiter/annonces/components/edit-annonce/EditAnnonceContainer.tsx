"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCreateAnnonceStore } from "@/features/recruiter/annonces/store/create-annonce-store";
import { JobPostDetails } from "@/components/shared/JobPostDetails";
import { useToast } from "@/hooks/use-toast";
import { useState, useTransition, useEffect } from "react";
import { Loader2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnnonceData } from "@/features/recruiter/annonces/common";
import { convertAnnonceToSelectedQuestions } from "@/features/recruiter/annonces/common/utils/questions.utils";

interface EditAnnonceContainerProps {
  annonceData: AnnonceData;
}

export function EditAnnonceContainer({
  annonceData,
}: EditAnnonceContainerProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const {
    baseInformation,
    jobTypeInformation,
    salaryInformation,
    description,
    preferences,
    questions,
    setAnnonceType,
    setBaseInformation,
    setJobTypeInformation,
    setSalaryInformation,
    setDescription,
    setPreferences,
    setQuestions,
    getFormattedQuestions,
  } = useCreateAnnonceStore();

  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Initialize the store with the annonce data
  useEffect(() => {
    setAnnonceType(annonceData.annonceType);
    setBaseInformation(annonceData.baseInformation);
    setJobTypeInformation(annonceData.jobTypeInformation);
    setSalaryInformation(annonceData.salaryInformation);
    setDescription(annonceData.description);
    setPreferences(annonceData.preferences);
    setQuestions(convertAnnonceToSelectedQuestions(annonceData.questions));
  }, [
    annonceData,
    setAnnonceType,
    setBaseInformation,
    setJobTypeInformation,
    setSalaryInformation,
    setDescription,
    setPreferences,
    setQuestions,
  ]);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      // TODO: Implement API call to update the job post
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
      console.log("Form data to be updated:", formData);

      // Use startTransition to batch the state updates
      startTransition(() => {
        // Navigate back to annonces list after successful update
        router.push("/recruiter/annonces");
        toast({
          title: "Succès",
          description: "L'annonce a été mise à jour avec succès.",
        });
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description:
          "Une erreur est survenue lors de la mise à jour de l'annonce.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      <Card className="bg-white/50 backdrop-blur-sm dark:bg-zinc-800/50">
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
        <Button variant="outline" className="gap-2" asChild>
          <Link href="/recruiter/annonces">
            <ArrowLeft className="h-4 w-4" />
            Retour aux annonces
          </Link>
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isLoading || isPending}
          className="gap-2"
        >
          {isLoading || isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Mise à jour en cours...
            </>
          ) : (
            "Mettre à jour l'annonce"
          )}
        </Button>
      </div>
    </div>
  );
}
