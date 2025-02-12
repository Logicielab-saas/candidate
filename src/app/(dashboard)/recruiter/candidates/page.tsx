import { Button } from "@/components/ui/button";
import { CandidateFiltersMenu } from "@/features/recruiter/candidatures/components/CandidateFiltersMenu";
import React from "react";

const CandidatesPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between w-full">
        <div className="flex-1">
          <p className="text-2xl font-bold">Candidat(e)s</p>
        </div>
        <Button className="mt-2">Publier une annonce</Button>
      </div>
      <CandidateFiltersMenu />
    </div>
  );
};

export default CandidatesPage;
