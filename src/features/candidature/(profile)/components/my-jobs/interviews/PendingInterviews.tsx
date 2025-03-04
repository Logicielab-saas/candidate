"use client";

import { Button } from "@/components/ui/button";
import { Interview } from "@/core/interfaces/interview";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, MapPin, Calendar, Clock, Zap } from "lucide-react";
import Link from "next/link";

interface PendingInterviewsProps {
  interviews: Interview[];
}

export function PendingInterviews({ interviews }: PendingInterviewsProps) {
  return (
    <div>
      <div className="border border-gray-700 p-4 rounded-lg shadow-md mb-4">
        <h2 className="text-xl font-bold mb-4">Entretiens En Attente</h2>
        <p className="text-md mb-4">
          Ces entretiens attendent votre confirmation.
        </p>
      </div>
      <AnimatePresence>
        <div className="relative">
          <div className="absolute left-0 top-0 h-full border-l-4 border-dashed border-gray-700 shadow-lg z-0"></div>
          {interviews.map((interview) => (
            <motion.div
              key={interview.jobKey}
              className="flex justify-between items-center shadow rounded-lg p-4 mb-4 ml-4 dark:border"
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
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-100">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{interview.interviewTime}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-100">
                  <Zap className="h-4 w-4 mr-1" />
                  <span>{interview.interviewType}</span>
                </div>
              </div>
              <div className="flex flex-row space-x-2 ml-4">
                <Button
                  variant="outline"
                  className="mb-2 bg-gray-700 text-white hover:bg-gray-800 hover:text-white"
                  asChild
                >
                  <Link href={`/interviews/reporter/${interview.jobKey}`}>
                    Reporter
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href={`/interviews/annuler/${interview.jobKey}`}>
                    Annuler
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
}
