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
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { useEmploisBySlug } from "@/features/Home/hooks/use-emplois";
import { JobDescriptionPanel } from "./JobDescriptionPanel";
import { useCurrentUser } from "@/features/candidature/(profile)/hooks/use-profile";
import { AlreadyApplied } from "./AlreadyApplied";

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
    if (IsFetching || !jobDetails) {
      return <StepSkeleton />;
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

  if (!jobDetails && !IsFetching) {
    return (
      <Card className="w-full max-w-4xl mx-auto p-8 flex items-center justify-center">
        <p className="text-lg text-muted-foreground">
          Offre d&apos;emploi introuvable. Veuillez vérifier l&apos;URL et
          réessayer.
        </p>
      </Card>
    );
  }

  return (
    <div className="container py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-2">
          {jobDetails ? (
            <>
              Postuler pour:{" "}
              <span className="text-primary">{jobDetails.title}</span>
            </>
          ) : (
            "Postuler pour un emploi"
          )}
        </h1>
        <p className="text-muted-foreground text-center">
          Complétez les étapes suivantes pour soumettre votre candidature
        </p>
      </div>

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

// Skeleton loader for steps
function StepSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Skeleton className="h-12 w-full mb-4" />
      <Skeleton className="h-[600px] w-full mb-4" />
      <div className="flex justify-end">
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
}
