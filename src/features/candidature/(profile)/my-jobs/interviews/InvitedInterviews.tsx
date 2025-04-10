"use client";

import { Interview } from "@/core/interfaces/";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, Calendar, Clock, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface InvitedInterviewsProps {
  interviews: Interview[];
}

export function InvitedInterviews({ interviews }: InvitedInterviewsProps) {
  return (
    <div>
      <div className="border border-primaryHex-500 p-4 rounded-lg shadow-md mb-4 relative">
        <h2 className="text-xl font-bold mb-4 relative z-10">
          Entretiens Programmés
        </h2>
        <p className="text-md mb-4">
          Ce sont les entretiens auxquels vous avez été invité.
        </p>
      </div>
      <AnimatePresence>
        <div className="relative">
          <div className="absolute left-0 top-0 h-full border-l-4 border-dashed border-primaryHex-500 shadow-lg z-0"></div>
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
                <Badge variant="default" className="mb-2">
                  Invité
                </Badge>
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
                  <span>
                    {format(new Date(interview.interviewDate), "PPP", {
                      locale: fr,
                    })}
                  </span>
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
                <Button className="mb-2" asChild>
                  <Link href={`/interviews/programmer/${interview.jobKey}`}>
                    Programmer
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href={`/interviews/refuser/${interview.jobKey}`}>
                    Refuser
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
