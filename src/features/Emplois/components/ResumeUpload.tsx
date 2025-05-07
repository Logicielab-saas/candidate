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
import { ResumeSkeleton } from "@/features/candidature/(profile)/components/ResumeSkeleton";
import { useTranslations } from "next-intl";
import { useProfile } from "@/features/candidature/(profile)/hooks/use-profile";

export function ResumeUpload() {
  const { data: userProfile, isLoading } = useProfile();
  const t = useTranslations("emplois.resumeUpload");

  // Get the tips array from translations
  const tips = [
    t.raw("tips.list.format"),
    t.raw("tips.list.achievements"),
    t.raw("tips.list.tailored"),
    t.raw("tips.list.grammar"),
  ];

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
                resumeFiles={userProfile?.files || []}
              />
            </div>
          )}

          {/* Tips Section */}
          <div className="rounded-lg bg-muted/50 p-4">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
              {t("tips.title")}
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
              {tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
