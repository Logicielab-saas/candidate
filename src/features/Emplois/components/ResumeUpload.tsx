/**
 * ResumeUpload - Component for managing user's CV upload and download
 *
 * Features:
 * - Upload CV with drag and drop or file selection
 * - Preview uploaded CV
 * - Download existing CV
 * - Replace existing CV
 * - Uses resume files hooks for data management
 */

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { ResumeItem } from "@/components/shared/ResumeItem";
import { useFetchResumeFiles } from "@/features/candidature/(profile)/qualifications/hooks/use-resume-files";
import { ResumeSkeleton } from "@/features/candidature/(profile)/components/ResumeSkeleton";

export function ResumeUpload() {
  const { data: resumeFiles, isLoading } = useFetchResumeFiles();

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardContent className="space-y-6 pt-6">
          {isLoading ? (
            <ResumeSkeleton />
          ) : (
            <div className="border rounded-lg p-4">
              <ResumeItem
                type="custom"
                source="qualifications"
                resumeFiles={resumeFiles?.files || []}
              />
            </div>
          )}

          {/* Tips Section */}
          <div className="rounded-lg bg-muted/50 p-4">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
              Conseils pour votre CV
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
              <li>Utilisez un format clair et professionnel</li>
              <li>
                Mettez en avant vos réalisations plutôt que vos responsabilités
              </li>
              <li>Adaptez votre CV aux offres d&apos;emploi ciblées</li>
              <li>Vérifiez l&apos;orthographe et la grammaire</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
