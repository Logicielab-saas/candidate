import { Metadata } from "next";
import { CreateAnnonceSteps } from "@/features/recruiter/annonces/components/create-annonce/CreateAnnonceSteps";

export const metadata: Metadata = {
  title: "Créer une annonce",
  description: "Créez une nouvelle annonce d'emploi",
};

export default function CreateAnnoncePage() {
  return (
    <div className="container relative min-w-0 shrink-0 min-h-0 p-6">
      <CreateAnnonceSteps />
    </div>
  );
}
