import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import type { EmploisApplied, GetMeResponse } from "@/core/interfaces";
import { FileText } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ResumeItem } from "@/components/shared/ResumeItem";

interface ApplicationDetailsBodyProps {
  application: EmploisApplied;
  profile?: GetMeResponse;
}

export function ApplicationDetailsBody({
  application,
  profile,
}: ApplicationDetailsBodyProps) {
  // Format resume files for ResumeItem component
  const resumeFiles =
    profile?.resume?.resumeFiles?.map((file) => ({
      ...file,
      uuid: file.uuid,
      name: file.name,
      file: file.file_url, // Assuming file_url is the correct property
    })) || [];

  return (
    <Card className="flex flex-col gap-4 shadow-md rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Détails de la candidature
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {/* Candidate Informations */}
        <div className="shadow dark:border p-4 rounded-lg flex flex-col gap-4">
          <h6 className="text-muted-foreground font-semibold text-lg">
            Informations de contact
          </h6>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-semibold min-w-[120px]">
                  Nom complet:
                </span>
                <span className="text-muted-foreground break-all">
                  {profile?.first_name} {profile?.last_name}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-semibold min-w-[120px]">Email:</span>
                <span className="text-muted-foreground break-all">
                  {profile?.email}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-semibold min-w-[120px]">Téléphone:</span>
                <span className="text-muted-foreground">
                  {profile?.phone || "Non spécifié"}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-semibold min-w-[120px]">Adresse:</span>
                <span className="text-muted-foreground break-all">
                  {profile?.address || "Non spécifié"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Resume Section */}
        {resumeFiles.length > 0 && (
          <>
            <div className="shadow dark:border p-4 rounded-lg">
              <ResumeItem
                type="custom"
                source="profile"
                resumeFiles={resumeFiles}
                removeAdd={true}
              />
            </div>
            <Separator />
          </>
        )}

        {/* Cover Letter if exists */}
        {application.cover_letter && (
          <>
            <div className="shadow dark:border p-4 rounded-lg flex flex-col items-start gap-2">
              <h6 className="text-muted-foreground font-semibold">
                Lettre de motivation
              </h6>
              <div className="prose dark:prose-invert max-w-none">
                {application.cover_letter}
              </div>
            </div>
            <Separator />
          </>
        )}

        {/* Additional Files if exists */}
        {application.file && (
          <>
            <div className="shadow dark:border p-4 rounded-lg flex flex-col items-start gap-2">
              <h6 className="text-muted-foreground font-semibold">
                Documents supplémentaires
              </h6>
              <a
                href={application.file}
                download
                className="text-primaryHex-500 hover:bg-accent p-2 rounded-lg flex items-center gap-2 transition duration-200"
              >
                <FileText className="h-5 w-5 text-primaryHex-600" />
                Télécharger le document
              </a>
            </div>
            <Separator />
          </>
        )}
      </CardContent>
    </Card>
  );
}
