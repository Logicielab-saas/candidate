import { mockInterviews } from "@/core/mockData/jobs";
import { isInterviewPending } from "@/features/candidature/(profile)/components/my-jobs/interviews/actions/check-interview-status";
import { InterviewReporter } from "@/features/candidature/(profile)/components/my-jobs/interviews/reporter/InterviewReporter";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ReporterInterviewsPage({ params }: PageProps) {
  const { id } = await params;
  const interview = mockInterviews.find((job) => job.jobKey === id);

  isInterviewPending(id);

  return <InterviewReporter interview={interview} />;
}
