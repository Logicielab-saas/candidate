import {
  ContractScheduleType,
  ContractType,
  ContractDurationUnit,
} from "../enums/contract-type.enum";
import { SalaryDisplayType, SalaryFrequency } from "../enums/salary.enum";
import type { JobTypeInformation } from "../interfaces/contract.interface";
import type { SalaryInformation } from "../interfaces/salary.interface";

export type QuestionType = "experience" | "open" | "choice" | "yesno";

interface BaseQuestion {
  id: string;
  type: QuestionType;
  question: string;
  isRequired: boolean;
  isMultiple: boolean;
}

export interface CustomQuestion {
  type: QuestionType;
  label: string;
  isRequired: boolean;
  isMultipleChoices?: boolean;
  options?: string[];
}

interface ChoiceQuestion extends BaseQuestion {
  type: "choice";
  options: string[];
}

interface SimpleQuestion extends BaseQuestion {
  type: "experience" | "open" | "yesno";
}

export type PredefinedQuestion = SimpleQuestion | ChoiceQuestion;

export interface FormQuestion {
  id: string;
  type: QuestionType;
  question: string;
  label: string;
  isRequired: boolean;
  isMultiple: boolean;
  isMultipleChoices?: boolean;
  options?: string[];
  answer?: string | string[];
}

export interface SubmissionQuestion {
  isRequired: boolean;
  id?: string;
  isMultipleChoices?: boolean;
  label?: string;
  type?: QuestionType;
  options?: string[];
  answer?: string | string[];
  question?: string;
}

export type FinalQuestion = FormQuestion | SubmissionQuestion;

export interface Annonce {
  id: string;
  baseInformation: {
    jobTitle: string;
    numberOfPeople: string;
    promotionLocation: string;
  };
  jobTypeInformation: JobTypeInformation;
  salaryInformation: SalaryInformation;
  description: string;
  preferences: {
    notificationEmails: Array<{
      value: string;
    }>;
    notifyOnNewApplication: boolean;
    requireResume: boolean;
    allowCandidateContact: boolean;
    hasDeadline: boolean;
    deadline: string;
  };
  questions: SubmissionQuestion[];
}

// Example data
export const MOCK_ANNONCES: Annonce[] = [
  {
    id: "1",
    baseInformation: {
      jobTitle: "Social Media Manager",
      numberOfPeople: "2-5",
      promotionLocation: "tanger",
    },
    jobTypeInformation: {
      contractTypes: [ContractType.FULL_TIME, ContractType.CDI],
      partTimeDetails: {
        scheduleType: ContractScheduleType.FIXED,
        hoursPerWeek: "35",
      },
    },
    salaryInformation: {
      displayType: SalaryDisplayType.RANGE,
      minSalary: "8000",
      maxSalary: "12000",
      frequency: SalaryFrequency.MONTHLY,
    },
    description:
      "<p>Nous recherchons un(e) Développeur(euse) Web Junior prêt(e) à se bouger dans un environnement exigeant et sans fioritures. Si vous avez des bases solides en HTML, CSS et JavaScript et que vous n’avez pas peur d’apprendre sur le tas, ce poste est pour vous.</p><p><strong>Ce que vous ferez :</strong></p><ul><li><p><strong>Développer et maintenir</strong> des sites et applications web en collaboration avec les équipes design et back-end.</p></li><li><p><strong>Implémenter des fonctionnalités</strong> réelles en respectant des délais serrés.</p></li><li><p><strong>Participer activement</strong> aux revues de code et aux tests pour garantir la qualité du produit.</p></li><li><p><strong>Apprendre rapidement</strong> de nouvelles technologies et outils, sans excuse pour la médiocrité.</p></li></ul><hr><p><strong>Ce que nous attendons :</strong></p><ul><li><p><strong>Maîtrise de base</strong> en HTML, CSS et JavaScript.</p></li><li><p><strong>Connaissances</strong> de frameworks comme React, Angular ou Vue.js sont un plus, mais pas obligatoires.</p></li><li><p><strong>Esprit d’équipe</strong> : vous devez pouvoir collaborer et accepter des retours directs.</p></li><li><p><strong>Proactivité et adaptabilité</strong> : on ne cherche pas quelqu’un qui se cache derrière des excuses.</p></li><li><p><strong>Formation ou expérience</strong> en informatique (diplôme ou autodidacte motivé(e)).</p></li></ul><hr><p><strong>Ce que nous offrons :</strong></p><ul><li><p><strong>Rémunération compétitive</strong> pour un poste junior – on paye ce que ça vaut.</p></li><li><p><strong>Environnement de travail stimulant</strong> où vous apprendrez rapidement, mais il faudra sortir de votre zone de confort.</p></li><li><p><strong>Opportunités de formation</strong> et de progression réelle au sein de l’équipe.</p></li><li><p><strong>Avantages sociaux</strong> : mutuelle, tickets restaurant, etc.</p></li></ul><hr><p><strong>Postulez si vous êtes prêt(e) à vous investir :</strong></p><p>Envoyez votre CV et une lettre de motivation à [email@example.com] avec l’objet « Candidature – Développeur Web Junior ».<br><strong>Note :</strong> Ce poste n’est pas pour les amateurs. Nous recherchons des personnes prêtes à travailler dur, à accepter des critiques constructives et à progresser rapidement. Si vous pensez que vous pouvez relever le défi, on veut vous connaître.</p>",
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
        isRequired: true,
        question: "Décrivez votre expérience en gestion des réseaux sociaux",
      },
      {
        id: "choice-1",
        type: "choice",
        isRequired: true,
        isMultipleChoices: false,
        options: ["Facebook", "Instagram", "Twitter", "LinkedIn"],
        question: "Quelle est votre plateforme de prédilection ?",
      },
      {
        id: "exp-1",
        type: "experience",
        isRequired: true,
        question: "2 ans minimum",
        label: "Expérience en Social Media",
      },
    ],
  },
  {
    id: "2",
    baseInformation: {
      jobTitle: "Développeur Full Stack",
      numberOfPeople: "1",
      promotionLocation: "casablanca",
    },
    jobTypeInformation: {
      contractTypes: [ContractType.CDI],
      partTimeDetails: {
        scheduleType: ContractScheduleType.FIXED,
        hoursPerWeek: "40",
      },
    },
    salaryInformation: {
      displayType: SalaryDisplayType.RANGE,
      minSalary: "15000",
      maxSalary: "25000",
      frequency: SalaryFrequency.MONTHLY,
    },
    description:
      "<p>Nous recherchons un développeur Full Stack expérimenté pour rejoindre notre équipe technique...</p>",
    preferences: {
      notificationEmails: [{ value: "tech@company.com" }],
      notifyOnNewApplication: true,
      requireResume: true,
      allowCandidateContact: true,
      hasDeadline: false,
      deadline: "",
    },
    questions: [
      {
        id: "exp-2",
        type: "experience",
        isRequired: true,
        question: "3 ans minimum",
        label: "Expérience en développement",
      },
      {
        id: "choice-2",
        type: "choice",
        isRequired: true,
        isMultipleChoices: true,
        options: ["React", "Node.js", "TypeScript", "MongoDB"],
        question: "Quelles technologies maîtrisez-vous ?",
      },
    ],
  },
  {
    id: "3",
    baseInformation: {
      jobTitle: "Stage Marketing Digital",
      numberOfPeople: "3",
      promotionLocation: "rabat",
    },
    jobTypeInformation: {
      contractTypes: [ContractType.INTERNSHIP],
      internshipDetails: {
        duration: "6",
        unit: ContractDurationUnit.MONTHS,
      },
    },
    salaryInformation: {
      displayType: SalaryDisplayType.FIXED,
      minSalary: "3000",
      frequency: SalaryFrequency.MONTHLY,
    },
    description:
      "<p>Stage de fin d'études en Marketing Digital pour une durée de 6 mois...</p>",
    preferences: {
      notificationEmails: [{ value: "stages@company.com" }],
      notifyOnNewApplication: true,
      requireResume: true,
      allowCandidateContact: false,
      hasDeadline: true,
      deadline: "2024-06-30T23:59:59.999Z",
    },
    questions: [
      {
        id: "open-3",
        type: "open",
        isRequired: true,
        question: "Pourquoi souhaitez-vous rejoindre notre entreprise ?",
      },
      {
        id: "yesno-1",
        type: "yesno",
        isRequired: true,
        question:
          "Êtes-vous disponible pour un stage de 6 mois à temps plein ?",
      },
    ],
  },
  {
    id: "4",
    baseInformation: {
      jobTitle: "Chef de Projet IT",
      numberOfPeople: "1",
      promotionLocation: "agadir",
    },
    jobTypeInformation: {
      contractTypes: [ContractType.CDI],
      partTimeDetails: {
        scheduleType: ContractScheduleType.FIXED,
        hoursPerWeek: "40",
      },
    },
    salaryInformation: {
      displayType: SalaryDisplayType.NEGOTIABLE,
      frequency: SalaryFrequency.YEARLY,
    },
    description:
      "<p>Nous recherchons un Chef de Projet IT expérimenté pour gérer nos projets technologiques...</p>",
    preferences: {
      notificationEmails: [
        { value: "rh@company.com" },
        { value: "it@company.com" },
      ],
      notifyOnNewApplication: true,
      requireResume: true,
      allowCandidateContact: true,
      hasDeadline: false,
      deadline: "",
    },
    questions: [
      {
        id: "exp-4",
        type: "experience",
        isRequired: true,
        question: "5 ans minimum",
        label: "Expérience en gestion de projet IT",
      },
      {
        id: "choice-4",
        type: "choice",
        isRequired: true,
        isMultipleChoices: true,
        options: ["Agile", "Scrum", "PRINCE2", "PMI"],
        question: "Quelles certifications possédez-vous ?",
      },
    ],
  },
  {
    id: "5",
    baseInformation: {
      jobTitle: "Commercial B2B",
      numberOfPeople: "3-4",
      promotionLocation: "marrakech",
    },
    jobTypeInformation: {
      contractTypes: [ContractType.CDD],
      cddDetails: {
        duration: "12",
        unit: ContractDurationUnit.MONTHS,
      },
    },
    salaryInformation: {
      displayType: SalaryDisplayType.RANGE,
      minSalary: "6000",
      maxSalary: "10000",
      frequency: SalaryFrequency.MONTHLY,
    },
    description:
      "<p>Nous recrutons des commerciaux B2B pour développer notre portefeuille client...</p>",
    preferences: {
      notificationEmails: [{ value: "commercial@company.com" }],
      notifyOnNewApplication: true,
      requireResume: true,
      allowCandidateContact: true,
      hasDeadline: true,
      deadline: "2024-12-31T23:59:59.999Z",
    },
    questions: [
      {
        id: "exp-5",
        type: "experience",
        isRequired: true,
        question: "2 ans minimum",
        label: "Expérience commerciale B2B",
      },
      {
        id: "open-5",
        type: "open",
        isRequired: true,
        question: "Quel a été votre plus grand succès commercial ?",
      },
    ],
  },
];

export const MOCK_ANNONCE = MOCK_ANNONCES[0];
