"use client";

import { SentApplicationItem } from "./SentApplicationItem";
import type { Job } from "@/core/types/job";

// This would typically come from your API/state management
const mockSentApplications: Job[] = [
  {
    jobTitle:
      "Offre de Stage PFE ou Pré-Embauche – Développement Web et Maintenance Applicative",
    jobKey: "1",
    jobUrl: "https://ma.indeed.com/viewjob?jk=1",
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
    jobUrl: "https://ma.indeed.com/viewjob?jk=2",
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
    jobUrl: "https://ma.indeed.com/viewjob?jk=3",
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
    jobUrl: "https://ma.indeed.com/viewjob?jk=4",
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

export function SentApplicationsList() {
  const handleUpdateStatus = (jobKey: string) => {
    console.log("Updating status for application:", jobKey);
    // Implement status update logic
  };

  return (
    <div className="divide-y divide-border">
      {mockSentApplications.map((job) => (
        <SentApplicationItem
          key={job.jobKey}
          jobTitle={job.jobTitle}
          company={job.company}
          location={job.location}
          applyTime={job.applyTime}
          jobExpired={job.jobExpired}
          jobUrl={job.jobUrl}
          statuses={job.statuses}
          onUpdateStatus={() => handleUpdateStatus(job.jobKey)}
        />
      ))}
    </div>
  );
}
