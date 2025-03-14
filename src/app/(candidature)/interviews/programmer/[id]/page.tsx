import { InterviewProgram } from "@/features/candidature/(profile)/my-jobs/interviews/programmer/InterviewProgram";
import { mockInterviews } from "@/core/mockData/jobs";
import { isInterviewInvited } from "@/features/candidature/(profile)/my-jobs/interviews/actions/check-interview-status";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProgrammerInterviewPage({ params }: PageProps) {
  const { id } = await params;
  const job = mockInterviews.find((job) => job.jobKey === id);

  isInterviewInvited(id);

  return (
    <>
      <InterviewProgram job={job} />
    </>
  );
}
