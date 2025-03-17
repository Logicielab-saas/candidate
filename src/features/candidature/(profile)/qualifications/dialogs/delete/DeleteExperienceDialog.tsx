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
import { ResumeExperience } from "@/core/interfaces/resume-experience.interface";
import { useDeleteResumeExperience } from "../../hooks/use-resume-experience";
import { useState } from "react";

interface DeleteExperienceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  experience: ResumeExperience;
}

export function DeleteExperienceDialog({
  open,
  onOpenChange,
  experience,
}: DeleteExperienceDialogProps) {
  const { mutate: deleteExperience, isPending } = useDeleteResumeExperience();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDeleting(true);
    try {
      await new Promise<void>((resolve, reject) => {
        deleteExperience(experience.uuid, {
          onSuccess: () => {
            resolve();
          },
          onError: (error) => {
            reject(error);
          },
        });
      });

      setIsDeleting(false);
      onOpenChange(false);
    } catch (_error) {
      setIsDeleting(false);
    }
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
            You are about to delete the experience:{" "}
            <span className="font-bold">{experience.job_title}</span> at{" "}
            <span className="font-bold">{experience.company_name}</span>.
            <br />
            This action cannot be undone.
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
