/**
 * tabs-count.store - Central store for tracking counts across job tabs
 *
 * This store maintains the counts for different job-related tabs:
 * - Saved jobs
 * - Sent applications
 * - Interviews
 * - Archived jobs
 *
 * It's used for displaying tab counters in the MyJobsContainer component.
 */
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface TabsCountState {
  // Tab counts
  savedJobsCount: number;
  sentApplicationsCount: number;
  interviewsCount: number;
  archivedCount: number;

  // Set actions
  setSavedJobsCount: (count: number) => void;
  setSentApplicationsCount: (count: number) => void;
  setInterviewsCount: (count: number) => void;
  setArchivedCount: (count: number) => void;

  // Reset action
  resetCounts: () => void;
}

export const useTabsCountStore = create<TabsCountState>()(
  devtools(
    (set) => ({
      // Initial state
      savedJobsCount: 0,
      sentApplicationsCount: 0,
      interviewsCount: 0,
      archivedCount: 0,

      // Set actions
      setSavedJobsCount: (count: number) =>
        set((state) => ({ savedJobsCount: count })),

      setSentApplicationsCount: (count: number) =>
        set((state) => ({ sentApplicationsCount: count })),

      setInterviewsCount: (count: number) =>
        set((state) => ({ interviewsCount: count })),

      setArchivedCount: (count: number) =>
        set((state) => ({ archivedCount: count })),

      // Reset action
      resetCounts: () =>
        set((state) => ({
          savedJobsCount: 0,
          sentApplicationsCount: 0,
          interviewsCount: 0,
          archivedCount: 0,
        })),
    }),
    { name: "tabs-count-store" }
  )
);
