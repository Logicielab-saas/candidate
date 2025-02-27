"use client";

import { Interview } from "@/core/types/interview";
import { motion } from "framer-motion";

interface PendingInterviewsProps {
  interviews: Interview[];
}

export function PendingInterviews({ interviews }: PendingInterviewsProps) {
  return (
    <div>
      <h2 className="text-xl font-bold">Entretiens prévus</h2>
      {interviews.map((interview) => (
        <motion.div key={interview.jobKey} className="py-2">
          <div>
            {interview.jobTitle} - {interview.interviewDate} (
            {interview.interviewType})
          </div>
        </motion.div>
      ))}
    </div>
  );
}
