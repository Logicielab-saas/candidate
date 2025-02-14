import { Apple, Chrome, MailIcon } from "lucide-react";

export const WEEKDAYS = [
  { id: 1, name: "Lundi" },
  { id: 2, name: "Mardi" },
  { id: 3, name: "Mercredi" },
  { id: 4, name: "Jeudi" },
  { id: 5, name: "Vendredi" },
  { id: 6, name: "Samedi" },
  { id: 7, name: "Dimanche" },
] as const;

export const TIME_SLOTS = Array.from({ length: 18 * 2 }).map((_, i) => {
  const hour = Math.floor(i / 2);
  const minutes = i % 2 === 0 ? "00" : "30";
  const time = `${hour.toString().padStart(2, "0")}:${minutes}`;
  return { value: time, label: time };
});

export interface CalendarConnection {
  id: string;
  name: string;
  icon: typeof Chrome | typeof MailIcon | typeof Apple;
  isConnected: boolean;
}

export const CALENDAR_CONNECTIONS: CalendarConnection[] = [
  {
    id: "google",
    name: "Google",
    icon: Chrome,
    isConnected: false,
  },
  {
    id: "microsoft",
    name: "Microsoft",
    icon: MailIcon,
    isConnected: false,
  },
  {
    id: "apple",
    name: "Apple",
    icon: Apple,
    isConnected: false,
  },
];

export interface WeekdayAvailability {
  isAvailable: boolean;
  startTime: string;
  endTime: string;
}

export type WeekdayAvailabilities = {
  [key: number]: WeekdayAvailability;
};

export const DEFAULT_AVAILABILITIES: WeekdayAvailabilities = WEEKDAYS.reduce(
  (acc, day) => ({
    ...acc,
    [day.id]: {
      isAvailable: day.id <= 5, // Monday to Friday available by default
      startTime: "09:00",
      endTime: "17:00",
    },
  }),
  {}
);
