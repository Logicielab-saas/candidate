/**
 * StepIndicator - A progress bar component for multi-step processes
 *
 * A reusable component that shows progress through a series of steps
 * with an animated progress bar and step indicators.
 */

"use client";

import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

export interface StepIndicatorProps {
  currentStep: number;
  steps: { title: string }[];
}

export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  const progress = (currentStep / (steps.length - 1)) * 100;

  return (
    <div className="mb-8 space-y-4">
      {/* Progress bar */}
      <div className="relative h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="absolute h-full bg-primary transition-all duration-500 ease-in-out rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step labels */}
      <div className="relative flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div
              key={step.title}
              className={cn(
                "flex flex-col items-center",
                index === 0 && "items-start",
                index === steps.length - 1 && "items-end"
              )}
            >
              <div
                className={cn(
                  "flex items-center gap-2.5 transition-colors",
                  isCompleted || isCurrent
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                <span className="text-base">
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <div
                      className={cn(
                        "h-2.5 w-2.5 rounded-full",
                        isCurrent ? "bg-primary" : "bg-muted-foreground"
                      )}
                    />
                  )}
                </span>
                <span className="text-sm font-medium">{step.title}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
