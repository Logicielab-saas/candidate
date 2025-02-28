"use client";

import { SavedJobItem } from "./SavedJobItem";
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

export function SavedJobsList() {
  const [savedJobs, setSavedJobs] = useState(
    mockSentApplications.filter((job) => job.bookmarked)
  );

  const handleApply = (jobId: string) => {
    console.log("Applying to job:", jobId);
    // Implement apply logic
  };

  const handleRemove = (jobId: string) => {
    setSavedJobs((currentJobs) =>
      currentJobs.filter((job) => job.jobKey !== jobId)
    );
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="divide-y divide-border"
    >
      <AnimatePresence mode="popLayout">
        {savedJobs.map((job) => (
          <SavedJobItem
            key={job.jobKey}
            jobId={job.jobKey}
            title={job.jobTitle}
            company={job.company}
            location={job.location}
            savedDate={new Date(job.applyTime).toLocaleDateString("fr-FR")}
            jobUrl={job.jobUrl}
            onApply={() => handleApply(job.jobKey)}
            onRemove={() => handleRemove(job.jobKey)}
            bookmarked={job.bookmarked}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
