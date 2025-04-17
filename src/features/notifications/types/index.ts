/**
 * Notification Types and Interfaces
 *
 * Core type definitions for the notification system
 */

export const NOTIFICATION_TYPES = {
  JOB: "job",
  INTERVIEW: "interview",
  RESUME: "resume",
  SYSTEM: "system",
  APPLICATION: "application",
} as const;

export type NotificationType =
  (typeof NOTIFICATION_TYPES)[keyof typeof NOTIFICATION_TYPES];

/**
 * Module information for routing and context
 */
export interface NotificationModule {
  type: string;
  slug: string;
}

/**
 * Core notification interface
 */
export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  module?: NotificationModule;
  metadata?: {
    jobId?: string;
    interviewId?: string;
    applicationId?: string;
  };
}

export interface NotificationFilters {
  type?: NotificationType;
  isRead?: boolean;
}
