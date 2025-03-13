import { mockSentApplications } from "@/core/mockData/jobs";
import { redirect } from "next/navigation";
import { ApplicationDetailsContainer } from "@/features/candidature/(profile)/components/my-jobs/details/ApplicationDetailsContainer";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ApplicationDetailsPage({ params }: PageProps) {
  const { id } = await params;

  const application = mockSentApplications.find((app) => app.jobKey === id);

  if (!application) {
    redirect("/notFound");
  }

  return <ApplicationDetailsContainer application={application} />;
}
