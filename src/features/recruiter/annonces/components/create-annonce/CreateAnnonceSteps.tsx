"use client";

import { useCreateAnnonceStore } from "../../store/create-annonce-store";
import { CreateAnnonceType } from "./CreateAnnonceType";
import { BaseInformationStep } from "./steps/BaseInformationStep";

export function CreateAnnonceSteps() {
  const { currentStep, annonceType } = useCreateAnnonceStore();

  const renderStep = () => {
    switch (currentStep) {
      case "type":
        return <CreateAnnonceType />;
      case "details":
        if (annonceType === "new") {
          return <BaseInformationStep />;
        }
        // We'll implement the existing annonce flow later
        return <div>Existing Annonce Details Step</div>;
      case "preview":
        return <div>Preview Step</div>;
      default:
        return <CreateAnnonceType />;
    }
  };

  return renderStep();
}
