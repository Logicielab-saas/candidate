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
import { useTranslations } from "next-intl";

interface ReportReason {
  id: string;
  label: string;
  description: string;
}

interface SpamReportDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  messageToReport: Message | null;
  onConfirm: (reason: string, details: string) => void;
}

export function SpamReportDialog({
  isOpen,
  onOpenChange,
  messageToReport,
  onConfirm,
}: SpamReportDialogProps) {
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [additionalDetails, setAdditionalDetails] = useState("");

  // Translations
  const tCommon = useTranslations("common");
  const tMessages = useTranslations("messages");

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
            {tMessages("chat.report.title")}
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-4">
              <div>
                {tMessages("chat.report.confirmMessage", {
                  company: messageToReport.company.name,
                  job: messageToReport.job.name,
                  hasRecruiter: recruiter ? "true" : "false",
                })}
              </div>
              <div className="text-sm">
                {tMessages("chat.report.description")}
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-4">
            <Label className="text-base">
              {tMessages("chat.report.reasonLabel")}
              <span className="text-destructive ml-1">
                {tCommon("form.required")}
              </span>
            </Label>
            <RadioGroup
              value={selectedReason}
              onValueChange={setSelectedReason}
              className="space-y-2"
            >
              {(tMessages.raw("chat.report.reasons") as ReportReason[]).map(
                (reason) => (
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
                )
              )}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label className="text-base">
              {tMessages("chat.report.additionalInfo")}{" "}
              <span className="text-sm text-muted-foreground">
                {tCommon("form.optional")}
              </span>
            </Label>
            <Textarea
              placeholder={tMessages("chat.report.additionalInfoPlaceholder")}
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
            {tCommon("actions.cancel")}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className={cn(
              "bg-destructive text-destructive-foreground hover:bg-destructive/90",
              !selectedReason && "opacity-50 cursor-not-allowed"
            )}
            disabled={!selectedReason}
          >
            {tMessages("chat.report.submit")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
