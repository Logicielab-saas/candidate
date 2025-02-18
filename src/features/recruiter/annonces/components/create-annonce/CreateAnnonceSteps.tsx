"use client";

import { useCreateAnnonceStore } from "../../store/create-annonce-store";
import { CreateAnnonceType } from "./CreateAnnonceType";
import { JobInformationStep } from "./steps/JobInformationStep";
import { DescriptionStep } from "./steps/DescriptionStep";

export function CreateAnnonceSteps() {
  const { currentStep, annonceType } = useCreateAnnonceStore();

  const renderStep = () => {
    switch (currentStep) {
      case "type":
        return <CreateAnnonceType />;
      case "job-information":
        if (annonceType === "new") {
          return <JobInformationStep />;
        }
        // We'll implement the existing annonce flow later
        return <div>Existing Annonce Details Step</div>;
      case "description-annonce":
        return <DescriptionStep />;
      case "preview":
        return <div>Preview Step (Coming Soon)</div>;
      default:
        return <CreateAnnonceType />;
    }
  };

  return renderStep();
}
