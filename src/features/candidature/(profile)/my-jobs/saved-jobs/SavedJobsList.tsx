/**
 * SavedJobsList - Displays a list of bookmarked jobs
 *
 * This component receives jobs that have been bookmarked by the user
 * and renders them in a list with animation effects.
 *
 * Props:
 * - jobs: Array of bookmarked Job objects
 * - onRemoveBookmark: Function to remove a job from bookmarks
 */
"use client";

import { SavedJobItem } from "./SavedJobItem";
import { motion, AnimatePresence } from "framer-motion";
import type { Job } from "@/core/types";

// Animation configuration for the container
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

interface SavedJobsListProps {
  jobs: Job[];
  onRemoveBookmark: (jobId: string) => void;
}

export function SavedJobsList({ jobs, onRemoveBookmark }: SavedJobsListProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="divide-y divide-border"
    >
      {/* AnimatePresence enables exit animations when items are removed */}
      <AnimatePresence mode="popLayout">
        {jobs.map((job) => (
          <SavedJobItem
            key={job.jobKey}
            jobId={job.jobKey}
            title={job.jobTitle}
            company={job.company}
            location={job.location}
            savedDate={new Date(job.applyTime).toLocaleDateString("fr-FR")}
            jobUrl={job.jobUrl}
            onRemove={() => onRemoveBookmark(job.jobKey)}
            bookmarked={job.bookmarked}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
