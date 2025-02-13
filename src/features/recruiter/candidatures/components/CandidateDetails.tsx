"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CandidatesList } from "./CandidatesList";
import { useSearchParams } from "next/navigation";
import { CandidateDetailsContent } from "./CandidateDetailsContent";
import { CandidateNavigationPanel } from "./CandidateNavigationPanel";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function CandidateDetails() {
  const searchParams = useSearchParams();
  const currentCandidateId = searchParams.get("id");

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between w-full gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/recruiter/candidates"
              className="cursor-pointer text-primaryHex-600 hover:text-primaryHex-500 transition-colors
            dark:bg-primaryHex-900/20 dark:text-primaryHex-400 bg-primaryHex-50 rounded-full p-2"
            >
              <ArrowLeft className="w-8 h-8 cursor-pointer" />
            </Link>
          </div>
          <p className="text-2xl font-bold">Candidat(e)s</p>
          <Separator orientation="vertical" className="h-10" />
          <Button variant="outline" className="bg-accent hover:bg-accent/50">
            Liste Des Candidats
          </Button>
        </div>
        <Button>Publier une annonce</Button>
      </div>

      {/* Content */}
      <div className="flex gap-6">
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
