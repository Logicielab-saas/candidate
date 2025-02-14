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

export const TIME_SLOTS = Array.from({ length: 25 })
  .map((_, i) => {
    const hour = Math.floor(i / 2) + 8;
    const minutes = i % 2 === 0 ? "00" : "30";
    const time = `${hour.toString().padStart(2, "0")}:${minutes}`;
    return { value: time, label: time };
  })
  .filter((slot) => {
    const hour = parseInt(slot.value.split(":")[0]);
    return hour <= 20;
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
      startTime:
        day.id === 1
          ? "08:00" // Monday starts early
          : day.id === 2
          ? "09:30" // Tuesday starts later
          : day.id === 3
          ? "10:00" // Wednesday starts even later
          : day.id === 4
          ? "08:30" // Thursday starts early-ish
          : day.id === 5
          ? "09:00" // Friday normal start
          : "10:00", // Weekend (if available)
      endTime:
        day.id === 1
          ? "18:00" // Monday ends at 6
          : day.id === 2
          ? "19:30" // Tuesday ends late
          : day.id === 3
          ? "17:30" // Wednesday ends early
          : day.id === 4
          ? "20:00" // Thursday ends latest
          : day.id === 5
          ? "16:00" // Friday ends earliest
          : "15:00", // Weekend (if available)
    },
  }),
  {}
);
