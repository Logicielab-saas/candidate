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
import { useEffect, useRef, useState } from "react";
import {
  FileIcon,
  EyeIcon,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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
import { FileViewer } from "@/components/shared/FileViewer";
import { useTranslations } from "next-intl";
import { StepNavigation } from "../../../../components/shared/StepNavigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { z } from "zod";
import type { Profile } from "@/features/candidature/(profile)/common/interface";
import { hasAccessToken } from "@/lib/check-access-token";
import { FileInputDropdown } from "@/components/shared/FileInputDropdown";
import Image from "next/image";
import * as pdfjsLib from "pdfjs-dist";
import { PDFDocumentProxy } from "pdfjs-dist";
import LoaderOne from "@/components/ui/loader-one";

// Initialize PDF.js worker
if (typeof window !== "undefined") {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
}

// Schema for authenticated users (with resume_uuid)
const authenticatedSchema = (t: (key: string) => string) =>
  z.object({
    first_name: z.string().min(1, t("validation.required")),
    last_name: z.string().min(1, t("validation.required")),
    email: z
      .string()
      .email(t("validation.email"))
      .min(1, t("validation.required")),
    phone: z.string().min(1, t("validation.phoneRequired")),
    resume_uuid: z.string().min(1, t("validation.resumeRequired")),
    resume_file: z.undefined(),
  });

// Schema for public users (with resume_file)
const publicSchema = (t: (key: string) => string) =>
  z.object({
    first_name: z.string().min(1, t("validation.required")),
    last_name: z.string().min(1, t("validation.required")),
    email: z
      .string()
      .email(t("validation.email"))
      .min(1, t("validation.required")),
    phone: z.string().min(1, t("validation.phoneRequired")),
    resume_uuid: z.undefined(),
    resume_file: z
      .instanceof(File)
      .refine(
        (file) => file.size <= 2 * 1024 * 1024,
        t("validation.fileSize.description")
      )
      .refine(
        (file) =>
          file.type === "application/pdf" ||
          file.type === "application/msword" ||
          file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        t("validation.fileType.description")
      ),
  });

// Combined schema type that takes the translation function
const personalInfoSchema = (t: (key: string) => string) =>
  z.discriminatedUnion("isAuthenticated", [
    z.object({
      isAuthenticated: z.literal(true),
      ...authenticatedSchema(t).shape,
    }),
    z.object({
      isAuthenticated: z.literal(false),
      ...publicSchema(t).shape,
    }),
  ]);

export type PersonalInfoFormData = z.infer<
  ReturnType<typeof personalInfoSchema>
>;

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
  const [previewType, setPreviewType] = useState<"pdf" | "image" | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const scale = 1.5;

  const isAuthenticated = hasAccessToken();

  const defaultValues = isAuthenticated
    ? {
        isAuthenticated: true as const,
        first_name: personalInfo?.first_name || "",
        last_name: personalInfo?.last_name || "",
        email: personalInfo?.email || "",
        phone: personalInfo?.phone || "",
        resume_uuid: personalInfo?.resume_uuid || "",
        resume_file: undefined,
      }
    : {
        isAuthenticated: false as const,
        first_name: personalInfo?.first_name || "",
        last_name: personalInfo?.last_name || "",
        email: personalInfo?.email || "",
        phone: personalInfo?.phone || "",
        resume_uuid: undefined,
        resume_file: undefined,
      };

  const form = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema(tCommon)),
    defaultValues,
  });

  // Pre-fill form with profile data if available for authenticated users
  useEffect(() => {
    if (profile && isAuthenticated) {
      form.reset({
        isAuthenticated: true,
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
    setPreviewType(filePath.toLowerCase().endsWith(".pdf") ? "pdf" : "image");
    setIsDialogOpen(true);
  };

  const handleFilePreview = async (file: File) => {
    try {
      if (file.type === "application/pdf") {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

        // First open the dialog
        setPreviewType("pdf");
        setIsDialogOpen(true);

        // Then set the PDF document and trigger rendering
        setTimeout(() => {
          setPdfDoc(pdf);
          setNumPages(pdf.numPages);
          setCurrentPage(1);
          setIsPageLoading(true);
        }, 100); // Small delay to ensure dialog is mounted
      } else {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        setPreviewType("image");
        setIsDialogOpen(true);
      }
    } catch (error) {
      console.error("Error creating preview:", error);
      setPdfDoc(null);
      setIsPageLoading(false);
      setPreviewType(null);
    }
  };

  // Effect to render PDF page
  useEffect(() => {
    let isMounted = true;

    const renderPage = async () => {
      if (!pdfDoc || !canvasRef.current || !isDialogOpen) {
        setIsPageLoading(false);
        return;
      }

      try {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        if (!context || !isMounted) {
          setIsPageLoading(false);
          return;
        }

        // Clear previous content
        context.clearRect(0, 0, canvas.width, canvas.height);

        const page = await pdfDoc.getPage(currentPage);
        const viewport = page.getViewport({ scale });

        // Set canvas size
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport,
          background: "rgba(255,255,255,1)",
        };

        try {
          await page.render(renderContext).promise;
          if (isMounted) {
            page.cleanup();
          }
        } catch (renderError) {
          console.error("Error during render:", renderError);
        }
      } catch (error) {
        console.error("Error rendering page:", error);
      } finally {
        if (isMounted) {
          setIsPageLoading(false);
        }
      }
    };

    renderPage();

    return () => {
      isMounted = false;
    };
  }, [pdfDoc, currentPage, scale, isDialogOpen]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
      if (pdfDoc) {
        pdfDoc.destroy();
        setPdfDoc(null);
      }
      setIsPageLoading(false);
    };
  }, [previewUrl, pdfDoc]);

  const changePage = (delta: number) => {
    setCurrentPage((prev) => {
      const newPage = prev + delta;
      return newPage >= 1 && newPage <= numPages ? newPage : prev;
    });
  };

  // Add this helper function near the top of the component
  const isPreviewableFile = (file: File) => {
    const supportedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/jpg",
      "image/png",
    ];
    return supportedTypes.includes(file.type);
  };

  // If profile data is not loaded yet for authenticated users, we can't proceed
  if (!profile && !isLoading && isAuthenticated) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-destructive">
            {tCommon("toast.error.title")}
          </CardTitle>
          <CardDescription>
            {tCommon("toast.error.description")}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {tCommon("personalInfo")}
        </CardTitle>
        <CardDescription>{tCommon("personalInfoDescription")}</CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            {isAuthenticated && (
              <Alert>
                <AlertCircle className="h-6 w-6" />
                <AlertTitle>{tCommon("personalInfoAlertTitle")}</AlertTitle>
                <AlertDescription>
                  {tCommon("personalInfoAlertDescription")}
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
                    <FormLabel>{tCommon("firstName")}</FormLabel>
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
                    <FormLabel>{tCommon("lastName")}</FormLabel>
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
                    <FormLabel>{tCommon("email")}</FormLabel>
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
                    <FormLabel>{tCommon("phone")}</FormLabel>
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
                    <FormLabel>
                      {tCommon("validation.resumeRequired")}
                    </FormLabel>
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
                                    {tCommon("addedAt", {
                                      date: new Date().toLocaleDateString(),
                                    })}
                                  </p>
                                </div>
                              </div>
                              {file.file.toLowerCase().endsWith(".pdf") ||
                              file.file
                                .toLowerCase()
                                .match(/\.(jpe?g|png)$/i) ? (
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
                                      <DialogTitle>
                                        {tCommon("preview")}
                                      </DialogTitle>
                                    </DialogHeader>
                                    <ScrollArea className="h-full w-full rounded-md">
                                      {previewUrl && previewType === "image" ? (
                                        <div className="relative w-full h-full min-h-[60vh]">
                                          <Image
                                            src={previewUrl}
                                            alt="Preview"
                                            fill
                                            className="object-contain"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                                          />
                                        </div>
                                      ) : (
                                        previewUrl && (
                                          <FileViewer url={previewUrl} />
                                        )
                                      )}
                                    </ScrollArea>
                                  </DialogContent>
                                </Dialog>
                              ) : (
                                <p className="text-sm text-muted-foreground">
                                  {tCommon("previewNotAvailable")}
                                </p>
                              )}
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
                  <div className="space-y-4">
                    <FileInputDropdown
                      value={value}
                      onChange={onChange}
                      label={tCommon("validation.resumeRequired")}
                      maxSize={2}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      placeholder={tCommon("clickToDownload")}
                    />
                    {value && (
                      <div className="flex items-center justify-between rounded-lg border-2 border-muted bg-popover p-4">
                        <div className="flex items-center gap-3">
                          <FileIcon className="h-5 w-5" />
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">
                              {value.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {tCommon("addedAt", {
                                date: new Date().toLocaleDateString(),
                              })}
                            </p>
                          </div>
                        </div>
                        {isPreviewableFile(value) ? (
                          <Dialog
                            open={isDialogOpen}
                            onOpenChange={(isOpen: boolean) => {
                              setIsDialogOpen(isOpen);
                              if (!isOpen) {
                                setPreviewType(null);
                                if (previewUrl?.startsWith("blob:")) {
                                  URL.revokeObjectURL(previewUrl);
                                }
                                if (pdfDoc) {
                                  pdfDoc.destroy();
                                  setPdfDoc(null);
                                }
                              }
                            }}
                          >
                            <DialogTrigger asChild>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="ml-auto flex h-9 w-9 p-0"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleFilePreview(value);
                                }}
                              >
                                <EyeIcon className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl h-[80vh]">
                              <DialogHeader>
                                <DialogTitle>{tCommon("preview")}</DialogTitle>
                              </DialogHeader>
                              <ScrollArea className="h-full w-full rounded-md">
                                {previewType === "image" && previewUrl ? (
                                  <div className="relative w-full h-full min-h-[60vh]">
                                    <Image
                                      src={previewUrl}
                                      alt="Preview"
                                      fill
                                      className="object-contain"
                                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                                    />
                                  </div>
                                ) : previewType === "pdf" ? (
                                  <div className="relative flex flex-col items-center">
                                    <div className="relative bg-white rounded-lg overflow-hidden">
                                      <canvas
                                        ref={canvasRef}
                                        className="max-w-full"
                                      />
                                      {isPageLoading && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
                                          <LoaderOne />
                                        </div>
                                      )}
                                    </div>
                                    {numPages > 1 && (
                                      <div className="sticky top-4 z-10 mb-4 flex items-center justify-between w-fit max-w-[400px] px-4 py-2 bg-background/80 dark:bg-background/90 backdrop-blur-md border border-border rounded-full shadow-lg">
                                        <div className="flex items-center gap-2">
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => changePage(-1)}
                                            disabled={
                                              currentPage <= 1 || isPageLoading
                                            }
                                            className="h-8 w-8 rounded-full hover:bg-accent disabled:opacity-50"
                                          >
                                            <ChevronLeft className="h-4 w-4" />
                                          </Button>
                                          <span className="text-center text-sm text-foreground">
                                            {currentPage}/{numPages}
                                          </span>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => changePage(1)}
                                            disabled={
                                              currentPage >= numPages ||
                                              isPageLoading
                                            }
                                            className="h-8 w-8 rounded-full hover:bg-accent disabled:opacity-50"
                                          >
                                            <ChevronRight className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                ) : null}
                              </ScrollArea>
                            </DialogContent>
                          </Dialog>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            {tCommon("previewNotAvailable")}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              />
            )}
          </CardContent>

          <CardFooter>
            <StepNavigation
              isLoading={isLoading || isUpdating}
              continueButtonText={
                isUpdating
                  ? tCommon("actions.sending")
                  : tCommon("actions.continue")
              }
              onNext={form.handleSubmit(onSubmit)}
            />
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
