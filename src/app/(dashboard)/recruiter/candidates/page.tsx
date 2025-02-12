import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CandidateFilters } from "@/features/recruiter/candidatures/components/CandidateFilters";
import { CandidateFiltersMenu } from "@/features/recruiter/candidatures/components/CandidateFiltersAnnonceMenu";
import { CandidateFilterTabs } from "@/features/recruiter/candidatures/components/CandidateFilterTabs";
import { CandidateDataTable } from "@/features/recruiter/candidatures/components/CandidateDataTable";

const mockCandidates = [
  {
    nom: "Nadia Rozine",
    ville: "Casablanca",
    profil: "Gestion Marketing",
    situation: "En recherche d'emploi",
    datePostule: "15 juin",
    titreOffre: "Social Media Manager",
    pertinence: "Aucune qualification correspondant au profil",
    telephone: "+212 612 34 56 78",
    activite: {
      status: "Nouvelle candidature",
      message: "Les candidatures identifiées sont plus susceptibles.",
    },
  },
  {
    nom: "Mariam Blanche",
    ville: "La Chapelle-des-Fougeretz",
    profil: "Social Head Marketing",
    situation: "Disponible immédiatement",
    datePostule: "15 juin",
    titreOffre: "Social Media Manager",
    pertinence: "Disponible immédiatement",
    telephone: "+33 612 34 56 78",
    activite: {
      status: "Nouvelle candidature",
      message: "Les candidatures identifiées sont plus susceptibles.",
    },
  },
  {
    nom: "Mohamed El MAIZI",
    ville: "Casablanca",
    profil: "Social Head Marketing",
    situation: "En recherche d'emploi",
    datePostule: "15 juin",
    titreOffre: "Social Media Manager",
    pertinence: "Disponible immédiatement",
    telephone: "+212 698 76 54 32",
    activite: {
      status: "Nouvelle candidature",
      message: "Les candidatures identifiées sont plus susceptibles.",
    },
  },
  {
    nom: "Ayoub BOUKHANE",
    ville: "Casablanca",
    profil: "Social Head Marketing",
    situation: "En recherche d'emploi",
    datePostule: "15 juin",
    titreOffre: "Social Media Manager",
    pertinence: "Disponible immédiatement",
    telephone: "+212 611 22 33 44",
    activite: {
      status: "Nouvelle candidature",
      message: "Les candidatures identifiées sont plus susceptibles.",
    },
  },
];

const CandidatesPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between w-full">
        <div className="flex-1">
          <p className="text-2xl font-bold">Candidat(e)s</p>
        </div>
        <Button className="mt-2">Publier une annonce</Button>
      </div>
      <CandidateFiltersMenu />

      <Separator />

      <CandidateFilterTabs />

      <CandidateFilters />

      <div className="mt-2">
        <CandidateDataTable data={mockCandidates} />
      </div>
    </div>
  );
};

export default CandidatesPage;
