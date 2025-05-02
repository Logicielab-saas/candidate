/**
 * PersonalInfoStep - First step of job application process
 *
 * Collects user's personal information and resume selection/upload
 * Pre-fills data from profile if available for authenticated users
 * Provides file upload for public users
 * Updates profile if data has changed for authenticated users
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useJobApplyStore } from "@/features/job-apply/store/useJobApplyStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUpdateProfile } from "@/features/candidature/(profile)/hooks/use-profile";
import { useEffect, useState } from "react";
import { FileIcon, EyeIcon, AlertCircle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DocumentViewer } from "@/components/shared/DocumentViewer";
import { useTranslations } from "next-intl";
import { StepNavigation } from "../../../../components/shared/StepNavigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { z } from "zod";
import type { Profile } from "@/features/candidature/(profile)/common/interface";
import { hasAccessToken } from "@/lib/check-access-token";
import { FileInputDropdown } from "@/components/shared/FileInputDropdown";

// Schema for authenticated users (with resume_uuid)
const authenticatedSchema = z.object({
  first_name: z.string().min(1, "Le prénom est requis"),
  last_name: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide").min(1, "L'email est requis"),
  phone: z.string().min(1, "Le numéro de téléphone est requis"),
  resume_uuid: z.string().min(1, "Veuillez sélectionner un CV"),
  resume_file: z.undefined(),
});

// Schema for public users (with resume_file)
const publicSchema = z.object({
  first_name: z.string().min(1, "Le prénom est requis"),
  last_name: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide").min(1, "L'email est requis"),
  phone: z.string().min(1, "Le numéro de téléphone est requis"),
  resume_uuid: z.undefined(),
  resume_file: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 2 * 1024 * 1024,
      "Le fichier doit faire moins de 2MB"
    )
    .refine(
      (file) =>
        file.type === "application/pdf" ||
        file.type === "application/msword" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Seuls les fichiers PDF, DOC et DOCX sont acceptés"
    ),
});

// Combined schema type
const personalInfoSchema = z.union([authenticatedSchema, publicSchema]);

type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;

// Function to get the base URL for storage
function getStorageUrl(path: string) {
  if (path.startsWith("http")) {
    return path;
  }
  // Remove any leading slashes and ensure we have the full URL
  const cleanPath = path.replace(/^\/+/, "");
  const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL || "";
  return `${storageUrl}/${cleanPath}`.replace(/([^:]\/)\/+/g, "$1");
}

interface PersonalInfoStepProps {
  profile: Profile;
  isLoading: boolean;
}

export function PersonalInfoStep({
  profile,
  isLoading,
}: PersonalInfoStepProps) {
  const tCommon = useTranslations("common");
  const { nextStep, setPersonalInfo, personalInfo } = useJobApplyStore();
  const { mutateAsync: updateProfile, isPending: isUpdating } =
    useUpdateProfile(tCommon);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isAuthenticated = hasAccessToken();

  const form = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      first_name: personalInfo?.first_name || "",
      last_name: personalInfo?.last_name || "",
      email: personalInfo?.email || "",
      phone: personalInfo?.phone || "",
      ...(isAuthenticated
        ? {
            resume_uuid: personalInfo?.resume_uuid || "",
            resume_file: undefined,
          }
        : {
            resume_uuid: undefined,
            resume_file: personalInfo?.resume_file || null,
          }),
    },
  });

  // Pre-fill form with profile data if available for authenticated users
  useEffect(() => {
    if (profile && isAuthenticated) {
      form.reset({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        resume_uuid: personalInfo?.resume_uuid || "",
        resume_file: undefined,
      });
    }
  }, [profile, form, personalInfo, isAuthenticated]);

  const hasProfileDataChanged = (data: PersonalInfoFormData) => {
    if (!profile || !isAuthenticated) return false;

    return (
      data.first_name !== profile.first_name ||
      data.last_name !== profile.last_name ||
      data.email !== profile.email ||
      data.phone !== profile.phone
    );
  };

  const onSubmit = async (data: PersonalInfoFormData) => {
    try {
      // If authenticated and profile data has changed, update it first
      if (isAuthenticated && profile && hasProfileDataChanged(data)) {
        await updateProfile({
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          phone: data.phone,
        });
      }

      // Store the form data in the store
      setPersonalInfo(data);
      nextStep();
    } catch (_error) {
      // Error is handled by the mutation
    }
  };

  const handlePreview = (filePath: string) => {
    const fullUrl = getStorageUrl(filePath);
    setPreviewUrl(fullUrl);
    setIsDialogOpen(true);
  };

  // If profile data is not loaded yet for authenticated users, we can't proceed
  if (!profile && !isLoading && isAuthenticated) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-destructive">
            Erreur de chargement
          </CardTitle>
          <CardDescription>
            Impossible de charger vos informations. Veuillez réessayer plus
            tard.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Informations personnelles
        </CardTitle>
        <CardDescription>
          Veuillez remplir vos informations personnelles pour continuer
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            {isAuthenticated && (
              <Alert>
                <AlertCircle className="h-6 w-6" />
                <AlertTitle>Modifications de votre profil</AlertTitle>
                <AlertDescription>
                  Toute modification effectuée ici sera mise à jour dans votre
                  profil !
                </AlertDescription>
              </Alert>
            )}

            {/* Personal Information */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prénom</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="john.doe@example.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Téléphone</FormLabel>
                    <FormControl>
                      <Input placeholder="+33 6 12 34 56 78" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Resume Selection/Upload */}
            {isAuthenticated ? (
              <FormField
                control={form.control}
                name="resume_uuid"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Sélectionnez votre CV</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={personalInfo?.resume_uuid}
                        className="grid grid-cols-1 gap-4"
                      >
                        {profile?.files?.map((file) => (
                          <div key={file.uuid} className="relative">
                            <RadioGroupItem
                              value={file.uuid}
                              id={file.uuid}
                              className="peer sr-only"
                            />
                            <label
                              htmlFor={file.uuid}
                              className={cn(
                                "flex items-center justify-between rounded-lg border-2 border-muted bg-popover p-4",
                                "hover:bg-accent hover:text-accent-foreground",
                                "peer-data-[state=checked]:border-primary",
                                "[&:has([data-state=checked])]:border-primary"
                              )}
                            >
                              <div className="flex items-center gap-3">
                                <FileIcon className="h-5 w-5" />
                                <div className="space-y-1">
                                  <p className="text-sm font-medium leading-none">
                                    {file.name}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    Ajouté le {new Date().toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <Dialog
                                open={isDialogOpen}
                                onOpenChange={setIsDialogOpen}
                              >
                                <DialogTrigger asChild>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="ml-auto flex h-9 w-9 p-0"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handlePreview(file.file);
                                    }}
                                  >
                                    <EyeIcon className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl h-[80vh]">
                                  <DialogHeader>
                                    <DialogTitle>Aperçu du CV</DialogTitle>
                                  </DialogHeader>
                                  <ScrollArea className="h-full w-full rounded-md">
                                    {previewUrl && (
                                      <DocumentViewer url={previewUrl} />
                                    )}
                                  </ScrollArea>
                                </DialogContent>
                              </Dialog>
                            </label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <FormField
                control={form.control}
                name="resume_file"
                render={({ field: { value, onChange } }) => (
                  <FileInputDropdown
                    value={value}
                    onChange={onChange}
                    label="Téléchargez votre CV"
                    maxSize={2}
                    accept=".pdf,.doc,.docx"
                    placeholder="Cliquez pour télécharger votre CV"
                  />
                )}
              />
            )}
          </CardContent>

          <CardFooter>
            <StepNavigation
              isLoading={isLoading || isUpdating}
              continueButtonText={isUpdating ? "Mise à jour..." : "Continuer"}
              onNext={form.handleSubmit(onSubmit)}
            />
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
