/**
 * StepIndicator - Visual indicator for multi-step form progress
 *
 * Displays the current step and overall progress in the job application process
 * Highlights the active step and shows completed steps
 */

"use client";

import { cn } from "@/lib/utils";
import { useJobApplyStore, JobApplyStep } from "../store/useJobApplyStore";
import { CheckIcon } from "lucide-react";

interface StepConfig {
  id: JobApplyStep;
  label: string;
}

const steps: StepConfig[] = [
  { id: "resume", label: "Resume" },
  { id: "personal-info", label: "Personal Info" },
  { id: "experience", label: "Experience" },
  { id: "review", label: "Review" },
];

export function StepIndicator() {
  const { currentStep } = useJobApplyStore();

  // Find the index of the current step
  const currentStepIndex = steps.findIndex((step) => step.id === currentStep);

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          // Determine if this step is active, completed, or upcoming
          const isActive = step.id === currentStep;
          const isCompleted = index < currentStepIndex;
          const isUpcoming = index > currentStepIndex;

          return (
            <div
              key={step.id}
              className="flex flex-col items-center relative w-full"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "absolute top-4 left-1/2 w-full h-0.5",
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
                  <span className="text-xs font-medium">{index + 1}</span>
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
