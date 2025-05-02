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
import type { EmploisDetails } from "@/core/interfaces";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { useApplyToJob } from "@/features/job-apply/hooks/use-job-apply";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PencilIcon, ImageIcon, UserIcon, FileIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Profile } from "@/features/candidature/(profile)/common/interface";
import { useTranslations } from "next-intl";
import { StepNavigation } from "../../../../components/shared/StepNavigation";
import { hasAccessToken } from "@/lib/check-access-token";

interface ReviewStepProps {
  jobDetails: EmploisDetails;
  profile: Profile;
}

export function ReviewStep({ jobDetails, profile }: ReviewStepProps) {
  const tCommon = useTranslations("common");
  const router = useRouter();
  const { questionsData, prevStep, resetForm, personalInfo, setCurrentStep } =
    useJobApplyStore();
  const { mutate: applyToJob, isPending } = useApplyToJob(tCommon);

  const [error, setError] = useState<string | null>(null);
  const [coverLetter, setCoverLetter] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // If no personal info, redirect to first step
  if (!personalInfo) {
    router.push(`/job-apply/${jobDetails.slug}`);
    return null;
  }

  const selectedResume = profile.files?.find(
    (file) => file.uuid === personalInfo.resume_uuid
  );

  // Handle navigation to specific steps
  const handleModifyPersonalInfo = () => {
    setCurrentStep("personal-info");
  };

  const handleModifyQuestions = () => {
    setCurrentStep("questions");
  };

  const handleSubmit = async () => {
    // TODO: for user no authenticated (public) we will set different files
    // const isAuthenticated = hasAccessToken();
    try {
      setError(null);

      // Create FormData for file upload
      const formData = new FormData();
      formData.append("emploi_uuid", jobDetails.uuid);
      formData.append("first_name", personalInfo.first_name);
      formData.append("last_name", personalInfo.last_name);
      formData.append("email", personalInfo.email);
      formData.append("phone", personalInfo.phone);
      formData.append("file_uuid", personalInfo.resume_uuid);
      if (coverLetter) {
        formData.append("cover_letter", coverLetter);
      }

      // Only append file if it exists and is valid
      if (file instanceof File) {
        formData.append("additional_file", file);
      }

      // Add questions answers if any
      if (questionsData.answers.length > 0) {
        questionsData.answers.forEach((answer, index) => {
          formData.append(
            `emploi_question_reponses[${index}][emploi_question_uuid]`,
            answer.id
          );
          formData.append(
            `emploi_question_reponses[${index}][reponse]`,
            Array.isArray(answer.answer)
              ? answer.answer.join(",")
              : answer.answer
          );
        });
      }

      // Log FormData entries
      // for (const [key, value] of formData.entries()) {
      //   console.log(`${key}:`, value);
      // }

      // Submit application
      applyToJob(formData, {
        onSuccess: () => {
          // Reset all form states
          resetForm();
          setCoverLetter("");
          setFile(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
          router.push("/job-apply/success");
        },
      });
    } catch (_error) {}
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
              onClick={handleModifyPersonalInfo}
            >
              <PencilIcon className="h-4 w-4 mr-2" />
              Modifier
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium">Prénom</p>
              <p className="text-muted-foreground">{personalInfo.first_name}</p>
            </div>
            <div>
              <p className="font-medium">Nom</p>
              <p className="text-muted-foreground">{personalInfo.last_name}</p>
            </div>
            <div>
              <p className="font-medium">Email</p>
              <p className="text-muted-foreground">{personalInfo.email}</p>
            </div>
            <div>
              <p className="font-medium">Téléphone</p>
              <p className="text-muted-foreground">{personalInfo.phone}</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Resume Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              CV sélectionné
            </h3>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleModifyPersonalInfo}
            >
              <PencilIcon className="h-4 w-4 mr-2" />
              Modifier
            </Button>
          </div>
          {selectedResume && (
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2">
                <FileIcon className="h-4 w-4" />
                <span>{selectedResume.name}</span>
              </div>
            </div>
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
                  onClick={handleModifyQuestions}
                >
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Modifier
                </Button>
              </div>
              <div className="space-y-4">
                {jobDetails.emploi_questions.map((question) => {
                  const answer = questionsData.answers.find(
                    (a) => a.id === question.uuid
                  )?.answer;

                  return (
                    <div key={question.uuid} className="rounded-lg border p-4">
                      <p className="font-medium text-sm">{question.title}</p>
                      {question.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {question.description}
                        </p>
                      )}
                      <p className="text-sm mt-2">
                        <span className="font-medium">Réponse : </span>
                        {Array.isArray(answer)
                          ? answer.join(", ")
                          : answer || "Pas de réponse"}
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

      <CardFooter>
        <StepNavigation
          onBack={prevStep}
          isLoading={isPending}
          continueButtonText={
            isPending ? "Soumission en cours..." : "Soumettre ma candidature"
          }
          onNext={handleSubmit}
        />
      </CardFooter>
    </Card>
  );
}
