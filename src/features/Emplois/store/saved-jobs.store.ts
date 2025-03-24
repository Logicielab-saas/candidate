/**
 * A Zustand store that manages the state of saved jobs.
 * This store provides functionality to:
 * - Save jobs
 * - Remove saved jobs
 * - Check if a job is saved
 * - Initialize saved jobs from API data
 *
 * The store uses a Set to efficiently manage job IDs and prevent duplicates.
 *
 * Example usage:
 * ```ts
 * * Initialize saved jobs from API
 * initializeSavedJobs(jobs);
 *
 * * Save a job
 * saveJob("job-123");
 *
 * * Check if a job is saved
 * const isJobSaved = isSaved("job-123");
 *
 * * Remove a saved job
 * removeSavedJob("job-123");
 * ```
 */

import { create } from "zustand";
import type { Emplois } from "@/core/interfaces";

/**
 * Interface defining the structure and actions available in the saved jobs store
 */
interface SavedJobsStore {
  /** Set containing IDs of saved jobs */
  savedJobs: Set<string>;

  /**
   * Initialize saved jobs from API data
   * @param jobs - Array of jobs from API
   */
  initializeSavedJobs: (jobs: Emplois[]) => void;

  /**
   * Saves a job
   * @param jobId - The ID of the job to save
   */
  saveJob: (jobId: string) => void;

  /**
   * Removes a job from saved jobs
   * @param jobId - The ID of the job to remove
   */
  removeSavedJob: (jobId: string) => void;

  /**
   * Checks if a job is saved
   * @param jobId - The ID of the job to check
   * @returns boolean indicating if the job is saved
   */
  isSaved: (jobId: string) => boolean;
}

/**
 * Zustand store creation
 * Uses Set for O(1) lookup and modification operations
 */
export const useSavedJobsStore = create<SavedJobsStore>((set, get) => ({
  // Initial state: empty Set
  savedJobs: new Set<string>(),

  // Initialize saved jobs from API data
  initializeSavedJobs: (jobs: Emplois[]) => {
    const savedJobIds = jobs.filter((job) => job.saved).map((job) => job.uuid);

    set({ savedJobs: new Set(savedJobIds) });
  },

  // Add a job ID to the saved Set
  saveJob: (jobId: string) => {
    set((state) => {
      const newSet = new Set(state.savedJobs);
      newSet.add(jobId);
      return { savedJobs: newSet };
    });
  },

  // Remove a job ID from the saved Set
  removeSavedJob: (jobId: string) => {
    set((state) => {
      const newSet = new Set(state.savedJobs);
      newSet.delete(jobId);
      return { savedJobs: newSet };
    });
  },

  // Check if a job ID exists in the saved Set
  isSaved: (jobId: string) => {
    return get().savedJobs.has(jobId);
  },
}));
