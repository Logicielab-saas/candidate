"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useCreateAnnonceStore } from "../../store/create-annonce-store";
import { Separator } from "@/components/ui/separator";
import { ContractType } from "../../common";
import { cn } from "@/lib/utils";

const CONTRACT_TYPE_LABELS: Record<ContractType, string> = {
  [ContractType.FULL_TIME]: "Temps plein",
  [ContractType.PART_TIME]: "Temps partiel",
  [ContractType.CDI]: "CDI",
  [ContractType.INTERIM]: "Intérim",
  [ContractType.CDD]: "CDD",
  [ContractType.FREELANCE]: "Profession libérale",
  [ContractType.INTERNSHIP]: "Stage",
  [ContractType.APPRENTICESHIP]: "Apprentissage/Alternance",
};

export function AnnoncePreviewDialog() {
  const { baseInformation, jobTypeInformation, description } =
    useCreateAnnonceStore();

  const hasDescription = description && description.trim() !== "";
  console.log("Current description:", description); // Debug log

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Eye className="h-4 w-4" />
          Aperçu
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Aperçu de l&apos;annonce</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Header Section */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">
              {baseInformation.jobTitle || "Titre du poste"}
            </h2>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>{baseInformation.promotionLocation}</span>
              {jobTypeInformation.contractType && (
                <>
                  <span>•</span>
                  <span>
                    {
                      CONTRACT_TYPE_LABELS[
                        jobTypeInformation.contractType as ContractType
                      ]
                    }
                  </span>
                </>
              )}
            </div>
          </div>

          <Separator />

          {/* Job Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Détails du poste</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  Nombre de postes
                </p>
                <p className="font-medium">{baseInformation.numberOfPeople}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Type de contrat</p>
                <p className="font-medium">
                  {jobTypeInformation.contractType
                    ? CONTRACT_TYPE_LABELS[
                        jobTypeInformation.contractType as ContractType
                      ]
                    : "-"}
                </p>
              </div>
              {jobTypeInformation.partTimeDetails && (
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Temps partiel</p>
                  <p className="font-medium">
                    {jobTypeInformation.partTimeDetails.hoursPerWeek}h/semaine
                  </p>
                </div>
              )}
              {(jobTypeInformation.cddDetails ||
                jobTypeInformation.interimDetails ||
                jobTypeInformation.internshipDetails) && (
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Durée</p>
                  <p className="font-medium">
                    {jobTypeInformation.cddDetails?.duration ||
                      jobTypeInformation.interimDetails?.duration ||
                      jobTypeInformation.internshipDetails?.duration}{" "}
                    {jobTypeInformation.cddDetails?.unit ||
                      jobTypeInformation.interimDetails?.unit ||
                      jobTypeInformation.internshipDetails?.unit}
                  </p>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Description */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Description du poste</h3>
            {hasDescription ? (
              <div
                className={cn(
                  "prose prose-zinc dark:prose-invert max-w-none",
                  "prose-p:leading-relaxed prose-ul:leading-relaxed"
                )}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            ) : (
              <p className="text-muted-foreground">
                Aucune description fournie
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
