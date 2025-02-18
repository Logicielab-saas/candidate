"use client";

import { cn } from "@/lib/utils";
import { STEPS_CONFIG } from "@/features/recruiter/annonces/store/create-annonce-store";
import { useCreateAnnonceStore } from "@/features/recruiter/annonces/store/create-annonce-store";
import { Check } from "lucide-react";

interface HeaderSectionStepsFormProps {
  title: string;
  description: string;
}

export function HeaderSectionStepsForm({
  title,
  description,
}: HeaderSectionStepsFormProps) {
  const currentStepIndex = useCreateAnnonceStore((state) =>
    state.getCurrentStepIndex()
  );

  return (
    <div className="space-y-8">
      {/* Steps indicator */}
      <nav aria-label="Progress">
        <ol role="list" className="flex items-center justify-center">
          {STEPS_CONFIG.map((step, index) => {
            const isCurrentStep = index === currentStepIndex;
            const isCompleted = index < currentStepIndex;

            return (
              <li key={step.id} className="relative flex items-center">
                {index !== 0 && (
                  <div
                    className={cn(
                      "h-[2px] w-16 mx-2",
                      isCompleted
                        ? "bg-primaryHex-500"
                        : "bg-zinc-200 dark:bg-zinc-700"
                    )}
                    aria-hidden="true"
                  />
                )}
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                      isCompleted && "bg-primaryHex-500 text-white",
                      isCurrentStep &&
                        "border-2 border-primaryHex-500 bg-white dark:bg-zinc-900 text-primaryHex-500",
                      !isCompleted &&
                        !isCurrentStep &&
                        "border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400"
                    )}
                  >
                    {isCompleted ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-sm font-medium whitespace-nowrap",
                      isCompleted && "text-primaryHex-500",
                      isCurrentStep && "text-primaryHex-500",
                      !isCompleted &&
                        !isCurrentStep &&
                        "text-zinc-500 dark:text-zinc-400"
                    )}
                  >
                    {step.title}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Title and description */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-secondaryHex-900 dark:text-secondaryHex-50">
          {title}
        </h1>
        <p className="text-secondaryHex-600 dark:text-secondaryHex-400 text-lg">
          {description}
        </p>
      </div>
    </div>
  );
}
