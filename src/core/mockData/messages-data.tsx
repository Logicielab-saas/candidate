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
  isArchived: boolean;
  isSpam: boolean;
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
    isArchived: false,
    isSpam: false,
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
    isArchived: false,
    isSpam: false,
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
    isArchived: true,
    isSpam: false,
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
    isArchived: false,
    isSpam: true,
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
    isArchived: true,
    isSpam: false,
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
