/**
 * A Zustand store that manages the state of jobs marked as "not interested".
 * This store provides functionality to:
 * - Mark jobs as not interested
 * - Undo not interested status
 * - Check if a job is marked as not interested
 *
 * The store uses a Set to efficiently manage job IDs and prevent duplicates.
 *
 * * Mark a job as not interested
 * markAsNotInterested("job-123");
 *
 * * Check if a job is marked as not interested
 * const isJobNotInterested = isNotInterested("job-123");
 *
 * * Undo not interested status
 * undoNotInterested("job-123");
 * ```
 */

import { create } from "zustand";

/**
 * Interface defining the structure and actions available in the not interested store
 */
interface NotInterestedStore {
  /** Set containing IDs of jobs marked as not interested */
  notInterestedJobs: Set<string>;

  /**
   * Marks a job as not interested
   * @param jobId - The ID of the job to mark
   */
  markAsNotInterested: (jobId: string) => void;

  /**
   * Removes the not interested status from a job
   * @param jobId - The ID of the job to undo
   */
  undoNotInterested: (jobId: string) => void;

  /**
   * Checks if a job is marked as not interested
   * @param jobId - The ID of the job to check
   * @returns boolean indicating if the job is marked as not interested
   */
  isNotInterested: (jobId: string) => boolean;
}

/**
 * Zustand store creation
 * Uses Set for O(1) lookup and modification operations
 */
export const useNotInterestedStore = create<NotInterestedStore>((set, get) => ({
  // Initial state: empty Set
  notInterestedJobs: new Set<string>(),

  // Add a job ID to the not interested Set
  markAsNotInterested: (jobId: string) => {
    set((state) => {
      const newSet = new Set(state.notInterestedJobs);
      newSet.add(jobId);
      return { notInterestedJobs: newSet };
    });
  },

  // Remove a job ID from the not interested Set
  undoNotInterested: (jobId: string) => {
    set((state) => {
      const newSet = new Set(state.notInterestedJobs);
      newSet.delete(jobId);
      return { notInterestedJobs: newSet };
    });
  },

  // Check if a job ID exists in the not interested Set
  isNotInterested: (jobId: string) => {
    return get().notInterestedJobs.has(jobId);
  },
}));
