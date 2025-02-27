import { Job } from "@/core/types";
import { ApplicationDetailsHeader } from "./ApplicationDetailsHeader";

interface ApplicationDetailsContainerProps {
  application: Job;
}

const _formatDate = (timestamp: number) => {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
  }).format(new Date(timestamp));
};

export function ApplicationDetailsContainer({
  application,
}: ApplicationDetailsContainerProps) {
  const { jobTitle, company, location, applyTime } = application;

  return (
    <ApplicationDetailsHeader
      jobTitle={jobTitle}
      company={company}
      location={location}
      applyTime={applyTime}
    />
  );
}
