import type {
  UserAlert,
  UserAlertPreferences,
  UserCompanyAlert,
} from "../interfaces/";

export const userAlerts: UserAlert[] = [
  {
    id: "1",
    post: "Software Developer",
    city: "Paris",
    salaryRange: "40,150",
    isEnabled: true,
  },
  {
    id: "2",
    post: "Software Enginner",
    salaryRange: "60,200",
    isEnabled: false,
  },
  {
    id: "3",
    post: "Full Stack Developer",
    isEnabled: true,
  },
];

export const userCompanyAlerts: UserCompanyAlert[] = [
  {
    id: "1",
    company: "Google",
    isEnabled: true,
  },
  {
    id: "2",
    company: "Microsoft",
    isEnabled: true,
  },
  {
    id: "3",
    company: "Amazon",
    isEnabled: false,
  },
  {
    id: "4",
    company: "Apple",
    isEnabled: true,
  },
];

export const userAlertsPreferences: UserAlertPreferences[] = [
  {
    id: "1",
    title: "Nouvelles offres d'emploi",
    description:
      "Recevoir des notifications lorsqu'une nouvelle offre d'emploi est publiée",
    isEnabled: true,
  },
  {
    id: "2",
    title: "Nouvelles entreprises",
    description:
      "Recevoir des notifications lorsqu'une nouvelle entreprise est ajoutée",
    isEnabled: true,
  },
];
