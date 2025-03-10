/**
 * ResumeStep - First step of the job application process
 *
 * Displays the user's resume using the PDFViewer component
 * Allows users to confirm their resume and proceed to the next step
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
import { ArrowRight, CheckCircle } from "lucide-react";
import { useState } from "react";

export function ResumeStep() {
  const { resumeData, setResumeData, nextStep } = useJobApplyStore();
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirmResume = () => {
    setResumeData({ isUploaded: true });
    setIsConfirmed(true);
  };

  const handleContinue = () => {
    nextStep();
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Your Resume</CardTitle>
        <CardDescription>
          Review your resume before continuing with your application
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col items-center">
        <div className="w-full max-w-3xl mb-6">
          <PDFViewer url={resumeData.resumePath} />
        </div>

        {!isConfirmed ? (
          <Button
            variant="default"
            className="flex items-center gap-2 mt-4"
            onClick={handleConfirmResume}
          >
            <CheckCircle className="h-4 w-4" />
            Confirm Resume
          </Button>
        ) : (
          <div className="flex items-center gap-2 text-primary mt-4">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">Resume confirmed</span>
          </div>
        )}
      </CardContent>

      {isConfirmed && (
        <CardFooter className="flex justify-end">
          <Button onClick={handleContinue} className="flex items-center gap-2">
            Continue to Personal Information
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
