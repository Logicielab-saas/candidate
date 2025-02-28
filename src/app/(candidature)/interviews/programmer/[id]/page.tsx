import { InterviewProgram } from "@/features/candidature/(profile)/components/my-jobs/interviews/programmer/InterviewProgram";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProgrammerInterviewPage({ params }: PageProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id } = await params;

  return (
    <>
      <InterviewProgram />
    </>
  );
}
