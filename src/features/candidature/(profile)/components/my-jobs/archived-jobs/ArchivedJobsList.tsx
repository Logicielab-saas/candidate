"use client";

import { ArchivedJobItem } from "./ArchivedJobItem";
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

export function ArchivedJobsList() {
  const [archivedJobs, setArchivedJobs] = useState(
    mockSentApplications.filter(
      (job) => job.statuses.userJobStatus.status === "ARCHIVED"
    )
  );

  const handleUnarchive = (jobId: string) => {
    setArchivedJobs((currentJobs) =>
      currentJobs.filter((job) => job.jobKey !== jobId)
    );
  };

  const handleReport = (jobId: string) => {
    console.log("Reporting job:", jobId);
    // Implement report logic
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="divide-y divide-border"
    >
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
            onUnarchive={() => handleUnarchive(job.jobKey)}
            onReport={() => handleReport(job.jobKey)}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
