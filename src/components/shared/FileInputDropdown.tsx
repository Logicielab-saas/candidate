/**
 * FileInputDropdown - Reusable file input component with drag and drop
 *
 * A component that combines file input with drag and drop functionality
 * Used for public users to upload files with a modern interface
 */

"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Upload, X, FileIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface FileInputDropdownProps {
  value?: File | null;
  onChange: (file: File | null) => void;
  label?: string;
  maxSize?: number; // in MB
  accept?: string;
  placeholder?: string;
}

export function FileInputDropdown({
  value,
  onChange,
  label = "Téléchargez votre fichier",
  maxSize = 2, // Default 2MB
  accept = ".pdf,.doc,.docx",
  placeholder = "Cliquez pour télécharger votre fichier",
}: FileInputDropdownProps) {
  const tCommon = useTranslations("common");
  const { toast } = useToast();

  // Convert accept string to object format required by react-dropzone
  const acceptTypes = accept.split(",").reduce((acc, type) => {
    const cleanType = type.trim();
    switch (cleanType.toLowerCase()) {
      case ".pdf":
        return { ...acc, "application/pdf": [".pdf"] };
      case ".doc":
        return { ...acc, "application/msword": [".doc"] };
      case ".docx":
        return {
          ...acc,
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            [".docx"],
        };
      case ".jpg":
      case ".jpeg":
        return { ...acc, "image/jpeg": [".jpg", ".jpeg"] };
      case ".png":
        return { ...acc, "image/png": [".png"] };
      default:
        return acc;
    }
  }, {});

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: tCommon("validation.fileSize.title"),
        description: tCommon("validation.fileSize.description", {
          size: maxSize,
        }),
      });
      return;
    }

    onChange(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: maxSize * 1024 * 1024,
    accept: acceptTypes,
    onDropRejected: (fileRejections) => {
      const error = fileRejections[0]?.errors[0];
      if (error) {
        toast({
          variant: "destructive",
          title: tCommon("actions.error"),
          description:
            error.code === "file-too-large"
              ? tCommon("validation.fileSize.description", {
                  size: maxSize,
                })
              : tCommon("validation.fileType.description2", {
                  types: accept,
                }),
        });
      }
    },
  });

  const handleRemove = () => {
    onChange(null);
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase();
    let color = "text-blue-500";

    switch (extension) {
      case "pdf":
        color = "text-red-500";
        break;
      case "doc":
      case "docx":
        color = "text-blue-500";
        break;
      case "jpg":
      case "jpeg":
      case "png":
        color = "text-green-500";
        break;
      default:
        color = "text-gray-500";
    }

    return <FileIcon className={cn("h-5 w-5", color)} />;
  };

  // Get accepted file types for display
  const getAcceptedTypesDisplay = () => {
    return accept
      .split(",")
      .map((type) => type.trim().toUpperCase().replace(".", ""))
      .join(", ");
  };

  return (
    <FormItem className="space-y-3">
      {label && <FormLabel>{label}</FormLabel>}
      <FormControl>
        <div className="space-y-4">
          {!value ? (
            <div
              {...getRootProps()}
              className={cn(
                "border-2 border-dashed rounded-lg p-6 transition-colors duration-200",
                isDragActive
                  ? "border-primary bg-primary/5"
                  : "border-muted hover:border-primary/50",
                "cursor-pointer relative"
              )}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center gap-2">
                <Upload
                  className={cn(
                    "h-8 w-8 transition-colors duration-200",
                    isDragActive ? "text-primary" : "text-muted-foreground"
                  )}
                />
                <div className="space-y-1 text-center">
                  <p
                    className={cn(
                      "text-sm font-medium transition-colors duration-200",
                      isDragActive ? "text-primary" : "text-foreground"
                    )}
                  >
                    {isDragActive ? tCommon("dragHere") : placeholder}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {tCommon("or")}{" "}
                    <span className="text-primary font-medium">
                      {tCommon("browseFiles")}
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {tCommon("acceptedTypes", {
                      types: getAcceptedTypesDisplay(),
                    })}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative flex items-center gap-4 rounded-lg border p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-muted">
                {getFileIcon(value.name)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{value.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(value.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={handleRemove}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
