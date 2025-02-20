import { Suspense } from "react";
import { notFound } from "next/navigation";
import { AnnonceDetails } from "@/features/recruiter/annonces/components/annonces/AnnonceDetails";
import { mockAnnonceDetails } from "@/core/mockData/annonces-details-data";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AnnonceDetailsPage({ params }: PageProps) {
  // Await the params to get the id
  const { id } = await params;

  // Since mockAnnonceDetails is a static object, we don't need to await it
  const annonce = mockAnnonceDetails[id];

  if (!annonce) {
    notFound();
  }

  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <AnnonceDetails annonceId={id} />
    </Suspense>
  );
}
