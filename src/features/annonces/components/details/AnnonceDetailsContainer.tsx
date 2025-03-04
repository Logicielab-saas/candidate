"use client";

import { type Annonce } from "@/core/mockData/annonces";
import { AnnonceHeader } from "./AnnonceHeader";
import { AnnonceDescription } from "./AnnonceDescription";
import { AnnonceJobDetails } from "./AnnonceJobDetails";
// import { AnnonceQuestions } from "./components/AnnonceQuestions";
import { AnnonceActions } from "./AnnonceActions";

interface AnnonceDetailsContainerProps {
  annonce: Annonce;
}

export function AnnonceDetailsContainer({
  annonce,
}: AnnonceDetailsContainerProps) {
  function handleApply() {
    // TODO: Implement apply logic
    console.log("Applying to job:", annonce.baseInformation.jobTitle);
  }

  function handleSave() {
    // TODO: Implement save logic
    console.log("Saving job:", annonce.baseInformation.jobTitle);
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header */}
      <AnnonceHeader annonce={annonce} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          <AnnonceDescription annonce={annonce} />
          {/* <AnnonceQuestions annonce={annonce} /> */}
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <AnnonceJobDetails annonce={annonce} />
          <AnnonceActions
            annonce={annonce}
            onApply={handleApply}
            onSave={handleSave}
          />
        </div>
      </div>
    </div>
  );
}
