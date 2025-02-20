"use client";

import { useCreateAnnonceStore } from "../../store/create-annonce-store";
import { CreateAnnonceType } from "./CreateAnnonceType";
import { JobInformationStep } from "./steps/JobInformationStep";
import { DescriptionStep } from "./steps/DescriptionStep";
import { PreferencesStep } from "./steps/PreferencesStep";
import { QuestionsStep } from "./steps/QuestionsStep";
import { VerificationStep } from "./steps/VerificationStep";

export function CreateAnnonceSteps() {
  const { currentStep, annonceType } = useCreateAnnonceStore();

  // If no annonce type is selected, show the type selection screen
  if (!annonceType) {
    return <CreateAnnonceType />;
  }

  // Once type is selected, show the steps
  const renderStep = () => {
    switch (currentStep) {
      case "job-information":
        if (annonceType === "new") {
          return <JobInformationStep />;
        }
        // We'll implement the existing annonce flow later
        return <div>Existing Annonce Details Step</div>;
      case "description-annonce":
        return <DescriptionStep />;
      case "preferences":
        return <PreferencesStep />;
      case "questions":
        return <QuestionsStep />;
      case "verification":
        return <VerificationStep />;
      default:
        return <JobInformationStep />;
    }
  };

  return renderStep();
}
