"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CandidatesList } from "./CandidatesList";
import { CandidateDetailsContent } from "./CandidateDetailsContent";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { PDFViewer } from "./PDFViewer";
import { useQueryState, parseAsString } from "nuqs";
import { PublierAnnonceLink } from "@/components/shared/PublierAnnonceLink";
/*
? This component displays the details of a selected candidate in a recruiter interface.
? It utilizes nuqs for URL state management to handle the candidate's ID and source.
? The layout adapts based on whether a source is present, displaying either a split layout for interviews or a three-column layout for candidate listings.
? The header includes navigation links and buttons for additional actions, while the content area shows the candidate's CV and details.
? Custom breakpoints are used to adjust the layout for different screen sizes of 3 rows < 1170px and 2 rows < 1635px and 1 row > 1635px.
*/

export function CandidateDetails() {
  const [candidateId, _setCandidateId] = useQueryState("id", parseAsString);
  const [source, _setSource] = useQueryState("source", parseAsString);

  const backUrl = () => {
    switch (source) {
      case "entretien":
        return "/recruiter/interviews";
      case "messagerie":
        return "/recruiter/messages";
      default:
        return "/recruiter/candidates";
    }
  };

  return (
    <div className="flex flex-col min-h-full gap-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full gap-4 shrink-0">
        <div className="flex flex-col w-full lg:w-auto lg:flex-row items-start lg:items-center gap-4">
          <div className="flex items-center gap-4">
            <Link
              href={backUrl()}
              className="cursor-pointer text-primaryHex-600 hover:text-primaryHex-500 dark:text-primaryHex-400 dark:hover:text-primaryHex-300 transition-colors bg-primaryHex-50 dark:bg-primaryHex-900/20 rounded-full p-2"
            >
              <ArrowLeft className="w-8 h-8 cursor-pointer" />
            </Link>
            <p className="text-2xl font-bold text-foreground">
              {source ? "Détails de la candidature" : "Candidat(e)s"}
            </p>
          </div>
          {!source && (
            <div className="w-full lg:w-auto lg:flex lg:items-center lg:gap-4">
              <Separator
                orientation="vertical"
                className="h-10 hidden lg:block"
              />
              <Button
                variant="outline"
                asChild
                className="w-full bg-accent hover:bg-accent/50"
              >
                <Link href="/recruiter/candidates">Liste Des Candidats</Link>
              </Button>
            </div>
          )}
        </div>
        {!source && <PublierAnnonceLink />}
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-6">
        {source ? (
          // Source present - 60/40 split layout
          <div className="grid grid-cols-1 [@media(min-width:1170px)]:grid-cols-[60fr_40fr] gap-6">
            {/* CV Display - 60% */}
            <div className="h-[calc(100vh-200px)]">
              <div className="w-full h-full">
                {candidateId && (
                  <PDFViewer key={candidateId} url="/cvs/mycv.pdf" />
                )}
              </div>
            </div>

            {/* Details - 40% */}
            <div className="h-[calc(100vh-200px)] overflow-y-auto">
              <CandidateDetailsContent candidateId={candidateId || undefined} />
            </div>
          </div>
        ) : (
          // No source - Original 3-column layout
          <div className="grid grid-cols-1 [@media(min-width:1170px)]:grid-cols-[300px_1fr] [@media(min-width:1635px)]:grid-cols-[300px_1fr_400px] gap-4">
            {/* Left column - List */}
            <div className="h-[calc(100vh-200px)]">
              <CandidatesList currentCandidateId={candidateId || undefined} />
            </div>

            {/* Center column - CV Display */}
            <div className="h-[calc(100vh-200px)]">
              <div className="w-full h-full">
                {candidateId && (
                  <PDFViewer key={candidateId} url="/cvs/mycv.pdf" />
                )}
              </div>
            </div>

            {/* Right column - Details */}
            <div className="[@media(min-width:1635px)]:h-[calc(100vh-200px)] col-span-full [@media(min-width:1635px)]:col-span-1 overflow-y-auto">
              <CandidateDetailsContent candidateId={candidateId || undefined} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
