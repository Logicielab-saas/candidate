export interface UserDevice {
  id: string;
  name: string;
  lastLogin: string;
  ipAddress: {
    ip: string;
    city: string;
  };
  isCurrentDevice: boolean;
}
