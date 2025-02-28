import { InterviewProgram } from "@/features/candidature/(profile)/components/my-jobs/interviews/programmer/InterviewProgram";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProgrammerInterviewPage({ params }: PageProps) {
   
  const { id } = await params;

  return (
    <>
      <InterviewProgram jobKey={id} />
    </>
  );
}
