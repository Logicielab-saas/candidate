// Types
export interface Message {
  id: number;
  jobTitle: string;
  jobType: string;
  date: string;
  candidate: {
    name: string;
    position: string;
    city: string;
    telephone: string;
  };
  preview: string;
  isUnread: boolean;
  participantsCount?: number;
  participants: { name: string; role: string }[];
}

// Mock data for jobs
export const JOBS_OPTIONS = [
  { label: "Social Media Manager", value: "social-media" },
  { label: "Marketing Analyst", value: "marketing-analyst" },
  { label: "Développeur Web", value: "dev-web" },
  { label: "IT Consultant", value: "it-consultant" },
  { label: "Product Manager", value: "product-manager" },
];

// Mock data for messages
export const MOCK_MESSAGES: Message[] = [
  {
    id: 1,
    jobTitle: "A postulé pour « Social Media Manager »",
    jobType: "social-media",
    date: "Il y a 2 heures",
    candidate: {
      name: "Ayoub BOUKHANE",
      position: "Social Head Marketing",
      city: "Casablanca",
      telephone: "+212 611 22 33 44",
    },
    preview:
      "Bonjour, Je suis très intéressé par le poste de Social Media Manager. J'ai une solide expérience dans le domaine et je souhaiterais discuter des opportunités...",
    isUnread: true,
    participants: [
      { name: "Ayoub BOUKHANE", role: "Candidat" },
      { name: "Recruteur", role: "Vous" },
    ],
  },
  {
    id: 2,
    jobTitle: "A postulé pour « Marketing Analyst »",
    jobType: "marketing-analyst",
    date: "Hier",
    candidate: {
      name: "Sara BOUHLAOUI",
      position: "Analyste Marketing",
      city: "Rabat",
      telephone: "+212 618 90 12 85",
    },
    preview:
      "Bonjour, Suite à notre entretien de la semaine dernière, je vous envoie comme convenu mon portfolio actualisé avec mes dernières analyses...",
    isUnread: false,
    participants: [
      { name: "Sara BOUHLAOUI", role: "Candidat" },
      { name: "Recruteur", role: "Vous" },
    ],
  },
  {
    id: 3,
    jobTitle: "A postulé pour « IT Consultant »",
    jobType: "it-consultant",
    date: "Il y a 3 jours",
    candidate: {
      name: "Omar BENJELLOUN",
      position: "Consultant IT",
      city: "Fès",
      telephone: "+212 621 23 45 88",
    },
    preview:
      "Bonjour, Je suis actuellement consultant IT avec une expérience significative dans le conseil en technologies. Je suis très intéressé par l'opportunité...",
    isUnread: true,
    participants: [
      { name: "Omar BENJELLOUN", role: "Candidat" },
      { name: "Recruteur", role: "Vous" },
    ],
  },
  {
    id: 4,
    jobTitle: "A postulé pour « Développeur Web »",
    jobType: "dev-web",
    date: "Il y a 4 jours",
    candidate: {
      name: "Youssef EL AMRANI",
      position: "Développeur Full Stack",
      city: "Casablanca",
      telephone: "+212 617 89 01 84",
    },
    preview:
      "Bonjour, Je suis développeur Full Stack avec une expertise en React et Node.js. Votre offre de poste correspond parfaitement à mon profil...",
    isUnread: false,
    participants: [
      { name: "Youssef EL AMRANI", role: "Candidat" },
      { name: "Recruteur", role: "Vous" },
    ],
  },
  {
    id: 5,
    jobTitle: "A postulé pour « Product Manager »",
    jobType: "product-manager",
    date: "Il y a 5 jours",
    candidate: {
      name: "Nadia EL HASSANI",
      position: "Chef de Produit",
      city: "Tanger",
      telephone: "+212 620 12 34 87",
    },
    preview:
      "Bonjour, En tant que Chef de Produit expérimentée, je suis vivement intéressée par le poste de Product Manager au sein de votre entreprise...",
    isUnread: true,
    participants: [
      { name: "Nadia EL HASSANI", role: "Candidat" },
      { name: "Recruteur", role: "Vous" },
    ],
  },
];
