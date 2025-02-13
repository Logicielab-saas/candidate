import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CandidateFilters } from "@/features/recruiter/candidatures/components/CandidateFilters";
import { CandidateFiltersMenu } from "@/features/recruiter/candidatures/components/CandidateFiltersAnnonceMenu";
import { CandidateFilterTabs } from "@/features/recruiter/candidatures/components/CandidateFilterTabs";
import { CandidateDataTable } from "@/features/recruiter/candidatures/components/CandidateDataTable";

export const mockCandidates = [
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
    statut: "nouveau",
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
      status: "En cours d'évaluation",
      message: "Candidature en cours d'examen.",
    },
    statut: "en-cours-examen",
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
    statut: "nouveau",
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
      status: "Entretien planifié",
      message: "Entretien prévu pour la semaine prochaine.",
    },
    statut: "en-cours-entretien",
  },
  {
    nom: "Sofia LEMARCHAND",
    ville: "Rabat",
    profil: "Développeur Full Stack",
    situation: "Disponible immédiatement",
    datePostule: "16 juin",
    titreOffre: "Développeur Web",
    pertinence: "Compétences correspondantes",
    telephone: "+212 612 34 56 79",
    activite: {
      status: "En attente de réponse",
      message: "En attente de confirmation du candidat.",
    },
    statut: "contacte",
  },
  {
    nom: "Khalid BENSAID",
    ville: "Marrakech",
    profil: "Designer UI/UX",
    situation: "En recherche d'emploi",
    datePostule: "17 juin",
    titreOffre: "Designer Graphique",
    pertinence: "Aucune qualification correspondant au profil",
    telephone: "+212 613 45 67 80",
    activite: {
      status: "Nouvelle candidature",
      message: "Les candidatures identifiées sont plus susceptibles.",
    },
    statut: "nouveau",
  },
  {
    nom: "Fatima ZAHRA",
    ville: "Tanger",
    profil: "Chef de Projet",
    situation: "Disponible immédiatement",
    datePostule: "18 juin",
    titreOffre: "Chef de Projet Digital",
    pertinence: "Compétences correspondantes",
    telephone: "+212 614 56 78 81",
    activite: {
      status: "En cours d'évaluation",
      message: "Candidature en cours d'examen.",
    },
    statut: "en-cours-examen",
  },
  {
    nom: "Omar EL HADDADI",
    ville: "Fès",
    profil: "Analyste de Données",
    situation: "En recherche d'emploi",
    datePostule: "19 juin",
    titreOffre: "Data Analyst",
    pertinence: "Compétences correspondantes",
    telephone: "+212 615 67 89 82",
    activite: {
      status: "Entretien planifié",
      message: "Entretien prévu pour la semaine prochaine.",
    },
    statut: "en-cours-entretien",
  },
  {
    nom: "Laila MOUSTAPHA",
    ville: "Agadir",
    profil: "Responsable Marketing",
    situation: "Disponible immédiatement",
    datePostule: "20 juin",
    titreOffre: "Marketing Manager",
    pertinence: "Aucune qualification correspondant au profil",
    telephone: "+212 616 78 90 83",
    activite: {
      status: "En attente de réponse",
      message: "En attente de confirmation du candidat.",
    },
    statut: "contacte",
  },
  {
    nom: "Youssef EL AMRANI",
    ville: "Casablanca",
    profil: "Développeur Full Stack",
    situation: "En recherche d'emploi",
    datePostule: "21 juin",
    titreOffre: "Développeur Web",
    pertinence: "Compétences correspondantes",
    telephone: "+212 617 89 01 84",
    activite: {
      status: "En cours d'évaluation",
      message: "Candidature en cours d'examen.",
    },
    statut: "en-cours-examen",
  },
  {
    nom: "Sara BOUHLAOUI",
    ville: "Rabat",
    profil: "Analyste Marketing",
    situation: "Disponible immédiatement",
    datePostule: "22 juin",
    titreOffre: "Marketing Analyst",
    pertinence: "Compétences correspondantes",
    telephone: "+212 618 90 12 85",
    activite: {
      status: "Entretien planifié",
      message: "Entretien prévu pour la semaine prochaine.",
    },
    statut: "en-cours-entretien",
  },
  {
    nom: "Hassan EL KHALED",
    ville: "Marrakech",
    profil: "Ingénieur Logiciel",
    situation: "En recherche d'emploi",
    datePostule: "23 juin",
    titreOffre: "Software Engineer",
    pertinence: "Compétences correspondantes",
    telephone: "+212 619 01 23 86",
    activite: {
      status: "En attente de réponse",
      message: "En attente de confirmation du candidat.",
    },
    statut: "ecarte",
  },
  {
    nom: "Nadia EL HASSANI",
    ville: "Tanger",
    profil: "Chef de Produit",
    situation: "Disponible immédiatement",
    datePostule: "24 juin",
    titreOffre: "Product Manager",
    pertinence: "Compétences correspondantes",
    telephone: "+212 620 12 34 87",
    activite: {
      status: "En cours d'évaluation",
      message: "Candidature en cours d'examen.",
    },
    statut: "embauche",
  },
  {
    nom: "Omar BENJELLOUN",
    ville: "Fès",
    profil: "Consultant IT",
    situation: "En recherche d'emploi",
    datePostule: "25 juin",
    titreOffre: "IT Consultant",
    pertinence: "Compétences correspondantes",
    telephone: "+212 621 23 45 88",
    activite: {
      status: "Entretien planifié",
      message: "Entretien prévu pour la semaine prochaine.",
    },
    statut: "en-cours-entretien",
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
