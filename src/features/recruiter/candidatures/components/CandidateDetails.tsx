"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BackArrow } from "@/components/shared/BackArrow";
import { CandidatesList } from "./CandidatesList";
import { useSearchParams } from "next/navigation";
import { CandidateDetailsContent } from "./CandidateDetailsContent";
import { CandidateNavigationPanel } from "./CandidateNavigationPanel";

export function CandidateDetails() {
  const searchParams = useSearchParams();
  const currentCandidateId = searchParams.get("id");

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between w-full">
          <div className="flex-1 flex items-center">
            <p className="text-2xl font-bold">Candidat(e)s</p>
            <Separator className="mx-2 h-10" orientation="vertical" />
            <Button variant="outline" className="bg-accent hover:bg-accent/50">
              Liste Des Candidats
            </Button>
          </div>
          <Button className="mt-2">Publier une annonce</Button>
        </div>
        <div className="mt-2">
          <BackArrow title="Retour" textSize="text-xl" />
        </div>
      </div>

      {/* Content */}
      <div className="flex gap-6 h-[calc(100vh-510px)]">
        {/* Left column - List */}
        <div className="w-[300px]">
          <CandidatesList
            currentCandidateId={currentCandidateId || undefined}
          />
        </div>

        {/* Center column - Details */}
        <div className="flex-1">
          <CandidateDetailsContent
            candidateId={currentCandidateId || undefined}
          />
        </div>

        {/* Right column - Navigation Panel */}
        <CandidateNavigationPanel
          currentCandidateId={currentCandidateId || undefined}
        />
      </div>
    </div>
  );
}
