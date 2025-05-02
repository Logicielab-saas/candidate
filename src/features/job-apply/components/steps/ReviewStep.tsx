/**
 * ReviewStep - Final review and submission of job application
 *
 * Shows a summary of the application and handles submission
 * Includes user profile information, resumes, cover letter, and file upload
 * Handles both authenticated and public user submissions
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
import { useState, useEffect } from "react";
import { useApplyToJob } from "@/features/job-apply/hooks/use-job-apply";
import { Textarea } from "@/components/ui/textarea";
import { PencilIcon, UserIcon, FileIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Profile } from "@/features/candidature/(profile)/common/interface";
import { useTranslations } from "next-intl";
import { StepNavigation } from "../../../../components/shared/StepNavigation";
import { hasAccessToken } from "@/lib/check-access-token";
import { cn } from "@/lib/utils";
import { FileInputDropdown } from "@/components/shared/FileInputDropdown";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

interface ReviewStepProps {
  jobDetails: EmploisDetails;
  profile: Profile;
}

// Define form schema
const reviewFormSchema = z.object({
  cover_letter: z.string().optional(),
  additional_file: z.custom<File | null>().optional(),
});

type ReviewFormData = z.infer<typeof reviewFormSchema>;

export function ReviewStep({ jobDetails, profile }: ReviewStepProps) {
  const tCommon = useTranslations("common");
  const router = useRouter();
  const { questionsData, prevStep, resetForm, personalInfo, setCurrentStep } =
    useJobApplyStore();
  const { mutate: applyToJob, isPending } = useApplyToJob(tCommon);

  const [error, setError] = useState<string | null>(null);

  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      cover_letter: "",
      additional_file: null,
    },
  });

  const isAuthenticated = hasAccessToken();

  // Check if we have unanswered required questions
  const hasUnansweredQuestions = jobDetails.emploi_questions?.some(
    (question) => {
      if (!question.is_required) return false;
      const answer = questionsData.answers.find(
        (a) => a.id === question.uuid
      )?.answer;
      return !answer || (Array.isArray(answer) && answer.length === 0);
    }
  );

  // If we have questions but no answers, redirect to questions step
  useEffect(() => {
    if (jobDetails.emploi_questions?.length > 0 && hasUnansweredQuestions) {
      setCurrentStep("questions");
    }
  }, [jobDetails.emploi_questions, hasUnansweredQuestions, setCurrentStep]);

  // If no personal info, redirect to first step
  if (!personalInfo) {
    router.push(`/job-apply/${jobDetails.slug}`);
    return null;
  }

  const selectedResume = isAuthenticated
    ? profile.files?.find((file) => file.uuid === personalInfo.resume_uuid)
    : null;

  // Handle navigation to specific steps
  const handleModifyPersonalInfo = () => {
    setCurrentStep("personal-info");
  };

  const handleModifyQuestions = () => {
    setCurrentStep("questions");
  };

  const handleSubmit = async (data: ReviewFormData) => {
    try {
      setError(null);

      // Check for required questions
      if (hasUnansweredQuestions) {
        setError(tCommon("validation.requiredAnswers"));
        return;
      }

      // Create FormData for file upload
      const formData = new FormData();
      formData.append("emploi_uuid", jobDetails.uuid);

      // Handle resume file based on authentication status
      if (isAuthenticated) {
        if (!personalInfo.resume_uuid) {
          setError(tCommon("validation.resumeRequired"));
          return;
        }
        formData.append("file_uuid", personalInfo.resume_uuid);
      } else if (personalInfo.resume_file instanceof File) {
        formData.append("file", personalInfo.resume_file);
        formData.append("first_name", personalInfo.first_name);
        formData.append("last_name", personalInfo.last_name);
        formData.append("email", personalInfo.email);
        formData.append("phone", personalInfo.phone);
      } else {
        setError(tCommon("validation.resumeRequired"));
        return;
      }

      if (data.cover_letter) {
        formData.append("cover_letter", data.cover_letter);
      }

      // Only append additional file if it exists and is valid
      if (data.additional_file instanceof File) {
        formData.append("additional_file", data.additional_file);
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

      // Submit application
      applyToJob(formData, {
        onSuccess: () => {
          router.push("/job-apply/success");
          resetForm();
        },
      });
    } catch (_error) {}
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase();
    const color = extension === "pdf" ? "text-red-500" : "text-blue-500";
    return <FileIcon className={cn("h-5 w-5", color)} />;
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {tCommon("review")}
        </CardTitle>
        <CardDescription>{tCommon("reviewDescription")}</CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <CardContent className="space-y-6">
            {/* User Profile Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold flex items-center gap-2">
                  <UserIcon className="h-4 w-4" />
                  {tCommon("personalInfo")}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={handleModifyPersonalInfo}
                >
                  <PencilIcon className="h-4 w-4 mr-2" />
                  {tCommon("actions.edit")}
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">Prénom</p>
                  <p className="text-muted-foreground">
                    {personalInfo.first_name}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Nom</p>
                  <p className="text-muted-foreground">
                    {personalInfo.last_name}
                  </p>
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
                  {tCommon("selectedResume")}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                  onClick={handleModifyPersonalInfo}
                >
                  <PencilIcon className="h-4 w-4 mr-2" />
                  {tCommon("actions.edit")}
                </Button>
              </div>
              {isAuthenticated ? (
                selectedResume && (
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      {getFileIcon(selectedResume.name)}
                      <span>{selectedResume.name}</span>
                    </div>
                  </div>
                )
              ) : personalInfo.resume_file ? (
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    {getFileIcon(personalInfo.resume_file.name)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {personalInfo.resume_file.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {(personalInfo.resume_file.size / 1024 / 1024).toFixed(
                          2
                        )}{" "}
                        MB
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            <Separator />

            {/* Questions Summary */}
            {jobDetails.emploi_questions?.length > 0 && (
              <>
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold mb-2">
                      {tCommon("answerQuestions")}
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-foreground"
                      onClick={handleModifyQuestions}
                    >
                      <PencilIcon className="h-4 w-4 mr-2" />
                      {tCommon("actions.edit")}
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {jobDetails.emploi_questions.map((question) => {
                      const answer = questionsData.answers.find(
                        (a) => a.id === question.uuid
                      )?.answer;

                      return (
                        <div
                          key={question.uuid}
                          className="rounded-lg border p-4"
                        >
                          <p className="font-medium text-sm">
                            {question.title}
                          </p>
                          {question.description && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {question.description}
                            </p>
                          )}
                          <p className="text-sm mt-2">
                            <span className="font-medium">
                              {tCommon("answer")} :{" "}
                            </span>
                            {Array.isArray(answer)
                              ? answer.join(", ")
                              : answer || tCommon("noAnswer")}
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
              <FormField
                control={form.control}
                name="cover_letter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {tCommon("coverLetter")} {tCommon("form.optional")}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={tCommon("writeYourCoverLetter")}
                        className="min-h-[200px]"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            {/* Additional File Upload */}
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="additional_file"
                render={({ field: { value, onChange } }) => (
                  <FileInputDropdown
                    value={value}
                    onChange={onChange}
                    label={`${tCommon("additionalFile")} ${tCommon(
                      "form.optional"
                    )}`}
                    maxSize={2}
                    accept=".jpg,.jpeg,.png"
                    placeholder={tCommon("clickToDownload")}
                  />
                )}
              />
            </div>

            {error && <p className="text-sm text-destructive mt-2">{error}</p>}
          </CardContent>

          <CardFooter>
            <StepNavigation
              onBack={prevStep}
              isLoading={isPending}
              continueButtonText={
                isPending
                  ? tCommon("actions.sending")
                  : tCommon("actions.submit")
              }
              onNext={form.handleSubmit(handleSubmit)}
            />
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
