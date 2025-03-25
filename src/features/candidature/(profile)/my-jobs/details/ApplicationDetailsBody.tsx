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
            Contact Information
          </h6>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <span className="font-semibold">Nom complet:</span>
              <span className="text-muted-foreground">
                {profile?.first_name} {profile?.last_name}
              </span>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold">Email:</span>
              <span className="text-muted-foreground">{profile?.email}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold">Téléphone:</span>
              <span className="text-muted-foreground">
                {profile?.phone || "Non spécifié"}
              </span>
            </div>
            <div className="flex gap-2">
              <span className="font-semibold">Adresse:</span>
              <span className="text-muted-foreground">
                {profile?.address || "Non spécifié"}
              </span>
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

        {/* Job Details */}
        <div className="shadow dark:border p-4 rounded-lg flex flex-col items-start gap-2">
          <h6 className="text-muted-foreground font-semibold">
            Détails du poste
          </h6>
          <p className="text-base font-semibold">{application.emploi.title}</p>
          <p className="text-base font-medium">
            {application.emploi.company_name}
          </p>
          <p className="text-sm text-muted-foreground">
            {application.emploi.city_name || "Lieu non spécifié"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
