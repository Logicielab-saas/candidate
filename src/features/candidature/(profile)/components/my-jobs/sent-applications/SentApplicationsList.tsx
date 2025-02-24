"use client";

import { SentApplicationItem } from "./SentApplicationItem";
import type { Job, CandidateStatus } from "@/core/types/job";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// This would typically come from your API/state management
const initialMockSentApplications: Job[] = [
  {
    jobTitle:
      "Offre de Stage PFE ou Pré-Embauche – Développement Web et Maintenance Applicative",
    jobKey: "1",
    jobUrl: "#",
    company: {
      name: "AB&MM Centre d'affaire",
    },
    location: "Tanger",
    jobExpired: true,
    jobReported: false,
    jobFraudulent: false,
    withdrawn: false,
    applyTime: new Date("2024-02-01").getTime(),
    statuses: {
      candidateStatus: {
        status: "APPLIED",
        timestamp: new Date("2024-02-01").getTime(),
      },
      selfReportedStatus: {
        status: "APPLIED",
        timestamp: new Date("2024-02-01").getTime(),
      },
      employerJobStatus: {
        status: "EXPIRED",
        timestamp: new Date("2024-02-01").getTime(),
      },
      userJobStatus: {
        status: "POST_APPLY",
        timestamp: new Date("2024-02-01").getTime(),
      },
    },
  },
  {
    jobTitle: "Développeur full stack",
    jobKey: "2",
    jobUrl: "#",
    company: {
      name: "Vinca digital",
    },
    location: "Casablanca",
    jobExpired: true,
    jobReported: false,
    jobFraudulent: false,
    withdrawn: false,
    applyTime: new Date("2024-01-29").getTime(),
    statuses: {
      candidateStatus: {
        status: "REJECTED",
        timestamp: new Date("2024-01-29").getTime(),
      },
      selfReportedStatus: {
        status: "APPLIED",
        timestamp: new Date("2024-01-29").getTime(),
      },
      employerJobStatus: {
        status: "EXPIRED",
        timestamp: new Date("2024-01-29").getTime(),
      },
      userJobStatus: {
        status: "POST_APPLY",
        timestamp: new Date("2024-01-29").getTime(),
      },
    },
  },
  {
    jobTitle: "Offre de stage PFE développeur Flutter",
    jobKey: "3",
    jobUrl: "#",
    company: {
      name: "Logiciel Lab",
    },
    location: "Tanger",
    jobExpired: false,
    jobReported: false,
    jobFraudulent: false,
    withdrawn: false,
    applyTime: new Date("2024-01-29").getTime(),
    statuses: {
      candidateStatus: {
        status: "INTERVIEWED",
        timestamp: new Date("2024-01-29").getTime(),
      },
      selfReportedStatus: {
        status: "APPLIED",
        timestamp: new Date("2024-01-29").getTime(),
      },
      employerJobStatus: {
        status: "OPEN",
        timestamp: new Date("2024-01-29").getTime(),
      },
      userJobStatus: {
        status: "POST_APPLY",
        timestamp: new Date("2024-01-29").getTime(),
      },
    },
  },
  {
    jobTitle: "Développeur React.js / Node.js",
    jobKey: "4",
    jobUrl: "#",
    company: {
      name: "MyTeam Solution",
    },
    location: "Bouskoura",
    jobExpired: false,
    jobReported: false,
    jobFraudulent: false,
    withdrawn: false,
    applyTime: new Date("2024-01-28").getTime(),
    statuses: {
      candidateStatus: {
        status: "APPLIED",
        timestamp: new Date("2024-01-28").getTime(),
      },
      selfReportedStatus: {
        status: "APPLIED",
        timestamp: new Date("2024-01-28").getTime(),
      },
      employerJobStatus: {
        status: "OPEN",
        timestamp: new Date("2024-01-28").getTime(),
      },
      userJobStatus: {
        status: "POST_APPLY",
        timestamp: new Date("2024-01-28").getTime(),
      },
    },
  },
];

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
  const [applications, setApplications] = useState(initialMockSentApplications);

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

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="divide-y divide-border"
    >
      <AnimatePresence mode="wait">
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
            onUpdateStatus={handleUpdateStatus}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
