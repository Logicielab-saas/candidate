"use client";

import { useCreateAnnonceStore } from "../../store/create-annonce-store";
import { CreateAnnonceType } from "./CreateAnnonceType";
import { CreateNewAnnonce } from "./CreateNewAnnonce";

export function CreateAnnonceSteps() {
  const { currentStep, annonceType } = useCreateAnnonceStore();

  const renderStep = () => {
    switch (currentStep) {
      case "type":
        return <CreateAnnonceType />;
      case "details":
        // If annonceType is "new", show CreateNewAnnonce
        if (annonceType === "new") {
          return <CreateNewAnnonce />;
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
