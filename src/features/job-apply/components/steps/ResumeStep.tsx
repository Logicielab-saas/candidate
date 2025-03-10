/**
 * ResumeStep - First step of the job application process
 *
 * Displays the user's resume using the PDFViewer component
 * Allows users to select between Postuly CV and their own uploaded CV
 * Provides preview capabilities for both options
 */

"use client";

import { PDFViewer } from "@/features/candidature/(profile)/components/PDFViewer";
import { Button } from "@/components/ui/button";
import { useJobApplyStore } from "../../store/useJobApplyStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  CheckCircle,
  Upload,
  FileText,
  User,
  RefreshCw,
} from "lucide-react";
import { useState, useRef } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tabsListStyles, tabTriggerStyles } from "@/core/styles/tabs";

export function ResumeStep() {
  const { resumeData, setResumeData, nextStep } = useJobApplyStore();
  const [isConfirmed, setIsConfirmed] = useState(resumeData.isUploaded);
  const [selectedCVType, setSelectedCVType] = useState<"postuly" | "user">(
    resumeData.userCVPath ? "user" : "postuly"
  );
  const [userCVPath, setUserCVPath] = useState<string | null>(
    resumeData.userCVPath || null
  );
  const [activeTab, setActiveTab] = useState<string>("preview");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle CV type selection
  const handleCVTypeChange = (value: "postuly" | "user") => {
    setSelectedCVType(value);

    // Update the resume path based on selection
    if (value === "postuly") {
      setResumeData({
        resumePath: resumeData.postulyCVPath || "/cvs/mycv.pdf",
        isUploaded: false,
      });
      setIsConfirmed(false);
    } else if (value === "user" && userCVPath) {
      setResumeData({
        resumePath: userCVPath,
        isUploaded: true,
      });
      // Auto-confirm when selecting user CV that was already uploaded
      setIsConfirmed(true);
    }
  };

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      // In a real implementation, this would upload the file to a server
      // For now, we'll create a temporary URL for the file
      const fileURL = URL.createObjectURL(file);
      setUserCVPath(fileURL);

      // Update the resume data
      setResumeData({
        resumePath: fileURL,
        isUploaded: true,
        userCVPath: fileURL,
      });

      // Switch to user CV type
      setSelectedCVType("user");

      // Auto-confirm when uploading a new CV
      setIsConfirmed(true);

      // Switch to preview tab
      setActiveTab("preview");
    }
  };

  // Trigger file input click
  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleConfirmResume = () => {
    setResumeData({
      ...resumeData,
      isUploaded: true,
    });
    setIsConfirmed(true);
  };

  const handleContinue = () => {
    nextStep();
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Votre CV</CardTitle>
        <CardDescription>
          Sélectionnez et vérifiez votre CV avant de continuer
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={cn(tabsListStyles.home)}>
            <TabsTrigger value="select" className={cn(tabTriggerStyles.home)}>
              Sélectionner un CV
            </TabsTrigger>
            <TabsTrigger value="preview" className={cn(tabTriggerStyles.home)}>
              Prévisualiser
            </TabsTrigger>
          </TabsList>

          <TabsContent value="select" className="space-y-6">
            <RadioGroup
              value={selectedCVType}
              onValueChange={(value) =>
                handleCVTypeChange(value as "postuly" | "user")
              }
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem
                  value="postuly"
                  id="postuly"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="postuly"
                  className={cn(
                    "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer",
                    selectedCVType === "postuly" && "border-primary"
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
                  id="user"
                  className="peer sr-only"
                  disabled={!userCVPath}
                />
                <Label
                  htmlFor="user"
                  className={cn(
                    "flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer",
                    selectedCVType === "user" && "border-primary",
                    !userCVPath &&
                      "opacity-70 cursor-not-allowed hover:bg-popover hover:text-foreground"
                  )}
                >
                  <FileText className="mb-3 h-6 w-6" />
                  <div className="space-y-1 text-center">
                    <p className="text-sm font-medium leading-none">
                      Mon CV personnel
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {userCVPath
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
                onClick={triggerFileUpload}
              >
                {userCVPath ? (
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
              <PDFViewer url={resumeData.resumePath} />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row gap-4 sm:justify-between">
        {!isConfirmed ? (
          <Button
            variant="default"
            className="flex items-center gap-2 w-full sm:w-auto"
            onClick={handleConfirmResume}
            disabled={selectedCVType === "user" && !userCVPath}
          >
            <CheckCircle className="h-4 w-4" />
            Confirmer ce CV
          </Button>
        ) : (
          <div className="flex items-center gap-2 text-primary">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">CV confirmé</span>
          </div>
        )}

        {isConfirmed && (
          <Button
            onClick={handleContinue}
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            Continuer vers les informations personnelles
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
