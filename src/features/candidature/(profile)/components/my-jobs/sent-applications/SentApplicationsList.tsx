"use client";

import { SentApplicationItem } from "./SentApplicationItem";
import type { CandidateStatus } from "@/core/types/job";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mockSentApplications } from "@/core/mockData/jobs";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function SentApplicationsList() {
  const [applications, setApplications] = useState(mockSentApplications);

  const handleUpdateStatus = (jobId: string, newStatus: CandidateStatus) => {
    setApplications((currentApplications) =>
      currentApplications.map((app) => {
        if (app.jobKey === jobId) {
          const now = Date.now();
          return {
            ...app,
            statuses: {
              ...app.statuses,
              candidateStatus: {
                status: newStatus,
                timestamp: now,
              },
              selfReportedStatus: {
                status: newStatus,
                timestamp: now,
              },
            },
          };
        }
        return app;
      })
    );
  };

  const handleArchive = (jobId: string) => {
    setApplications((currentApplications) =>
      currentApplications.filter((app) => app.jobKey !== jobId)
    );
  };

  const nonArchivedApplications = applications.filter(
    (app) => app.statuses.userJobStatus.status !== "ARCHIVED"
  );

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="divide-y divide-border"
    >
      <AnimatePresence mode="popLayout">
        {nonArchivedApplications.map((job) => (
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
            onUpdateStatus={handleUpdateStatus}
            onArchive={handleArchive}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
