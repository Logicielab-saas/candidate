import { ApplicationDetailsContainer } from "@/features/candidature/(profile)/my-jobs/details/ApplicationDetailsContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Détails de la candidature | JobDashboard",
  description: "Consultez les détails de votre candidature",
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ApplicationDetailsPage({ params }: PageProps) {
  const { slug } = await params;

  return <ApplicationDetailsContainer slug={slug} />;
}
