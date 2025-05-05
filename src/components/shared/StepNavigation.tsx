/**
 * StepNavigation - Shared navigation component for job application steps
 *
 * Provides consistent navigation buttons (back/continue) across all steps
 * Handles loading states and custom button text
 */

"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface StepNavigationProps {
  onNext?: () => void;
  onBack?: () => void;
  isLoading?: boolean;
  showBackButton?: boolean;
  backButtonText?: string;
  continueButtonText?: string;
  className?: string;
}

export function StepNavigation({
  onNext,
  onBack,
  isLoading = false,
  showBackButton = true,
  backButtonText = "Retour",
  continueButtonText = "Continuer",
  className = "",
}: StepNavigationProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.push("/emplois");
    }
  };

  return (
    <div className={`flex w-full ${className}`}>
      {/* Back button aligned to the left */}
      <div className="flex-1">
        {showBackButton && (
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={isLoading}
          >
            {backButtonText}
          </Button>
        )}
      </div>

      {/* Continue button aligned to the right */}
      <div className="flex justify-end flex-1">
        {onNext && (
          <Button type="button" onClick={onNext} disabled={isLoading}>
            {isLoading ? "Chargement..." : continueButtonText}
          </Button>
        )}
      </div>
    </div>
  );
}
