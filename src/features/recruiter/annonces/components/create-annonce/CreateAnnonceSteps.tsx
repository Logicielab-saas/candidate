"use client";

import { useCreateAnnonceStore } from "../../store/create-annonce-store";
import { CreateAnnonceType } from "./CreateAnnonceType";
import { BaseInformationStep } from "./steps/BaseInformationStep";
import { JobTypeStep } from "./steps/JobTypeStep";
import { SalaryStep } from "./steps/SalaryStep";
import { DescriptionStep } from "./steps/DescriptionStep";

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
        return <SalaryStep />;
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
