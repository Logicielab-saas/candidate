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

// Message templates data
export interface MessageTemplate {
  id: string;
  category: string;
  title: string;
  content: string;
}

export const MESSAGE_TEMPLATES: MessageTemplate[] = [
  {
    id: "template-1",
    category: "Entretiens",
    title: "Proposition d'entretien",
    content:
      "Bonjour,\n\nVotre profil a retenu toute notre attention. Nous aimerions vous rencontrer pour un entretien.\n\nQuelles seraient vos disponibilités pour la semaine prochaine ?\n\nCordialement",
  },
  {
    id: "template-2",
    category: "Entretiens",
    title: "Confirmation d'entretien",
    content:
      "Bonjour,\n\nJe confirme notre entretien prévu le [DATE] à [HEURE].\n\nL'entretien se déroulera [en visioconférence/dans nos locaux].\n\nÀ bientôt",
  },
  {
    id: "template-3",
    category: "Suivi",
    title: "Demande d'informations complémentaires",
    content:
      "Bonjour,\n\nPourriez-vous nous faire parvenir les éléments suivants pour compléter votre dossier :\n- CV actualisé\n- Lettre de motivation\n- Références professionnelles\n\nCordialement",
  },
  {
    id: "template-4",
    category: "Suivi",
    title: "Accusé de réception",
    content:
      "Bonjour,\n\nNous accusons réception de votre candidature et vous en remercions.\n\nNous allons l'étudier avec attention et reviendrons vers vous dans les meilleurs délais.\n\nCordialement",
  },
  {
    id: "template-5",
    category: "Décisions",
    title: "Réponse positive",
    content:
      "Bonjour,\n\nNous avons le plaisir de vous informer que votre candidature a été retenue.\n\nNous souhaiterions vous rencontrer pour discuter plus en détail des modalités.\n\nPouvez-vous nous indiquer vos disponibilités ?\n\nCordialement",
  },
  {
    id: "template-6",
    category: "Décisions",
    title: "Réponse d'attente",
    content:
      "Bonjour,\n\nNous avons bien étudié votre candidature qui a retenu notre attention.\n\nNous sommes actuellement en cours de recrutement et nous permettons de conserver votre dossier.\n\nNous ne manquerons pas de revenir vers vous dès que possible.\n\nCordialement",
  },
];
