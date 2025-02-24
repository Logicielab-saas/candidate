"use client";

import { SavedJobItem } from "./SavedJobItem";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mockSavedJobs } from "@/core/mockData/jobs";

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
  const [savedJobs, setSavedJobs] = useState(mockSavedJobs);

  const handleApply = (jobId: string) => {
    console.log("Applying to job:", jobId);
    // Implement apply logic
  };

  const handleRemove = (jobId: string) => {
    setSavedJobs((currentJobs) =>
      currentJobs.filter((job) => job.id !== jobId)
    );
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="divide-y divide-border"
    >
      <AnimatePresence mode="wait">
        {savedJobs.map((job) => (
          <SavedJobItem
            key={job.id}
            title={job.title}
            company={job.company}
            location={job.location}
            savedDate={job.savedDate}
            jobUrl={job.jobUrl}
            onApply={() => handleApply(job.id)}
            onRemove={() => handleRemove(job.id)}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
