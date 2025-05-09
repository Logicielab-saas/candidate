/**
 * ResumeItem - Component for displaying and managing resume files
 *
 * Features:
 * - File upload via header button
 * - File preview, download, and delete actions
 * - Loading states and error handling
 * - Supports both profile and qualifications resume files
 * - Supports PDF, Word documents, and image files (JPG, PNG, JPEG)
 */
"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Eye,
  FileText,
  MoreVertical,
  Download,
  Trash2,
  File,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  useCreateResumeFiles,
  useDeleteResumeFiles,
  useUpdateResumeFiles,
} from "../../features/candidature/(profile)/qualifications/hooks/use-resume-files";
import type { UpdateFilesDTO } from "../../features/candidature/(profile)/qualifications/services/resume-files";
import type { ResumeFile, Files } from "@/core/interfaces";
import { SectionHeader } from "../../features/candidature/(profile)/qualifications/SectionHeader";
import dynamic from "next/dynamic";
import LoaderOne from "@/components/ui/loader-one";
import type { ProfileFiles } from "@/features/candidature/(profile)/common/interface";
import { useTranslations } from "next-intl";

// Dynamically import dialog with loading state
const DeleteResumeDialog = dynamic(
  () => import("./DeleteResumeDialog").then((mod) => mod.DeleteResumeDialog),
  {
    loading: () => (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <LoaderOne />
      </div>
    ),
    ssr: false,
  }
);

interface ResumeItemProps {
  subtitle?: string;
  type?: "postuly" | "custom";
  resumeFiles?: (ResumeFile | Files | ProfileFiles)[];
  source?: "profile" | "qualifications";
  removeAdd?: boolean;
}

export function ResumeItem({
  subtitle = "",
  type = "custom",
  resumeFiles = [],
  source = "qualifications",
  removeAdd = false,
}: ResumeItemProps) {
  const tCommon = useTranslations("common");
  const tValidation = useTranslations("common.validation");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const updateFileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const [fileToDelete, setFileToDelete] = useState<
    ResumeFile | Files | ProfileFiles | null
  >(null);
  const [selectedFileUuid, setSelectedFileUuid] = useState<string | null>(null);

  const { mutate: createFile, isPending: isUploading } =
    useCreateResumeFiles(tCommon);
  const { mutate: updateFile, isPending: isUpdating } =
    useUpdateResumeFiles(tCommon);
  const { isPending: isDeleting } = useDeleteResumeFiles(tCommon);

  const handleChangeCV = () => {
    fileInputRef.current?.click();
  };

  const handleUpdateCV = (uuid: string) => {
    setSelectedFileUuid(uuid);
    updateFileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    uuid?: string
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if file is PDF, Word document, or image
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast({
        variant: "destructive",
        title: tValidation("invalidType.title"),
        description: tValidation("invalidType.description"),
      });
      return;
    }

    // Check file size (max 2048KB/2MB)
    if (file.size > 2048 * 1024) {
      toast({
        variant: "destructive",
        title: tValidation("fileSize.title"),
        description: tValidation("fileSize.description"),
      });
      return;
    }

    try {
      if (uuid) {
        // Update operation
        const formData = new FormData();
        formData.append("file", file);
        formData.append("uuid", uuid);
        updateFile(formData as unknown as UpdateFilesDTO);
      } else {
        // Create operation
        const formData = new FormData();
        formData.append("file", file);
        createFile(formData);
      }
    } catch (_error) {
      // handled by the mutation hook
      // console.error(error);
    }

    // Clear the input
    event.target.value = "";
  };

  const isLoading = isUploading || isDeleting || isUpdating;

  // Helper function to get file URL based on source and file type
  const getFileUrl = (file: ResumeFile | Files | ProfileFiles) => {
    if (source === "profile") {
      // Check for file_url first (from profile resumes)
      if ("file_url" in file) {
        return (file as ResumeFile).file_url;
      }
      return (file as ProfileFiles).file;
    }
    // Check for Files type first (from API response)
    if ("url_file" in file) {
      return (file as Files).url_file;
    }
    // Then check for ResumeFile type
    if ("file_url" in file) {
      return (file as ResumeFile).file_url;
    }
    // Fallback to file property if exists
    return (file as { file: string }).file;
  };

  return (
    <div className="space-y-4">
      <SectionHeader
        title={tCommon("labels.resume")}
        icon={<File className="w-6 h-6 text-primaryHex-400 mr-2" />}
        onAdd={type === "custom" ? handleChangeCV : undefined}
        removeAdd={removeAdd}
      />

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
        onChange={(e) => handleFileChange(e)}
      />

      <input
        type="file"
        ref={updateFileInputRef}
        className="hidden"
        accept=".pdf, .doc, .docx, .jpg, .jpeg, .png"
        onChange={(e) => handleFileChange(e, selectedFileUuid || undefined)}
      />

      {!resumeFiles?.length && (
        <p className="text-muted-foreground text-center py-4">
          {tCommon("placeholders.noResume")}
        </p>
      )}

      {resumeFiles.map((file) => (
        <div
          key={file.uuid}
          className="flex items-center justify-between rounded-lg border p-4"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <FileText className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium">{file.slug}</p>
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            </div>
          </div>

          {isLoading && selectedFileUuid === file.uuid ? (
            <div className="flex items-center gap-2">
              <LoaderOne />
              <span className="text-sm text-muted-foreground">
                {isUploading ? tCommon("loading") : tCommon("actions.deleting")}
              </span>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="flex items-center" asChild>
                  <Link href={getFileUrl(file)} target="_blank">
                    <Eye className="mr-2 h-4 w-4" />
                    {tCommon("actions.view")}
                  </Link>
                </DropdownMenuItem>
                {type === "custom" && (
                  <>
                    <DropdownMenuItem onClick={() => handleUpdateCV(file.uuid)}>
                      <Upload className="mr-2 h-4 w-4" />
                      {tCommon("actions.edit")}
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={getFileUrl(file)} target="_blank">
                        <Download className="mr-2 h-4 w-4" />
                        {tCommon("actions.download")}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onSelect={(e) => {
                        e.preventDefault();
                        setSelectedFileUuid(file.uuid);
                        setFileToDelete(file);
                      }}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      {tCommon("actions.delete")}
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      ))}

      {fileToDelete && (
        <DeleteResumeDialog
          open={!!fileToDelete}
          onOpenChange={(open) => !open && setFileToDelete(null)}
          file={fileToDelete}
        />
      )}
    </div>
  );
}
