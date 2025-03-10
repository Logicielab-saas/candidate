/**
 * JobApplyContainer - Main container for the job application process
 *
 * Manages the multi-step form flow for job applications
 * Renders the appropriate step component based on current step
 * Displays job details on the right side for reference
 */

"use client";

import { useJobApplyStore } from "../store/useJobApplyStore";
import { StepIndicator } from "./StepIndicator";
import { ResumeStep } from "./steps/ResumeStep";
import { Suspense, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { MOCK_ANNONCES } from "@/core/mockData/annonces";
import { JobDescriptionPanel } from "./JobDescriptionPanel";
import { MOCK_USER } from "@/core/mockData/user";

// Using the same type as in MOCK_ANNONCES
type JobDetails = (typeof MOCK_ANNONCES)[0];

export function JobApplyContainer() {
  const { currentStep } = useJobApplyStore();
  const searchParams = useSearchParams();
  const [jobDetails, setJobDetails] = useState<JobDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch job details based on jobId query parameter
  useEffect(() => {
    const jobId = searchParams.get("jobId");

    if (jobId) {
      // Find the job in MOCK_ANNONCES
      const job = MOCK_ANNONCES.find((job) => job.id === jobId);

      if (job) {
        setJobDetails(job);
      }
    }

    setIsLoading(false);
  }, [searchParams]);

  // Render the appropriate step component based on current step
  const renderStepContent = () => {
    if (isLoading) {
      return <StepSkeleton />;
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

    // Check if CV is required for this job
    const isCVRequired = jobDetails.preferences?.requireResume ?? true;

    switch (currentStep) {
      case "resume":
        return (
          <Suspense fallback={<StepSkeleton />}>
            <ResumeStep isCVRequired={isCVRequired} />
          </Suspense>
        );
      case "personal-info":
        // Will be implemented in future steps
        return (
          <Card className="w-full max-w-4xl mx-auto p-8 flex items-center justify-center">
            <p className="text-lg text-muted-foreground">
              Informations personnelles (Prochainement)
            </p>
          </Card>
        );
      case "experience":
        // Will be implemented in future steps
        return (
          <Card className="w-full max-w-4xl mx-auto p-8 flex items-center justify-center">
            <p className="text-lg text-muted-foreground">
              Expérience professionnelle (Prochainement)
            </p>
          </Card>
        );
      case "review":
        // Will be implemented in future steps
        return (
          <Card className="w-full max-w-4xl mx-auto p-8 flex items-center justify-center">
            <p className="text-lg text-muted-foreground">
              Révision de la candidature (Prochainement)
            </p>
          </Card>
        );
      default:
        return <div>Étape inconnue</div>;
    }
  };

  return (
    <div className="container py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-2">
          {jobDetails ? (
            <>
              Bonjour <span className="text-primary">{MOCK_USER.name},</span>{" "}
              <div className="mt-1">
                Postuler pour:{" "}
                <span className="text-primary">
                  {jobDetails.baseInformation.jobTitle}
                </span>
              </div>
            </>
          ) : (
            "Postuler pour un emploi"
          )}
        </h1>
        <p className="text-muted-foreground text-center">
          Complétez les étapes suivantes pour soumettre votre candidature
        </p>
      </div>

      <StepIndicator />

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
