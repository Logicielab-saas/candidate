import { UserDevice } from "../interfaces";

export const MOCK_USER_DEVICES: UserDevice[] = [
  {
    id: "1",
    name: "Google Chrome",
    lastLogin: "2024-01-01",
    ipAddress: { ip: "192.168.1.107", city: "Tanger" },
    isCurrentDevice: true,
  },
  {
    id: "2",
    name: "Mozilla Firefox",
    lastLogin: "2024-01-02",
    ipAddress: { ip: "192.168.1.2", city: "Casablanca" },
    isCurrentDevice: false,
  },
  {
    id: "3",
    name: "Safari",
    lastLogin: "2024-01-03",
    ipAddress: { ip: "192.168.1.3", city: "Rabat" },
    isCurrentDevice: false,
  },
];
