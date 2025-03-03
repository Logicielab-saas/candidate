// Types
export interface Message {
  id: number;
  preview: string;
  isUnread: boolean;
  participantsCount?: number;
  company: {
    name: string;
    logo: string;
  };
  job: {
    name: string;
    type?: string;
  };
  participants: {
    name: string;
    role: string;
  }[];
  status: "archived" | "spam" | "inbox";
  date: string;
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
    company: {
      name: "TechCorp",
      logo: "/companies/techcorp.png",
    },
    job: {
      name: "Social Media Manager",
      type: "social-media",
    },
    date: "Il y a 2 heures",
    preview:
      "Bonjour, Je suis très intéressé par le poste de Social Media Manager. J'ai une solide expérience dans le domaine et je souhaiterais discuter des opportunités...",
    isUnread: true,
    participants: [
      { name: "Ayoub BOUKHANE", role: "Candidat" },
      { name: "Soukaina EL HASSANI", role: "Recruteur" },
    ],
    status: "inbox",
  },
  {
    id: 2,
    company: {
      name: "MarketPro",
      logo: "/companies/marketpro.png",
    },
    job: {
      name: "Marketing Analyst",
      type: "marketing-analyst",
    },
    date: "Hier",
    preview:
      "Bonjour, Suite à notre entretien de la semaine dernière, je vous envoie comme convenu mon portfolio actualisé avec mes dernières analyses...",
    isUnread: false,
    participants: [
      { name: "Sara BOUHLAOUI", role: "Candidat" },
      { name: "Marianne LAGARDE", role: "Recruteur" },
    ],
    status: "inbox",
  },
  {
    id: 3,
    company: {
      name: "ConsultIT",
      logo: "/companies/consultit.png",
    },
    job: {
      name: "IT Consultant",
      type: "it-consultant",
    },
    date: "Il y a 3 jours",
    preview:
      "Bonjour, Je suis actuellement consultant IT avec une expérience significative dans le conseil en technologies. Je suis très intéressé par l'opportunité...",
    isUnread: true,
    participants: [
      { name: "Omar BENJELLOUN", role: "Candidat" },
      { name: "Marianne LAGARDE", role: "Recruteur" },
    ],
    status: "archived",
  },
  {
    id: 4,
    company: {
      name: "DevHub",
      logo: "/companies/devhub.png",
    },
    job: {
      name: "Développeur Web",
      type: "dev-web",
    },
    date: "Il y a 4 jours",
    preview:
      "Bonjour, Je suis développeur Full Stack avec une expertise en React et Node.js. Votre offre de poste correspond parfaitement à mon profil...",
    isUnread: false,
    participants: [
      { name: "Youssef EL AMRANI", role: "Candidat" },
      { name: "Oussama EL HASSANI", role: "Recruteur" },
    ],
    status: "spam",
  },
  {
    id: 5,
    company: {
      name: "ProductPro",
      logo: "/companies/productpro.png",
    },
    job: {
      name: "Product Manager",
      type: "product-manager",
    },
    date: "Il y a 5 jours",
    preview:
      "Bonjour, En tant que Chef de Produit expérimentée, je suis vivement intéressée par le poste de Product Manager au sein de votre entreprise...",
    isUnread: true,
    participants: [
      { name: "Nadia EL HASSANI", role: "Candidat" },
      { name: "Youssef EL AMRANI", role: "Recruteur" },
    ],
    status: "archived",
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
    category: "Candidature",
    title: "Réponse initiale",
    content:
      "Bonjour,\n\nJe vous remercie pour votre message concernant le poste. Je suis très intéressé(e) par cette opportunité et je serais ravi(e) d'en discuter plus en détail.\n\nJe suis disponible pour un entretien aux créneaux suivants :\n- [PROPOSER CRÉNEAUX]\n\nCordialement",
  },
  {
    id: "template-2",
    category: "Entretiens",
    title: "Confirmation d'entretien",
    content:
      "Bonjour,\n\nJe confirme ma présence à l'entretien prévu le [DATE] à [HEURE].\n\nJe me réjouis de pouvoir échanger avec vous sur cette opportunité.\n\nCordialement",
  },
  {
    id: "template-3",
    category: "Entretiens",
    title: "Demande de report",
    content:
      "Bonjour,\n\nJe me permets de vous contacter concernant notre entretien prévu le [DATE].\n\nPour des raisons [RAISON], je souhaiterais savoir s'il serait possible de le reporter. Je vous propose les créneaux suivants :\n- [PROPOSER CRÉNEAUX]\n\nJe vous prie de m'excuser pour ce changement.\n\nCordialement",
  },
  {
    id: "template-4",
    category: "Suivi",
    title: "Relance après entretien",
    content:
      "Bonjour,\n\nJe fais suite à notre entretien du [DATE] pour le poste de [POSTE].\n\nJe tenais à réaffirmer mon vif intérêt pour ce poste et votre entreprise. Notre échange a renforcé ma motivation à rejoindre votre équipe.\n\nJe reste à votre disposition pour tout complément d'information.\n\nCordialement",
  },
  {
    id: "template-5",
    category: "Documents",
    title: "Envoi de documents",
    content:
      "Bonjour,\n\nComme demandé, je vous transmets les documents suivants :\n- [LISTE DES DOCUMENTS]\n\nN'hésitez pas si vous avez besoin d'informations complémentaires.\n\nCordialement",
  },
  {
    id: "template-6",
    category: "Questions",
    title: "Demande d'informations",
    content:
      "Bonjour,\n\nJe me permets de revenir vers vous concernant le poste de [POSTE].\n\nPourriez-vous me donner plus de précisions sur :\n- [QUESTIONS]\n\nCes informations m'aideront à mieux comprendre l'opportunité.\n\nCordialement",
  },
];
