import { Metadata } from "next";
import { AnnonceDetailsContainer } from "@/features/annonces/components/details/AnnonceDetailsContainer";

export const metadata: Metadata = {
  title: "Job Details | Postuly",
  description: "View job details and apply for a job.",
};

interface JobDetailsPageProps {
  params: Promise<{ slug: string }>;
}

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
  const { slug } = await params;
  return <AnnonceDetailsContainer slug={slug} />;
}
