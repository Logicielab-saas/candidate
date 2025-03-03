/**
 * SpamReportDialog - Dialog for reporting messages as spam
 *
 * Displays a form with various reporting options and allows users
 * to provide additional context for their report.
 */

"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { type Message } from "@/core/mockData/messages-data";
import { AlertCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SpamReportDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  messageToReport: Message | null;
  onConfirm: (reason: string, details: string) => void;
}

const REPORT_REASONS = [
  {
    id: "advertising",
    label: "Publicité non sollicitée",
    description: "Message promotionnel ou publicitaire non désiré",
  },
  {
    id: "inappropriate",
    label: "Contenu inapproprié ou offensant",
    description: "Message contenant du contenu discriminatoire ou offensant",
  },
  {
    id: "scam",
    label: "Tentative d'arnaque",
    description: "Message frauduleux ou tentative d'escroquerie",
  },
  {
    id: "misleading",
    label: "Information trompeuse",
    description: "Fausses informations sur le poste ou l'entreprise",
  },
  {
    id: "irrelevant",
    label: "Sans rapport avec ma candidature",
    description: "Message sans lien avec mes postulations",
  },
  {
    id: "other",
    label: "Autre",
    description: "Autre raison non listée",
  },
];

export function SpamReportDialog({
  isOpen,
  onOpenChange,
  messageToReport,
  onConfirm,
}: SpamReportDialogProps) {
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [additionalDetails, setAdditionalDetails] = useState("");

  if (!messageToReport) return null;

  const recruiter = messageToReport.participants.find(
    (p) => p.role === "Recruteur"
  );

  const handleConfirm = () => {
    if (selectedReason) {
      onConfirm(selectedReason, additionalDetails);
      onOpenChange(false);
      // Reset form
      setSelectedReason("");
      setAdditionalDetails("");
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            Signaler un problème
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-4">
              <div>
                Vous souhaitez signaler la conversation avec{" "}
                <span className="font-medium text-foreground">
                  {messageToReport.company.name}
                </span>
                {recruiter && (
                  <>
                    {" "}
                    concernant le poste de{" "}
                    <span className="font-medium text-foreground">
                      {messageToReport.job.name}
                    </span>
                  </>
                )}
                .
              </div>
              <div className="text-sm">
                Votre signalement nous aidera à maintenir un environnement sûr
                et professionnel pour tous les utilisateurs.
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-4">
            <Label className="text-base">
              Pour quelle raison souhaitez-vous signaler cette conversation ?
              <span className="text-destructive ml-1">*</span>
            </Label>
            <RadioGroup
              value={selectedReason}
              onValueChange={setSelectedReason}
              className="space-y-2"
            >
              {REPORT_REASONS.map((reason) => (
                <div key={reason.id} className="flex items-start space-x-3">
                  <RadioGroupItem
                    value={reason.id}
                    id={reason.id}
                    className="mt-1"
                  />
                  <Label
                    htmlFor={reason.id}
                    className="grid cursor-pointer leading-none"
                  >
                    <span className="font-medium">{reason.label}</span>
                    <span className="text-sm text-muted-foreground mt-1.5">
                      {reason.description}
                    </span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label className="text-base">
              Informations complémentaires{" "}
              <span className="text-sm text-muted-foreground">
                (facultatif)
              </span>
            </Label>
            <Textarea
              placeholder="Ajoutez des détails pour nous aider à mieux comprendre la situation..."
              value={additionalDetails}
              onChange={(e) => setAdditionalDetails(e.target.value)}
              className="resize-none"
              rows={3}
            />
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setSelectedReason("");
              setAdditionalDetails("");
            }}
          >
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className={cn(
              "bg-destructive text-destructive-foreground hover:bg-destructive/90",
              !selectedReason && "opacity-50 cursor-not-allowed"
            )}
            disabled={!selectedReason}
          >
            Envoyer le signalement
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
