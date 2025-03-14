import type { Job } from "@/core/types";
import { ApplicationDetailsHeader } from "./ApplicationDetailsHeader";
import { ApplicationDetailsBody } from "./ApplicationDetailsBody";

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
    <div className="flex flex-col gap-4">
      <ApplicationDetailsHeader
        jobTitle={jobTitle}
        company={company}
        location={location}
        applyTime={applyTime}
      />

      <ApplicationDetailsBody application={application} />
    </div>
  );
}
