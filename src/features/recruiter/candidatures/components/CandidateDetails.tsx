"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CandidatesList } from "./CandidatesList";
import { useSearchParams } from "next/navigation";
import { CandidateDetailsContent } from "./CandidateDetailsContent";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { PDFViewer } from "./PDFViewer";
import { cn } from "@/lib/utils";

export function CandidateDetails() {
  const searchParams = useSearchParams();
  const currentCandidateId = searchParams.get("id");
  const source = searchParams.get("source");

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between w-full gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <Link
              href={
                source === "entretien"
                  ? "/recruiter/interviews"
                  : "/recruiter/candidates"
              }
              className="cursor-pointer text-primaryHex-600 hover:text-primaryHex-500 dark:text-primaryHex-400 dark:hover:text-primaryHex-300 transition-colors bg-primaryHex-50 dark:bg-primaryHex-900/20 rounded-full p-2"
            >
              <ArrowLeft className="w-8 h-8 cursor-pointer" />
            </Link>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {source === "entretien"
              ? "Détails de la candidature"
              : "Candidat(e)s"}
          </p>
          {!source && (
            <>
              <Separator orientation="vertical" className="h-10" />
              <Link href="/recruiter/candidates">
                <Button
                  variant="outline"
                  className="bg-accent hover:bg-accent/50"
                >
                  Liste Des Candidats
                </Button>
              </Link>
            </>
          )}
        </div>
        {!source && <Button>Publier une annonce</Button>}
      </div>

      {/* Content */}
      <div className="flex gap-6">
        {/* Left column - List */}
        {!source && (
          <div className="">
            <CandidatesList
              currentCandidateId={currentCandidateId || undefined}
            />
          </div>
        )}

        {/* Center column - CV Display */}
        <div className={cn("flex-1 min-w-[500px]", !source && "max-w-[500px]")}>
          {currentCandidateId && (
            <PDFViewer key={currentCandidateId} url="/cvs/mycv.pdf" />
          )}
        </div>

        {/* Right column - Details */}
        <div className="max-w-[400px] shrink-0">
          <CandidateDetailsContent
            candidateId={currentCandidateId || undefined}
          />
        </div>
      </div>
    </div>
  );
}
