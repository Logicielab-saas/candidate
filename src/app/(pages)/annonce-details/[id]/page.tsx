import { Suspense } from "react";
import { redirect } from "next/navigation";
import { AnnonceDetailsContainer } from "@/features/annonces/components/AnnonceDetailsContainer";
import { MOCK_ANNONCES } from "@/core/mockData/annonces";
import { Skeleton } from "@/components/ui/skeleton";
import { Metadata } from "next";

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

  return (
    <Suspense
      fallback={
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-10 w-40" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-40 w-full" />
            <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
              <div className="space-y-4">
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-32 w-full" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-40 w-full" />
              </div>
            </div>
          </div>
        </div>
      }
    >
      <AnnonceDetailsContainer annonce={annonce} />
    </Suspense>
  );
}
