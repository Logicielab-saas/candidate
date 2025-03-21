/**
 * ReviewStep - Final review and submission of job application
 *
 * Shows a summary of the application and handles submission
 * Includes user profile information, cover letter, and file upload
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
import type { EmploisDetails } from "@/core/interfaces";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useApplyToJob } from "@/features/job-apply/hooks/use-job-apply";
import { useCurrentUser } from "@/features/candidature/(profile)/hooks/use-profile";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PencilIcon, FileIcon, UserIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReviewStepProps {
  jobDetails: EmploisDetails;
}

export function ReviewStep({ jobDetails }: ReviewStepProps) {
  const router = useRouter();
  const { questionsData } = useJobApplyStore();
  const { mutate: applyToJob, isPending } = useApplyToJob();
  const { data: user, isLoading: isLoadingUser } = useCurrentUser();
  const [error, setError] = useState<string | null>(null);
  const [coverLetter, setCoverLetter] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    try {
      setError(null);

      // Create FormData for file upload
      const formData = new FormData();
      formData.append("emploi_uuid", jobDetails.emploi_uuid);
      formData.append("cover_letter", coverLetter);
      if (file) {
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
    if (e.target.files?.[0]) {
      const selectedFile = e.target.files[0];
      // Check file type
      if (
        selectedFile.type === "application/pdf" ||
        selectedFile.type.startsWith("image/")
      ) {
        setFile(selectedFile);
      } else {
        setError("Veuillez sélectionner un fichier PDF ou une image");
      }
    }
  };

  if (isLoadingUser) {
    return (
      <Card className="w-full max-w-4xl mx-auto p-8">
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Card>
    );
  }

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

        {/* Questions Summary */}
        {jobDetails.emploi_questions?.length > 0 && (
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

        {/* File Upload */}
        <div className="space-y-2">
          <Label htmlFor="file">Document complémentaire (optionnel)</Label>
          <div className="flex items-center gap-4">
            <Input
              id="file"
              type="file"
              onChange={handleFileChange}
              accept="application/pdf,image/*"
              className={cn(
                "file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0",
                "file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground",
                "hover:file:bg-primary/90"
              )}
            />
            {file && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileIcon className="h-4 w-4" />
                {file.name}
              </div>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            Formats acceptés : PDF, images (JPG, PNG)
          </p>
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
