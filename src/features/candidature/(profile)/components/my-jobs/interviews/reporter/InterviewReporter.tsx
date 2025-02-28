import { Interview } from "@/core/types/interview";
import { JobHeader } from "../jobHeader";
import { Separator } from "@/components/ui/separator";

export function InterviewReporter({
  interview,
}: {
  interview: Interview | undefined;
}) {
  return (
    <>
      {/* Job details */}
      <JobHeader
        jobTitle={interview?.jobTitle || ""}
        companyName={interview?.company.name || ""}
      />
      <Separator />

      {/* Checkboxes for current and next week dates */}
    </>
  );
}
