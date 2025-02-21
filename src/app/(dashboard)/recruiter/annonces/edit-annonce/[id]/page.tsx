import { EditAnnonceContainer } from "@/features/recruiter/annonces/components/edit-annonce/EditAnnonceContainer";
import { mockAnnonceData } from "@/core/mockData/annonces-real-data";
import { notFound } from "next/navigation";

interface EditAnnoncePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditAnnoncePage({
  params,
}: EditAnnoncePageProps) {
  const { id } = await params;
  // Find the annonce data based on the ID
  const annonceData = mockAnnonceData.find((annonce) => annonce.id === id);

  // If no data found, show 404
  if (!annonceData) {
    notFound();
  }

  return (
    <div className="container py-8">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-semibold text-secondaryHex-900 dark:text-secondaryHex-50">
          Modifier l&apos;annonce: {annonceData.intitule}
        </h1>
        <div className="flex flex-col gap-1">
          <p className="text-sm text-secondaryHex-600 dark:text-secondaryHex-400">
            Modifiez les informations de votre annonce
          </p>
          <p className="text-xs text-secondaryHex-500 dark:text-secondaryHex-500">
            ID: {annonceData.id} • Publié le {annonceData.dateDePublication}
          </p>
        </div>
      </div>
      <EditAnnonceContainer annonceData={annonceData} />
    </div>
  );
}
