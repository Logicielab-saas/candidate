/**
 * job-bookmark-handler - Utility for handling job bookmarking operations
 *
 * This utility provides functions to handle saving and unsaving jobs (bookmarks),
 * including UI feedback and state management. It's designed to be reusable
 * across the application wherever job bookmarking is needed.
 */
import {
  useSaveEmplois,
  useCancelSaveEmplois,
} from "@/features/candidature/(profile)/my-jobs/hooks/use-my-saved-jobs";
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

interface UseJobBookmarkProps {
  initialIsSaved: boolean;
  jobId: string;
  jobTitle?: string;
  onSaveSuccess?: () => void;
  onUnsaveSuccess?: () => void;
}

interface JobBookmarkReturn {
  isSaved: boolean;
  isProcessing: boolean;
  toggleSaved: () => Promise<void>;
  handleSave: () => Promise<void>;
  handleUnsave: () => Promise<void>;
}

/**
 * Custom hook for managing job bookmark operations
 *
 * @param initialIsSaved - Whether the job is initially saved
 * @param jobId - The unique identifier of the job
 * @param jobTitle - Optional job title for toast messages
 * @param onSaveSuccess - Optional callback when save is successful
 * @param onUnsaveSuccess - Optional callback when unsave is successful
 * @returns Object with state and handlers for bookmark operations
 */
export function useJobBookmark({
  initialIsSaved,
  jobId,
  jobTitle = "emploi",
  onSaveSuccess,
  onUnsaveSuccess,
}: UseJobBookmarkProps): JobBookmarkReturn {
  // State for tracking saved status and loading state
  const [isSaved, setIsSaved] = useState(initialIsSaved);
  const [isProcessing, setIsProcessing] = useState(false);

  // Hooks for API operations
  const { mutate: saveJob, isPending: isSaving } = useSaveEmplois();
  const { mutate: unsaveJob, isPending: isUnsaving } = useCancelSaveEmplois();
  const { toast } = useToast();

  /**
   * Handle saving a job
   */
  const handleSave = useCallback(async (): Promise<void> => {
    if (isProcessing || isSaved) return;

    setIsProcessing(true);

    try {
      await new Promise<void>((resolve, reject) => {
        saveJob(jobId, {
          onSuccess: () => {
            setIsSaved(true);
            if (onSaveSuccess) onSaveSuccess();
            resolve();
          },
          onError: (error) => {
            // If already saved, we still want to set the state correctly
            if (
              (error.response?.data as { message: string })?.message ===
              "You have already saved to this emploi"
            ) {
              setIsSaved(true);
              if (onSaveSuccess) onSaveSuccess();
              resolve();
            } else {
              reject(error);
            }
          },
        });
      });
    } catch (_error) {
      toast({
        variant: "destructive",
        title: "Échec de l'enregistrement",
        description: `Impossible d'enregistrer "${jobTitle}". Veuillez réessayer.`,
      });
    } finally {
      setIsProcessing(false);
    }
  }, [jobId, isProcessing, isSaved, saveJob, toast, jobTitle, onSaveSuccess]);

  /**
   * Handle unsaving a job
   */
  const handleUnsave = useCallback(async (): Promise<void> => {
    if (isProcessing || !isSaved) return;

    setIsProcessing(true);

    try {
      await new Promise<void>((resolve, reject) => {
        unsaveJob(jobId, {
          onSuccess: () => {
            setIsSaved(false);
            if (onUnsaveSuccess) onUnsaveSuccess();
            resolve();
          },
          onError: (error) => {
            reject(error);
          },
        });
      });
    } catch (_error) {
      toast({
        variant: "destructive",
        title: "Échec de la suppression",
        description: `Impossible de supprimer "${jobTitle}" des enregistrements. Veuillez réessayer.`,
      });
    } finally {
      setIsProcessing(false);
    }
  }, [
    jobId,
    isProcessing,
    isSaved,
    unsaveJob,
    toast,
    jobTitle,
    onUnsaveSuccess,
  ]);

  /**
   * Toggle between saved and unsaved states
   */
  const toggleSaved = useCallback(async (): Promise<void> => {
    if (isSaved) {
      await handleUnsave();
    } else {
      await handleSave();
    }
  }, [isSaved, handleSave, handleUnsave]);

  return {
    isSaved,
    isProcessing: isProcessing || isSaving || isUnsaving,
    toggleSaved,
    handleSave,
    handleUnsave,
  };
}

/**
 * Creates a heart icon component with the appropriate filled/unfilled state and animations
 *
 * @param isSaved - Whether the job is saved (heart filled)
 * @param isProcessing - Whether a save/unsave operation is in progress
 * @returns JSX for the heart icon
 */
export function getHeartIconClasses(
  isSaved: boolean,
  isProcessing: boolean
): string {
  let baseClasses = "transition-colors duration-200 h-5 w-5 ";

  if (isProcessing) {
    baseClasses += "text-gray-400 animate-pulse ";
  } else if (isSaved) {
    baseClasses += "text-primaryHex-400 fill-primaryHex-400 ";
  } else {
    baseClasses += "text-gray-400 hover:text-primaryHex-400 ";
  }

  return baseClasses;
}
