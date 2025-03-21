/**
 * ReviewStep - Final review and submission of job application
 *
 * Shows a summary of the application and handles submission
 * Includes user profile information, resumes, cover letter, and file upload
 */

"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useJobApplyStore } from "@/features/job-apply/store/useJobApplyStore";
import type { EmploisDetails, GetMeResponse } from "@/core/interfaces";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { useApplyToJob } from "@/features/job-apply/hooks/use-job-apply";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PencilIcon, ImageIcon, UserIcon, AlertCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ResumeItem } from "@/components/shared/ResumeItem";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ReviewStepProps {
  jobDetails: EmploisDetails;
  user: GetMeResponse;
}

export function ReviewStep({ jobDetails, user }: ReviewStepProps) {
  const router = useRouter();
  const { questionsData } = useJobApplyStore();
  const { mutate: applyToJob, isPending } = useApplyToJob();
  const [error, setError] = useState<string | null>(null);
  const [coverLetter, setCoverLetter] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    try {
      setError(null);

      // Create FormData for file upload
      const formData = new FormData();
      formData.append("emploi_uuid", jobDetails.uuid);
      formData.append("cover_letter", coverLetter || ""); // Ensure empty string if null

      // Only append file if it exists and is valid
      if (file instanceof File) {
        formData.append("file", file);
      }

      // Submit application
      applyToJob(formData, {
        onSuccess: () => {
          router.push("/jobs");
        },
        onError: (error: Error) => {
          setError(error.message);
        },
      });
    } catch (_error) {
      setError(
        "Une erreur est survenue lors de la soumission de votre candidature."
      );
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    const selectedFile = files[0];
    // Check file type
    if (
      selectedFile.type === "application/pdf" ||
      selectedFile.type.startsWith("image/")
    ) {
      setFile(selectedFile);
    } else {
      setError("Veuillez sélectionner un fichier PDF ou une image");
      e.target.value = "";
    }
  };

  const hasResumes =
    user?.resume?.resumeFiles && user.resume.resumeFiles.length > 0;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Révision</CardTitle>
        <CardDescription>
          Vérifiez les informations de votre candidature avant de la soumettre
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* User Profile Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <UserIcon className="h-4 w-4" />
              Informations personnelles
            </h3>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => router.push("/profile")}
            >
              <PencilIcon className="h-4 w-4 mr-2" />
              Modifier
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium">Nom complet</p>
              <p className="text-muted-foreground">
                {user?.first_name} {user?.last_name}
              </p>
            </div>
            <div>
              <p className="font-medium">Email</p>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
            <div>
              <p className="font-medium">Téléphone</p>
              <p className="text-muted-foreground">
                {user?.phone || "Non renseigné"}
              </p>
            </div>
            <div>
              <p className="font-medium">Adresse</p>
              <p className="text-muted-foreground">
                {user?.address || "Non renseignée"}
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Resume Section */}
        <div className="space-y-4">
          <ResumeItem
            subtitle="Votre CV principal"
            resumeFiles={user?.resume?.resumeFiles || []}
            source="profile"
          />
          {hasResumes && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Information importante</AlertTitle>
              <AlertDescription>
                Tous vos CV seront envoyés avec votre candidature. Assurez-vous
                qu&apos;ils sont à jour avant de soumettre.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <Separator />

        {/* Job Details Summary */}
        <div>
          <h3 className="font-semibold mb-2">Poste</h3>
          <p className="text-muted-foreground">{jobDetails.title}</p>
          {jobDetails.company_name && (
            <p className="text-sm text-muted-foreground mt-1">
              {jobDetails.company_name}
            </p>
          )}
        </div>

        <Separator />

        {/* Questions Summary */}
        {jobDetails.emploi_questions?.length > 0 && (
          <>
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold mb-2">Réponses aux questions</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => router.back()}
                >
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Modifier
                </Button>
              </div>
              <div className="space-y-4">
                {jobDetails.emploi_questions.map((question, index) => {
                  const answer = questionsData.answers.find(
                    (a) => a.id === String(index)
                  )?.answer;

                  return (
                    <div key={index}>
                      <p className="font-medium text-sm">{question}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {answer ? String(answer) : "Pas de réponse"}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
            <Separator />
          </>
        )}

        {/* Cover Letter */}
        <div className="space-y-2">
          <Label htmlFor="cover-letter">
            Lettre de motivation (optionnelle)
          </Label>
          <Textarea
            id="cover-letter"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            placeholder="Écrivez votre lettre de motivation..."
            className="min-h-[200px]"
          />
        </div>

        <Separator />

        {/* File Upload */}
        <div className="space-y-2">
          <Label>Document complémentaire (optionnel)</Label>
          <div
            role="button"
            tabIndex={0}
            className="border-2 border-dashed rounded-lg p-6 hover:border-primary/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                fileInputRef.current?.click();
              }
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept="application/pdf,image/*"
            />
            {!file ? (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <ImageIcon className="h-8 w-8" />
                <p className="text-sm font-medium">
                  Cliquez pour télécharger un document
                </p>
                <p className="text-xs">
                  Formats acceptés : PDF, images (JPG, PNG)
                </p>
              </div>
            ) : (
              <div className="mt-4 grid grid-cols-1 gap-4">
                <div className="group relative aspect-video rounded-lg overflow-hidden bg-muted">
                  {file.type.startsWith("image/") ? (
                    <Image
                      src={URL.createObjectURL(file)}
                      alt="Preview"
                      className="object-cover"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <ImageIcon className="h-16 w-16 text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="h-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = "";
                        }
                      }}
                    >
                      Supprimer
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-center text-muted-foreground">
                  {file.name}
                </p>
              </div>
            )}
          </div>
        </div>

        {error && <p className="text-sm text-destructive mt-2">{error}</p>}
      </CardContent>

      <CardFooter className="flex justify-end gap-4">
        <Button
          variant="outline"
          onClick={() => router.push("/jobs")}
          disabled={isPending}
        >
          Annuler
        </Button>
        <Button onClick={handleSubmit} disabled={isPending}>
          {isPending ? "Soumission en cours..." : "Soumettre ma candidature"}
        </Button>
      </CardFooter>
    </Card>
  );
}
