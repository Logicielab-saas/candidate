/**
 * StepIndicator - Visual indicator for multi-step form progress
 *
 * Displays the current step and overall progress in the job application process
 * Shows all steps: personal info, questions (if job has questions), and review
 * Supports RTL languages by reversing the direction of steps and connector lines
 */

"use client";

import { cn } from "@/lib/utils";
import { useJobApplyStore, JobApplyStep } from "../store/useJobApplyStore";
import { CheckIcon } from "lucide-react";
import { EmploisDetails } from "@/core/interfaces";
import { useLocale, useTranslations } from "next-intl";

interface StepConfig {
  id: JobApplyStep;
  label: string;
}

interface StepIndicatorProps {
  jobDetails: EmploisDetails;
}

export function StepIndicator({ jobDetails }: StepIndicatorProps) {
  const tCommon = useTranslations("common");
  const isRTL = useLocale() === "ar";

  const { currentStep } = useJobApplyStore();

  // Determine steps based on whether job has questions
  const steps: StepConfig[] =
    jobDetails.emploi_questions?.length > 0
      ? [
          { id: "personal-info", label: tCommon("informations") },
          { id: "questions", label: tCommon("questions") },
          { id: "review", label: tCommon("review") },
        ]
      : [
          { id: "personal-info", label: tCommon("informations") },
          { id: "review", label: tCommon("review") },
        ];

  // Find the index of the current step
  const currentStepIndex = steps.findIndex((step) => step.id === currentStep);

  // In RTL mode, we reverse the steps array to display them right-to-left
  const displaySteps = isRTL ? [...steps].reverse() : steps;

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="flex items-center justify-between">
        {displaySteps.map((step, index) => {
          // Determine if this step is active, completed, or upcoming
          const isActive = step.id === currentStep;
          const isCompleted = isRTL
            ? index > displaySteps.length - 1 - currentStepIndex
            : index < currentStepIndex;
          const isUpcoming = isRTL
            ? index < displaySteps.length - 1 - currentStepIndex
            : index > currentStepIndex;

          return (
            <div
              key={step.id}
              className="flex flex-col items-center relative w-full"
            >
              {/* Connector line */}
              {index < displaySteps.length - 1 && (
                <div
                  className={cn(
                    "absolute top-4 h-0.5",
                    isRTL ? "right-1/2" : "left-1/2",
                    "w-full",
                    isCompleted ? "bg-primary" : "bg-muted"
                  )}
                />
              )}

              {/* Step indicator */}
              <div
                className={cn(
                  "relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 mb-2",
                  isActive &&
                    "border-primary bg-primary text-primary-foreground",
                  isCompleted &&
                    "border-primary bg-primary text-primary-foreground",
                  isUpcoming &&
                    "border-muted bg-background text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <CheckIcon className="h-4 w-4" />
                ) : (
                  <span className="text-xs font-medium">
                    {isRTL ? displaySteps.length - index : index + 1}
                    {/* {index + 1} */}
                  </span>
                )}
              </div>

              {/* Step label */}
              <span
                className={cn(
                  "text-xs font-medium",
                  isActive && "text-primary",
                  isCompleted && "text-primary",
                  isUpcoming && "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
