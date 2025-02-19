"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnnoncePreviewDialog } from "@/features/recruiter/annonces/components/preview/AnnoncePreviewDialog";

// TODO: Add Apercu button to preview a dialog has title and description etc

interface FormStepsNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  canProceed: boolean;
  previousLabel?: string | null;
  nextLabel?: string;
  className?: string;
  showPreview?: boolean;
}

export function FormStepsNavigation({
  onPrevious,
  onNext,
  canProceed,
  previousLabel = "Retour",
  nextLabel = "Continuer",
  className = "flex justify-between pt-6",
  showPreview = false,
}: FormStepsNavigationProps) {
  return (
    <div className={className}>
      <div className="flex items-center gap-4">
        {previousLabel && (
          <Button onClick={onPrevious} variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            {previousLabel}
          </Button>
        )}
      </div>
      <div className="flex justify-end gap-4">
        {showPreview && <AnnoncePreviewDialog />}
        <Button onClick={onNext} disabled={!canProceed} className="gap-2">
          {nextLabel}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
