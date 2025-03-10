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
import { ArrowLeft, Send, User, MessageSquare } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { type JobDetails } from "@/core/mockData/annonces";
import { CVSection } from "./review/CVSection";

interface ReviewStepProps {
  jobDetails: JobDetails;
}

export function ReviewStep({ jobDetails }: ReviewStepProps) {
  const { resumeData, personalInfo, questionsData, prevStep } =
    useJobApplyStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Find question text by ID
  const getQuestionText = (id: string) => {
    const question = jobDetails.questions.find((q) => q.id === id);
    if (!question) return `Question ${id}`;

    // For experience questions, combine label and question
    if (question.type === "experience") {
      return `${question.label} (${question.question})`;
    }

    // For other questions, use question text or label
    return question.question || question.label || `Question ${id}`;
  };

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
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Informations personnelles</h3>
          </div>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Nom complet</p>
              <p className="font-medium">
                {personalInfo.firstName} {personalInfo.lastName}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{personalInfo.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Téléphone</p>
              <p className="font-medium">{personalInfo.phone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Adresse</p>
              <p className="font-medium">{personalInfo.address}</p>
            </div>
          </div>
        </div>

        {/* Questions Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Questions</h3>
          </div>
          <Separator />
          {questionsData.answers.length > 0 ? (
            <div className="space-y-4">
              {questionsData.answers.map((answer) => (
                <div key={answer.id}>
                  <p className="text-sm text-muted-foreground">
                    {getQuestionText(answer.id)}
                  </p>
                  <p className="font-medium">
                    {Array.isArray(answer.answer)
                      ? answer.answer.join(", ")
                      : answer.answer}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground italic">
              Aucune question à répondre
            </p>
          )}
        </div>
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
