"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CandidatesList } from "./CandidatesList";
import { useSearchParams } from "next/navigation";
import { CandidateDetailsContent } from "./CandidateDetailsContent";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { PDFViewer } from "./PDFViewer";

export function CandidateDetails() {
  const searchParams = useSearchParams();
  const currentCandidateId = searchParams.get("id");
  const source = searchParams.get("source");

  return (
    <div className="flex flex-col min-h-full gap-6">
      {/* Header */}
      <div className="flex items-center justify-between w-full gap-4 shrink-0">
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
      <div className="grid grid-cols-1 gap-6">
        {source ? (
          // Source present - 60/40 split layout
          <div className="grid grid-cols-1 2lg:grid-cols-[60fr_40fr] gap-6">
            {/* CV Display - 60% */}
            <div className="h-[calc(100vh-200px)]">
              <div className="w-full h-full">
                {currentCandidateId && (
                  <PDFViewer key={currentCandidateId} url="/cvs/mycv.pdf" />
                )}
              </div>
            </div>

            {/* Details - 40% */}
            <div className="h-[calc(100vh-200px)] overflow-y-auto">
              <CandidateDetailsContent
                candidateId={currentCandidateId || undefined}
              />
            </div>
          </div>
        ) : (
          // No source - Original 3-column layout
          <div className="grid grid-cols-1 2lg:grid-cols-[300px_1fr] 3xl:grid-cols-[300px_1fr_400px] gap-4">
            {/* Left column - List */}
            <div className="h-[calc(100vh-200px)]">
              <CandidatesList
                currentCandidateId={currentCandidateId || undefined}
              />
            </div>

            {/* Center column - CV Display */}
            <div className="h-[calc(100vh-200px)]">
              <div className="w-full h-full">
                {currentCandidateId && (
                  <PDFViewer key={currentCandidateId} url="/cvs/mycv.pdf" />
                )}
              </div>
            </div>

            {/* Right column - Details */}
            <div className="3xl:h-[calc(100vh-200px)] col-span-full 3xl:col-span-1 overflow-y-auto">
              <CandidateDetailsContent
                candidateId={currentCandidateId || undefined}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
