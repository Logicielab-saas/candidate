/**
 * SentApplicationsList - Displays a list of active job applications
 *
 * This component shows all non-archived job applications and provides
 * functionality to update their status or archive them.
 *
 * Props:
 * - applications: Array of active Job applications
 * - onUpdateStatus: Function to update the status of an application
 * - onArchive: Function to archive an application
 */
"use client";

import { SentApplicationItem } from "./SentApplicationItem";
import type { CandidateStatus, Job } from "@/core/types";
import { motion, AnimatePresence } from "framer-motion";

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

interface SentApplicationsListProps {
  applications: Job[];
  onUpdateStatus: (jobId: string, newStatus: CandidateStatus) => void;
  onArchive: (jobId: string) => void;
}

export function SentApplicationsList({
  applications,
  onUpdateStatus,
  onArchive,
}: SentApplicationsListProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="divide-y divide-border"
    >
      {/* AnimatePresence enables exit animations when items are removed */}
      <AnimatePresence mode="popLayout">
        {applications.map((job) => (
          <SentApplicationItem
            key={job.jobKey}
            jobId={job.jobKey}
            jobTitle={job.jobTitle}
            company={job.company}
            location={job.location}
            applyTime={job.applyTime}
            jobExpired={job.jobExpired}
            jobUrl={job.jobUrl}
            statuses={job.statuses}
            onUpdateStatus={onUpdateStatus}
            onArchive={onArchive}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
