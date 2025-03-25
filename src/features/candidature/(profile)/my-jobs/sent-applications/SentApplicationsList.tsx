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
import { motion, AnimatePresence } from "framer-motion";
import { useFetchSentApplications } from "../hooks/use-my-applied-jobs";
import { SentApplicationItemSkeleton } from "../skeletons/SentApplicationItemSkeleton";

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

export function SentApplicationsList({}) {
  const {
    data: sentApplications,
    isLoading,
    error,
  } = useFetchSentApplications();

  // Show skeleton loading state
  if (isLoading) {
    return (
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="divide-y divide-border"
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <SentApplicationItemSkeleton key={index} />
        ))}
      </motion.div>
    );
  }

  if (error) return <div>Error: {error.message}</div>;
  if (!sentApplications) return <div>No applications found</div>;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="divide-y divide-border"
    >
      {/* AnimatePresence enables exit animations when items are removed */}
      <AnimatePresence mode="popLayout">
        {sentApplications.applied.map((applied) => (
          <SentApplicationItem applied={applied} key={applied.uuid} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
