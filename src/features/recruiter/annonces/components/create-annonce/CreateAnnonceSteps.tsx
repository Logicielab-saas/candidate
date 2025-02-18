"use client";

import { useCreateAnnonceStore } from "../../store/create-annonce-store";
import { CreateAnnonceType } from "./CreateAnnonceType";
import { BaseInformationStep } from "./steps/BaseInformationStep";
import { JobTypeStep } from "./steps/JobTypeStep";

export function CreateAnnonceSteps() {
  const { currentStep, annonceType } = useCreateAnnonceStore();

  const renderStep = () => {
    switch (currentStep) {
      case "type":
        return <CreateAnnonceType />;
      case "base-information":
        if (annonceType === "new") {
          return <BaseInformationStep />;
        }
        // We'll implement the existing annonce flow later
        return <div>Existing Annonce Details Step</div>;
      case "job-type":
        return <JobTypeStep />;
      case "salary":
        return <div>Salary Step (Coming Soon)</div>;
      case "description-annonce":
        return <div>Description Step (Coming Soon)</div>;
      case "preview":
        return <div>Preview Step</div>;
      default:
        return <CreateAnnonceType />;
    }
  };

  return renderStep();
}
