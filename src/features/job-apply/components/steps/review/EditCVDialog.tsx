/**
 * EditCVDialog - Dialog for editing CV in review step
 *
 * Allows users to:
 * - Switch between Postuly and personal CV
 * - Upload a new CV
 * - Skip CV if not required
 */

"use client";

import { useJobApplyStore } from "@/features/job-apply/store/useJobApplyStore";
import type { ResumeData } from "@/features/job-apply/store/useJobApplyStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { PDFViewer } from "@/features/candidature/(profile)/components/PDFViewer";
import { cn } from "@/lib/utils";
import {
  FileText,
  Upload,
  User,
  RefreshCw,
  ArrowRightCircle,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { tabsListStyles, tabTriggerStyles } from "@/core/styles/tabs";

interface EditCVDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isCVRequired: boolean;
}

interface LocalCVState {
  selectedCVType: "postuly" | "user" | undefined;
  userCVPath: string | undefined;
  resumePath: string;
  isUploaded: boolean;
  skipped: boolean;
}

export function EditCVDialog({
  open,
  onOpenChange,
  isCVRequired,
}: EditCVDialogProps) {
  const { resumeData, setResumeData } = useJobApplyStore();

  // Local state for temporary changes
  const [localState, setLocalState] = useState<LocalCVState>({
    selectedCVType: resumeData.selectedCVType,
    userCVPath: resumeData.userCVPath,
    resumePath: resumeData.resumePath,
    isUploaded: resumeData.isUploaded || false,
    skipped: resumeData.skipped || false,
  });

  const [activeTab, setActiveTab] = useState<string>("select");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset local state when dialog opens
  useEffect(() => {
    if (open) {
      setLocalState({
        selectedCVType: resumeData.skipped
          ? undefined
          : resumeData.selectedCVType || "postuly",
        userCVPath: resumeData.userCVPath,
        resumePath: resumeData.resumePath,
        isUploaded: resumeData.isUploaded || false,
        skipped: resumeData.skipped || false,
      });
      setActiveTab("select");
    }
  }, [open, resumeData]);

  // Handle CV type selection
  const handleCVTypeChange = (value: "postuly" | "user") => {
    setActiveTab("preview");

    // Update local state based on selection
    if (value === "postuly") {
      setLocalState({
        ...localState,
        selectedCVType: "postuly",
        resumePath: resumeData.postulyCVPath || "/cvs/mycv.pdf",
        isUploaded: false,
        skipped: false,
      });
    } else if (value === "user" && localState.userCVPath) {
      setLocalState({
        ...localState,
        selectedCVType: "user",
        resumePath: localState.userCVPath,
        isUploaded: true,
        skipped: false,
      });
    }
  };

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const fileURL = URL.createObjectURL(file);

      // Update local state
      setLocalState({
        selectedCVType: "user",
        userCVPath: fileURL,
        resumePath: fileURL,
        isUploaded: true,
        skipped: false,
      });

      // Switch to preview tab
      setActiveTab("preview");
    }
  };

  // Handle skipping CV
  const handleSkip = () => {
    setResumeData({
      ...resumeData,
      selectedCVType: undefined,
      skipped: true,
    });
    onOpenChange(false);
  };

  // Handle saving changes
  const handleSave = () => {
    // Only update store when saving
    const updatedData: Partial<ResumeData> = {
      selectedCVType: localState.selectedCVType,
      userCVPath: localState.userCVPath,
      resumePath: localState.resumePath,
      isUploaded: localState.isUploaded,
      skipped: localState.skipped,
    };

    setResumeData(updatedData);
    onOpenChange(false);
  };

  // Handle dialog close without saving
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Reset local state when closing without saving
      setLocalState({
        selectedCVType: resumeData.selectedCVType,
        userCVPath: resumeData.userCVPath,
        resumePath: resumeData.resumePath,
        isUploaded: resumeData.isUploaded || false,
        skipped: resumeData.skipped || false,
      });
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0">
        <ScrollArea className="h-full max-h-[90vh]">
          <div className="p-6">
            <DialogHeader>
              <DialogTitle>Modifier votre CV</DialogTitle>
              <DialogDescription>
                Sélectionnez le type de CV que vous souhaitez utiliser
              </DialogDescription>
            </DialogHeader>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full mt-6"
            >
              <TabsList
                className={cn(
                  "grid w-full grid-cols-2 mb-6",
                  tabsListStyles.home
                )}
              >
                <TabsTrigger value="select" className={tabTriggerStyles.home}>
                  Sélectionner un CV
                </TabsTrigger>
                <TabsTrigger value="preview" className={tabTriggerStyles.home}>
                  Prévisualiser
                </TabsTrigger>
              </TabsList>

              <TabsContent value="select" className="space-y-6">
                <RadioGroup
                  value={localState.selectedCVType ?? undefined}
                  onValueChange={(value) =>
                    handleCVTypeChange(value as "postuly" | "user")
                  }
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div>
                    <RadioGroupItem
                      value="postuly"
                      id="postuly-edit"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="postuly-edit"
                      className={cn(
                        "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer",
                        localState.selectedCVType === "postuly" &&
                          "border-primary"
                      )}
                    >
                      <User className="mb-3 h-6 w-6" />
                      <div className="space-y-1 text-center">
                        <p className="text-sm font-medium leading-none">
                          CV Postuly
                        </p>
                        <p className="text-sm text-muted-foreground">
                          CV généré par Postuly
                        </p>
                      </div>
                    </Label>
                  </div>

                  <div>
                    <RadioGroupItem
                      value="user"
                      id="user-edit"
                      className="peer sr-only"
                      disabled={!localState.userCVPath}
                    />
                    <Label
                      htmlFor="user-edit"
                      className={cn(
                        "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer",
                        localState.selectedCVType === "user" &&
                          "border-primary",
                        !localState.userCVPath &&
                          "opacity-70 cursor-not-allowed hover:bg-popover hover:text-foreground"
                      )}
                    >
                      <FileText className="mb-3 h-6 w-6" />
                      <div className="space-y-1 text-center">
                        <p className="text-sm font-medium leading-none">
                          Mon CV personnel
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {localState.userCVPath
                            ? "CV personnel téléchargé"
                            : "Aucun CV personnel"}
                        </p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>

                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {localState.userCVPath ? (
                      <>
                        <RefreshCw className="h-4 w-4" />
                        Remplacer mon CV
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4" />
                        Télécharger mon CV
                      </>
                    )}
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept=".pdf"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </div>
              </TabsContent>

              <TabsContent value="preview">
                <div className="w-full max-w-3xl mx-auto mb-6">
                  <ScrollArea className="h-[500px] max-sm:h-[300px]">
                    {localState.resumePath && (
                      <PDFViewer url={localState.resumePath} />
                    )}
                  </ScrollArea>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex flex-col sm:flex-row gap-4 sm:justify-end mt-6">
              {!isCVRequired && (
                <Button
                  variant="outline"
                  className="flex items-center gap-2 w-full sm:w-auto"
                  onClick={handleSkip}
                >
                  <ArrowRightCircle className="h-4 w-4" />
                  Passer cette étape
                </Button>
              )}

              <Button
                onClick={handleSave}
                className="flex items-center gap-2 w-full sm:w-auto"
                disabled={
                  localState.selectedCVType === "user" && !localState.userCVPath
                }
              >
                Enregistrer
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
