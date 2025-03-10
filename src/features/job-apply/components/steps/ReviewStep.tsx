/**
 * ReviewStep - Final step of the job application process
 *
 * Displays a summary of all information provided in previous steps
 * Allows user to review and submit their application
 */

"use client";

import { useJobApplyStore } from "../../store/useJobApplyStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Send } from "lucide-react";
import { useState } from "react";
import { type JobDetails } from "@/core/mockData/annonces";
import { CVSection } from "./review/CVSection";
import { PersonalInfoSection } from "./review/PersonalInfoSection";
import { QuestionsSection } from "./review/QuestionsSection";

interface ReviewStepProps {
  jobDetails: JobDetails;
}

export function ReviewStep({ jobDetails }: ReviewStepProps) {
  const { resumeData, personalInfo, questionsData, prevStep } =
    useJobApplyStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle application submission
  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Here you would typically send the application data to your backend
      // For now, we'll just simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Log the complete application data
      console.log("Submitting application:", {
        jobId: jobDetails.id,
        jobTitle: jobDetails.baseInformation.jobTitle,
        resume: resumeData,
        personalInfo,
        questions: questionsData,
      });

      // TODO: Handle successful submission (redirect to success page, show confirmation, etc.)
    } catch (error) {
      console.error("Error submitting application:", error);
      // TODO: Handle submission error (show error message, etc.)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Révision de votre candidature
        </CardTitle>
        <CardDescription>
          Vérifiez les informations de votre candidature avant de la soumettre
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Resume Section */}
        <CVSection isCVRequired={jobDetails.preferences.requireResume} />

        {/* Personal Information Section */}
        <PersonalInfoSection />

        {/* Questions Section */}
        <QuestionsSection questions={jobDetails.questions} />
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row gap-4 sm:justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={prevStep}
          className="flex items-center gap-2 w-full sm:w-auto"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Button>

        <Button
          onClick={handleSubmit}
          className="flex items-center gap-2 w-full sm:w-auto"
          disabled={isSubmitting}
        >
          <Send className="h-4 w-4" />
          {isSubmitting ? "Envoi en cours..." : "Envoyer ma candidature"}
        </Button>
      </CardFooter>
    </Card>
  );
}
