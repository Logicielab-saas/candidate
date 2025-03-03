import { MOCK_ANNONCES } from "@/core/mockData/annonces";
import { AnnonceDetailsContainer } from "@/features/annonces/AnnonceDetailsContainer";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Job Details | Postuly",
  description: "View job details and apply for a job.",
};

interface JobDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
  const { id } = await params;

  const annonce = MOCK_ANNONCES.find((job) => job.id === id);

  if (!annonce) {
    redirect("/notFound");
  }

  return <AnnonceDetailsContainer annonce={annonce} />;
}
