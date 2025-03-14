/**
 * ArchivedJobsList - Displays a list of archived job applications
 *
 * This component shows all archived job applications and provides
 * functionality to unarchive them if needed.
 *
 * Props:
 * - archivedJobs: Array of archived Job objects
 * - onUnarchive: Function to unarchive a job application
 */
"use client";

import { ArchivedJobItem } from "./ArchivedJobItem";
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

interface ArchivedJobsListProps {
  archivedJobs: Job[];
  onUnarchive: (jobId: string) => void;
}

export function ArchivedJobsList({
  archivedJobs,
  onUnarchive,
}: ArchivedJobsListProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="divide-y divide-border"
    >
      {/* AnimatePresence enables exit animations when items are removed */}
      <AnimatePresence mode="popLayout">
        {archivedJobs.map((job) => (
          <ArchivedJobItem
            key={job.jobKey}
            jobKey={job.jobKey}
            jobTitle={job.jobTitle}
            company={job.company}
            location={job.location}
            savedDate={new Date(job.applyTime).toLocaleDateString("fr-FR")}
            jobUrl={job.jobUrl}
            jobExpired={job.jobExpired}
            jobReported={job.jobReported}
            jobFraudulent={job.jobFraudulent}
            withdrawn={job.withdrawn}
            applyTime={job.applyTime}
            statuses={job.statuses}
            onUnarchive={() => onUnarchive(job.jobKey)}
            jobId={job.jobKey}
            bookmarked={job.bookmarked}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
