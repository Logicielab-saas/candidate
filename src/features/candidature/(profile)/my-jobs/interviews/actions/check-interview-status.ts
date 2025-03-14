import { mockInterviews } from "@/core/mockData/jobs";
import { redirect } from "next/navigation";

export function isInterviewInvited(id: string) {
  const job = mockInterviews.find((job) => job.jobKey === id);
  if (!job || job.interviewStatus !== "INVITED") {
    redirect("/not-found");
  }
  return true;
}

export function isInterviewPending(id: string) {
  const job = mockInterviews.find((job) => job.jobKey === id);
  console.log(job);

  if (!job || job.interviewStatus === "PASSED") {
    redirect("/not-found");
  }

  if (
    job.interviewStatus !== "PENDING" &&
    job.fixedInterviewHour === undefined &&
    job.fixedInterviewDate === undefined
  ) {
    redirect("/not-found");
  }

  return true;
}
