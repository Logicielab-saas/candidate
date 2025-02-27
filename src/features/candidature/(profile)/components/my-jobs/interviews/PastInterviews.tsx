"use client";

import { Interview } from "@/core/types/interview";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, MapPin, Calendar, Clock, Zap } from "lucide-react";

interface PastInterviewsProps {
  interviews: Interview[];
}

export function PastInterviews({ interviews }: PastInterviewsProps) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Entretiens passés</h2>
      <AnimatePresence>
        {interviews.map((interview) => (
          <motion.div
            key={interview.jobKey}
            className="flex justify-between items-center border rounded-lg p-4 shadow-sm mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{interview.jobTitle}</h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <Building2 className="h-4 w-4 mr-1" />
                <span>{interview.company.name}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{interview.location}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{interview.interviewDate}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-1" />
                <span>{interview.interviewTime}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Zap className="h-4 w-4 mr-1" />
                <span>{interview.interviewType}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
