/**
 * JobApplyContainer - Main container for the job application process
 *
 * Manages the simplified application flow:
 * - Shows questions step if job has questions
 * - Shows review step for final submission
 */

"use client";

import { useJobApplyStore } from "../store/useJobApplyStore";
import { StepIndicator } from "./StepIndicator";
import { QuestionStep } from "./steps/questions/QuestionStep";
import { ReviewStep } from "./steps/ReviewStep";
import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useEmploisBySlug } from "@/features/Emplois/hooks/use-emplois";
import { JobDescriptionPanel } from "./JobDescriptionPanel";
import { useCurrentUser } from "@/features/candidature/(profile)/hooks/use-profile";
import { AlreadyApplied } from "./AlreadyApplied";
import LoaderOne from "@/components/ui/loader-one";
import { Skeleton } from "@/components/ui/skeleton";

interface JobApplyContainerProps {
  slug: string;
}

export function JobApplyContainer({ slug }: JobApplyContainerProps) {
  const { data: jobDetails, isLoading } = useEmploisBySlug(slug);
  const { data: user, isLoading: isLoadingUser } = useCurrentUser();
  const { currentStep, setCurrentStep } = useJobApplyStore();

  const IsFetching = isLoading || isLoadingUser;

  // Set initial step based on whether job has questions
  useEffect(() => {
    if (jobDetails) {
      setCurrentStep(
        jobDetails.emploi_questions?.length > 0 ? "questions" : "review"
      );
    }
  }, [jobDetails, setCurrentStep]);

  // Render the appropriate step component based on current step
  const renderStepContent = () => {
    if (IsFetching) {
      return;
    }

    if (!jobDetails) {
      return (
        <Card className="w-full max-w-4xl mx-auto p-8 flex items-center justify-center">
          <p className="text-lg text-muted-foreground">
            Offre d&apos;emploi introuvable. Veuillez vérifier l&apos;URL et
            réessayer.
          </p>
        </Card>
      );
    }

    switch (currentStep) {
      case "questions":
        return <QuestionStep questions={jobDetails.emploi_questions} />;
      case "review":
        return <ReviewStep jobDetails={jobDetails} user={user!} />;
      default:
        return <div>Étape inconnue</div>;
    }
  };

  if (!IsFetching && jobDetails?.applied) {
    return <AlreadyApplied jobDetails={jobDetails} />;
  }

  return (
    <div className="container py-8 max-w-7xl">
      <div className="mb-8">
        {IsFetching ? (
          <>
            <Skeleton className="h-12 w-1/2 mx-auto mb-2" />
            <Skeleton className="h-6 w-[500px] mx-auto" />
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-center mb-2">
              Postuler pour:{" "}
              <span className="text-primary">{jobDetails?.title}</span>
            </h1>
            <p className="text-muted-foreground text-center">
              Complétez les étapes suivantes pour soumettre votre candidature
            </p>
          </>
        )}
      </div>
      {IsFetching && (
        <div className="flex justify-center items-center text-center h-full">
          <LoaderOne />
        </div>
      )}

      {jobDetails && <StepIndicator jobDetails={jobDetails} />}

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main content - form steps */}
        <div
          className={`${
            currentStep === "review" ? "lg:col-span-12" : "lg:col-span-7"
          }`}
        >
          {renderStepContent()}
        </div>

        {/* Job description panel - only show for non-review steps */}
        {currentStep !== "review" && jobDetails && (
          <div className="lg:col-span-5">
            <JobDescriptionPanel jobDetails={jobDetails} />
          </div>
        )}
      </div>
    </div>
  );
}
