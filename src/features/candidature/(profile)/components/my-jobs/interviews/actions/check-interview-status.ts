
import { mockInterviews } from "@/core/mockData/jobs";
import { redirect } from "next/navigation";

export function isInterviewInvited(id: string) {
  const job = mockInterviews.find((job) => job.jobKey === id);
  if (!job || job.interviewStatus !== "INVITED") {
    redirect("/not-found");
  }
  return true;
}
