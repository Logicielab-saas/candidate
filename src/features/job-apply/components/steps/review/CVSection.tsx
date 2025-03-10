/**
 * CVSection - Review step CV section
 *
 * Displays CV information and allows editing through a dialog
 */

"use client";

import { FileText, Pencil } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { PDFViewer } from "@/features/candidature/(profile)/components/PDFViewer";
import { useState } from "react";
import { EditCVDialog } from "./EditCVDialog";
import { useJobApplyStore } from "@/features/job-apply/store/useJobApplyStore";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CVSectionProps {
  isCVRequired: boolean;
}

export function CVSection({ isCVRequired }: CVSectionProps) {
  const { resumeData } = useJobApplyStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">CV</h3>
        </div>
        <span
          className="text-primaryHex-600 font-bold rounded-full p-2 bg-primaryHex-100 hover:bg-primaryHex-200 hover:text-primaryHex-600 cursor-pointer"
          onClick={() => setIsDialogOpen(true)}
        >
          <Pencil className="h-5 w-5" />
        </span>
      </div>
      <Separator />
      {resumeData.skipped ? (
        <p className="text-muted-foreground italic">CV non requis</p>
      ) : (
        <>
          <p className="text-sm text-muted-foreground mb-4">
            Type de CV:{" "}
            <span className="font-medium text-foreground">
              {resumeData.selectedCVType === "postuly"
                ? "CV Postuly"
                : "CV Personnel"}
            </span>
          </p>
          <ScrollArea className="h-[300px] overflow-hidden rounded-lg border">
            <PDFViewer url={resumeData.resumePath} />
          </ScrollArea>
        </>
      )}

      <EditCVDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        isCVRequired={isCVRequired}
      />
    </div>
  );
}
