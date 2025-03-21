/**
 * ResumeItem - Component for displaying and managing resume files
 *
 * Features:
 * - File upload via header button
 * - File preview, download, and delete actions
 * - Loading states and error handling
 * - Supports both profile and qualifications resume files
 */

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
  Loader2,
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
} from "../../features/candidature/(profile)/qualifications/hooks/use-resume-files";
import type { ResumeFile, Files } from "@/core/interfaces";
import { SectionHeader } from "../../features/candidature/(profile)/qualifications/SectionHeader";
import dynamic from "next/dynamic";
import LoaderOne from "@/components/ui/loader-one";
import type { ProfileFiles } from "@/features/candidature/(profile)/common/interface";

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
}

export function ResumeItem({
  subtitle = "",
  type = "custom",
  resumeFiles = [],
  source = "qualifications",
}: ResumeItemProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const updateFileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const [fileToDelete, setFileToDelete] = useState<
    ResumeFile | Files | ProfileFiles | null
  >(null);
  const [selectedFileUuid, setSelectedFileUuid] = useState<string | null>(null);
  const { mutate: createFile, isPending: isUploading } = useCreateResumeFiles();
  const { isPending: isDeleting } = useDeleteResumeFiles();

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

    // Check if file is PDF
    if (file.type !== "application/pdf") {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload a PDF file",
      });
      return;
    }

    // Check file size (max 2048KB/2MB)
    if (file.size > 2048 * 1024) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Maximum file size is 2MB (2048KB)",
      });
      return;
    }

    try {
      // Create FormData
      const formData = new FormData();
      // Append file directly with the field name 'file'
      formData.append("file", file);
      // If uuid is provided, this is an update operation
      if (uuid) {
        formData.append("uuid", uuid);
      }

      createFile(formData, {
        onSuccess: () => {
          toast({
            variant: "success",
            title: uuid
              ? "CV updated successfully"
              : "CV uploaded successfully",
            description: uuid
              ? "Your CV has been updated"
              : "Your CV has been uploaded",
          });
          setSelectedFileUuid(null);
        },
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error updating CV",
        description: "There was an error updating your CV. Please try again.",
      });
      console.error(error);
    }

    // Clear the input
    event.target.value = "";
  };

  const isLoading = isUploading || isDeleting;

  // Helper function to get file URL based on source
  const getFileUrl = (file: ResumeFile | Files | ProfileFiles) => {
    if (source === "profile") {
      return (file as ProfileFiles).file;
    }
    return (file as ResumeFile).file_url;
  };

  return (
    <div className="space-y-4">
      <SectionHeader
        title="Resume"
        icon={<File className="w-6 h-6 text-primaryHex-400 mr-2" />}
        onAdd={type === "custom" ? handleChangeCV : undefined}
      />

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".pdf"
        onChange={(e) => handleFileChange(e)}
      />

      <input
        type="file"
        ref={updateFileInputRef}
        className="hidden"
        accept=".pdf"
        onChange={(e) => handleFileChange(e, selectedFileUuid || undefined)}
      />

      {!resumeFiles?.length && (
        <p className="text-muted-foreground text-center py-4">
          No CV added yet
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
              <p className="font-medium">{file.name}</p>
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            </div>
          </div>

          {isLoading && selectedFileUuid === file.uuid ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm text-muted-foreground">
                {isUploading ? "Uploading..." : "Deleting..."}
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
                    View CV
                  </Link>
                </DropdownMenuItem>
                {type === "custom" && (
                  <>
                    <DropdownMenuItem onClick={() => handleUpdateCV(file.uuid)}>
                      <Upload className="mr-2 h-4 w-4" />
                      Change Resume
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={getFileUrl(file)} target="_blank">
                        <Download className="mr-2 h-4 w-4" />
                        Download CV
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
                      Delete CV
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
