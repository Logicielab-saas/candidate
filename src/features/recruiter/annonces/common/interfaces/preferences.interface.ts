export interface NotificationEmail {
  value: string;
}

export interface PreferencesInformation {
  // Notification preferences
  notificationEmails: NotificationEmail[];
  notifyOnNewApplication: boolean;

  // Application preferences
  requireResume: boolean;
  allowCandidateContact: boolean;

  // Deadline preferences
  hasDeadline: boolean;
  deadline?: string; // ISO date string
}