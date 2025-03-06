import { create } from "zustand";

interface NotInterestedStore {
  notInterestedJobs: Set<string>;
  markAsNotInterested: (jobId: string) => void;
  undoNotInterested: (jobId: string) => void;
  isNotInterested: (jobId: string) => boolean;
}

export const useNotInterestedStore = create<NotInterestedStore>((set, get) => ({
  notInterestedJobs: new Set<string>(),

  markAsNotInterested: (jobId: string) => {
    set((state) => {
      const newSet = new Set(state.notInterestedJobs);
      newSet.add(jobId);
      return { notInterestedJobs: newSet };
    });
  },

  undoNotInterested: (jobId: string) => {
    set((state) => {
      const newSet = new Set(state.notInterestedJobs);
      newSet.delete(jobId);
      return { notInterestedJobs: newSet };
    });
  },

  isNotInterested: (jobId: string) => {
    return get().notInterestedJobs.has(jobId);
  },
}));
