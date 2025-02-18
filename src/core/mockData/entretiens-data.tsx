// Types
export interface Entretien {
  id: string;
  type: "Visioconférence" | "Téléphone" | "Présentiel";
  candidatName: string;
  isConfirmed: boolean;
  date: Date;
  startTime: string;
  endTime: string;
  poste: string;
  city: string;
  status: "upcoming" | "pending" | "past";
  subStatus?: "unique" | "plusieurs" | "termine" | "expire";
}

interface SubFilter {
  id: "unique" | "plusieurs" | "termine" | "expire";
  label: string;
}

type BaseFilter = {
  id: "upcoming" | "pending" | "past";
  label: string;
  count: number;
};

type FilterWithSubs = BaseFilter & {
  subFilters: SubFilter[];
};

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

// Status configurations
export const STATUS_CONFIG = {
  upcoming: {
    label: "À venir",
    badge: { label: "Confirmé", variant: "default" as BadgeVariant },
  },
  pending: {
    label: "En attente",
    badge: { label: "En attente", variant: "secondary" as BadgeVariant },
    subStatus: {
      unique: { label: "Créneau unique", variant: "outline" as BadgeVariant },
      plusieurs: {
        label: "Plusieurs créneaux",
        variant: "outline" as BadgeVariant,
      },
    },
  },
  past: {
    label: "Passés",
    subStatus: {
      termine: { label: "Terminé", variant: "default" as BadgeVariant },
      expire: { label: "Expiré", variant: "destructive" as BadgeVariant },
    },
  },
} as const;

// Filter options
export const FILTER_OPTIONS = [
  { id: "upcoming", label: "À venir", count: 4 },
  {
    id: "pending",
    label: "En attente",
    count: 3,
    subFilters: [
      { id: "unique", label: "Créneau unique" },
      { id: "plusieurs", label: "Plusieurs créneaux" },
    ],
  },
  {
    id: "past",
    label: "Passés",
    count: 4,
    subFilters: [
      { id: "termine", label: "Terminé" },
      { id: "expire", label: "Expiré" },
    ],
  },
] as const;

export type FilterType = (typeof FILTER_OPTIONS)[number]["id"];
export type SubFilterType = "unique" | "plusieurs" | "termine" | "expire";
export type FilterOption = BaseFilter | FilterWithSubs;

// Helper function to create dates relative to today
const getRelativeDate = (days: number, hours: number = 10) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  date.setHours(hours, 0, 0, 0);
  return date;
};

// Mock data
export const MOCK_ENTRETIENS: Entretien[] = [
  // Upcoming interviews
  {
    id: "1",
    type: "Visioconférence",
    candidatName: "Ayoub BOUKHANE",
    isConfirmed: true,
    date: getRelativeDate(2, 14),
    startTime: "14:00",
    endTime: "15:00",
    poste: "Social Media Manager",
    city: "Casablanca",
    status: "upcoming",
  },
  {
    id: "2",
    type: "Présentiel",
    candidatName: "Sara BOUHLAOUI",
    isConfirmed: true,
    date: getRelativeDate(3, 11),
    startTime: "11:00",
    endTime: "12:00",
    poste: "Marketing Analyst",
    city: "Rabat",
    status: "upcoming",
  },
  {
    id: "3",
    type: "Visioconférence",
    candidatName: "Omar BENJELLOUN",
    isConfirmed: true,
    date: getRelativeDate(4, 15),
    startTime: "15:00",
    endTime: "16:00",
    poste: "IT Consultant",
    city: "Fès",
    status: "upcoming",
  },
  {
    id: "4",
    type: "Téléphone",
    candidatName: "Omar EL HADDADI",
    isConfirmed: true,
    date: getRelativeDate(5, 10),
    startTime: "10:00",
    endTime: "11:00",
    poste: "Data Analyst",
    city: "Fès",
    status: "upcoming",
  },
  {
    id: "12",
    type: "Téléphone",
    candidatName: "Omar EL HADDADI",
    isConfirmed: true,
    date: getRelativeDate(5, 10),
    startTime: "10:00",
    endTime: "11:00",
    poste: "Data Analyst",
    city: "Fès",
    status: "upcoming",
  },
  {
    id: "13",
    type: "Téléphone",
    candidatName: "Omar EL HADDADI",
    isConfirmed: true,
    date: getRelativeDate(5, 10),
    startTime: "10:00",
    endTime: "11:00",
    poste: "Data Analyst",
    city: "Fès",
    status: "upcoming",
  },

  // Pending interviews
  {
    id: "5",
    type: "Présentiel",
    candidatName: "Mariam Blanche",
    isConfirmed: false,
    date: getRelativeDate(2, 16),
    startTime: "16:00",
    endTime: "17:00",
    poste: "Social Media Manager",
    city: "La Chapelle-des-Fougeretz",
    status: "pending",
    subStatus: "unique",
  },
  {
    id: "6",
    type: "Visioconférence",
    candidatName: "Sofia LEMARCHAND",
    isConfirmed: false,
    date: getRelativeDate(3, 9),
    startTime: "09:00",
    endTime: "10:00",
    poste: "Développeur Web",
    city: "Rabat",
    status: "pending",
    subStatus: "plusieurs",
  },
  {
    id: "7",
    type: "Téléphone",
    candidatName: "Laila MOUSTAPHA",
    isConfirmed: false,
    date: getRelativeDate(4, 14),
    startTime: "14:00",
    endTime: "15:00",
    poste: "Marketing Manager",
    city: "Agadir",
    status: "pending",
    subStatus: "unique",
  },

  // Past interviews
  {
    id: "8",
    type: "Visioconférence",
    candidatName: "Youssef EL AMRANI",
    isConfirmed: true,
    date: getRelativeDate(-5, 15),
    startTime: "15:00",
    endTime: "16:00",
    poste: "Développeur Web",
    city: "Casablanca",
    status: "past",
    subStatus: "termine",
  },
  {
    id: "9",
    type: "Présentiel",
    candidatName: "Fatima ZAHRA",
    isConfirmed: true,
    date: getRelativeDate(-10, 14),
    startTime: "14:00",
    endTime: "15:00",
    poste: "Chef de Projet Digital",
    city: "Tanger",
    status: "past",
    subStatus: "termine",
  },
  {
    id: "10",
    type: "Téléphone",
    candidatName: "Hassan EL KHALED",
    isConfirmed: false,
    date: getRelativeDate(-7, 10),
    startTime: "10:00",
    endTime: "11:00",
    poste: "Software Engineer",
    city: "Marrakech",
    status: "past",
    subStatus: "expire",
  },
  {
    id: "11",
    type: "Visioconférence",
    candidatName: "Nadia EL HASSANI",
    isConfirmed: false,
    date: getRelativeDate(-3, 16),
    startTime: "16:00",
    endTime: "17:00",
    poste: "Product Manager",
    city: "Tanger",
    status: "past",
    subStatus: "expire",
  },
];
