export interface AnnonceDetails {
  id: string;
  intitule: string;
  city: string;
  candidatures: {
    tous: number;
    nouveaux: number;
  };
  performance: {
    impressions: number;
    clicks: number;
    candidaturesCommencees: number;
    candidatures: number;
  };
  description: {
    poste: string;
    missions: string[];
    profil: string[];
    avantages: string[];
  };
  statut: "Ouverte" | "Suspendue" | "Fermée";
  datePublication: string;
}

export const mockAnnonceDetails: Record<string, AnnonceDetails> = {
  "1": {
    id: "1",
    intitule: "Social Media Manager",
    city: "Tanger",
    candidatures: {
      tous: 10,
      nouveaux: 4,
    },
    performance: {
      impressions: 240,
      clicks: 30,
      candidaturesCommencees: 18,
      candidatures: 10,
    },
    description: {
      poste: "Nous recherchons un(e) Social Media Manager motivé(e) pour rejoindre notre équipe. Vous serez impliqué(e) dans :",
      missions: [
        "Création de contenu : Conception de contenus variés (photos, vidéos, textes) adaptés aux plateformes sociales.",
        "Gestion des réseaux sociaux : Participer à la planification, publication, et modération des publications.",
        "Veille et brainstorming : Analyser les tendances digitales et contribuer à la création de concepts innovants.",
      ],
      profil: [
        "Formation : Bac+4/Bac+5 en communication, marketing, audiovisuel, ou équivalent.",
        "Compétences techniques : Maîtrise des outils de tournage et montage.",
        "Créativité : Capacité à produire des contenus visuellement attractifs et engageants.",
        "Organisation : Esprit structuré et aptitude à respecter les délais.",
        "Passion : Grand intérêt pour les réseaux sociaux et les nouvelles tendances digitales.",
      ],
      avantages: [
        "Une expérience enrichissante au sein d'une équipe dynamique et bienveillante.",
        "L'opportunité de travailler sur des projets variés et d'apporter des idées créatives.",
        "Package salarial compétitif et avantages sociaux.",
      ],
    },
    statut: "Ouverte",
    datePublication: "2024-03-15",
  },
  "2": {
    id: "2",
    intitule: "Marketing Analyst",
    city: "Meknes",
    candidatures: {
      tous: 8,
      nouveaux: 2,
    },
    performance: {
      impressions: 180,
      clicks: 25,
      candidaturesCommencees: 12,
      candidatures: 8,
    },
    description: {
      poste: "Nous recherchons un(e) Marketing Analyst pour renforcer notre équipe d'analyse marketing.",
      missions: [
        "Analyse des données marketing et création de rapports détaillés",
        "Suivi et optimisation des campagnes marketing",
        "Identification des tendances et opportunités du marché",
      ],
      profil: [
        "Master en Marketing, Business Analytics ou domaine similaire",
        "Excellentes compétences analytiques et maîtrise des outils statistiques",
        "Expérience en analyse de données marketing",
        "Maîtrise de Excel et des outils de BI",
      ],
      avantages: [
        "Environnement de travail stimulant",
        "Formation continue",
        "Possibilités d'évolution",
      ],
    },
    statut: "Ouverte",
    datePublication: "2024-03-10",
  },
  "3": {
    id: "3",
    intitule: "Infographiste",
    city: "Rabat",
    candidatures: {
      tous: 15,
      nouveaux: 3,
    },
    performance: {
      impressions: 200,
      clicks: 40,
      candidaturesCommencees: 20,
      candidatures: 15,
    },
    description: {
      poste: "Nous recherchons un(e) Infographiste créatif(ve) pour rejoindre notre studio de design.",
      missions: [
        "Création de visuels pour le print et le digital",
        "Conception d'identités visuelles",
        "Réalisation de supports de communication",
      ],
      profil: [
        "Formation en design graphique",
        "Maîtrise de la suite Adobe",
        "Créativité et sens du détail",
        "Portfolio démontrant des réalisations variées",
      ],
      avantages: [
        "Studio créatif moderne",
        "Projets variés et challengeants",
        "Équipe passionnée",
      ],
    },
    statut: "Fermée",
    datePublication: "2024-03-01",
  },
  "4": {
    id: "4",
    intitule: "Developer",
    city: "Rabat",
    candidatures: {
      tous: 25,
      nouveaux: 8,
    },
    performance: {
      impressions: 350,
      clicks: 60,
      candidaturesCommencees: 30,
      candidatures: 25,
    },
    description: {
      poste: "Nous recherchons un(e) Développeur(se) Full Stack pour renforcer notre équipe technique.",
      missions: [
        "Développement de nouvelles fonctionnalités",
        "Maintenance et optimisation du code existant",
        "Participation aux choix techniques",
      ],
      profil: [
        "3+ ans d'expérience en développement web",
        "Maîtrise de React, Node.js, et TypeScript",
        "Expérience avec les bases de données SQL et NoSQL",
        "Bonnes pratiques de développement",
      ],
      avantages: [
        "Stack technique moderne",
        "Télétravail partiel possible",
        "Formations et conférences",
      ],
    },
    statut: "Ouverte",
    datePublication: "2024-03-20",
  },
  "5": {
    id: "5",
    intitule: "Product Manager",
    city: "Rabat",
    candidatures: {
      tous: 12,
      nouveaux: 5,
    },
    performance: {
      impressions: 280,
      clicks: 45,
      candidaturesCommencees: 15,
      candidatures: 12,
    },
    description: {
      poste: "Nous recherchons un(e) Product Manager expérimenté(e) pour piloter notre développement produit.",
      missions: [
        "Définition de la roadmap produit",
        "Analyse des besoins utilisateurs",
        "Coordination avec les équipes de développement",
      ],
      profil: [
        "5+ ans d'expérience en product management",
        "Excellentes capacités analytiques",
        "Leadership et communication",
        "Expérience en méthodologies agiles",
      ],
      avantages: [
        "Rôle stratégique",
        "Équipe internationale",
        "Package attractif",
      ],
    },
    statut: "Ouverte",
    datePublication: "2024-03-18",
  },
  "6": {
    id: "6",
    intitule: "Data Scientist",
    city: "Rabat",
    candidatures: {
      tous: 18,
      nouveaux: 6,
    },
    performance: {
      impressions: 320,
      clicks: 50,
      candidaturesCommencees: 22,
      candidatures: 18,
    },
    description: {
      poste: "Nous recherchons un(e) Data Scientist pour rejoindre notre équipe d'analyse avancée.",
      missions: [
        "Développement de modèles prédictifs",
        "Analyse de données complexes",
        "Création de visualisations de données",
      ],
      profil: [
        "Master ou PhD en Data Science ou domaine similaire",
        "Expertise en Python et R",
        "Expérience en machine learning",
        "Connaissance des outils de big data",
      ],
      avantages: [
        "Projets innovants",
        "Environnement de recherche",
        "Équipement haut de gamme",
      ],
    },
    statut: "Suspendue",
    datePublication: "2024-03-12",
  },
};