import { mockInterviews } from "@/core/mockData/jobs";
import { isInterviewPending } from "@/features/candidature/(profile)/my-jobs/interviews/actions/check-interview-status";
import { InterviewRefuser } from "@/features/candidature/(profile)/my-jobs/interviews/refuser/InterviewRefuser";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AnnulerInterviewPage({ params }: PageProps) {
  const { id } = await params;
  const interview = mockInterviews.find((job) => job.jobKey === id);

  isInterviewPending(id);

  return <InterviewRefuser interview={interview} source="annuler" />;
}
