import { InterviewRefuser } from "@/features/candidature/(profile)/components/my-jobs/interviews/refuser/InterviewRefuser";
import { mockInterviews } from "@/core/mockData/jobs";
import { isInterviewInvited } from "@/features/candidature/(profile)/components/my-jobs/interviews/actions/check-interview-status";

interface PageProps {
  params: Promise<{ id: string }>;
}

const RefuserInterviewPage = async ({ params }: PageProps) => {
  const { id } = await params;
  const job = mockInterviews.find((job) => job.jobKey === id);

  isInterviewInvited(id);

  return <InterviewRefuser interview={job} />;
};

export default RefuserInterviewPage;
