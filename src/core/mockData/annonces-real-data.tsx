import { AnnonceData } from "@/features/recruiter/annonces/common";
import {
  SalaryDisplayType,
  SalaryFrequency,
} from "@/features/recruiter/annonces/common/enums/salary.enum";

// Define the types for better type safety
export interface AnnonceRealData {
  id: string;
  intitule: string;
  city: string;
  candidatures: {
    tous: number;
    nouveaux: number;
  };
  statutDeSponsorisation: string;
  dateDePublication: string;
  statutDeLAnnonce: string;
  // Additional fields matching the complete structure
  annonceType: "new" | "duplicate";
  baseInformation: {
    jobTitle: string;
    numberOfPeople: string;
    promotionLocation: string;
  };
  jobTypeInformation: {
    contractTypes: string[];
  };
  salaryInformation: {
    displayType: "range" | "fixed" | "negotiable";
    minSalary?: string;
    maxSalary?: string;
    frequency: "monthly" | "yearly";
  };
  description: string;
  preferences: {
    notificationEmails: { value: string }[];
    notifyOnNewApplication: boolean;
    requireResume: boolean;
    allowCandidateContact: boolean;
    hasDeadline: boolean;
    deadline?: string;
  };
  questions: Array<{
    id: string;
    type: "open" | "choice" | "experience" | "yesno";
    question: string;
    isRequired: boolean;
    isMultiple: boolean;
    isMultipleChoices?: boolean;
    options?: string[];
    answer?: string;
  }>;
}

// Mock data with complete structure
export const mockAnnonceData: AnnonceData[] = [
  {
    id: "1",
    intitule: "Social Media Manager",
    city: "Tanger",
    candidatures: { tous: 10, nouveaux: 5 },
    statutDeSponsorisation: "Annonce gratuite",
    dateDePublication: "10/02/2025",
    statutDeLAnnonce: "Ouverte",
    annonceType: "new",
    baseInformation: {
      jobTitle: "Social Media Manager",
      numberOfPeople: "1-5",
      promotionLocation: "Tanger",
    },
    jobTypeInformation: {
      contractTypes: ["full-time", "cdi"],
    },
    salaryInformation: {
      displayType: SalaryDisplayType.RANGE,
      minSalary: "8000",
      maxSalary: "12000",
      frequency: SalaryFrequency.MONTHLY,
    },
    description:
      "<p>Nous recherchons un Social Media Manager expérimenté pour rejoindre notre équipe...</p>",
    preferences: {
      notificationEmails: [{ value: "recrutement@company.com" }],
      notifyOnNewApplication: true,
      requireResume: true,
      allowCandidateContact: true,
      hasDeadline: true,
      deadline: "2025-03-10T23:59:59.999Z",
    },
    questions: [
      {
        id: "open-1",
        type: "open",
        question: "Pourquoi souhaitez-vous rejoindre notre entreprise ?",
        isRequired: true,
        isMultiple: false,
      },
      {
        id: "choice-1",
        type: "choice",
        question: "Quel est votre niveau d'anglais ?",
        isRequired: true,
        isMultiple: false,
        isMultipleChoices: false,
        options: ["Débutant", "Intermédiaire", "Avancé", "Bilingue"],
      },
      {
        id: "exp-1",
        type: "experience",
        question: "Combien d'années d'expérience avez-vous en social media ?",
        isRequired: true,
        isMultiple: false,
        answer: "2 ans minimum",
      },
    ],
  },
  {
    id: "2",
    intitule: "Assistante Commerciale",
    city: "Meknes",
    candidatures: { tous: 10, nouveaux: 3 },
    statutDeSponsorisation: "Annonce sponsorisée",
    dateDePublication: "02/02/2025",
    statutDeLAnnonce: "Suspendue",
    annonceType: "new",
    baseInformation: {
      jobTitle: "Assistante Commerciale",
      numberOfPeople: "1",
      promotionLocation: "Meknes",
    },
    jobTypeInformation: {
      contractTypes: ["full-time", "cdi"],
    },
    salaryInformation: {
      displayType: SalaryDisplayType.NEGOTIABLE,
      frequency: SalaryFrequency.MONTHLY,
    },
    description:
      "<p>Nous recherchons une Assistante Commerciale dynamique...</p>",
    preferences: {
      notificationEmails: [{ value: "commercial@company.com" }],
      notifyOnNewApplication: true,
      requireResume: true,
      allowCandidateContact: false,
      hasDeadline: false,
    },
    questions: [
      {
        id: "exp-1",
        type: "experience",
        question: "Quelle est votre expérience en assistance commerciale ?",
        isRequired: true,
        isMultiple: false,
        answer: "3 ans minimum",
      },
    ],
  },
  {
    id: "3",
    intitule: "Infographiste",
    city: "Rabat",
    candidatures: { tous: 30, nouveaux: 2 },
    statutDeSponsorisation: "Annonce gratuite",
    dateDePublication: "01/02/2025",
    statutDeLAnnonce: "Fermée",
    annonceType: "new",
    baseInformation: {
      jobTitle: "Infographiste",
      numberOfPeople: "2",
      promotionLocation: "Rabat",
    },
    jobTypeInformation: {
      contractTypes: ["full-time", "cdd"],
    },
    salaryInformation: {
      displayType: SalaryDisplayType.RANGE,
      minSalary: "6000",
      maxSalary: "9000",
      frequency: SalaryFrequency.MONTHLY,
    },
    description: "<p>Nous recherchons un Infographiste créatif...</p>",
    preferences: {
      notificationEmails: [{ value: "design@company.com" }],
      notifyOnNewApplication: true,
      requireResume: true,
      allowCandidateContact: true,
      hasDeadline: true,
      deadline: "2025-02-28T23:59:59.999Z",
    },
    questions: [
      {
        id: "choice-1",
        type: "choice",
        question: "Quels logiciels de design maîtrisez-vous ?",
        isRequired: true,
        isMultiple: true,
        isMultipleChoices: true,
        options: ["Photoshop", "Illustrator", "InDesign", "Figma", "Sketch"],
      },
    ],
  },
  {
    id: "4",
    intitule: "Developer",
    city: "Rabat",
    candidatures: { tous: 15, nouveaux: 4 },
    statutDeSponsorisation: "Annonce gratuite",
    dateDePublication: "15/02/2025",
    statutDeLAnnonce: "Ouverte",
    annonceType: "new",
    baseInformation: {
      jobTitle: "Développeur Full Stack",
      numberOfPeople: "3",
      promotionLocation: "Rabat",
    },
    jobTypeInformation: {
      contractTypes: ["full-time", "cdi"],
    },
    salaryInformation: {
      displayType: SalaryDisplayType.RANGE,
      minSalary: "15000",
      maxSalary: "25000",
      frequency: SalaryFrequency.MONTHLY,
    },
    description:
      "<p>Nous recherchons un développeur Full Stack expérimenté...</p>",
    preferences: {
      notificationEmails: [{ value: "tech@company.com" }],
      notifyOnNewApplication: true,
      requireResume: true,
      allowCandidateContact: true,
      hasDeadline: false,
    },
    questions: [
      {
        id: "exp-1",
        type: "experience",
        question: "Quelle est votre expérience en développement web ?",
        isRequired: true,
        isMultiple: false,
        answer: "5 ans minimum",
      },
      {
        id: "choice-1",
        type: "choice",
        question: "Stack technique maîtrisé",
        isRequired: true,
        isMultiple: true,
        isMultipleChoices: true,
        options: ["React", "Node.js", "TypeScript", "Next.js", "MongoDB"],
      },
    ],
  },
  {
    id: "5",
    intitule: "Machine Learning Engineer",
    city: "Rabat",
    candidatures: { tous: 20, nouveaux: 6 },
    statutDeSponsorisation: "Annonce sponsorisée",
    dateDePublication: "20/02/2025",
    statutDeLAnnonce: "Ouverte",
    annonceType: "new",
    baseInformation: {
      jobTitle: "Machine Learning Engineer",
      numberOfPeople: "2",
      promotionLocation: "Rabat",
    },
    jobTypeInformation: {
      contractTypes: ["full-time", "cdi"],
    },
    salaryInformation: {
      displayType: SalaryDisplayType.RANGE,
      minSalary: "20000",
      maxSalary: "35000",
      frequency: SalaryFrequency.MONTHLY,
    },
    description: "<p>Nous recherchons un ingénieur en Machine Learning...</p>",
    preferences: {
      notificationEmails: [{ value: "ai@company.com" }],
      notifyOnNewApplication: true,
      requireResume: true,
      allowCandidateContact: true,
      hasDeadline: true,
      deadline: "2025-04-20T23:59:59.999Z",
    },
    questions: [
      {
        id: "exp-1",
        type: "experience",
        question: "Quelle est votre expérience en ML/AI ?",
        isRequired: true,
        isMultiple: false,
        answer: "3 ans minimum",
      },
    ],
  },
  {
    id: "6",
    intitule: "Data Scientist",
    city: "Rabat",
    candidatures: { tous: 25, nouveaux: 8 },
    statutDeSponsorisation: "Annonce gratuite",
    dateDePublication: "25/02/2025",
    statutDeLAnnonce: "Ouverte",
    annonceType: "new",
    baseInformation: {
      jobTitle: "Data Scientist",
      numberOfPeople: "1",
      promotionLocation: "Rabat",
    },
    jobTypeInformation: {
      contractTypes: ["full-time", "cdi"],
    },
    salaryInformation: {
      displayType: SalaryDisplayType.RANGE,
      minSalary: "18000",
      maxSalary: "30000",
      frequency: SalaryFrequency.MONTHLY,
    },
    description: "<p>Nous recherchons un Data Scientist expérimenté...</p>",
    preferences: {
      notificationEmails: [{ value: "data@company.com" }],
      notifyOnNewApplication: true,
      requireResume: true,
      allowCandidateContact: true,
      hasDeadline: false,
    },
    questions: [
      {
        id: "exp-1",
        type: "experience",
        question: "Quelle est votre expérience en Data Science ?",
        isRequired: true,
        isMultiple: false,
        answer: "4 ans minimum",
      },
      {
        id: "choice-1",
        type: "choice",
        question: "Outils et technologies maîtrisés",
        isRequired: true,
        isMultiple: true,
        isMultipleChoices: true,
        options: ["Python", "R", "SQL", "TensorFlow", "PyTorch", "Pandas"],
      },
    ],
  },
];
