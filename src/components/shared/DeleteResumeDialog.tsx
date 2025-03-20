/**
 * DeleteResumeDialog - Dialog for confirming resume file deletion
 *
 * Features:
 * - Confirmation dialog for deleting resume files
 * - Loading states
 * - Error handling
 */

"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import type { ResumeFile } from "@/core/interfaces";
import { useDeleteResumeFiles } from "../../features/candidature/(profile)/qualifications/hooks/use-resume-files";
import { useState } from "react";

interface DeleteResumeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  file: ResumeFile;
}

export function DeleteResumeDialog({
  open,
  onOpenChange,
  file,
}: DeleteResumeDialogProps) {
  const { mutate: deleteFile, isPending } = useDeleteResumeFiles();
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const handleConfirm = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDeleting(true);
    deleteFile(file.uuid, {
      onSuccess: () => {
        setIsDeleting(false);
        onOpenChange(false);
        toast({
          variant: "success",
          title: "CV deleted",
          description: "Your CV has been deleted successfully.",
        });
      },
      onError: (error) => {
        setIsDeleting(false);
        toast({
          variant: "destructive",
          title: "Error",
          description:
            error instanceof Error ? error.message : "Failed to delete CV.",
        });
      },
    });
  };

  const isLoading = isPending || isDeleting;

  return (
    <AlertDialog
      open={open}
      onOpenChange={(newOpen) => {
        if (!isLoading) {
          onOpenChange(newOpen);
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your CV.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="bg-destructive hover:bg-destructive/90"
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
